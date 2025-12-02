/* 
=====================================================================
ARCHIVO scriptAcercaDe
---------------------------------------------------------------------
1) CREACIÓN DINÁMICA DE TARJETAS DEL EQUIPO:
   - Obtiene información desde un archivo JSON
   - Genera tarjetas (cards) con foto, nombre, correo y descripción
   - Inserta un template adicional de íconos dentro de cada tarjeta
   - Permite actualizar el contenido del personal sin modificar el HTML

2) BOTÓN "IR ARRIBA":
   - Aparece automáticamente cuando el usuario hace scroll
   - Permite regresar al inicio de la página con un desplazamiento suave
=====================================================================
*/

fetch("JSON/acercaDeDatos.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor");
    const templateIconos = document.getElementById("templateIconos");

    data.forEach(persona => {
      const card = document.createElement("div");

      card.classList.add(
        "bg-white", "rounded-lg", "shadow-2xl", "overflow-hidden",
        "hover:shadow-xl", "transition-shadow", "duration-300",
        "flex", "flex-col", "border-2", "border-black"
      );

      card.innerHTML = `
        <img src="IMG/${persona.imagen}" alt="${persona.nombre}" class="w-full h-80 object-cover shadow-lg border-b-2 border-black">
        <div class="bg-gray-300 px-6 py-4">
          <h2 class="text-xl font-bold text-gray-800 mb-2">${persona.nombre}</h2>
          <p class="text-sm text-gray-600"><strong>Correo:</strong> 
            <a href="mailto:${persona.correo}" class="text-blue-600 hover:text-blue-800">
              ${persona.correo}
            </a>
          </p>
        </div>
        <div class="p-6 flex-grow">
          <p class="text-gray-700">${persona.descripción}</p>
        </div>
      `;

      const iconos = templateIconos.content.cloneNode(true);
      card.appendChild(iconos);

      contenedor.appendChild(card);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnArriba.style.display = "block";
  } 
  else {
    btnArriba.style.display = "none";
  }
});

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
