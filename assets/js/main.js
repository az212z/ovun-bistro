/* ===== OVUN BISTRO — main.js (guarded, vanilla) ===== */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia && window.matchMedia("(hover: none), (pointer: coarse)").matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---- Preloader (always resolves) ---- */
  function hidePreloader() {
    var p = $("#preloader");
    if (!p) return;
    p.classList.add("hide");
    setTimeout(function () { if (p && p.parentNode) p.style.display = "none"; }, 650);
    var stage = $("#cloche");
    if (stage && !prefersReduced) stage.classList.add("reveal");
    else if (stage) { var plate = $(".cloche-plate", stage); if (plate) plate.style.opacity = "1"; }
  }
  window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 1200); // hard fallback

  /* ---- Year ---- */
  try { var y = $("#year"); if (y) y.textContent = new Date().getFullYear(); } catch (e) {}

  /* ---- Header scrolled ---- */
  var header = $("#header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.pageYOffset > 30); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = $("#burger"), menu = $("#mobileMenu"), mmClose = $("#mmClose");
  function openMenu() { if (!menu) return; menu.classList.add("open"); if (burger) burger.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; }
  function closeMenu() { if (!menu) return; menu.classList.remove("open"); if (burger) burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  if (burger) burger.addEventListener("click", openMenu);
  if (mmClose) mmClose.addEventListener("click", closeMenu);
  $all("[data-mm-close]").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---- Scroll reveal ---- */
  var reveals = $all(".reveal-up");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
  // safety: ensure visible after 2.5s regardless
  setTimeout(function () { reveals.forEach(function (el) { el.classList.add("in"); }); }, 2500);

  /* ---- Count-up ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-countup"));
    if (isNaN(target)) return;
    var isFloat = target % 1 !== 0;
    var dur = 1300, start = null;
    function fmt(n) { return isFloat ? n.toFixed(1) : Math.round(n).toLocaleString("en-US"); }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  var counts = $all("[data-countup]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counts.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Magnetic buttons + pointer parallax ---- */
  if (!isTouch && !prefersReduced) {
    $all(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (mx * 0.22) + "px," + (my * 0.3) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });

    // hero pointer parallax (capped)
    var parallaxEls = $all(".hero .parallax");
    var hero = $("#hero");
    if (hero && parallaxEls.length) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        parallaxEls.forEach(function (el) {
          var d = parseFloat(el.getAttribute("data-depth")) || 6;
          var cap = Math.min(d, 12);
          var tx = nx * cap, ty = ny * cap;
          var base = el.classList.contains("cloche-stage") ? "" : "";
          el.style.transform = base + "translate(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px)";
        });
      });
      hero.addEventListener("mouseleave", function () {
        parallaxEls.forEach(function (el) { el.style.transform = ""; });
      });
    }
  }

  /* ---- Dust / gold particle canvas in light beam ---- */
  (function () {
    if (prefersReduced) return;
    var c = $("#dust"); if (!c || !c.getContext) return;
    var ctx = c.getContext("2d"), W, H, parts = [], raf;
    function size() {
      var hero = $("#hero"); if (!hero) return;
      W = c.width = hero.offsetWidth; H = c.height = hero.offsetHeight;
    }
    function make() {
      var n = Math.min(34, Math.round(W / 42));
      parts = [];
      for (var i = 0; i < n; i++) {
        parts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + 0.4, vy: -(Math.random() * 0.25 + 0.05), vx: (Math.random() - 0.5) * 0.18, a: Math.random() * 0.5 + 0.15 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y += p.vy; p.x += p.vx;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,198,136," + p.a + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    function start() { size(); make(); cancelAnimationFrame(raf); draw(); }
    window.addEventListener("resize", function () { clearTimeout(c._t); c._t = setTimeout(start, 200); });
    start();
    // pause when hero off-screen
    if ("IntersectionObserver" in window) {
      var pio = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { if (!raf) draw(); } else { cancelAnimationFrame(raf); raf = null; } });
      }, { threshold: 0 });
      var hero = $("#hero"); if (hero) pio.observe(hero);
    }
  })();

  /* ---- Lightbox ---- */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbClose = $("#lbClose"), lbPrev = $("#lbPrev"), lbNext = $("#lbNext");
  var gals = $all(".gal"), current = 0;
  function openLB(i) {
    current = i; var src = gals[i].getAttribute("data-img");
    var inner = gals[i].querySelector("img");
    lbImg.src = src; lbImg.alt = inner ? inner.alt : "صورة من أوفن بيسترو";
    lb.classList.add("open"); document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLB() { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; }
  function step(dir) { current = (current + dir + gals.length) % gals.length; openLB(current); }
  gals.forEach(function (g, i) { g.addEventListener("click", function () { openLB(i); }); });
  if (lbClose) lbClose.addEventListener("click", closeLB);
  if (lbPrev) lbPrev.addEventListener("click", function () { step(1); }); // RTL: prev moves forward visually
  if (lbNext) lbNext.addEventListener("click", function () { step(-1); });
  if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", function (e) {
    if (!lb || !lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---- Reservation form -> WhatsApp + localStorage + toast ---- */
  var form = $("#reserveForm"), toast = $("#toast");
  function showToast() {
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 4500);
  }
  function validPhone(v) { return /[0-9]{8,}/.test(v.replace(/\s|-/g, "")); }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $all(".field", form).forEach(function (f) {
        var input = f.querySelector("input,select,textarea");
        if (!input || !input.hasAttribute("required")) return;
        var v = (input.value || "").trim();
        var bad = !v || (input.id === "rPhone" && !validPhone(v));
        f.classList.toggle("invalid", bad);
        if (bad && ok) { input.focus(); ok = false; }
        else if (bad) ok = false;
      });
      if (!ok) return;

      var data = {
        name: $("#rName").value.trim(),
        phone: $("#rPhone").value.trim(),
        guests: $("#rGuests").value,
        date: $("#rDate").value,
        time: $("#rTime").value,
        note: $("#rNote").value.trim()
      };
      try { localStorage.setItem("ovun_reservation", JSON.stringify(data)); } catch (err) {}

      var msg = "السلام عليكم، أرغب بحجز طاولة في أوفن بيسترو 🌿%0A" +
        "الاسم: " + encodeURIComponent(data.name) + "%0A" +
        "الجوال: " + encodeURIComponent(data.phone) + "%0A" +
        "عدد الضيوف: " + encodeURIComponent(data.guests) + "%0A" +
        "التاريخ: " + encodeURIComponent(data.date) + "%0A" +
        "الوقت: " + encodeURIComponent(data.time) +
        (data.note ? "%0Aملاحظة: " + encodeURIComponent(data.note) : "");

      showToast();
      var url = "https://wa.me/966533615888?text=" + msg;
      setTimeout(function () { window.open(url, "_blank"); }, 700);
      form.reset();
    });
    // clear error on input
    $all(".field input,.field select", form).forEach(function (i) {
      i.addEventListener("input", function () { i.closest(".field").classList.remove("invalid"); });
    });
  }
})();
