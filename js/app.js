//variables
const btnEnviar = document.querySelector('#enviar')
const formulario = document.querySelector('#enviar-mail')
const resetBtn = document.querySelector('#resetBtn')
//variables para inputs

const mail = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners()
function eventListeners() {
    //cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //campos del formulario
    mail.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //enviar email
    formulario.addEventListener('submit', enviarMail)

}


//funciones

function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario(e) {
    if (e.target.value.length > 0) {
        //eliminar errores
        const error = document.querySelector('p.error')
        if (error) {
            error.remove()
        }
        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    } else {
        e.target.classList.add('border', 'border-red-500')
        e.target.classList.remove(('border', 'border-green-500'))
        mostrarError('Todos los campos son obligatorios')
    }

    if (this.type === 'email') {

        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error')
            if (error) {

                error.remove()
            }
        } else {
            e.target.classList.add('border', 'border-red-500')
            e.target.classList.remove(('border', 'border-green-500'))
            mostrarError('Email no válido')
        }
    }

    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500')
    mensajeError.classList.add('error')

    const errores = document.querySelectorAll('.error')
    if (errores.length === 1) {
        formulario.appendChild(mensajeError)

    }
}

function enviarMail(e) {
    e.preventDefault()

    //mostrar spinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

    //ocultar spinner
    setTimeout(() => {
        spinner.style.display = 'none'
        const parrafo = document.createElement('p')
        parrafo.textContent = 'Se envió correctamente tu mensaje!'
        formulario.insertBefore(parrafo, spinner)
        parrafo.style.textAlign = 'center'
        parrafo.style.color = 'green'
        parrafo.style.borderColor = "green"
        parrafo.style.fontSize = '20px'
        parrafo.style.paddingBottom = '20px'


        setTimeout(() => {
            parrafo.remove()

            resetearFormulario()
        }, 3000)

    }, 3000)
};

function resetearFormulario() {
    formulario.reset()
    iniciarApp()
};
