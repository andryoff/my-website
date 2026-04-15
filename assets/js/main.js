(function() {
  "use strict";

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


/**
   * Nav click and scroll to section with active state
   */
const navLinks = document.querySelectorAll(".navmenu a");

// CLICK 
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// SCROLL 
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let current = "";

  sections.forEach(section => {
    let sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);


  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

/** Contact Form */

emailjs.init("wLIGC7NiZfG20CFwr");

const form = document.getElementById("contact-form");
const loading = document.querySelector(".loading");
const errorMsg = document.querySelector(".error-message");
const sentMsg = document.querySelector(".sent-message");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // impedisce il reload

  errorMsg.style.display = "none";
  sentMsg.style.display = "none";

  const captcha = grecaptcha.getResponse();

  if (!captcha) {
    errorMsg.style.display = "block";
    errorMsg.innerText = "Please verify that you are not a robot.";
    return;
  }

  loading.style.display = "block";

  emailjs.sendForm(
    "service_739clpi",
    "template_contact",
    form
  )
  .then(() => {
    loading.style.display = "none";
    sentMsg.style.display = "block";
    form.reset();
    grecaptcha.reset();
  })
  .catch(() => {
    loading.style.display = "none";
    errorMsg.style.display = "block";
    errorMsg.innerText = "Error sending message.";
  });
});

})();