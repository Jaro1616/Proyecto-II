/* 
=====================================================================
ARCHIVO scriptCarrusel
---------------------------------------------------------------------
1) CARRUSEL DE IMÁGENES:
   - Carga las imágenes desde un archivo JSON
   - Muestra la primera imagen al cargar la página
   - Permite navegar con botones "anterior" y "siguiente"
   - Cambia automáticamente cada 3.5 segundos
   - Usa una animación tipo "fade" al cambiar entre imágenes

2) SECCIÓN "LO QUE OFRECEMOS":
   - Carga una lista de ítems desde un archivo JSON.
   - Crea elementos <li> dinámicamente.
   - Inserta un icono + texto para mostrar cada oferta/servicio.

Toda la funcionalidad depende de datos externos almacenados en JSON,
permitiendo modificar contenido sin tocar el código JavaScript.
=====================================================================
*/

fetch("JSON/carruselImagenes.json")
  .then(response => response.json())
  .then(data => {
    let indice = 0;
    const img = document.getElementById("imagenCarrusel");
    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next");

    img.src = "IMG/carrusel/" + data[indice].imagen;

    function cambiarImagen(nuevoIndice) {
      img.classList.add("fade");
      setTimeout(() => {
        indice = nuevoIndice;
        img.src = "IMG/carrusel/" + data[indice].imagen;
        img.classList.remove("fade");
      }, 500);
    }

    btnNext.addEventListener("click", () => {
      cambiarImagen((indice + 1) % data.length);
    });

    btnPrev.addEventListener("click", () => {
      cambiarImagen((indice - 1 + data.length) % data.length);
    });

    setInterval(() => {
      cambiarImagen((indice + 1) % data.length);
    }, 3500);
  })
  .catch(error => console.error("Error cargando JSON:", error));

fetch("JSON/solucionIndexDatos.json")
  .then(response => response.json())
  .then(data => {
    const galeria = document.getElementById("solucion");

    data.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `${item.icono} <strong>${item.texto}</strong>`;
      galeria.appendChild(li);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));
