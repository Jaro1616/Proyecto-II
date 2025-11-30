//PARA EL CARRUSEL EN EL INDEX
fetch("JSON/carruselImagenes.json")
  .then(response => response.json())
  .then(data => {
    let indice = 0;
    const img = document.getElementById("imagenCarrusel");
    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next");

    // Mostrar la primera imagen
    img.src = "IMG/carrusel/" + data[indice].imagen;

    // Función para cambiar imagen con animación
    function cambiarImagen(nuevoIndice) {
      img.classList.add("fade"); // activa animación
      setTimeout(() => {
        indice = nuevoIndice;
        img.src = "IMG/carrusel/" + data[indice].imagen;
        img.classList.remove("fade"); // quita animación
      }, 500); // duración de la animación (0.5s)
    }

    // Botón siguiente
    btnNext.addEventListener("click", () => {
      cambiarImagen((indice + 1) % data.length);
    });

    // Botón anterior
    btnPrev.addEventListener("click", () => {
      cambiarImagen((indice - 1 + data.length) % data.length);
    });

    // Cambio automático cada 2 segundos
    setInterval(() => {
      cambiarImagen((indice + 1) % data.length);
    }, 3500);
  })
  .catch(error => console.error("Error cargando JSON:", error));


//PARA "LO QUE OFRECEMOS" EN EL INDEX
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