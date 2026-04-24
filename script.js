// ================= NAVBAR =================
const navbarNav = document.querySelector(".navbar-nav");

document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  if (!e.target.closest(".navbar")) {
    navbarNav.classList.remove("active");
  }
});

// ================= SEARCH =================
const searchBox = document.getElementById("search-box");
const menuCards = document.querySelectorAll(".menu-card");

searchBox.addEventListener("keyup", () => {
  const keyword = searchBox.value.toLowerCase();

  menuCards.forEach((card) => {
    const title = card
      .querySelector(".menu-card-tittle")
      .innerText.toLowerCase();
    card.style.display = title.includes(keyword) ? "block" : "none";
  });
});

// ================= CART =================
let cart = [];

const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// tambah item
document.querySelectorAll(".btn-order").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const title = card.querySelector(".menu-card-tittle").innerText;
    const priceText = card.querySelector(".menu-card-price").innerText;

    const price = parseInt(priceText.replace(/[^0-9]/g, ""));

    cart.push({ title, price });
    updateCart();
  });
});

// update cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <p>
        ${item.title} - IDR ${item.price}
        <button onclick="removeItem(${index})">❌</button>
      </p>
    `;
  });

  totalPriceEl.innerText = "IDR " + total;
}

// hapus item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// checkout WA
document.getElementById("checkout-btn").onclick = () => {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let message = "Halo, saya ingin pesan:\n";

  cart.forEach((item) => {
    message += `- ${item.title} (IDR ${item.price})\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `Total: IDR ${total}`;

  const phone = "6285721793607"; // GANTI NOMOR
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

// buka cart
document.getElementById("shopping-cart").onclick = () => {
  cartSidebar.classList.toggle("active");
  // close dengan tombol X
  const closeCart = document.getElementById("close-cart");

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });
};
