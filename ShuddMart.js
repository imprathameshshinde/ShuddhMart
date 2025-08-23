let cart = [];

// Add to cart
function addToCart() {
    let sel = document.getElementById("product").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(quantity) || quantity < 1) {
        alert("कृपया मान्य संख्या दर्ज करें | Please enter valid quantity");
        return;
    }

    let [productName, size, price] = sel.split("|");
    let pricePerUnit = parseFloat(price);

    let found = cart.find(item => item.productName === productName && item.size === size);
    if (found) {
        found.quantity += quantity;
    } else {
        cart.push({ productName, size, pricePerUnit, quantity });
    }
    renderCart();
}

// Render cart
function renderCart() {
    let tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";
    cart.forEach((item, index) => {
        let total = item.quantity * item.pricePerUnit;
        tbody.innerHTML += `
        <tr>
            <td>${item.productName}</td>
            <td>${item.size}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>₹${item.pricePerUnit}</td>
            <td>₹${total}</td>
            <td><button onclick="removeItem(${index})">❌</button></td>
        </tr>`;
    });
}

// Update quantity
function updateQuantity(index, value) {
    let qty = parseInt(value);
    if (qty < 1) {
        alert("मात्रा कम से कम 1 होनी चाहिए | Quantity must be at least 1");
        return;
    }
    cart[index].quantity = qty;
    renderCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Calculate total
function calculateTotal() {
    let totalPrice = 0, totalQty = 0;
    cart.forEach(item => {
        totalPrice += item.pricePerUnit * item.quantity;
        totalQty += item.quantity;
    });

    document.getElementById("result").innerHTML =
        `<b>Total Quantity:</b> ${totalQty} <br>
         <b>Total Price:</b> ₹${totalPrice}`;
}

// Submit order
function submitOrder() {
    if (cart.length === 0) {
        alert("आपकी कार्ट खाली है | Your cart is empty");
        return;
    }
    calculateTotal();
    alert("🙏 धन्यवाद! आपका ऑर्डर कृपया इसे व्हाट्सऐप पर साझा करें। | Thank You! Your order Plz Share this on whatsapp");
    
}

// Share on WhatsApp
function shareWhatsApp() {
    let userName = document.getElementById("username").value.trim();
    let address = document.getElementById("address").value.trim();

    if (!userName || !address) {
        alert("कृपया नाम और पता दर्ज करें | Please enter Name & Address");
        return;
    }
    if (cart.length === 0) {
        alert("कार्ट खाली है | Cart is empty");
        return;
    }

    let message = `*Order Summary*\n\n*Name:* ${userName}\n*Address:* ${address}\n\n*Items:*`;
    cart.forEach(item => {
        let total = item.quantity * item.pricePerUnit;
        message += `\n• ${item.productName} ${item.size} - Qty: ${item.quantity}, Total: ₹${total}`;
    });

    // ✅ Universal WhatsApp share link (works on mobile & web)
    let phone = "917039954457"; // without + or spaces
     let whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    

    window.open(whatsappURL, '_blank');
    setTimeout(() => location.reload(), 2000);
}


// Modal handling
document.getElementById("openOrderBtn").onclick = () => {
    document.getElementById("orderModal").style.display = "block";
};
document.getElementById("closeModal").onclick = () => {
    document.getElementById("orderModal").style.display = "none";
};

// Event listeners
document.getElementById("addBtn").addEventListener("click", addToCart);
document.getElementById("calculateBtn").addEventListener("click", calculateTotal);
document.getElementById("submitBtn").addEventListener("click", submitOrder);
document.getElementById("whatsappBtn").addEventListener("click", shareWhatsApp);
