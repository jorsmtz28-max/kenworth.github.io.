// ======================
// FUNCIONALIDAD DEL BUSCADOR
// ======================
function buscarProducto() {
    const termino = document.getElementById('campo-busqueda').value.toLowerCase().trim();
    
    if (termino === '') {
        alert('Escribe el modelo, marca o tipo de tráiler que deseas encontrar');
        return;
    }

    window.location.href = `productos.html?buscar=${encodeURIComponent(termino)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const campoBusqueda = document.getElementById('campo-busqueda');
    if (campoBusqueda) {
        campoBusqueda.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarProducto();
            }
        });
    }

    const parametros = new URLSearchParams(window.location.search);
    const terminoBusqueda = parametros.get('buscar');
    if (terminoBusqueda && window.location.pathname.includes('productos.html')) {
        resaltarCoincidencias(terminoBusqueda.toLowerCase());
    }
});

function resaltarCoincidencias(termino) {
    const tarjetas = document.querySelectorAll('.tarjeta-producto');
    let encontrado = false;

    tarjetas.forEach(tarjeta => {
        const textoTarjeta = tarjeta.textContent.toLowerCase();
        if (textoTarjeta.includes(termino)) {
            tarjeta.style.border = '3px solid #16a34a';
            tarjeta.style.boxShadow = '0 0 20px rgba(22, 163, 74, 0.35)';
            tarjeta.scrollIntoView({ behavior: 'smooth', block: 'start' });
            encontrado = true;
        } else {
            tarjeta.style.border = 'none';
            tarjeta.style.boxShadow = '0 6px 18px rgba(0,0,0,0.09)';
        }
    });

    if (!encontrado) {
        alert(`No se encontraron coincidencias para: "${termino}". Intenta con otro modelo o categoría.`);
    }
}

// ======================
// FUNCIONALIDAD DE COTIZACIONES
// ======================
let carrito = [];
let total = 0;

function alternarCarrito() {
    const menuCarrito = document.getElementById('menu-carrito');
    menuCarrito.style.display = menuCarrito.style.display === 'block' ? 'none' : 'block';
}

function agregarAlCarrito(precio) {
    carrito.push(precio);
    total += precio;
    actualizarCarrito();
    alert('Unidad agregada a tu lista de cotización ✅');
}

function actualizarCarrito() {
    const contador = document.getElementById('contador-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const listaVacia = document.getElementById('lista-carrito-vacia');
    
    contador.textContent = carrito.length;
    totalCarrito.textContent = total.toLocaleString('es-MX', { minimumFractionDigits: 2 });

    if (carrito.length > 0) {
        listaVacia.style.display = 'none';
    } else {
        listaVacia.style.display = 'block';
    }
}

document.addEventListener('click', (e) => {
    const contenedorCarrito = document.querySelector('.contenedor-carrito');
    if (contenedorCarrito && !contenedorCarrito.contains(e.target)) {
        const menuCarrito = document.getElementById('menu-carrito');
        if (menuCarrito) menuCarrito.style.display = 'none';
    }
});