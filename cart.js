
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CART CONFIGURATION
  ========================== */

  const CART_STORAGE_KEY = "habiyeCart";

  const products = window.products || [];


  /* =========================
     CART STATE
  ========================== */

  let cart =
    JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY)
    ) || [];


  /* =========================
     CREATE CART MODAL
     IF IT DOES NOT EXIST
  ========================== */

  if (!document.getElementById("cartModal")) {

    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="modal-overlay" id="cartModal">

          <div class="modal">

            <button
              type="button"
              class="modal-close"
              data-close-modal
              aria-label="Close cart"
            >
              ×
            </button>

            <div class="modal-header">
              <h2>Your Cart</h2>
            </div>

            <div
              id="cartItems"
              class="cart-items"
            ></div>

            <div class="cart-footer">

              <strong>
                Total:
                <span id="cartTotal">
                  KSh 0
                </span>
              </strong>

              <div class="cart-actions">

                <button
                  type="button"
                  class="button"
                  id="clearCartButton"
                >
                  Clear Cart
                </button>

                <button
                  type="button"
                  class="button primary-button"
                  id="whatsappButton"
                >
                  Order via WhatsApp
                </button>

              </div>

            </div>

          </div>

        </div>
      `
    );

  }


  /* =========================
     CREATE TOAST
     IF IT DOES NOT EXIST
  ========================== */

  if (!document.getElementById("toast")) {

    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div
          id="toast"
          class="toast"
        ></div>
      `
    );

  }


  /* =========================
     DOM ELEMENTS
  ========================== */

  const cartButton =
    document.getElementById("cartButton");

  const cartCount =
    document.getElementById("cartCount");

  const cartModal =
    document.getElementById("cartModal");

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const clearCartButton =
    document.getElementById("clearCartButton");

  const whatsappButton =
    document.getElementById("whatsappButton");

  const toast =
    document.getElementById("toast");


  /* =========================
     SAVE CART
  ========================== */

  function saveCart() {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );

  }


  /* =========================
     FORMAT CURRENCY
  ========================== */

  function formatCurrency(amount) {

    return new Intl.NumberFormat(
      "en-KE",
      {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
      }
    ).format(amount);

  }


  /* =========================
     UPDATE CART COUNT
  ========================== */

  function updateCartCount() {

    if (!cartCount) {
      return;
    }

    const totalQuantity =
      cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

    cartCount.textContent =
      totalQuantity;

  }


  /* =========================
     SHOW TOAST
  ========================== */

  function showToast(message) {

    if (!toast) {
      return;
    }

    toast.textContent =
      message;

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

  }


  /* =========================
     ADD TO CART
  ========================== */

  function addToCart(
    productId,
    quantity = 1
  ) {

    const product =
      products.find(
        item =>
          item.id === Number(productId)
      );

    if (!product) {

      console.error(
        "Product not found:",
        productId
      );

      return;

    }


    quantity =
      Number(quantity);


    if (
      !Number.isFinite(quantity) ||
      quantity < 1
    ) {

      quantity = 1;

    }


    const existingItem =
      cart.find(
        item =>
          item.id === product.id
      );


    if (existingItem) {

      existingItem.quantity +=
        quantity;

    } else {

      cart.push({
        id: product.id,
        quantity: quantity
      });

    }


    saveCart();

    updateCartCount();

    renderCart();

    showToast(
      `${product.name} added to cart`
    );

  }


  /* =========================
     CHANGE QUANTITY
  ========================== */

  function changeQuantity(
    productId,
    amount
  ) {

    const item =
      cart.find(
        cartItem =>
          cartItem.id ===
          Number(productId)
      );

    if (!item) {
      return;
    }


    item.quantity +=
      Number(amount);


    if (item.quantity <= 0) {

      cart =
        cart.filter(
          cartItem =>
            cartItem.id !==
            Number(productId)
        );

    }


    saveCart();

    updateCartCount();

    renderCart();

  }


  /* =========================
     REMOVE ITEM
  ========================== */

  function removeItem(productId) {

    cart =
      cart.filter(
        item =>
          item.id !==
          Number(productId)
      );


    saveCart();

    updateCartCount();

    renderCart();

  }
/* =========================
   RENDER CART
========================= */

