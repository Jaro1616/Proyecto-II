// Menu hamburguesa y control del resumen (migrado desde inline script en index.html)
const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const menuHamburguesaClose = document.querySelector('.menu-hamburguesa-close');
const navMobile = document.getElementById('navMobile');
const navLinks = navMobile.querySelectorAll('a');
const line1 = document.querySelector('.hamburguesa-line-1');
const line2 = document.querySelector('.hamburguesa-line-2');
const line3 = document.querySelector('.hamburguesa-line-3');
const closeLine1 = document.querySelector('.hamburguesa-close-line-1');
const closeLine2 = document.querySelector('.hamburguesa-close-line-2');
const closeLine3 = document.querySelector('.hamburguesa-close-line-3');

function abrirMenu() {
    navMobile.classList.remove('hidden');
    setTimeout(() => navMobile.classList.remove('translate-x-full'), 10);
    if (line1) line1.style.transform = 'rotate(45deg) translateY(12px)';
    if (line2) line2.style.opacity = '0';
    if (line3) line3.style.transform = 'rotate(-45deg) translateY(-12px)';
    if (closeLine1) closeLine1.style.transform = 'rotate(45deg) translateY(12px)';
    if (closeLine2) closeLine2.style.opacity = '0';
    if (closeLine3) closeLine3.style.transform = 'rotate(-45deg) translateY(-12px)';
}

function cerrarMenu() {
    navMobile.classList.add('translate-x-full');
    setTimeout(() => navMobile.classList.add('hidden'), 300);
    if (line1) line1.style.transform = 'rotate(0deg) translateY(0px)';
    if (line2) line2.style.opacity = '1';
    if (line3) line3.style.transform = 'rotate(0deg) translateY(0px)';
    if (closeLine1) closeLine1.style.transform = 'rotate(0deg) translateY(0px)';
    if (closeLine2) closeLine2.style.opacity = '1';
    if (closeLine3) closeLine3.style.transform = 'rotate(0deg) translateY(0px)';
}

if (menuHamburguesa) menuHamburguesa.addEventListener('click', abrirMenu);
if (menuHamburguesaClose) menuHamburguesaClose.addEventListener('click', cerrarMenu);

navLinks.forEach(link => {
    link.addEventListener('click', cerrarMenu);
});

// CONTROL: tres cajas resumen (problemática -> solución -> oferta)
(function() {
    const boxP = document.getElementById('boxProblema');
    const boxS = document.getElementById('boxSolucion');
    const boxO = document.getElementById('boxOferta');
    const btnP = document.getElementById('btnProblema');
    const btnS = document.getElementById('btnSolucion');
    const plusP = document.getElementById('plusP');
    const arrowP = document.getElementById('arrowP');
    const plusS = document.getElementById('plusS');
    const arrowS = document.getElementById('arrowS');

    let state = 0; // 0 = solo problema, 1 = problema+solucion, 2 = las tres

    function show(el) {
        if (!el) return;
        el.classList.remove('opacity-0','pointer-events-none','scale-95');
        el.classList.add('opacity-100','pointer-events-auto','scale-100');
        el.style.maxHeight = el.scrollHeight + 'px';
    }

    function hide(el) {
        if (!el) return;
        el.classList.add('opacity-0','pointer-events-none','scale-95');
        el.classList.remove('opacity-100','pointer-events-auto','scale-100');
        el.style.maxHeight = '0px';
    }

    function equalizeHeights() {
        if (!boxP || !boxS || !boxO) return;

        // Solo en desktop (md+)
        if (window.innerWidth < 768) {
            boxP.style.minHeight = 'auto';
            boxS.style.minHeight = 'auto';
            boxO.style.minHeight = 'auto';
            return;
        }

        // Resetear alturas temporalmente para medir contenido real
        boxP.style.minHeight = 'auto';
        boxS.style.minHeight = 'auto';
        boxO.style.minHeight = 'auto';

        // Force reflow
        void boxP.offsetHeight;

        // Medir alturas
        const heightP = boxP.scrollHeight;
        const heightS = boxS.scrollHeight;
        const heightO = boxO.scrollHeight;

        // Encontrar la máxima
        const maxHeight = Math.max(heightP, heightS, heightO);

        // Aplicar la altura máxima a todas
        boxP.style.minHeight = maxHeight + 'px';
        boxS.style.minHeight = maxHeight + 'px';
        boxO.style.minHeight = maxHeight + 'px';
    }

    function applyState() {
        if (!boxP || !boxS || !boxO) return;

        if (state === 0) {
            // only problema visible
            show(boxP); hide(boxS); hide(boxO);
        } else if (state === 1) {
            // problema + solucion
            show(boxP); show(boxS); hide(boxO);
        } else if (state === 2) {
            // all three
            show(boxP); show(boxS); show(boxO);
        }

        // Icon swap
        if (state >= 1) {
            if (plusP) plusP.classList.add('hidden');
            if (arrowP) arrowP.classList.remove('hidden');
        } else {
            if (plusP) plusP.classList.remove('hidden');
            if (arrowP) arrowP.classList.add('hidden');
        }

        if (state >= 2) {
            if (plusS) plusS.classList.add('hidden');
            if (arrowS) arrowS.classList.remove('hidden');
        } else {
            if (plusS) plusS.classList.remove('hidden');
            if (arrowS) arrowS.classList.add('hidden');
        }

        // Sincronizar alturas tras cambio de estado
        setTimeout(equalizeHeights, 50);
    }

    // initial: only problem visible
    applyState();

    // blinking attention: remove pulse on first interaction
    if (btnP) {
        const removePulse = () => { btnP.classList.remove('animate-pulse'); btnP.removeEventListener('click', removePulse); };
        btnP.addEventListener('click', removePulse);
    }

    if (btnP) btnP.addEventListener('click', () => {
        if (state === 0) state = 1; else state = Math.max(0, state - 1);
        applyState();
    });

    if (btnS) btnS.addEventListener('click', () => {
        if (state === 1) state = 2; else state = Math.max(1, state - 1);
        applyState();
    });

    // ensure layout updates on resize (in case user changes device width)
    window.addEventListener('resize', () => setTimeout(applyState, 80));

    // Sincronizar alturas al cargar la página
    setTimeout(equalizeHeights, 100);
})();
