document.addEventListener("DOMContentLoaded", () => {
    const cartBtns = document.querySelectorAll(".cart-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add to Cart
    cartBtns.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));

            if (isNaN(price)) {
                console.error('Invalid price:', this.getAttribute("data-price"));
                return; // Prevent adding items with invalid price
            }

            let item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
    let cartItems = []; // Your cart logic here
    if(cartItems.length === 0) {
        alert("Your cart is empty!");
    } else {
        // Proceed to checkout
    }
    

    // Display Cart on Cart Page
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (cartItemsContainer) {
        function displayCart() {
            cartItemsContainer.innerHTML = "";
            let totalPrice = 0;

            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;

                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price}/-</td>
                    <td>
                        <button class="decrease" data-index="${index}">-</button>
                        ${item.quantity}
                        <button class="increase" data-index="${index}">+</button>
                    </td>
                    <td>${itemTotal}/-</td>
                    <td><button class="remove" data-index="${index}">X</button></td>
                `;
                cartItemsContainer.appendChild(row);
            });

            totalPriceElement.innerText = `${totalPrice}/-`;
        }

        displayCart();

        // Increase/Decrease Quantity
        cartItemsContainer.addEventListener("click", function (e) {
            let index = e.target.getAttribute("data-index");

            if (e.target.classList.contains("increase")) {
                cart[index].quantity += 1;
            } else if (e.target.classList.contains("decrease")) {
                cart[index].quantity = Math.max(1, cart[index].quantity - 1);
            } else if (e.target.classList.contains("remove")) {
                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });
    }
});