//Valido el formulario

const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

//expresiones para verificar los campos correctamente
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

//creo el objeto inicializado para luego usarlo en la funcion del mensaje de exito/error
const campos = {
    Nombre: false,
    Correo: false
}

//llamo a la funcion validarCampos para verificar el formulario
//paso los parametros de ambos campos
//se activa cuando escribimos en los inputs
const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            validarCampos(expresiones.nombre, e.target, 'Nombre');
        break;
        case "email":
            validarCampos(expresiones.correo, e.target, 'Correo');
        break;
    }
}

//Tomo los parametros y mediante clases se va modificando el formulario
const validarCampos = (expresion, input, campo) => {
    //si los campos cumplen con las expresiones declaradas se ejecuta este parte
    if(expresion.test(input.value)){
        document.getElementById(`grupo${campo}`).classList.remove('formularioGrupoIncorrecto');
        document.getElementById(`grupo${campo}`).classList.add('formularioGrupoCorrecto');
        document.querySelector(`#grupo${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo${campo} .formularioInputError`).classList.remove('formularioInputErrorActivo');
        campos[campo] = true;
    //si los campos no cumplen con las expresiones declaradas se ejecuta este parte
    //cuando se cumple vuelve al if y elimina sus clases de error
    } else {
        // document.getElementById('grupoNombre').classList.remove('formularioGrupoCorrecto');
        document.getElementById(`grupo${campo}`).classList.add('formularioGrupoIncorrecto');
        document.getElementById(`grupo${campo}`).classList.remove('formularioGrupoCorrecto');
        document.querySelector(`#grupo${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo${campo} .formularioInputError`).classList.add('formularioInputErrorActivo');
        campos[campo] = false;
    }
}

//llamo a funcion validarFormulario cuando levanto una tecla o toco fuera del input
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

//Largo un mensaje de error o de exito mediante una funcion cuando se da click en el boton enviar
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //Si los campos son true largo un mensaje de exito que dura 3s, elimino los iconos y reinicio el formulario
    if(campos.Nombre && campos.Correo){
        formulario.reset();

        document.getElementById('formularioMensajeExito').classList.add('formularioMensajeExitoActivo');
        setTimeout(() => {
            document.getElementById('formularioMensajeExito').classList.remove('formularioMensajeExitoActivo');
        }, 3000);
        document.getElementById('formularioMensaje').classList.remove('formularioMensajeActivo');
        document.querySelectorAll('.formularioGrupoCorrecto').forEach((icono) => {
            icono.classList.remove('formularioGrupoCorrecto');
        });
    //Si los campos son false largo un mensaje de error que se va cuando enviamos bien el formulario
    } else {
        document.getElementById('formularioMensaje').classList.add('formularioMensajeActivo');
    }
});