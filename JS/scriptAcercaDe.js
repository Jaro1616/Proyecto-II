fetch("JSON/acercaDeDatos.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor");

    data.forEach(persona => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="IMG/${persona.imagen}" alt="${persona.nombre}" class="foto">
        <h2>${persona.nombre}</h2>
        <p><strong>Correo:</strong> ${persona.correo}</p>
        <p>${persona.descripción}</p>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));

  // JS/scriptArriba.js
  const btnArriba = document.getElementById("btnArriba");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnArriba.style.display = "block";
    } else {
      btnArriba.style.display = "none";
    }
  });

  btnArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
