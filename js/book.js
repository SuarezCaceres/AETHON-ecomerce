/**
 * libro-detalle.js
 * Maneja: carga de componentes, toggle de genre tags y carrusel "You may also like".
 */

/* ════════════════════════════════════════
   CARGA DE COMPONENTES (navbar / footer)
════════════════════════════════════════ */
function loadComponent(url, elementId) {
    fetch(url)
        .then(r => r.text())
        .then(data => { document.getElementById(elementId).innerHTML = data; })
        .catch(err => console.error('Error cargando ' + url + ':', err));
}

document.addEventListener('DOMContentLoaded', function () {

    loadComponent('navbar.html',  'navbar-placeholder');
    loadComponent('footer.html',  'footer-placeholder');

    /* ════════════════════════════════════════
       GENRE TAG PILLS — toggle activo
    ════════════════════════════════════════ */
    document.querySelectorAll('.htag').forEach(tag => {
        tag.addEventListener('click', function () {
            document.querySelectorAll('.htag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* ════════════════════════════════════════
       CARRUSEL "YOU MAY ALSO LIKE"
    ════════════════════════════════════════ */
    const track  = document.getElementById('alsoTrack');
    const books  = track ? [...track.querySelectorAll('.also-book')] : [];
    let offset   = 0;

    function getVisible() {
        if (window.innerWidth < 576)  return 2;
        if (window.innerWidth < 992)  return 3;
        return 5;
    }

    function clamp(v) {
        const visible = getVisible();
        return Math.max(0, Math.min(v, books.length - visible));
    }

    function render() {
        const visible = getVisible();
        const pct = 100 / visible;

        books.forEach((book, i) => {
            book.style.flex      = `0 0 ${pct}%`;
            book.style.transform = `translateX(${(i - offset) * 100}%)`;
            book.style.transition = 'transform 0.35s ease';
        });
    }

    const prevBtn = document.getElementById('alsoPrev');
    const nextBtn = document.getElementById('alsoNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            offset = clamp(offset - 1);
            render();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            offset = clamp(offset + 1);
            render();
        });
    }

    window.addEventListener('resize', () => {
        offset = clamp(offset);
        render();
    });

    render();

});