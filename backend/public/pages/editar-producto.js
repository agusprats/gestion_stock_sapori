const token = localStorage.getItem("token");
const form = document.getElementById("formulario");
const deleteButton = document.getElementById("delete-button");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!token) {
  window.location.href = "./iniciar-sesion.html";
}

const formFields = {
  name: document.getElementById("name"),
  description: document.getElementById("description"),
  category: document.getElementById("category"),
  price: document.getElementById("price"),
  stock: document.getElementById("stock"),
};

const loadProduct = async () => {
  if (!productId) return;

  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    alert("No se pudo cargar el producto");
    return;
  }

  const producto = await response.json();
  formFields.name.value = producto.name;
  formFields.description.value = producto.description;
  formFields.category.value = producto.category;
  formFields.price.value = producto.price;
  formFields.stock.value = producto.stock;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const updatedProduct = {
    name: formFields.name.value.trim(),
    description: formFields.description.value.trim(),
    category: formFields.category.value,
    price: Number(formFields.price.value),
    stock: Number(formFields.stock.value),
  };

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo actualizar el producto");
    }

    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
};

const handleDelete = async () => {
  if (!productId || !confirm("¿Eliminar este producto?")) return;

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo eliminar el producto");
    }

    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
};

if (form && productId) {
  loadProduct();
  form.addEventListener("submit", handleSubmit);
}

if (deleteButton) {
  deleteButton.addEventListener("click", handleDelete);
}
