// Base de datos de productos (simulada)
const productos = [
  { id: 1, nombre: "Camiseta Frontend", precio: 15 },
  { id: 2, nombre: "Taza JavaScript", precio: 10 },
  { id: 3, nombre: "Pack de Stickers Dev", precio: 5 },
  { id: 4, nombre: "Camisa Azul", precio: 18 },
  { id: 5, nombre: "Camisa Negra", precio: 20 }
];

// Agregar producto al carrito
function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("✅ Producto agregado al carrito");
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<li>El carrito está vacío.</li>";
    totalElemento.textContent = "Total: 0 €";
    return;
  }

  carrito.forEach(id => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - ${producto.precio} €`;
      lista.appendChild(item);
      total += producto.precio;
    }
  });

  totalElemento.textContent = `Total: ${total} €`;
}

// Vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}

// Mostrar resumen en checkout.html
function mostrarResumenCheckout() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenLista = document.getElementById("resumen-carrito");
  const resumenTotal = document.getElementById("resumen-total");
  resumenLista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    resumenLista.innerHTML = "<li>No hay productos en el carrito.</li>";
    resumenTotal.textContent = "Total: 0 €";
    return;
  }

  carrito.forEach(id => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - ${producto.precio} €`;
      resumenLista.appendChild(item);
      total += producto.precio;
    }
  });

  resumenTotal.textContent = `Total: ${total} €`;
}

// Procesar la compra en checkout.html
function procesarCompra(e) {
  e.preventDefault();
  document.getElementById("mensaje").textContent =
    "✅ ¡Gracias por tu compra! Recibirás un correo con los detalles.";
  localStorage.removeItem("carrito");
}
// Guardar producto en favoritos
function guardarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("💖 Producto guardado en favoritos");
  } else {
    alert("⚠️ Ya está en favoritos");
  }
}

// Mostrar productos favoritos
function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const contenedor = document.getElementById("lista-favoritos");
  contenedor.innerHTML = "";
  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en favoritos.</p>";
    return;
  }

  favoritos.forEach(id => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const item = document.createElement("div");
      item.className = "producto";
      item.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio} €</p>
        <button onclick="agregarAlCarrito(${producto.id})">🛒 Agregar</button>
      `;
      contenedor.appendChild(item);
    }
  });
}
function buscarProductos() {
  const input = document.getElementById("buscador");
  const filtro = input.value.toLowerCase();
  const productos = document.querySelectorAll(".producto");

  productos.forEach(prod => {
    const nombre = prod.querySelector("h2, h3").textContent.toLowerCase();
    prod.style.display = nombre.includes(filtro) ? "block" : "none";
  });
}
