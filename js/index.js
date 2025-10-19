import { giveCartButtonFunction } from "./cart.js";

import {
  syncAriaWithViewport,
  displayProductImage,
  givePreviousNextButtonsFunction,
  loadProductThumbnailButtons,
} from "./image-display.js";

function giveCloseNavButtonFunction(button) {
  button.addEventListener("click", () => {
    const regionNav = document.querySelector(".navigation-bar");
    const buttonNavMenu = document.querySelector(".navigation-menu-button");

    regionNav.remove();
    buttonNavMenu.setAttribute("aria-expanded", false);

    const pageHeader = document.querySelector("header");
    const pageMain = document.querySelector("main");
    const pageFooter = document.querySelector("footer");

    pageHeader.inert = false;
    pageMain.inert = false;
    pageFooter.inert = false;
  });
}

// giveCloseNavButtonFunction();

function giveNavButtonFunction() {
  const elementBody = document.querySelector("body");
  const pageHeader = elementBody.querySelector("header");

  const buttonNavMenu = elementBody.querySelector(".navigation-menu-button");
  buttonNavMenu.addEventListener("click", () => {
    const elementNav = document.createElement("nav");
    elementNav.classList.add("navigation-bar");

    const divLightboxUnfocus = document.createElement("div");
    divLightboxUnfocus.classList.add("light-box-unfocus");

    const divLightboxFocus = document.createElement("div");
    divLightboxFocus.classList.add("light-box-focus");

    const buttonCloseNav = document.createElement("div");
    buttonCloseNav.classList.add("close-nav-button");
    buttonCloseNav.innerHTML = '<img src="./images/icon-close.svg" alt="" />';
    giveCloseNavButtonFunction(buttonCloseNav);

    const listNav = document.createElement("ul");
    listNav.innerHTML = `
      <li>
        <a href="#" aria-label="click to see collections page"
          >Collections</a
        >
      </li>
      <li>
        <a
          href="#"
          aria-label="redirects to page focused on men's products"
          >Men</a
        >
      </li>
      <li>
        <a
          href="#"
          aria-label="redirects to page focused on women's products"
          >Women</a
        >
      </li>
      <li>
        <a href="#" aria-label="redirects to company information page"
          >About</a
        >
      </li>
      <li>
        <a href="#" aria-label="redirects to site contact information"
          >Contact</a
        >
      </li>    
    `;

    elementNav.appendChild(divLightboxUnfocus);
    divLightboxUnfocus.appendChild(divLightboxFocus);
    divLightboxFocus.appendChild(buttonCloseNav);
    divLightboxFocus.appendChild(listNav);

    elementBody.insertBefore(elementNav, pageHeader);

    const buttonNavMenu = elementBody.querySelector(".navigation-menu-button");
    buttonNavMenu.setAttribute("aria-expanded", "true");

    const pageMain = document.querySelector("main");
    const pageFooter = document.querySelector("footer");

    pageHeader.inert = true;
    pageMain.inert = true;
    pageFooter.inert = true;
  });
}

giveNavButtonFunction();
