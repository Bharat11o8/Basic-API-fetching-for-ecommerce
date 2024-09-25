let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");
let allCat = [];
let cart = []; 

let displayProduct = async (allCheckCat = []) => {
    productDiv.innerHTML = "";

    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    let finalProduct = data.products;

    finalProduct.forEach((element) => {
        if (!allCat.includes(element.category)) {
            categoryListDiv.innerHTML += `<label>
                <input type="checkbox" onclick='categoryFilter()' value="${element.category}"/>${element.category}
            </label>`;
            allCat.push(element.category);
        }
        if (allCheckCat.length === 0) {
            allCheckCat = allCat;
        }
        if (allCheckCat.includes(element.category)) {
            let ratingClass = '';
            let rating = element.rating;

            if (rating >= 4.2) {
                ratingClass = 'rating-high';
            } else if (rating >= 3) {
                ratingClass = 'rating-medium';
            } else {
                ratingClass = 'rating-low';
            }
            productDiv.innerHTML += `<div class="productItem">
                <img src="${element.thumbnail}" alt="Product Image">
                <h4>${element.category}  | ${element.availabilityStatus}</h4>
                <hr>
                <p> Price: <span class = "priceColor">$${element.price} </span>| Rating: <span class="rating ${ratingClass}">${rating}</span></p>
                <h3>${element.title}</h3>
                
                <div class="atcButtonContainer">
                    <button class="atcButton" data-title="${element.title}" data-price="${element.price}" data-image="${element.thumbnail}" onclick='addToCart(this)'>Add to Cart</button>
                </div>
            </div>`;
        }
    });
};

// filter products by category
let categoryFilter = () => {
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });
    displayProduct(checkData);
};

// add products to cart
let addToCart = (button) => {
    const productTitle = button.getAttribute('data-title');
    const productPrice = button.getAttribute('data-price');
    const productImage = button.getAttribute('data-image');

    const product = {
        title: productTitle,
        price: productPrice,
        image: productImage 
    };
    
    cart.push(product);
    displayCart();
};

let displayCart = () => {
    let cartDiv = document.querySelector(".cart");
    cartDiv.innerHTML = ""; // Clear the current cart display
    cart.forEach((element, index) => {
        cartDiv.innerHTML += `<div class="cartItem">
            <img src="${element.image}" alt="Product Image" style="width: auto; height: 250px; object-fit: cover;">
            <h4>${element.title}</h4>
            <p>Price: $${element.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>`;
    });
    const cartName = document.getElementsByClassName("cartName")[0];
    if (cart.length === 0) {
        cartName.style.display = 'none'; 
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartName.style.display = 'block'; 
    }
};

let removeFromCart = (index) => {
    cart.splice(index, 1); 
    displayCart();
};

displayProduct();
