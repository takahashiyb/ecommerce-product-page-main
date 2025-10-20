import { cartList } from "./cart.js";

export function syncAriaWithViewport() {
  const isDesktop = window.matchMedia("(min-width: 1023px)").matches;

  const navButton = document.querySelector(".navigation-menu-button");

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

    navButton.setAttribute("inert", "");
    navButton.setAttribute("hidden", "");

    containerThumbnail.removeAttribute("inert");
    containerThumbnail.removeAttribute("hidden");
  } else {
    for (let i = 0; i < 2; i++) {
      buttons[i].removeAttribute("inert");
      buttons[i].removeAttribute("hidden");
    }

    navButton.removeAttribute("inert");
    navButton.removeAttribute("hidden");

    containerThumbnail.setAttribute("inert", "");
    containerThumbnail.setAttribute("hidden", "");
  }
}

window.addEventListener("resize", syncAriaWithViewport);
window.addEventListener("DOMContentLoaded", syncAriaWithViewport);

export function displayProductImage(section) {
  const params = new URLSearchParams(window.location.search);
  const product = cartList.find((item) => item.serial === params.get("serial"));

  const elementProductImage = section.querySelector(".product-image");

  const imageIndex = elementProductImage.dataset.imageIndex;

  elementProductImage.src = `${product.pictures[imageIndex].large}`;
  elementProductImage.alt = `${product.pictures[imageIndex]["large alt"]}`;
}

export function givePreviousNextButtonsFunction(section) {
  const containerProductImage = section.querySelector(
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
    containerProductImage.setAttribute(
      "aria-label",
      `image ${indexImage} out of ${product["pictures"].length}`
    );
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
    containerProductImage.setAttribute(
      "aria-label",
      `image ${indexImage} out of ${product["pictures"].length}`
    );
  });
}

export function loadProductThumbnailButtons(section, lightbox = false) {
  const params = new URLSearchParams(window.location.search);

  const product = cartList.find((item) => item.serial === params.get("serial"));

  const thumbnailContainer = section.querySelector(
    ".product-thumbnail-container"
  );

  for (let i = 0; i < product["pictures"].length; i++) {
    const button = document.createElement("button");
    button.classList.add("button-thumbnail");
    button.setAttribute(
      "aria-label",
      `thumbnail ${i + 1} out of ${product["pictures"].length}`
    );

    if (i === 0) {
      button.setAttribute("aria-selected", "true");
    } else {
      button.setAttribute("aria-selected", "false");
    }

    button.innerHTML = `
    <img src="${product["pictures"][i]["thumbnail"]}"
    alt="${product["pictures"][i]["thumbnail alt"]}">
    `;

    button.dataset.thumbnailNumber = i;

    const imageContainer = section.querySelector(".product-image-container");

    if (!lightbox) {
      button.addEventListener("mouseenter", () => {
        const image = section.querySelector(".product-image");

        const siblings =
          button.parentElement.querySelectorAll(".button-thumbnail");

        siblings.forEach((item) => item.setAttribute("aria-selected", "false"));

        button.setAttribute("aria-selected", "true");

        image.src = product["pictures"][i]["large"];
        image.alt = product["pictures"][i]["large alt"];
        imageContainer.setAttribute(
          "aria-label",
          `image ${i + 1} out of ${product["pictures"].length}`
        );
      });

      button.addEventListener("click", () => {
        giveProductThumbnailButtonsFunction(i);
      });
    } else {
      button.addEventListener("click", () => {
        const image = section.querySelector(".product-image");

        const siblings =
          button.parentElement.querySelectorAll(".button-thumbnail");

        siblings.forEach((item) => item.setAttribute("aria-selected", "false"));

        button.setAttribute("aria-selected", "true");

        image.src = product["pictures"][i]["large"];
        image.alt = product["pictures"][i]["large alt"];
        imageContainer.setAttribute(
          "aria-label",
          `image ${i + 1} out of ${product["pictures"].length}`
        );
      });
    }

    thumbnailContainer.append(button);
  }
}

export function giveProductThumbnailButtonsFunction(index) {
  const elementBody = document.querySelector("body");
  const pageHeader = elementBody.querySelector("header");
  const pageMain = elementBody.querySelector("main");
  const pageFooter = elementBody.querySelector("footer");

  const divLightboxUnfocus = document.createElement("div");
  divLightboxUnfocus.classList.add("light-box-unfocus");

  const divLightboxFocus = document.createElement("div");
  divLightboxFocus.classList.add("light-box-focus");

  const productImageSection = document.createElement("div");
  productImageSection.classList.add("product-image-section");

  const productImageContainer = document.createElement("div");
  productImageContainer.classList.add("product-image-container");

  const buttonCloseLightbox = document.createElement("button");
  buttonCloseLightbox.classList.add("button-close-lightbox");
  buttonCloseLightbox.innerHTML =
    '<img src="./images/icon-close.svg" alt="previous button icon" />';

  buttonCloseLightbox.addEventListener("click", () => {
    divLightboxUnfocus.remove();

    pageHeader.removeAttribute("inert");
    pageMain.removeAttribute("inert");
    pageFooter.removeAttribute("inert");
  });

  const productImage = document.createElement("img");
  productImage.classList.add("product-image");
  productImage.dataset.imageIndex = index;

  const buttonPrevious = document.createElement("button");
  buttonPrevious.setAttribute("aria-label", "previous image");
  buttonPrevious.classList.add("previous-button");
  buttonPrevious.innerHTML =
    '<img src="./images/icon-previous.svg" alt="previous button icon" />';

  const buttonNext = document.createElement("button");
  buttonNext.setAttribute("aria-label", "next image");
  buttonNext.classList.add("next-button");
  buttonNext.innerHTML =
    '<img src="./images/icon-next.svg" alt="next button icon" />';

  const productThumbnailContainer = document.createElement("div");
  productThumbnailContainer.classList.add("product-thumbnail-container");

  productImageContainer.appendChild(productImage);
  productImageContainer.appendChild(buttonPrevious);
  productImageContainer.appendChild(buttonNext);
  productImageSection.appendChild(buttonCloseLightbox);
  productImageSection.appendChild(productImageContainer);
  productImageSection.appendChild(productThumbnailContainer);
  divLightboxFocus.appendChild(productImageSection);
  divLightboxUnfocus.appendChild(divLightboxFocus);

  displayProductImage(productImageSection);
  loadProductThumbnailButtons(productImageSection, true);
  givePreviousNextButtonsFunction(productImageSection);

  elementBody.insertBefore(divLightboxUnfocus, pageHeader);

  pageHeader.setAttribute("inert", "");
  pageMain.setAttribute("inert", "");
  pageFooter.setAttribute("inert", "");
}

displayProductImage(document.querySelector(".product-image-section"));
givePreviousNextButtonsFunction(
  document.querySelector(".product-image-section")
);
loadProductThumbnailButtons(document.querySelector(".product-image-section"));
