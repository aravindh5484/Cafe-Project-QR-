let params = new URLSearchParams(window.location.search);
let table = params.get("table");

if (!table) table = 1;

document.getElementById("tableNumber").textContent = "Table " + table;

let cart = {};

function addToCart(item) {
    if (cart[item]) {
        cart[item]++;
    } else {
        cart[item] = 1;
    }
    displayCart();
}

function displayCart() {
    let list = document.getElementById("cart");
    list.innerHTML = "";

    for (let item in cart) {
        let li = document.createElement("li");
        li.textContent = item + " x " + cart[item];
        list.appendChild(li);
    }
}

function placeOrder() {
    if (Object.keys(cart).length === 0) {
        alert("Cart is empty!");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: "ORD" + Date.now(),
        table: table,
        items: cart,
        time: new Date().toLocaleTimeString(),
        status: "Pending"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order Placed Successfully!");

    cart = {};
    displayCart();
}