let cart = [];
const boxSize = 30;

function addToCart() {
    let sel = document.getElementById("product").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    if (isNaN(quantity) || quantity < 1) { alert("Enter valid quantity"); return; }

    let parts = sel.split("|");
    let productName = parts[0];
    let size = parts[1];
    let pricePerUnit = parseFloat(parts[2]);

    // Check if already in cart
    let found = cart.find(item => item.productName === productName && item.size === size);
    if (found) {
        found.quantity += quantity;
    } else {
        cart.push({ productName, size, pricePerUnit, quantity });
    }

    renderCart();
}

function renderCart() {
    let tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";
    cart.forEach((item, index) => {
        let total = item.quantity * item.pricePerUnit;
        let boxes = Math.ceil(item.quantity / boxSize);
        let row = `<tr>
            <td>${item.productName}</td>
            <td>${item.size}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>${item.pricePerUnit}</td>
            <td>${boxes}</td>
            <td>${total}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function updateQuantity(index, value) {
    let qty = parseInt(value);
    if (qty < 1) { alert("Quantity must be at least 1"); return; }
    cart[index].quantity = qty;
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function calculateTotal() {
    let totalPrice = 0;
    let totalBoxes = 0;
    let totalQty = 0;

    cart.forEach(item => {
        totalPrice += item.pricePerUnit * item.quantity;
        totalBoxes += Math.ceil(item.quantity / boxSize);
        totalQty += item.quantity;
    });

    document.getElementById("result").innerHTML =
        `<b>Total Quantity:</b> ${totalQty} <br>
         <b>Total Boxes:</b> ${totalBoxes} <br>
         <b>Total Price:</b> ₹${totalPrice}`;
}

function submitOrder() {
    if (cart.length === 0) { alert("Cart is empty"); return; }

    let orderDetails = "Order Details:\n\n";
    cart.forEach(item => {
        orderDetails += `${item.productName} ${item.size} - Quantity: ${item.quantity}, Price/unit: ${item.pricePerUnit}, Total: ${item.pricePerUnit * item.quantity}\n`;
    });

    calculateTotal();
    orderDetails += "\n" + document.getElementById("result").innerText;

    alert(orderDetails);

    // Optionally, clear cart after submit
    // cart = [];
    // renderCart();
    // document.getElementById("result").innerHTML = "";
}
