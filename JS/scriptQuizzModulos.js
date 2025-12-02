/* 
=====================================================================
ARCHIVO: scriptQuizzModulos
---------------------------------------------------------------------
1) Lee el parámetro "modulo" desde la URL
   - Ejemplo: quizzModulo.html?modulo=via
   - según ese valor selecciona qué archivo JSON de preguntas cargar

2) Carga un archivo JSON específico para cada módulo
   - via → JSON/quizzVia.json
   - estacionamiento → JSON/quizzEstacionamiento.json
   - administrativas → JSON/quizzAdministrativas.json
   - alcohol → JSON/quizzAlcohol.json
   - peatones → JSON/quizzPeatones.json

3) Construye dinámicamente el quiz
   - Muestra una pregunta a la vez
   - Genera 4 botones de respuesta
   - Marca visualmente las respuestas correctas e incorrectas
   - Muestra una retroalimentación (feedback) con texto e imagen
     de un policía cuando el usuario se equivoca

4) Controla el flujo del cuestionario
   - Si responde correcto, bloquea las opciones y pasa a la siguiente
     pregunta después de un pequeño retraso
   - Si responde incorrecto, muestra el feedback pero permite intentar
     de nuevo con las otras opciones

5) Muestra el resultado final
   - Al terminar todas las preguntas, muestra cuántas respuestas correctas
     obtuvo el usuario sobre el total
=====================================================================
*/

const params = new URLSearchParams(window.location.search);
const modulo = params.get("modulo");

const moduloTitulo = document.getElementById("modulo-titulo");
const progressEl = document.getElementById("progress");
const questionTextEl = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const policemanImg = document.getElementById("policeman-img");
const resultEl = document.getElementById("result");

const moduloToJson = {
  via: "JSON/quizzVia.json",
  estacionamiento: "JSON/quizzEstacionamiento.json",
  administrativas: "JSON/quizzAdministrativas.json",
  alcohol: "JSON/quizzAlcohol.json",
  peatones: "JSON/quizzPeatones.json"
};

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

function mostrarPregunta() {
  if (preguntaActualIndex >= preguntas.length) {
    mostrarResultadoFinal();
    return;
  }

  const preguntaActual = preguntas[preguntaActualIndex];

  questionTextEl.textContent = preguntaActual.pregunta;
  progressEl.textContent = `Pregunta ${preguntaActualIndex + 1} de ${preguntas.length}`;

  answersContainer.innerHTML = "";

  feedbackBox.style.display = "none";
  feedbackText.textContent = "";

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

function manejarRespuesta(opcion, btnClickeado) {
  const botones = Array.from(document.querySelectorAll(".answer-btn"));

  if (opcion.correcto) {
    btnClickeado.classList.add("correct");
    botones.forEach(b => b.disabled = true);

    policemanImg.style.display = "none";
    feedbackText.textContent = opcion.feedback || "¡Correcto!";
    feedbackBox.style.display = "flex";

    aciertos++;

    setTimeout(() => {
      preguntaActualIndex++;
      mostrarPregunta();
    }, 1500);
  } else {
    btnClickeado.classList.add("incorrect");
    btnClickeado.disabled = true;

    policemanImg.style.display = "block";
    feedbackText.textContent = opcion.feedback || "Respuesta incorrecta.";
    feedbackBox.style.display = "flex";
  }
}

function mostrarResultadoFinal() {
  questionTextEl.textContent = "¡Has completado el módulo!";
  answersContainer.innerHTML = "";
  feedbackBox.style.display = "none";

  resultEl.style.display = "block";
  resultEl.textContent = `Tu resultado: ${aciertos} de ${preguntas.length} respuestas correctas.`;
}
