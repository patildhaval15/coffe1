
document.querySelector(".btn").addEventListener("click", () => {
    document.querySelector(".menu").scrollIntoView({
        behavior: "smooth"
    });
});


// cart array

let cart = {};

const cartList = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

const items = [
    { class: ".div1", name: "Strawberry Juice", price: 250 },
    { class: ".div2", name: "Mango Juice", price: 200 },
    { class: ".div3", name: "Chocolate Shake", price: 300 },
    { class: ".div4", name: "Green Tea", price: 100 },
    { class: ".div5", name: "Orange Juice", price: 150 },

    { class: ".div7", name: "Burger", price: 190 },
    { class: ".div8", name: "Pizza", price: 299 },
    { class: ".div9", name: "Sandwich", price: 250 },
    { class: ".div10", name: "Frankie", price: 129 },
    { class: ".div11", name: "Pasta", price: 199 },

    { class: ".div12", name: "Dosa", price: 199 },
    { class: ".div13", name: "Garlic Bread", price: 249 },
    { class: ".div14", name: "Nachos", price: 299 },
    { class: ".div15", name: "Choco Lava Cake", price: 349 },
    { class: ".div16", name: "Cheese Balls", price: 149 }
];


// ADD ITEM

items.forEach(item => {
    let element = document.querySelector(item.class);

    if (element) {
        element.addEventListener("click", () => {
            if (cart[item.name]) {
                cart[item.name].qty++;
            } else {
                cart[item.name] = { price: item.price, qty: 1 };
            }
            updateCart();
        });
    }
});

const cartBox = document.querySelector(".cart");
const menuSection = document.querySelector(".menu");



// UPDATE CART UI

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    for (let name in cart) {
        let item = cart[name];

        let li = document.createElement("li");

        li.innerHTML = `
            ${name} (₹${item.price}) x ${item.qty}
            <button onclick="increaseQty('${name}')">+</button>
            <button onclick="decreaseQty('${name}')">-</button>
            <button onclick="removeItem('${name}')">❌</button>
        `;

        cartList.appendChild(li);

        total += item.price * item.qty;
    }

    totalDisplay.textContent = total;
}



// INCREASE

function increaseQty(name) {
    cart[name].qty++;
    updateCart();
}


// DECREASE

function decreaseQty(name) {
    cart[name].qty--;

    if (cart[name].qty <= 0) {
        delete cart[name];
    }

    updateCart();
}


// REMOVE ITEM

function removeItem(name) {
    delete cart[name];
    updateCart();
}

// 3. CONTACT FORM VALIDATION

document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.querySelector("input[name='name']").value.trim();
    let email = document.querySelector("input[name='email']").value.trim();
    let message = document.querySelector("textarea").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter valid email!");
        return;
    }

    alert("Thank you! Message sent ✅");
    this.reset();
});



// 5. NAVBAR SMOOTH SCROLL FIX

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        let text = this.textContent.toLowerCase();

        if (text.includes("menu")) {
            document.querySelector(".menu").scrollIntoView({ behavior: "smooth" });
        } else if (text.includes("about")) {
            document.querySelector(".about").scrollIntoView({ behavior: "smooth" });
        } else if (text.includes("contact")) {
            document.querySelector(".contact").scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
});


window.addEventListener("scroll", () => {
    const menuTop = menuSection.offsetTop;
    const menuHeight = menuSection.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / 2;

    if (scrollPos >= menuTop && scrollPos <= menuTop + menuHeight) {
        cartBox.style.display = "block";   // show cart
    } else {
        cartBox.style.display = "none";    // hide cart
    }
});