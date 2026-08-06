const token = localStorage.getItem("token");
const form = document.getElementById("formulario");

if (!token) {
  window.location.href = "./iniciar-sesion.html";
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const product = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
  };

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo guardar el producto");
    }

    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
