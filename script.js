
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRODUCTS
  ========================== */

const products =
  window.products || [];

const homepageProducts =
  products.filter(
    product =>
      product.showOnHomepage === true
  );

  /* =========================
     DOM ELEMENTS
  ========================== */

  const productGrid =
    document.getElementById(
      "productGrid"
    );

  const searchInput =
    document.getElementById(
      "searchInput"
    );

  const categoryFilter =
    document.getElementById(
      "categoryFilter"
    );

  const productModal =
    document.getElementById(
      "productModal"
    );

  const productModalContent =
    document.getElementById(
      "productModalContent"
    );

  const contactForm =
    document.getElementById(
      "contactForm"
    );


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
     RENDER PRODUCTS
  ========================== */

  function renderProducts(
    productList = products
  ) {

    if (!productGrid) {
      return;
    }


    if (productList.length === 0) {

      productGrid.innerHTML = `
        <p class="no-products">
          No products found.
        </p>
      `;

      return;

    }


    productGrid.innerHTML =
      productList
        .map(product => {

          return `
            <article
              class="product-card"
              data-product-id="${product.id}"
            >

              <div class="product-image-wrapper">

                <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="product-image"
                >

                ${
                  product.tag
                    ? `
                      <span class="product-tag">
                        ${product.tag}
                      </span>
                    `
                    : ""
                }

              </div>


              <div class="product-card-content">

                <span class="product-category">
                  ${product.category}
                </span>

                <h3>
                  ${product.name}
                </h3>

                <p class="product-description">
                  ${product.description}
                </p>


                <div class="product-rating">
                  ⭐ ${product.rating}
                </div>


                <div class="product-card-bottom">

                  <strong class="product-price">
                    ${formatCurrency(
                      product.price
                    )}
                  </strong>


                  <div class="product-actions">

                    <button
                      type="button"
                      class="button"
                      data-view-product="${product.id}"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      class="button primary-button"
                      data-add-cart="${product.id}"
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            </article>
          `;

        })
        .join("");

  }


  /* =========================
     OPEN PRODUCT MODAL
  ========================== */

  function openProductModal(
    productId
  ) {

    if (
      !productModal ||
      !productModalContent
    ) {

      return;

    }


    const product =
      products.find(
        item =>
          item.id ===
          Number(productId)
      );


    if (!product) {
      return;
    }


    productModalContent.innerHTML = `

      <button
        type="button"
        class="modal-close"
        id="closeProductModal"
        aria-label="Close product details"
      >
        ×
      </button>


      <div class="product-modal-layout">

        <div class="product-modal-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

        </div>


        <div class="product-modal-info">

          <span class="product-category">
            ${product.category}
          </span>

          <h2>
            ${product.name}
          </h2>

          <div class="product-rating">
            ⭐ ${product.rating}
          </div>

          <p>
            ${product.details}
          </p>

          <strong class="product-price">
            ${formatCurrency(
              product.price
            )}
          </strong>


          <button
            type="button"
            class="button primary-button"
            data-modal-add="${product.id}"
          >
            Add to Cart
          </button>

        </div>

      </div>

    `;


    productModal.classList.add(
      "active"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  /* =========================
     CLOSE PRODUCT MODAL
  ========================== */

  function closeProductModal() {

    if (!productModal) {
      return;
    }


    productModal.classList.remove(
      "active"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* =========================
     PRODUCT GRID EVENTS
  ========================== */

  if (productGrid) {

    productGrid.addEventListener(
      "click",
      event => {

        const viewButton =
          event.target.closest(
            "[data-view-product]"
          );

        const addButton =
          event.target.closest(
            "[data-add-cart]"
          );


        /* =========================
           VIEW PRODUCT
        ========================== */

        if (viewButton) {

          const productId =
            Number(
              viewButton.dataset
                .viewProduct
            );


          window.location.href =
            `index2.html?id=${productId}`;


          return;

        }


        /* =========================
           ADD TO CART
        ========================== */

        if (addButton) {

          const productId =
            Number(
              addButton.dataset
                .addCart
            );


          if (
            window.HabiyeCart &&
            typeof HabiyeCart.addToCart ===
              "function"
          ) {

            HabiyeCart.addToCart(
              productId
            );

          }

        }

      }
    );

  }


  /* =========================
     PRODUCT MODAL EVENTS
  ========================== */

  if (productModal) {

    productModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          productModal
        ) {

          closeProductModal();

          return;

        }


        if (
          event.target.closest(
            "#closeProductModal"
          )
        ) {

          closeProductModal();

          return;

        }


        const modalAddButton =
          event.target.closest(
            "[data-modal-add]"
          );


        if (modalAddButton) {

          const productId =
            Number(
              modalAddButton.dataset
                .modalAdd
            );


          if (
            window.HabiyeCart &&
            typeof HabiyeCart.addToCart ===
              "function"
          ) {

            HabiyeCart.addToCart(
              productId
            );

          }

        }

      }
    );

  }


  /* =========================
     SEARCH + CATEGORY FILTER
  ========================== */

  function filterProducts() {

    const searchTerm =
      searchInput
        ? searchInput.value
            .trim()
            .toLowerCase()
        : "";


    const selectedCategory =
      categoryFilter
        ? categoryFilter.value
        : "";


    const filteredProducts =
      products.filter(product => {

        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(searchTerm) ||

          product.description
            .toLowerCase()
            .includes(searchTerm) ||

          product.category
            .toLowerCase()
            .includes(searchTerm);


        const matchesCategory =
          !selectedCategory ||
          product.category ===
            selectedCategory;


        return (
          matchesSearch &&
          matchesCategory
        );

      });


    renderProducts(
      filteredProducts
    );

  }


  /* =========================
     SEARCH EVENT
  ========================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterProducts
    );

  }


  /* =========================
     CATEGORY FILTER EVENT
  ========================== */

  if (categoryFilter) {

    categoryFilter.addEventListener(
      "change",
      filterProducts
    );

  }


  /* =========================
     CATEGORY BUTTONS
  ========================== */

  const categoryButtons =
    document.querySelectorAll(
      "[data-category]"
    );


  categoryButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const category =
            button.dataset.category;


          if (categoryFilter) {

            categoryFilter.value =
              category;

          }


          filterProducts();


          const productsSection =
            document.getElementById(
              "products"
            );


          if (productsSection) {

            productsSection.scrollIntoView({
              behavior: "smooth"
            });

          }

        }
      );

    }
  );


  /* =========================
     ESCAPE KEY
  ========================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeProductModal();

      }

    }
  );


  /* =========================
     CONTACT FORM
  ========================== */

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (
          window.HabiyeCart &&
          typeof HabiyeCart.showToast ===
            "function"
        ) {

          HabiyeCart.showToast(
            "Thank you! Your message has been received."
          );

        }


        contactForm.reset();

      }
    );

  }


  /* =========================
     MOBILE NAVIGATION
  ========================== */

  const menuButton =
    document.getElementById(
      "menuButton"
    );

  const navMenu =
    document.getElementById(
      "navMenu"
    );


  if (
    menuButton &&
    navMenu
  ) {

    menuButton.addEventListener(
      "click",
      () => {

        navMenu.classList.toggle(
          "active"
        );

      }
    );


    navMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navMenu.classList.remove(
              "active"
            );

          }
        );

      });

  }


  /* =========================
     INITIAL RENDER
  ========================== */

renderProducts(
  homepageProducts
);

});

