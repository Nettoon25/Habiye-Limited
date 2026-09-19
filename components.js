document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HEADER
  ========================== */

  const headerContainer = document.getElementById("site-header");

  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="top-bar">
        <div class="container top-bar-content">
          <span>📍 Nairobi, Kenya</span>
          <span>📞 +254 7946-00610</span>
          <span>📞 +254 0722222615</span>
          <span>🚚 Delivery available</span>
        </div>
      </div>

      <header class="navbar">
        <div class="container nav-container">

          <a href="index.html" class="logo">
            HABIYE
            <span>LIMITED</span>
          </a>

          <nav class="nav-menu" id="navMenu">
            <a href="index.html">Home</a>
            <a href="index.html#categories">Categories</a>
            <a href="index.html#products">Products</a>
            <a href="index.html#about">About Us</a>
            <a href="index.html#contact">Contact</a>
          </nav>

          <div class="nav-actions">

            <button
              class="cart-button"
              id="cartButton"
              type="button"
              aria-label="Open shopping cart"
            >
              🛒
              <span id="cartCount">0</span>
            </button>

            <button
              class="menu-button"
              id="menuButton"
              type="button"
              aria-label="Open navigation menu"
            >
              ☰
            </button>

          </div>

        </div>
      </header>
    `;
  }


  /* =========================
     FOOTER
  ========================== */

  const footerContainer = document.getElementById("site-footer");

  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="footer">

        <div class="container footer-grid">

          <div class="footer-company">

            <div class="logo footer-logo">
              HABIYE
              <span>LIMITED</span>
            </div>

            <p>
              Electronics and technology for modern living.
            </p>

            <p>
              Nairobi, Kenya.
            </p>

          </div>


          <div>

            <h3>Company</h3>

            <ul>
              <li>
                <a href="index.html#about">
                  About Us
                </a>
              </li>

              <li>
                <a href="index.html#products">
                  Products
                </a>
              </li>

              <li>
                <a href="index.html#contact">
                  Contact
                </a>
              </li>
            </ul>

          </div>


          <div>

            <h3>Categories</h3>

            <ul>

              <li>
                <a href="index.html#products">
                  Smartphones
                </a>
              </li>

              <li>
                <a href="index.html#products">
                  Laptops
                </a>
              </li>

              <li>
                <a href="index.html#products">
                  Audio
                </a>
              </li>

              <li>
                <a href="index.html#products">
                  Accessories
                </a>
              </li>

            </ul>

          </div>


          <div>

            <h3>Contact</h3>

            <ul>

              <li>
                +254 7946-00610
              </li>

              <li>
                +254 0722222615
              </li>

              <li>
                info@habiye.co.ke
              </li>

              <li>
                Nairobi, Kenya
              </li>

            </ul>

          </div>

        </div>


        <div class="container footer-bottom">

          <span>
            © 2026 Habiye Limited. All rights reserved.
          </span>

          <div>

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>

        </div>

      </footer>
    `;
  }

});