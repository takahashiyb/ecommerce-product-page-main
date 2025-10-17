import { cartList } from "./cart.js";

const elementCart = document.getElementById("cart-link");

elementCart.addEventListener("click", () => {
  if (elementCart.getAttribute("aria-expanded") === "false") {
    openCheckoutPopup();
  } else {
    const elementBody = document.querySelector("body");
    const elementPopup = document.querySelector(".popup-cart");
    elementBody.removeChild(elementPopup);
    elementCart.setAttribute("aria-expanded", "false");
  }
});

function openCheckoutPopup() {
  const elementBody = document.querySelector("body");

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
    cartEmptyWrapper.classList.add("popup-cart-empty");
    cartEmptyWrapper.innerHTML = "Your cart is empty.";

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
            src="${cartItem["image src"]}"
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

    const elementLinkCheckout = document.createElement("a");
    elementLinkCheckout.classList.add("popup-link-checkout");
    elementLinkCheckout.innerHTML = "Checkout";
    elementLinkCheckout.href = "#";
    elementLinkCheckout.setAttribute("aria-label", "leads to checkout page");

    cartListWrapper.append(elementLinkCheckout);
  }

  elementPopup.append(cartListWrapper);

  elementBody.insertBefore(elementPopup, elementMain);
}
