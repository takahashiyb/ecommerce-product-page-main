export const cartList = [
  {
    name: "Fall Limited Edition Sneakers",
    serial: "09090aa090",
    pictures: [
      {
        large: "./images/image-product-1.jpg",
        "large alt": "product image one",
        thumbnail: "./images/image-product-1-thumbnail.jpg",
        "thumbnail alt": "product thumbnail one",
      },
      {
        large: "./images/image-product-2.jpg",
        "large alt": "product image two",
        thumbnail: "./images/image-product-2-thumbnail.jpg",
        "thumbnail alt": "product thumbnail two",
      },

      {
        large: "./images/image-product-3.jpg",
        "large alt": "product image three",
        thumbnail: "./images/image-product-3-thumbnail.jpg",
        "thumbnail alt": "product thumbnail three",
      },

      {
        large: "./images/image-product-4.jpg",
        "large alt": "product image four",
        thumbnail: "./images/image-product-4-thumbnail.jpg",
        "thumbnail alt": "product thumbnail four",
      },
    ],
    "actual price": 125,
    quantity: 3,
  },
];

export function giveCartButtonFunction() {
  const elementCart = document.getElementById("cart-link");

  elementCart.addEventListener("click", () => {
    if (elementCart.getAttribute("aria-expanded") === "false") {
      openCheckoutPopup();
    } else {
      closeCheckoutPopup();
    }
  });
}

function openCheckoutPopup() {
  const elementBody = document.querySelector("body");

  const elementCart = document.getElementById("cart-link");

  elementCart.setAttribute("aria-expanded", "true");

  const elementPopup = document.createElement("div");
  elementPopup.classList.add("popup-cart");
  elementPopup.setAttribute("role", "region");

  const elementMain = elementBody.querySelector("main");

  // Cart Title
  const cartHeader = document.createElement("p");
  cartHeader.classList.add("popup-cart-title");
  cartHeader.innerHTML = `Cart`;
  elementPopup.append(cartHeader);

  const cartListWrapper = document.createElement("div");
  cartListWrapper.classList.add("cart-item-list-wrapper");

  // When empty
  if (cartList.length === 0) {
    const cartEmptyWrapper = document.createElement("p");
    cartEmptyWrapper.classList.add("popup-cart-empty-text");
    cartEmptyWrapper.innerHTML = "Your cart is empty.";

    cartListWrapper.classList.add("popup-cart-empty");

    cartListWrapper.append(cartEmptyWrapper);
  }

  if (cartList.length !== 0) {
    for (let i = 0; i < cartList.length; i++) {
      const cartItem = cartList[i];

      const elementCartItem = document.createElement("div");
      elementCartItem.id = cartItem["serial"];
      elementCartItem.classList.add("cart-item-wrapper");
      elementCartItem.innerHTML = `
          <img
            class="cart-item-image"
            src="${cartItem["pictures"][0]["thumbnail"]}"
            alt="product image"
          />
          <div>
            <p>${cartItem["name"]}</p>
            <p>$${cartItem["actual price"].toFixed(2)} x ${
        cartItem["quantity"]
      } <strong>$${(cartItem["actual price"] * cartItem["quantity"]).toFixed(
        2
      )}</strong></p>
          </div>
          <button aria-label="removes item from the cart">
            <img src="./images/icon-delete.svg" alt="delete icon" />
          </button>
      `;
      cartListWrapper.append(elementCartItem);
    }
  }

  elementPopup.append(cartListWrapper);

  if (cartList.length !== 0) {
    const elementLinkCheckout = document.createElement("a");
    elementLinkCheckout.classList.add("popup-link-checkout");
    elementLinkCheckout.innerHTML = "Checkout";
    elementLinkCheckout.href = "#";
    elementLinkCheckout.setAttribute("aria-label", "leads to checkout page");

    elementPopup.append(elementLinkCheckout);
  }

  elementBody.insertBefore(elementPopup, elementMain);
}

function closeCheckoutPopup() {
  const elementCart = document.getElementById("cart-link");
  const elementPopup = document.querySelector(".popup-cart");
  elementPopup.remove();
  elementCart.setAttribute("aria-expanded", "false");
}

// giveCartButtonFunction();
