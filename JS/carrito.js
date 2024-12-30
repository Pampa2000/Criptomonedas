// Lista de criptomonedas (puedes obtenerlas de una API o crear manualmente)
let criptomonedas = [
  {
      id: 1,
      name: "Bitcoin",
      price: 94000,
      description: "Bitcoin es la primera criptomoneda descentralizada.",
  },
  {
      id: 2,
      name: "Ethereum",
      price: 3400,
      description: "Ethereum es una plataforma descentralizada.",
  },
  {
      id: 3,
      name: "Binance Coin",
      price: 700,
      description: "Binance Coin es la criptomoneda del exchange Binance.",
  },
  {
      id: 4,
      name: "Solana",
      price: 190,
      description: "Solana es una criptomoneda rápida y escalable.",
  },
  {
      id: 5,
      name: "XRP",
      price: 2.50,
      description: "XRP es un proyecto de software libre y un protocolo de pagos que persigue el desarrollo de un sistema de crédito basado en el paradigma red de pares.",
  },
  {
      id: 6,
      name: "Tether",
      price: 0.99,
      description: "Theter se considera una moneda estable porque originalmente se diseñó para que valiera siempre $1.00, manteniendo $1.00 en reservas por cada Tether emitido.",
}
];

  // Selección de contenedores
  let contenedorCriptomonedas = document.getElementById("criptomonedas"); // Debe coincidir con el ID del contenedor en el HTML
  let listaDeseados = document.getElementById("listaDeseados"); // Para el carrito
  
  document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,xrp,tether&vs_currencies=usd";

    // Función para actualizar precios
    async function actualizarPrecios() {
        try {
            const respuesta = await fetch(apiURL);
            const datos = await respuesta.json();

            // Actualiza los precios en la página
            document.getElementById("precio-bitcoin").innerText = `$${datos.bitcoin.usd}`;
            document.getElementById("precio-ethereum").innerText = `$${datos.ethereum.usd}`;
            document.getElementById("precio-binancecoin").innerText = `$${datos.binancecoin.usd}`;
            document.getElementById("precio-solana").innerText = `$${datos.solana.usd}`;
            document.getElementById("precio-xrp").innerText = `$${datos.xrp.usd}`;
            document.getElementById("precio-tether").innerText = `$${datos.tether.usd}`;
        } catch (error) {
            console.error("Error al obtener los precios:", error);
        }
    }

    // Llama a la función de actualización de precios
    actualizarPrecios();

    // Actualiza los precios cada 5 minutos (300,000 ms)
    setInterval(actualizarPrecios, 300000);
});

    // Mostrar información ampliada al hacer click en + Info

function mostrarInfo(id) {
  let cripto = criptomonedas.find(c => c.id === id);
  if (cripto) {
    alert(`Descripción ampliada:\n${cripto.description}`);
  }
}


  
// Agregar criptomoneda al carrito
function agregarAlCarrito(id) {
  let cripto = criptomonedas.find(c => c.id === id);
  if (cripto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(cripto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
  }
}


// Mostrar el contenido del carrito
function cargarCarrito() {
  listaDeseados.innerHTML = ""; // Limpia el contenido actual del carrito
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach(cripto => {
    let item = document.createElement("li");
    item.textContent = `${cripto.name} - $${cripto.price}`;
    listaDeseados.appendChild(item);
  });
}

// Vaciar el carrito
function eliminarPedidos() {
  localStorage.removeItem("carrito");
  cargarCarrito();
}

  