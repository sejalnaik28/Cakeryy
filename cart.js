document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutSection = document.getElementById("checkout-section");
    const checkoutItemsContainer = document.getElementById("checkout-items");
    const checkoutTotalElement = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");

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

    // Handle Quantity and Removal
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

    // Show Checkout Section on Checkout Button Click
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        checkoutSection.style.display = "block";
        checkoutItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            let li = document.createElement("li");
            li.textContent = `${item.name} - ${item.quantity} x ${item.price}/- = ${itemTotal}/-`;
            checkoutItemsContainer.appendChild(li);
        });

        checkoutTotalElement.innerText = `${totalPrice}/-`;
    });

    // Handle Checkout Form Submission
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        if (name && email && address) {
            alert(`Thank you for your order, ${name}! 🎉`);
            localStorage.removeItem("cart");
            cart = [];
            displayCart();
            checkoutSection.style.display = "none"; // Hide checkout section after order
        } else {
            alert("Please fill in all details.");
        }
    });
});
