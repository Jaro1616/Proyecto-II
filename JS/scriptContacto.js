/* 
=====================================================================
ARCHIVO: scriptContacto
---------------------------------------------------------------------
1) Validación del formulario:
   - Verifica longitud mínima del nombre
   - Valida que el correo tenga un formato correcto
   - Comprueba que el dominio del correo pertenezca a una lista permitida
   - Verifica la longitud mínima del asunto
   - Revisa que el usuario haya completado el reCAPTCHA

2) Visualización de datos enviados:
   - Si todo es válido, muestra los datos dentro de un modal elegante
     en lugar de enviarlos directamente

3) Control del modal:
   - Permite cerrar el modal mediante la función cerrarModal()

4) Integración con Google Maps API:
   - Muestra un mapa centrado en una ubicación específica
   - Coloca un marcador señalando la posición
=====================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        const dominiosValidos = ["gmail.com", "hotmail.com", "est.utn.ac.cr", "utn.ac.cr", "outlook.com"];

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            alert("El correo debe tener un formato válido (ejemplo: usuario@dominio.com).");
            return;
        }

        const dominio = correo.split('@')[1].toLowerCase();
        if (!dominiosValidos.includes(dominio)) {
            alert("El dominio del correo debe ser Gmail, Hotmail, Yahoo u Outlook.");
            return;
        }

        if (asunto.length < 5) {
            alert("El asunto debe tener al menos 5 caracteres.");
            return;
        }

        const captchaResponse = (typeof grecaptcha !== "undefined") ? grecaptcha.getResponse() : "";
        if (!captchaResponse) {
            alert("Por favor completa el captcha.");
            return;
        }

        modalContent.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p><strong>Mensaje:</strong> ${mensaje}</p>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});

function cerrarModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function initMap() {
    const lugar = { lat: 10.007252, lng: -84.216445 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: lugar,
    });

    new google.maps.Marker({
        position: lugar,
        map: map,
        title: "Estamos aquí",
    });
}
