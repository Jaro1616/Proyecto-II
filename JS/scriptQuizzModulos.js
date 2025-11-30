// 1. Leer parámetro modulo de la URL
const params = new URLSearchParams(window.location.search);
const modulo = params.get("modulo");

// 2. Referencias a elementos del dominio
const moduloTitulo = document.getElementById("modulo-titulo");
const progressEl = document.getElementById("progress");
const questionTextEl = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const policemanImg = document.getElementById("policeman-img");
const resultEl = document.getElementById("result");

// 3. ruta archivo JSON
const moduloToJson = {
  via: "JSON/quizzVia.json",
  estacionamiento: "JSON/quizzEstacionamiento.json",
  administrativas: "JSON/quizzAdministrativas.json",
  alcohol: "JSON/quizzAlcohol.json",
  peatones: "JSON/quizzPeatones.json"
};

// 4. Texto para el título del módulo
const moduloToTitulo = {
  via: "🚗 Infracciones en la vía",
  estacionamiento: "🅿️ Estacionamiento",
  administrativas: "📄 Administrativas",
  alcohol: "🍺 Alcohol y drogas",
  peatones: "🚶 Peatones"
};

let preguntas = [];
let preguntaActualIndex = 0;
let aciertos = 0;

// 5. Inicializar
initQuiz();

function initQuiz() {
  if (!modulo || !moduloToJson[modulo]) {
    questionTextEl.textContent = "Módulo no válido o no especificado.";
    progressEl.textContent = "";
    return;
  }

  moduloTitulo.textContent = "Módulo: " + (moduloToTitulo[modulo] || modulo);

  const jsonUrl = moduloToJson[modulo];

  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el JSON de preguntas.");
      }
      return response.json();
    })
    .then(data => {
      preguntas = data;
      preguntaActualIndex = 0;
      aciertos = 0;
      mostrarPregunta();
    })
    .catch(error => {
      console.error(error);
      questionTextEl.textContent = "Error cargando las preguntas.";
    });
}

// 6. Mostrar pregunta actual
function mostrarPregunta() {
  // Si ya no hay más preguntas -> mostrar resultado
  if (preguntaActualIndex >= preguntas.length) {
    mostrarResultadoFinal();
    return;
  }

  const preguntaActual = preguntas[preguntaActualIndex];

  // Actualizar texto de pregunta y progreso
  questionTextEl.textContent = preguntaActual.pregunta;
  progressEl.textContent = `Pregunta ${preguntaActualIndex + 1} de ${preguntas.length}`;

  // Limpiar respuestas anteriores
  answersContainer.innerHTML = "";

  // Ocultar feedback
  feedbackBox.style.display = "none";
  feedbackText.textContent = "";

  // Construir botones de respuesta
  preguntaActual.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = opcion.texto;

    btn.addEventListener("click", () => {
      manejarRespuesta(opcion, btn);
    });

    answersContainer.appendChild(btn);
  });
}

// 7. Manejar respuesta seleccionada
function manejarRespuesta(opcion, btnClickeado) {
  const botones = Array.from(document.querySelectorAll(".answer-btn"));

  if (opcion.correcto) {
    // Marcar como correcta
    btnClickeado.classList.add("correct");
    // Deshabilitar todos los botones para que no siga clickeando
    botones.forEach(b => b.disabled = true);

    // Mostrar feedback de correcto
    policemanImg.style.display = "none";
    feedbackText.textContent = opcion.feedback || "¡Correcto!";
    feedbackBox.style.display = "flex";

    aciertos++;

    // Pasar a la siguiente pregunta después de un pequeño delay
    setTimeout(() => {
      preguntaActualIndex++;
      mostrarPregunta();
    }, 1500);
  } else {
    // Marcar esta opción como incorrecta
    btnClickeado.classList.add("incorrect");
    btnClickeado.disabled = true; // que no vuelva a escoger la misma

    // Mostrar policía y feedback de esa opción
    policemanImg.style.display = "block";
    feedbackText.textContent = opcion.feedback || "Respuesta incorrecta.";
    feedbackBox.style.display = "flex";
    // el usuario debe seleccionar la correcta
  }
}

// 8. Mostrar resultado final
function mostrarResultadoFinal() {
  questionTextEl.textContent = "¡Has completado el módulo!";
  answersContainer.innerHTML = "";
  feedbackBox.style.display = "none";

  resultEl.style.display = "block";
  resultEl.textContent = `Tu resultado: ${aciertos} de ${preguntas.length} respuestas correctas.`;
}