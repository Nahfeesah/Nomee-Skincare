const header =document.getElementById("header");
window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
    });
});
const cart = { };
function addToCart(productName, productPrice) {
    if (cart[productName]) {
        cart[productName].quantity += 1;
        cart[productName].totalPrice += productPrice;
    } else {
        cart[productName] = {
            quantity: 1,
            totalPrice: productPrice
        };
    }
    updateCart();
}
function removeFromCart(productName) {
    if (cart[productName]) {
        cart[productName].quantity -= 1;
        cart[productName].totalPrice = cart[productName].totalPrice * (cart[productName].quantity) / (cart[productName].quantity + 1);
        if (cart[productName].quantity === 0) {
            delete cart[productName];
        }
        updateCart();
    }
}
function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    for (const productName in cart) {
        const item = cart[productName];
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${productName} - Quantity: ${item.quantity}, Total: #${item.totalPrice}
            <button onclick="removeFromCart('${productName}')" class="remove-item">Remove</button>
        `;
        cartList.appendChild(listItem);
    };
    calculateTotal();
}

    function calculateTotal() {
        let total = 0;
        for (const productName in cart) {
            total += Number(cart[productName].totalPrice);
        }
        let showTotal = document.getElementById("total-price");
        showTotal.textContent = `Total: #${total}`;
    }
    document.getElementById("checkout-button").addEventListener("click", function() {
        if (Object.keys(cart).length === 0) {
            alert("Your cart is empty.");
            return;
        }
        alert("Checkout Successful.");
    });

    const form = document.getElementById('contact-form');
    
    function validateField(field) {
        if (field.value.trim() === '') {
            field.classList.add('invalid');
            return false;
        }
        
        if (field.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                field.classList.add('invalid');
                return false;
            }
        }
        
        field.classList.remove('invalid');
        return true;
    }

    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const fields = form.querySelectorAll("input, textarea");
        let isValid = true;
        
        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.textContent = "Thank you for contacting us.";
                successMessage.style.display = 'block';
                successMessage.style.color = 'green';
                setTimeout(() => {
                    successMessage.textContent = "";
                    successMessage.style.display = 'none';
                }, 2000);
            }
            form.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });

const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
});