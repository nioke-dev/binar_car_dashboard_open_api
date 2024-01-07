"use strict";

// Element Toggle Function

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }


// navbar variables
const navbar = document.querySelector("[data-nav]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

    navElemArr[i].addEventListener("click", function() {
        elemToggleFunc(navbar);
        elemToggleFunc(overlay);
        elemToggleFunc(document.body);
    })

}


// Change from "container" to "container-fluid" in min-width 1200px

const heroSectionElement = document.getElementById('hero-section');

function updateContainerClass() {
  if (window.innerWidth >= 1150) {
    heroSectionElement.classList.add('container-fluid');
    heroSectionElement.classList.remove('container');
  } else {
    heroSectionElement.classList.remove('container-fluid');
    heroSectionElement.classList.add('container');
  }
}

updateContainerClass();

window.addEventListener('resize', updateContainerClass);