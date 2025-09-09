const cart = [];
    const cartBox = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkout = document.getElementById("checkout");
    const phoneNumber = "5519992149274"; 

    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.getAttribute("data-item");
        const price = parseFloat(button.getAttribute("data-price"));
        cart.push({ item, price });
        updateCart();
      });
    });

    function updateCart() {
      cartBox.style.display = "block";
      cartItems.innerHTML = "";
      let total = 0;
      cart.forEach((c, index) => {
        total += c.price;
        const li = document.createElement("li");
        li.innerHTML = `${c.item} - R$ ${c.price.toFixed(2)} 
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">x</button>`;
        cartItems.appendChild(li);
      });
      cartTotal.textContent = total.toFixed(2);

      // monta mensagem para o WhatsApp
      let message = "Olá! Gostaria de fazer um pedido:%0A";
      cart.forEach(c => {
        message += `- ${c.item} (R$ ${c.price.toFixed(2)})%0A`;
      });
      message += `Total: R$ ${total.toFixed(2)}`;
      checkout.href = `https://wa.me/${phoneNumber}?text=${message}`;
    }

    function removeItem(index) {
      cart.splice(index, 1);
      updateCart();
      if(cart.length === 0){
        cartBox.style.display = "none";
      }
    }