// Declaro los arrays necesarios
//cuando envio el carrito al Local debo actualizar para que se vean los modificaciones
let carrito = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : []; 
let productosJSON = [];
carrito = [];

obtenerJSON();
//cargo los productos 
function renderizarProductos() {
//recorro el array de productos y creo la tabla
	for(const producto of productosJSON) {
		document.querySelector(".milista").innerHTML += (`<li class="col-sm-4 poster">
        <h3 class=idPoster> ID ${producto.id} </h3>
        <img class="fotoPoster" src=${producto.foto} width="250" height="250">
        <p class=descPoster> DESCRIPCIÓN: ${producto.nombre}</p>
        <p class=precioPoster><strong> $${producto.precio} </strong></p>
        <button class='btn btn-dark' id='btn${producto.id}'>Comprar</button>
        </li>`);
	}
	//eventos
	for (const producto of productosJSON) {
		//Evento para cada boton, agrega el producto al carrito llamando a la funcion
		document.querySelector(`#btn${producto.id}`).addEventListener("click", function () {
			agregarAlCarrito(producto);
		});
	};
}

//creo los constructores
class ProductoCarrito {
    constructor(objProd) {
        this.id = objProd.id;
        this.foto = objProd.foto;
        this.nombre = objProd.nombre;
        this.precio = objProd.precio;
        this.cantidad = 1;
    }
}

//agrego productos al carrito
function agregarAlCarrito(productoNuevo) {
	//busco el producto nuevo si no esta en el carrito lo creo
	let encontrado = carrito.find(p => p.id == productoNuevo.id);
	console.log(encontrado);
    if (encontrado == undefined) {
	let prodACarrito = new ProductoCarrito(productoNuevo);
	carrito.push(prodACarrito);
	console.log(...carrito);
	Swal.fire("Poster", "Agregado al carrito", "success");

	//envio los valores del producto a la tabla del carrito
	document.querySelector("#tablabody").innerHTML += (`
    <tr id='fila${prodACarrito.id}'>
        <td>${prodACarrito.id}</td>
        <td>${prodACarrito.nombre}</td>
		<td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
        <td>${prodACarrito.precio}</td>
        <td> <button class="btn btn-light" onclick='eliminar(${productoNuevo.id})'> <i class="fa fa-trash"></i></button>
		</td>
    </tr>`);
	} else {
		//obtengo la cantidad de los productos
		let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        document.getElementById(productoNuevo.id).innerHTML= carrito[posicion].cantidad;
		Swal.fire("Poster", "Agregado al carrito", "success");
    }
	//mando el carrito al local pasandolo a json
	localStorage.setItem("carrito", JSON.stringify(carrito));
	document.querySelector("#gastoTotal").innerHTML=(`Total: $ ${calcularTotal()}`);
	}


//eliminar elementos del carrito
function eliminar(id){
    let indice=carrito.findIndex(prod => prod.id==id);
    carrito.splice(indice,1);
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);
	// calculo el total luego de borrar un producto
    document.querySelector("#gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
}


//calcular total
function calcularTotal(){
	let suma = 0;
	//recorro el carrito y luego calculo el total dependiendo de la cantidad
	for(const elemento of carrito){
		suma = suma + (elemento.precio * elemento.cantidad);
	}
	return suma;
}

//botones
let botones = document.getElementsByClassName("btn btn-dark");
for(const boton of botones){
    boton.onmouseover = () => {
        boton.className = "btn btn-light";
    }
    boton.onmouseout = () => {
        boton.className = "btn btn-dark";
    }
}


// Al finalizar la compra, lanza el mensaje
// pero también borramos el contenido de la tabla para simular
// la finalización
let finalizar = document.getElementById("finalizarP");
finalizar.onclick = () => {
	Swal.fire({
		title: "¡Pedido confirmado!",
		text: "Será preparado a la brevedad",
		imageUrl: "./img/check.png",
		imageWidth: 250,
		imageHeight: 240,
		imageAlt: "Ok image",
	});
	carrito = [];
	// Borramos el carrito del storage
	localStorage.removeItem("carrito");
	// Limpiamos el contenido de la tabla
	document.getElementById("tablabody").innerHTML = "";
	document.querySelector("#gastoTotal").innerHTML=(`Total: $ ${calcularTotal()}`);

};


//GETJSON
async function obtenerJSON() {
	const URLJSON="./productos.json"
	const resp= await fetch("productos.json")
	const data= await resp.json()
	productosJSON = data;
	renderizarProductos();
}