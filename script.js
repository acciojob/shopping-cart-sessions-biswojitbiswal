// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);

	  const addCartBtn = li.querySelector(".add-to-cart-btn");
    addCartBtn.addEventListener("click", function() {
      // alert("clicked");
      const productId = this.getAttribute("data-id");
      console.log(productId);
      addToCart(productId);
      
    });
  });
}

// Render cart list
function renderCart() {
	cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-cart-btn" data-id="${item.id}">Remove From Cart</button>`

    cartList.appendChild(li);

    const removeBtn = li.querySelector(".remove-cart-btn");
    removeBtn.addEventListener("click", function() {
      const productId = this.getAttribute("data-id");
      removeFromCart(productId);
    })
  })
}

// Add item to cart
function addToCart(productId) {
	productId = parseInt(productId, 10);
  const product = products.find((item) => item.id === productId);
  
  if(product){
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
	productId = parseInt(productId, 10);

  cart = cart.filter((item) => item.id !== productId)
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
	cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

document.getElementById("clear-cart-btn").addEventListener("click", () => {
  clearCart();
})

// Initial render
renderProducts();
renderCart();
