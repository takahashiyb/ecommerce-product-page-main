import { cartList } from "./cart.js";

const elementCart = document.getElementById("cart-link");

elementCart.addEventListener("click", () => {
  const elementBody = document.querySelector("body");

  const elementPopup = document.createElement("div");
  elementPopup.classList.add("popup-cart");
  elementPopup.setAttribute("role", "region");
  elementPopup.setAttribute("aria-expanded", "true");

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
          <button>
            <img src="./images/icon-delete.svg" alt="delete icon" />
          </button>
      `;
      cartListWrapper.append(elementCartItem);
    }

    const elementButtonCheckout = document.createElement("button");
    elementButtonCheckout.classList.add("popup-button-checkout");
    elementButtonCheckout.innerHTML = "Checkout";

    cartListWrapper.append(elementButtonCheckout);

    // cartListWrapper;
  }

  elementPopup.append(cartListWrapper);

  elementBody.insertBefore(elementPopup, elementMain);
});
