const $formulario = document.getElementById("formulario");

$formulario.onsubmit = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      location.href = "./iniciar-sesion.html";
      return;
    }

    const message = data?.message || response.statusText || "Hubo un error en el registro.";
    alert(message);
  } catch (error) {
    alert(`Error de conexión: ${error.message}`);
    console.error(error);
  }
};
