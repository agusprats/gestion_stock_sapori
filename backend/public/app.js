const categories = ["todos", "panificacion", "conservas", "quesos", "fiambres"];
const $listaProductos = document.getElementById("lista-productos");
const $categoryMenu = document.getElementById("category-menu");

const token = localStorage.getItem("token");
let selectedCategory = "todos";

if (!token) {
  // no forzar redirección automática para permitir vista pública si hace falta
}

const obtenerProductos = async (category = "") => {
  const url = new URL(window.location.origin + "/api/products");
  if (category && category !== "todos") {
    url.searchParams.set("category", category);
  }

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const respuesta = await fetch(url.toString(), {
    headers,
  });

  if (!respuesta.ok) {
    return [];
  }

  return respuesta.json();
};

const renderProducto = (prod) => `
  <div class="tarjeta-producto">
    <h4>${prod.name}</h4>
    <p class="descripcion-producto">${prod.description}</p>
    <p class="product-category">Categoría: ${prod.category}</p>
    <div class="contenedor-precio">
      <span class="precio">$ ${prod.price}</span>
      <span class="stock">Stock: ${prod.stock}</span>
    </div>
    <div class="producto-actions">
      <a class="boton-agregar" href="./pages/editar-producto.html?id=${prod.id}">Modificar</a>
    </div>
  </div>
`;

const renderCategorias = () => {
  if (!$categoryMenu) return;

  $categoryMenu.innerHTML = categories
    .map(
      (category) => `
        <button class="category-button ${
          selectedCategory === category ? "active" : ""
        }" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;
      renderCategorias();
      cargarProductos(selectedCategory);
    });
  });
};

const cargarProductos = async (category = "") => {
  if (!$listaProductos) return;

  $listaProductos.innerHTML = "";
  let productos = await obtenerProductos(category);

  if (category && category !== "todos") {
    productos = productos.filter(
      (prod) => prod.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (!productos.length) {
    $listaProductos.innerHTML =
      "<p class='empty-state'>No hay productos en esta categoría.</p>";
    return;
  }

  productos.forEach((prod) => {
    $listaProductos.innerHTML += renderProducto(prod);
  });
};

renderCategorias();
cargarProductos(selectedCategory);
