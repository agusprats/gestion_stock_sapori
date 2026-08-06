const $formulario = document.getElementById("formulario");

$formulario.onsubmit = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Error en el inicio de sesión");
      return;
    }

    if (!data.token) {
      alert("No se obtuvo token de autenticación.");
      return;
    }

    localStorage.setItem("token", data.token);
    location.href = "../index.html";
  } catch (error) {
    alert(`Error de conexión: ${error.message}`);
    console.error(error);
  }
};
