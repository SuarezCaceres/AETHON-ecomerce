
const libros = [
    { titulo: "Cthulhu Mythos", autor: "Lovecraft", genero: "Ciencias", etiqueta: "cálculo", precio: 120, img: "img/libro1.jpg" },
    { titulo: "Lord of Mysteries", autor: "Cuttlefish", genero: "Literatura", etiqueta: "universitario", precio: 80, img: "https://static.wikia.nocookie.net/doblaje/images/f/ff/Lord_Of_Mysteries_-_Poster.jpg/revision/latest?cb=20250621224213&path-prefix=es" },
    { titulo: "Deep Sea", autor: "Autor 1", genero: "Tecnología", etiqueta: "ingeniería", precio: 200, img: "https://m.media-amazon.com/images/M/MV5BZjUyNTM2ZjAtNWRkZi00ZDFiLWI4MDgtMTE1YTZkYTYwN2FhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { titulo: "1888", autor: "Autor 2", genero: "Literatura", etiqueta: "rápido", precio: 60, img: "https://images.cdn2.buscalibre.com/fit-in/360x360/dd/fd/ddfd42569930ef3bca4cf2af83ac4a09.jpg" },
    { titulo: "Álgebra Básica", autor: "Autor 1", genero: "Universitarios", etiqueta: "cálculo", precio: 45, img: "https://elsolucionario.net/wp-content/archivos/2018/03/algebra-basica-david-gonzales-lopez-2da-edicion.jpg" },
    { titulo: "Geometría Escolar", autor: "Autor 2", genero: "Escolares", etiqueta: "económico", precio: 30, img: "https://dojiw2m9tvv09.cloudfront.net/40745/product/img21729863307031514.png" },
    { titulo: "Diseño Arquitectónico", autor: "Autor 1", genero: "Arquitectura y Diseño", etiqueta: "maquetas", precio: 150, img: "https://storage-aws-production.publica.la/bookwire-direct-sales/issues/2024/08/B2dcUm6rpH7b086s/d56f4d3f-7e20-4bbe-9620-701f868f2ea1_cover.jpg" },
    { titulo: "Plan Lector 1", autor: "Autor 2", genero: "Infantil", etiqueta: "plan lector", precio: 35, img: "https://distribuidoranavarrete.com.pe/wp-content/uploads/PLAN-LECTOR-PRIMARIA-1.jpg" },
    { titulo: "English Basics", autor: "Autor 1", genero: "Idiomas", etiqueta: "rápido", precio: 55, img: "https://images.cdn3.buscalibre.com/fit-in/360x360/36/89/368937374a78524713bc398e9b350904.jpg" },
    { titulo: "Programación Java", autor: "Autor 2", genero: "Tecnología", etiqueta: "ingeniería", precio: 180, img: "https://images.cdn1.buscalibre.com/fit-in/360x360/67/fc/67fca7e561b62592b0027ed6c081a7cc.jpg" },
    { titulo: "Física General", autor: "Autor 1", genero: "Ciencias", etiqueta: "universitario", precio: 95, img: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1565405549l/51094275.jpg" },
    { titulo: "Historia del Arte", autor: "Autor 2", genero: "Arte", etiqueta: "económico", precio: 70, img: "https://images.cdn2.buscalibre.com/fit-in/360x360/4a/b1/4ab1d2d22c23e4c684f155ce74d3b965.jpg" },
    { titulo: "Material Didáctico", autor: "Autor 1", genero: "Material educativo", etiqueta: "económico", precio: 40, img: "https://edicionesabedul.pe/wp-content/uploads/2019/09/materialdidactico.jpg" },
    { titulo: "Cálculo Avanzado", autor: "Lovecraft", genero: "Universitarios", etiqueta: "cálculo", precio: 210, img: "https://images.cdn3.buscalibre.com/fit-in/360x360/24/fe/24fed8e53d3e94c7c7814ec01c5d17f2.jpg" },
    { titulo: "Diseño UX/UI", autor: "Cuttlefish", genero: "Tecnología", etiqueta: "rápido", precio: 130, img: "https://www.designar.cl/wp-content/uploads/2022/08/libro-ux-banner.png" }
];

const grid = document.getElementById("grid");
const contador = document.getElementById("contador");

function render(data) {
    grid.innerHTML = "";
    contador.textContent = data.length + " libros encontrados";

    data.forEach(libro => {
        grid.innerHTML += `
<div class="card">
    <img src="${libro.img}">
    <div class="card-body">
        <h4>${libro.titulo}</h4>
        <p>${libro.autor}</p>
    </div>
</div>`;
    });
}

function filtrar() {
    const genero = document.getElementById("genero").value;
    const etiqueta = document.getElementById("etiqueta").value;
    const precio = document.getElementById("precio").value;
    const autor = document.getElementById("autor").value;
    const search = document.getElementById("search").value.toLowerCase();

    let resultado = libros.filter(l =>
        (genero === "Seleccione género" || l.genero === genero) &&
        (etiqueta === "Seleccione etiqueta" || l.etiqueta === etiqueta) &&
        (autor === "Seleccione autor" || l.autor === autor) &&
        (l.titulo.toLowerCase().includes(search))
    );

    const orden = document.getElementById("orden").value;

    if (orden === "precio-asc") {
        resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
        resultado.sort((a, b) => b.precio - a.precio);
    } else if (orden === "az") {
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    render(resultado);
}

function limpiarFiltros() {
    location.reload();
}

document.querySelectorAll("select, input").forEach(el => {
    el.addEventListener("change", filtrar);
    el.addEventListener("keyup", filtrar);
});

render(libros);

const recomendadosDiv = document.getElementById("recomendados");

function renderRecomendados() {
    recomendadosDiv.innerHTML = "";

    // agarramos 5 random
    const randomLibros = [...libros].sort(() => 0.5 - Math.random()).slice(0, 5);

    randomLibros.forEach(libro => {
        recomendadosDiv.innerHTML += `
      <div class="card">
    <img src="${libro.img}">
    <div class="card-body">
        <h4>${libro.titulo}</h4>
        <p>${libro.autor}</p>
    </div>
</div>`;
    });
}

renderRecomendados();

