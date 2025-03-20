let cart = JSON.parse(localStorage.getItem("cart")) || [];
let name=document.getElementsByClassName('about')[0]
console.log('name sejal',name);
let referenceSection = document.getElementById("about"); // Target existing section

let newSection1 = `
  <div class="cake-section section-p1">
    <h3>Freshly Baked Cakes</h3>
    <div></div>
    <p>Indulge in our freshly baked cakes made with love and the finest ingredients.</p>
    <button class="btn">Explore Now</button>
  </div>
`;


referenceSection.insertAdjacentHTML("beforebegin", newSection1); // Insert before the about section

let reviewSection = document.getElementById("review"); // Get the review section

let cakeSection = `
  <div class="cake-commitment">
    <div class="cake-image">
      <img src="images/offer.jpg" alt="Offer on cake">
    </div>
    <div class="cake-text">
      <h3>Join Our Exclusive Cake Club!</h3>
      <p>Become a member of our Cake Lovers Club and enjoy exclusive benefits, discounts, and early access to new flavors!</p>
      <p>Sign up today and indulge in sweet surprises every month.</p>
    </div>
  </div>
`;

// Insert the new section BEFORE the review section
reviewSection.insertAdjacentHTML("beforebegin", cakeSection);



// Function to add item to cart
function addToCart(event) {
    event.preventDefault();
    let name = event.target.getAttribute("data-name");
    let price = event.target.getAttribute("data-price");

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Attach event listener to all cart buttons
document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", addToCart);
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission if invalid

    let isValid = true;

    // Name validation
    let name = document.getElementById("name").value.trim();
    if (name.length < 3) {
        document.getElementById("name-error").innerText = "Name must be at least 3 characters!";
        isValid = false;
    } else {
        document.getElementById("name-error").innerText = "";
    }

    // Email validation
    let email = document.getElementById("email").value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").innerText = "Enter a valid email!";
        isValid = false;
    } else {
        document.getElementById("email-error").innerText = "";
    }

    // Phone number validation
    let phone = document.getElementById("number").value.trim();
    let phonePattern = /^[0-9]{10}$/; // Ensures only 10-digit numbers
    if (!phonePattern.test(phone)) {
        document.getElementById("number-error").innerText = "Enter a valid 10-digit phone number!";
        isValid = false;
    } else {
        document.getElementById("number-error").innerText = "";
    }

    // Message validation
    let message = document.getElementById("message").value.trim();
    if (message.length < 10) {
        document.getElementById("message-error").innerText = "Message should be at least 10 characters!";
        isValid = false;
    } else {
        document.getElementById("message-error").innerText = "";
    }

    // If form is valid, submit it
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("contact-form").reset();
    }
});

// Login validation and logic
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    document.getElementById("show-register").addEventListener("click", function() {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        formTitle.innerText = "Register";
    });

    document.getElementById("show-login").addEventListener("click", function() {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        formTitle.innerText = "Login";
    });

    // Form Validation
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Registration successful!");
        registerForm.reset();
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        formTitle.innerText = "Login";
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Login successful!");
    });

   
    
    
});

