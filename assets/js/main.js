(function () {
  "use strict";

  var LANG_KEY = "ps-lang";
  var DEFAULT_LANG = "de";

  function getLang() {
    try {
      return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* private mode / storage disabled — language just won't persist */
    }
    applyLang(lang);
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-de][data-en]").forEach(function (el) {
      var content = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-de");
      if (content !== null) el.innerHTML = content;
    });

    document.querySelectorAll("[data-de-attr-title][data-en-attr-title]").forEach(function (el) {
      var val = lang === "en" ? el.getAttribute("data-en-attr-title") : el.getAttribute("data-de-attr-title");
      if (val !== null) el.setAttribute("title", val);
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function initLangToggle() {
    var lang = getLang();
    applyLang(lang);

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function initNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function markActiveNav() {
    var current = document.body.getAttribute("data-page");
    if (!current) return;
    document.querySelectorAll(".nav-links a[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function initVideoToggles() {
    document.querySelectorAll(".video-block").forEach(function (block) {
      var video = block.querySelector(".video-frame video");
      var toggle = block.querySelector(".video-toggle");
      var seek = block.querySelector(".video-seek");
      var time = block.querySelector(".video-time");
      if (!video || !toggle) return;

      toggle.addEventListener("click", function () {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });

      video.addEventListener("play", function () { toggle.classList.add("is-playing"); });
      video.addEventListener("pause", function () { toggle.classList.remove("is-playing"); });

      if (seek) {
        var seeking = false;

        video.addEventListener("timeupdate", function () {
          if (seeking || !video.duration) return;
          var pct = (video.currentTime / video.duration) * 100;
          seek.value = pct;
          seek.style.setProperty("--progress", pct + "%");
          if (time) time.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);
        });

        video.addEventListener("loadedmetadata", function () {
          if (time) time.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);
        });

        seek.addEventListener("input", function () {
          seeking = true;
          seek.style.setProperty("--progress", seek.value + "%");
          if (time) time.textContent = formatTime((seek.value / 100) * video.duration) + " / " + formatTime(video.duration);
        });

        seek.addEventListener("change", function () {
          video.currentTime = (seek.value / 100) * video.duration;
          seeking = false;
        });
      }
    });
  }

  function initTagFilter() {
    var params = new URLSearchParams(window.location.search);
    var tag = params.get("tag");
    var notice = document.getElementById("tag-filter-notice");
    if (!tag) return;

    document.querySelectorAll(".card[data-tags]").forEach(function (card) {
      var tags = card.getAttribute("data-tags").split(" ");
      if (tags.indexOf(tag) === -1) {
        card.hidden = true;
      }
    });

    document.querySelectorAll(".card-grid").forEach(function (grid) {
      var anyVisible = Array.prototype.some.call(grid.querySelectorAll(".card"), function (c) {
        return !c.hidden;
      });
      var section = grid.closest("section.section");
      if (!anyVisible && section) section.hidden = true;
    });

    if (notice) {
      notice.hidden = false;
      var label = tag.replace(/-/g, " ");
      notice.innerHTML =
        '<span data-de="Gefiltert nach: " data-en="Filtered by: ">Gefiltert nach: </span>' +
        '<strong>' + label + '</strong> · ' +
        '<a href="projects.html" data-de="Alle anzeigen" data-en="Show all">Alle anzeigen</a>';
    }
  }

  function initGalleries() {
    document.querySelectorAll(".gallery").forEach(function (gallery) {
      var stage = gallery.querySelector(".gallery-stage");
      var slides = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-slide"));
      var prev = gallery.querySelector(".gallery-prev");
      var next = gallery.querySelector(".gallery-next");
      if (!stage || !slides.length) return;

      var current = 0;

      function render() {
        slides.forEach(function (slide, i) {
          slide.style.transform = "translateX(" + (i - current) * 100 + "%)";
        });
      }

      function go(direction) {
        current = (current + direction + slides.length) % slides.length;
        render();
      }

      if (prev) prev.addEventListener("click", function () { go(-1); });
      if (next) next.addEventListener("click", function () { go(1); });

      render();
    });
  }

  function includePartial(selector, url) {
    var target = document.querySelector(selector);
    if (!target) return Promise.resolve();
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + url);
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html;
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initVideoToggles();
    initGalleries();
    initTagFilter();

    Promise.all([
      includePartial("[data-include='header']", "partials/header.html"),
      includePartial("[data-include='footer']", "partials/footer.html")
    ]).then(function () {
      initNavToggle();
      markActiveNav();
      initLangToggle();
    });
  });
})();
