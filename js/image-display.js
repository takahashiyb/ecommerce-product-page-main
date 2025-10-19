import { cartList } from "./cart.js";

function syncAriaWithViewport() {
  const imageProduct = document.querySelector(".product-image");
  const indexImage = imageProduct.dataset.imageIndex;

  const isDesktop = window.matchMedia("(min-width: 1023px)").matches;

  const buttonPrevious = document.querySelector(".previous-button");
  const buttonNext = document.querySelector(".next-button");
  const buttons = [buttonPrevious, buttonNext];

  const containerThumbnail = document.querySelector(
    ".product-thumbnail-container"
  );

  if (isDesktop) {
    for (let i = 0; i < 2; i++) {
      buttons[i].setAttribute("inert", "");
      buttons[i].setAttribute("hidden", "");
    }

    containerThumbnail.removeAttribute("inert");
    containerThumbnail.removeAttribute("hidden");
  } else {
    for (let i = 0; i < 2; i++) {
      buttons[i].removeAttribute("inert");
      buttons[i].removeAttribute("hidden");
    }

    containerThumbnail.setAttribute("inert", "");
    containerThumbnail.setAttribute("hidden", "");
  }
}

window.addEventListener("resize", syncAriaWithViewport);
window.addEventListener("DOMContentLoaded", syncAriaWithViewport);

// aria :

// selected or current for the display.

// {
/* <div role="region" aria-roledescription="carousel" aria-label="Featured Products">
  <div class="slide" aria-hidden="false" aria-current="true">...</div>
  <div class="slide" aria-hidden="true">...</div>
  <button role="button" aria-label="Next slide">Next</button>
  <div role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="5"></div>
</div> */
// }

function displayProductImage() {
  const params = new URLSearchParams(window.location.search);

  const product = cartList.find((item) => item.serial === params.get("serial"));

  const elementProductImage = document.querySelector(".product-image");

  const imageIndex = elementProductImage.dataset.imageIndex;

  elementProductImage.src = `${product.pictures[imageIndex].large}`;
  elementProductImage.alt = `${product.pictures[imageIndex]["large alt"]}`;
}

displayProductImage();

function givePreviousNextButtonsFunction() {
  const containerProductImage = document.querySelector(
    ".product-image-container"
  );
  const buttonPrevious =
    containerProductImage.querySelector(".previous-button");
  buttonPrevious.addEventListener("click", () => {
    const imageProduct = containerProductImage.querySelector(".product-image");
    const indexImage = imageProduct.dataset.imageIndex;

    const params = new URLSearchParams(window.location.search);

    const product = cartList.find(
      (item) => item.serial === params.get("serial")
    );

    const newIndex =
      indexImage === "0" ? product["pictures"].length - 1 : indexImage - 1;

    imageProduct.dataset.imageIndex = newIndex;
    imageProduct.src = product["pictures"][newIndex]["large"];
    imageProduct.alt = product["pictures"][newIndex]["large alt"];
  });

  const buttonNext = containerProductImage.querySelector(".next-button");
  buttonNext.addEventListener("click", () => {
    const imageProduct = containerProductImage.querySelector(".product-image");
    const indexImage = imageProduct.dataset.imageIndex;

    const params = new URLSearchParams(window.location.search);

    const product = cartList.find(
      (item) => item.serial === params.get("serial")
    );

    const newIndex =
      parseFloat(indexImage) === product["pictures"].length - 1
        ? 0
        : parseFloat(indexImage) + 1;

    imageProduct.dataset.imageIndex = newIndex;
    imageProduct.src = product["pictures"][newIndex]["large"];
    imageProduct.alt = product["pictures"][newIndex]["large alt"];
  });
}

givePreviousNextButtonsFunction();

function loadProductThumbnailButtons() {
  const params = new URLSearchParams(window.location.search);

  const product = cartList.find((item) => item.serial === params.get("serial"));

  const thumbnailContainer = document.querySelector(
    ".product-thumbnail-container"
  );

  for (let i = 0; i < product["pictures"].length; i++) {
    const button = document.createElement("button");

    button.innerHTML = `
    <img src="${product["pictures"][i]["thumbnail"]}"
    alt="${product["pictures"][i]["thumbnail alt"]}">
    `;

    button.dataset.thumbnailNumber = i;

    button.addEventListener("mouseenter", () => {
      const image = document.querySelector(".product-image");

      image.src = product["pictures"][i]["large"];
      image.alt = product["pictures"][i]["large alt"];
    });

    button.addEventListener("click", () => {
      giveProductThumbnailButtonsFunction();
    });

    thumbnailContainer.append(button);
  }
}

loadProductThumbnailButtons();

function giveProductThumbnailButtonsFunction() {
  const elementBody = document.querySelector("body");
  const pageHeader = elementBody.querySelector("header");

  const elementDiv = document.createElement("div");

  const divLightboxUnfocus = document.createElement("div");
  divLightboxUnfocus.classList.add("light-box-unfocus");

  const divLightboxFocus = document.createElement("div");
  divLightboxFocus.classList.add("light-box-focus");

  elementDiv.appendChild(divLightboxUnfocus);
  divLightboxUnfocus.appendChild(divLightboxFocus);

  elementBody.insertBefore(divLightboxUnfocus, pageHeader);
}