function renderCart() {

  if (!cartItems || !cartTotal) {
    return;
  }

  /* Empty cart */

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">
          🛒
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Add some products to your cart to get started.
        </p>
      </div>
    `;

    cartTotal.textContent =
      formatCurrency(0);

    return;
  }


  let total = 0;


  cartItems.innerHTML =
    cart
      .map(item => {

        const product =
          products.find(
            product =>
              product.id === item.id
          );


        if (!product) {
          return "";
        }


        const itemTotal =
          product.price * item.quantity;


        total += itemTotal;


        return `
          <div
            class="cart-item"
            data-cart-id="${product.id}"
          >

            <!-- PRODUCT IMAGE -->

            <div class="cart-item-image">

              <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
              >

            </div>


            <!-- PRODUCT INFORMATION -->

            <div class="cart-item-info">

              <h3>
                ${product.name}
              </h3>

              <p class="cart-item-unit-price">
                ${formatCurrency(product.price)}
              </p>


              <div class="cart-item-controls">

                <button
                  type="button"
                  class="quantity-button"
                  data-cart-minus="${product.id}"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  type="button"
                  class="quantity-button"
                  data-cart-plus="${product.id}"
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>


              <button
                type="button"
                class="remove-cart-item"
                data-cart-remove="${product.id}"
                aria-label="Remove ${product.name}"
              >
                Remove
              </button>

            </div>


            <!-- ITEM TOTAL -->

            <div class="cart-item-total">

              ${formatCurrency(itemTotal)}

            </div>

          </div>
        `;

      })
      .join("");


  cartTotal.textContent =
    formatCurrency(total);

}


  /* =========================
     OPEN CART
  ========================== */

  function openCart() {

    if (!cartModal) {
      return;
    }

    renderCart();

    cartModal.classList.add("active");

    document.body.classList.add(
      "modal-open"
    );

  }


  /* =========================
     CLOSE CART
  ========================== */

  function closeCart() {

    if (!cartModal) {
      return;
    }

    cartModal.classList.remove(
      "active"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* =========================
     CART BUTTON
  ========================== */

  if (cartButton) {

    cartButton.addEventListener(
      "click",
      openCart
    );

  }


  /* =========================
     CART EVENT DELEGATION
  ========================== */

  if (cartItems) {

    cartItems.addEventListener(
      "click",
      event => {

        const minusButton =
          event.target.closest(
            "[data-cart-minus]"
          );

        const plusButton =
          event.target.closest(
            "[data-cart-plus]"
          );

        const removeButton =
          event.target.closest(
            "[data-cart-remove]"
          );


        if (minusButton) {

          changeQuantity(
            Number(
              minusButton.dataset.cartMinus
            ),
            -1
          );

          return;

        }


        if (plusButton) {

          changeQuantity(
            Number(
              plusButton.dataset.cartPlus
            ),
            1
          );

          return;

        }


        if (removeButton) {

          removeItem(
            Number(
              removeButton.dataset.cartRemove
            )
          );

        }

      }
    );

  }


  /* =========================
     CLOSE CART
  ========================== */

  if (cartModal) {

    cartModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          cartModal
        ) {

          closeCart();

        }


        if (
          event.target.closest(
            "[data-close-modal]"
          )
        ) {

          closeCart();

        }

      }
    );

  }


  /* =========================
     ESCAPE KEY
  ========================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeCart();

      }

    }
  );


  /* =========================
     CLEAR CART
  ========================== */

  if (clearCartButton) {

    clearCartButton.addEventListener(
      "click",
      () => {

        if (cart.length === 0) {
          return;
        }


        cart = [];


        saveCart();

        updateCartCount();

        renderCart();

        showToast(
          "Cart cleared"
        );

      }
    );

  }
/* =========================
   WHATSAPP ORDER
========================== */

if (whatsappButton) {

  whatsappButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "Your cart is empty"
        );

        return;

      }


      let message =
        "Hello Habiye Limited,%0A%0AI would like to place the following order:%0A";


      let total = 0;


      cart.forEach(item => {

        const product =
          products.find(
            product =>
              product.id === item.id
          );


        if (!product) {
          return;
        }


        const itemTotal =
          product.price *
          item.quantity;


        total += itemTotal;


        message +=
          `%0A• ${product.name} x ${item.quantity} = ${formatCurrency(itemTotal)}`;

      });


      message +=
        `%0A%0ATotal Order Value: ${formatCurrency(total)}%0A%0APlease confirm availability and delivery details.Thank you.`;



      /*
        HABIYE WHATSAPP NUMBER
      */

      const whatsappNumber =
        "254742087648";


      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


  /* =========================
     INITIAL CART SETUP
  ========================== */

  updateCartCount();

  renderCart();


  /* =========================
     PUBLIC CART API
  ========================== */

  window.HabiyeCart = {

    addToCart,

    changeQuantity,

    removeItem,

    renderCart,

    openCart,

    closeCart,

    updateCartCount,

    showToast,

    getCart: () => cart

  };

});

