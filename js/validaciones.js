// Validaciones para el formulario de turnos//
function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var dni = document.getElementById("dni").value;
    var email = document.getElementById("email").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var modalidad = document.getElementById("modalidad").value;
}
/* campo-error: borde rojo, fondo rojo muy claro. Indica que el campo tiene un error.
• campo-ok: borde verde, fondo verde muy claro. Indica que el campo es valido.
• mensaje-error: texto de error pequeno de color rojo, visible debajo del campo.*/

// Validar nombre
if (nombre.trim() === "") {
    document.getElementById("nombre").classList.add("campo-error");
    document.getElementById("nombre").classList.remove("campo-ok");
    document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
} else {
    document.getElementById("nombre").classList.remove("campo-error");
    document.getElementById("nombre").classList.add("campo-ok");
    document.getElementById("error-nombre").textContent = "";
}

if (apellido.trim() === "") {
    document.getElementById("apellido").classList.add("campo-error");
    document.getElementById("apellido").classList.remove("campo-ok");
    document.getElementById("error-apellido").textContent = "El apellido es obligatorio.";
} else {
    document.getElementById("apellido").classList.remove("campo-error");
    document.getElementById("apellido").classList.add("campo-ok");
    document.getElementById("error-apellido").textContent = "";
}

if (dni.trim() === "") {
    document.getElementById("dni").classList.add("campo-error");
    document.getElementById("dni").classList.remove("campo-ok");
    document.getElementById("error-dni").textContent = "El DNI es obligatorio.";
} else {
    document.getElementById("dni").classList.remove("campo-error");
    document.getElementById("dni").classList.add("campo-ok");
    document.getElementById("error-dni").textContent = "";
}
if (email.trim() === "") {
    document.getElementById("email").classList.add("campo-error");
    document.getElementById("email").classList.remove("campo-ok");
    document.getElementById("error-email").textContent = "El email es obligatorio.";
} else {
    document.getElementById("email").classList.remove("campo-error");
    document.getElementById("email").classList.add("campo-ok");
    document.getElementById("error-email").textContent = "";
}

if (fecha === "") {
    document.getElementById("fecha").classList.add("campo-error");
    document.getElementById("fecha").classList.remove("campo-ok");
    document.getElementById("error-fecha").textContent = "La fecha es obligatoria.";
} else {
    document.getElementById("fecha").classList.remove("campo-error");
    document.getElementById("fecha").classList.add("campo-ok");
    document.getElementById("error-fecha").textContent = "";
}

if (telefono.trim() === "") {
    document.getElementById("telefono").classList.add("campo-error");
    document.getElementById("telefono").classList.remove("campo-ok");
    document.getElementById("error-telefono").textContent = "El teléfono es obligatorio.";
} else {
    document.getElementById("telefono").classList.remove("campo-error");
    document.getElementById("telefono").classList.add("campo-ok");
    document.getElementById("error-telefono").textContent = "";
}


