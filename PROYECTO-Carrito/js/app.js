//Variables
const curso = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articuloCarrito = [];

ejecutarEventos();

function ejecutarEventos() {
    curso.addEventListener("click", agregarCurso);

    //Eliminar un curso del carrito
    carrito.addEventListener("click", eliminarCurso);

    //vaciar carrito de compras
    vaciarCarrito.addEventListener('click', () => {
        articuloCarrito = [];
        limpiarHTML();
    });
}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const selectInf = e.target.parentElement.parentElement;

        leerDatos(selectInf);
    }
}


function leerDatos(curso) {

    const dateCursos = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //verificar si ya existe el curso
    const existe = articuloCarrito.some(curso => curso.id === dateCursos.id);
    if (existe) {
        const cursos = articuloCarrito.map(curso => {
            if (curso.id === dateCursos.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articuloCarrito = [...cursos];
    } else {
        articuloCarrito = [...articuloCarrito, dateCursos];
    }


    //agregar datos al carrito
    agregarDatos();
}

function agregarDatos() {
    //limpiar html
    limpiarHTML();

    //agregar los datos
    articuloCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src=${imagen} width=150px></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href=# class="borrar-curso" data-id="${id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function eliminarCurso(e) {

    if (e.target.classList.contains("borrar-curso")) {
        articuloCarrito = articuloCarrito.filter(curso => curso.id != e.target.getAttribute('data-id'));
        agregarDatos();
    }
}


//limpiar el html del carrito anterior
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}