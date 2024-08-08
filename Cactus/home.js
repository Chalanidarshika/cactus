// Selecting elements
let openShopping = document.querySelector('.icon-cart');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.icon-cart span');
let payButton = document.querySelector('.pay button');
let listCards = [];
let products = [];

function navigateToLoginPage() {
    window.location.href = 'login.html';
}

// Check if user is logged in
let isLoggedIn = false; // This should be updated based on actual login status

document.addEventListener('DOMContentLoaded', () => {
    const shopLink = document.querySelector('.navigation a[href="login.html"]');

    shopLink.addEventListener('click', (event) => {
        if (!isLoggedIn) {
            event.preventDefault();
            showMessage("You need to login to go to the shop page");
        }
    });
});

// Function to show message
function showMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.innerHTML = `
        <p>${message}</p>
        <button onclick="closeMessageBox()">OK</button>
    `;
    document.body.appendChild(messageBox);
}

// Function to close message box
function closeMessageBox() {
    const messageBox = document.querySelector('.message-box');
    if (messageBox) {
        document.body.removeChild(messageBox);
    }
}

// Event listeners
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

payButton.addEventListener('click', () => {
    window.location.href = 'payment.html';
});

// Function to initialize the app
function initApp() {
    list.innerHTML = ''; // Clear list
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}" alt="${value.ProductName}"/>
            <div class="title">${value.ProductName}</div>
            <div class="price">${value.Price.toLocaleString()}</div>
            <button onclick="addtocart(${key})"> Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
}

// Function to fetch products data
function fetchProducts() {
    fetch('home.php')
        .then(response => response.text())
        .then(data => {
            try {
                const jsonData = JSON.parse(data);
                products = jsonData;
                initApp(); // Call the function to initialize the app
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Response:', data); // Log the response for debugging
                showMessage('Failed to load products. Please try again later.');
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Call fetchProducts function to fetch products data when the page loads
fetchProducts();

// Function to add item to cart
function addtocart(key) {
    let currentQuantity = listCards[key] ? listCards[key].quantity : 0;
    let maxQuantity = products[key].Quantity;
    
    if (currentQuantity < maxQuantity) {
        if (listCards[key] == null) {
            listCards[key] = { ...products[key], quantity: 1 }; // Add quantity property
        } else {
            listCards[key].quantity++; // Increment quantity if within the limit
        }
        reloadCard();
    } else {
        showMessage("Maximum quantity reached for this product.");
    }
}

// Function to reload the shopping cart
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.Price * value.quantity; // Update total price
            count += value.quantity; // Update total quantity
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}" alt="${value.ProductName}"/></div>
                <div>${value.ProductName}</div>
                <div>${(value.Price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changequantity(${key},${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity} / ${value.Quantity}</div> <!-- Display max quantity -->
                    <button onclick="changequantity(${key},${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count; // Update quantity displayed in the shopping cart icon
    
    // Broadcast total to other pages
    localStorage.setItem('total', totalPrice.toLocaleString());
}

// Function to change quantity of an item in the cart
function changequantity(key, quantity) {
    if (quantity <= 0) {
        delete listCards[key]; // Remove item from cart if quantity is 0 or less
    } else if (quantity > products[key].Quantity) {
        showMessage("Maximum quantity reached for this product.");
    } else {
        listCards[key].quantity = quantity; // Update quantity
    }
    reloadCard();
}

// Retrieve total from localStorage
const totalFromLocalStorage = localStorage.getItem('total');
if (totalFromLocalStorage) {
    total.innerText = totalFromLocalStorage;
}
