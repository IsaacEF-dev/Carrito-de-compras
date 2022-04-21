/**Variables */
const curso = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const contentCarrito = document.querySelector("#lista-carrito tbody ");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let carritoCompras = [];

ejecutarEventos();

function ejecutarEventos() {
    curso.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarrito.addEventListener('click', () => {
        carritoCompras = [];
        agregarDatos();
    });
}

/**Funciones */
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;
        leerDatos(curso);
    }

}


/**Funcion que me permite leer los datos de un curso elegido */
function leerDatos(curso) {
    const datosCurso = {
        titulo: curso.querySelector("h4").textContent,
        imagen: curso.querySelector("img").src,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,

    }
    const existe = carritoCompras.some(curso => curso.id === datosCurso.id);
    if (existe) {
        const cursos = carritoCompras.map(curso => {
            if (curso.id === datosCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        carritoCompras = [...cursos];
    } else {
        carritoCompras = [...carritoCompras, datosCurso];
    }

    agregarDatos();
}

/**Funcion que me permite agregar el curso al carrito */
function agregarDatos() {
    limpiarHTML();
    carritoCompras.forEach(articulo => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src=${articulo.imagen} width=150px></td>
        <td>${articulo.titulo}</td>
        <td>${articulo.precio}</td>
        <td>${articulo.cantidad}</td>
        <td><a href=# class="borrar-curso" data-id="${articulo.id}">X</a></td>
        `;
        contentCarrito.appendChild(row);
    })
}

/**Funcion para eliminar un curso del carrito */
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        carritoCompras = carritoCompras.filter(curso => curso.id != e.target.getAttribute('data-id'));
        agregarDatos();
    }
}


/**Funcion que permite limpiar el carrito y evite duplicacion de cursos */
function limpiarHTML() {
    while (contentCarrito.firstChild) {
        contentCarrito.removeChild(contentCarrito.firstChild);
    }
}