document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contactForm');
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Validaciones básicas
                const nombre = document.getElementById('nombre').value.trim();
                const correo = document.getElementById('correo').value.trim();
                const asunto = document.getElementById('asunto').value.trim();
                const mensaje = document.getElementById('mensaje').value.trim();

                if (nombre.length < 3) {
                    alert("El nombre debe tener al menos 3 caracteres.");
                return;
                }

            // Lista de dominios válidos
            const dominiosValidos = ["gmail.com", "hotmail.com", "est.utn.ac.cr","utn.ac.cr", "outlook.com"];

            // Validar formato general de correo
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
                alert("El correo debe tener un formato válido (ejemplo: usuario@dominio.com).");
                return;
            }

            // Validar dominio específico
            const dominio = correo.split('@')[1].toLowerCase();
            if (!dominiosValidos.includes(dominio)) {
                alert("El dominio del correo debe ser Gmail, Hotmail, Yahoo u Outlook.");
                return;
            }

                if (asunto.length < 5) {
                    alert("El asunto debe tener al menos 5 caracteres.");
                return;
                }

                // Validar captcha
                const captchaResponse = (typeof grecaptcha !== "undefined" ) ? grecaptcha.getResponse() : "";
                if (!captchaResponse) {
                alert("Por favor completa el captcha.");
                return;
                }

                // Mostrar datos en modal
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
                const lugar = { lat: 10.007252, lng:-84.216445};

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