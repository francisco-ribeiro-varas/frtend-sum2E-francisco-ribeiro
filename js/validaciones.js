// ===== OBJETO DE MÉDICOS POR ESPECIALIDAD =====
const medicosPorEspecialidad = {
    "clinica": ["Dr. Carlos Gómez", "Dra. María López"],
    "cardiologia": ["Dr. Juan Pérez", "Dra. Ana Torres"],
    "pediatria": ["Dra. Laura Díaz", "Dr. Pablo Soto"],
    "ginecologia": ["Dra. Valeria Romero", "Dra. Elena Castro"],
    "traumatologia": ["Dr. Sergio Ramos", "Dr. Diego Herrera"],
    "neurologia": ["Dr. Andrés Molina", "Dra. Cecilia Vargas"]
};

// ===== INICIALIZACIÓN DEL FORMULARIO =====
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioTurno');
    const especialidadSelect = document.getElementById('especialidad');
    const medicoSelect = document.getElementById('medico');
    const modalidadSelect = document.getElementById('modalidad');
    const coberturaSelect = document.getElementById('cobertura');
    const primeraVisitaCheckbox = document.getElementById('primera_visita');
    const estudiosPreviosCheckbox = document.getElementById('estudios_previos');

    // Event listeners para campos condicionales
    especialidadSelect.addEventListener('change', actualizarMedicos);
    modalidadSelect.addEventListener('change', mostrarOcultarPlataforma);
    coberturaSelect.addEventListener('change', mostrarOcultarCredencialPlan);
    primeraVisitaCheckbox.addEventListener('change', mostrarOcultarComoNosConocio);
    estudiosPreviosCheckbox.addEventListener('change', mostrarOcultarDescripcionEstudios);

    // Submit del formulario
    formulario.addEventListener('submit', validarFormulario);
});

// ===== FUNCIONES DE CAMPOS CONDICIONALES =====

/**
 * Actualiza las opciones de médicos según la especialidad seleccionada
 */
function actualizarMedicos() {
    const especialidadSelect = document.getElementById('especialidad');
    const medicoSelect = document.getElementById('medico');
    const especialidadSeleccionada = especialidadSelect.value;

    // Limpiar opciones previas (excepto la primera)
    while (medicoSelect.options.length > 1) {
        medicoSelect.remove(1);
    }

    if (especialidadSeleccionada) {
        // Habilitar el select de médicos
        medicoSelect.disabled = false;

        // Agregar nuevas opciones
        const medicos = medicosPorEspecialidad[especialidadSeleccionada];
        medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.toLowerCase().replace(/\s+/g, '_');
            option.textContent = medico;
            medicoSelect.appendChild(option);
        });
    } else {
        // Deshabilitar el select si no hay especialidad
        medicoSelect.disabled = true;
        medicoSelect.value = '';
    }

    // Limpiar mensaje de error
    document.getElementById('error-medico').textContent = '';
    medicoSelect.classList.remove('campo-error', 'campo-ok');
}

/**
 * Muestra u oculta el campo de plataforma según la modalidad
 */
function mostrarOcultarPlataforma() {
    const modalidadSelect = document.getElementById('modalidad');
    const grupoPlatforma = document.getElementById('grupo-plataforma');
    const plataformaSelect = document.getElementById('plataforma');

    if (modalidadSelect.value === 'videoconsulta') {
        grupoPlatforma.style.display = 'block';
        plataformaSelect.required = true;
    } else {
        grupoPlatforma.style.display = 'none';
        plataformaSelect.required = false;
        plataformaSelect.value = '';
        document.getElementById('error-plataforma').textContent = '';
        plataformaSelect.classList.remove('campo-error', 'campo-ok');
    }
}

/**
 * Muestra u oculta los campos de credencial y plan según la cobertura
 */
function mostrarOcultarCredencialPlan() {
    const coberturaSelect = document.getElementById('cobertura');
    const grupoCredencial = document.getElementById('grupo-credencial');
    const grupoPlan = document.getElementById('grupo-plan');
    const credencialInput = document.getElementById('numero_credencial');
    const planInput = document.getElementById('plan');

    if (coberturaSelect.value === 'particular' || coberturaSelect.value === '') {
        grupoCredencial.style.display = 'none';
        grupoPlan.style.display = 'none';
        credencialInput.required = false;
        planInput.required = false;
        credencialInput.value = '';
        planInput.value = '';
        document.getElementById('error-numero_credencial').textContent = '';
        document.getElementById('error-plan').textContent = '';
        credencialInput.classList.remove('campo-error', 'campo-ok');
        planInput.classList.remove('campo-error', 'campo-ok');
    } else {
        grupoCredencial.style.display = 'block';
        grupoPlan.style.display = 'block';
        credencialInput.required = true;
        planInput.required = true;
    }
}

/**
 * Muestra u oculta el campo "Cómo nos conoció"
 */
function mostrarOcultarComoNosConocio() {
    const primeraVisitaCheckbox = document.getElementById('primera_visita');
    const grupoConocio = document.getElementById('grupo-conocio');
    const comoNosConocioSelect = document.getElementById('como_nos_conocio');

    if (primeraVisitaCheckbox.checked) {
        grupoConocio.style.display = 'block';
        comoNosConocioSelect.required = true;
    } else {
        grupoConocio.style.display = 'none';
        comoNosConocioSelect.required = false;
        comoNosConocioSelect.value = '';
        document.getElementById('error-como_nos_conocio').textContent = '';
        comoNosConocioSelect.classList.remove('campo-error', 'campo-ok');
    }
}

/**
 * Muestra u oculta el campo "Descripción de estudios"
 */
function mostrarOcultarDescripcionEstudios() {
    const estudiosPreviosCheckbox = document.getElementById('estudios_previos');
    const grupoDescripcion = document.getElementById('grupo-descripcion-estudios');
    const descripcionTextarea = document.getElementById('descripcion_estudios');

    if (estudiosPreviosCheckbox.checked) {
        grupoDescripcion.style.display = 'block';
        descripcionTextarea.required = true;
    } else {
        grupoDescripcion.style.display = 'none';
        descripcionTextarea.required = false;
        descripcionTextarea.value = '';
        document.getElementById('error-descripcion_estudios').textContent = '';
        descripcionTextarea.classList.remove('campo-error', 'campo-ok');
    }
}

// ===== FUNCIONES DE VALIDACIÓN =====

/**
 * Valida que el campo no esté vacío
 */
function validarRequerido(valor) {
    return valor.trim() !== '';
}

/**
 * Valida que el nombre/apellido contenga solo letras y espacios
 */
function validarNombreApellido(valor) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(valor);
}

/**
 * Valida el DNI (7-8 dígitos)
 */
function validarDNI(valor) {
    const regex = /^\d{7,8}$/;
    return regex.test(valor);
}

/**
 * Valida el email
 */
function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
}

/**
 * Valida el teléfono (mínimo 8 dígitos, con +, -, espacios)
 */
function validarTelefono(valor) {
    const regex = /^[\d\+\-\s]{8,}$/;
    const soloDigitos = valor.replace(/\D/g, '');
    return soloDigitos.length >= 8;
}

/**
 * Valida la fecha de nacimiento
 */
function validarFechaNacimiento(valor) {
    if (!valor) return false;

    const fecha = new Date(valor);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();

    // Validar que no sea fecha futura
    if (fecha > hoy) return false;

    // Validar que la edad esté entre 0 y 120 años
    if (edad < 0 || edad > 120) return false;

    return true;
}

/**
 * Valida que la fecha del turno sea válida
 */
function validarFechaTurno(valor) {
    if (!valor) return false;

    const fechaTurno = new Date(valor + 'T00:00:00');
    const hoy = new Date();
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    // No puede ser fecha pasada
    if (fechaTurno < hoy) return false;

    // Debe tener al menos 24 horas de anticipación
    if (fechaTurno < mañana) return false;

    // Debe ser lunes a viernes (0=domingo, 6=sábado)
    const diaSemana = fechaTurno.getDay();
    if (diaSemana === 0 || diaSemana === 6) return false;

    return true;
}

/**
 * Valida que la hora esté dentro del horario de atención (08:00 a 20:00)
 */
function validarHoraTurno(valor) {
    if (!valor) return false;

    const [horas, minutos] = valor.split(':').map(Number);
    const horaEnMinutos = horas * 60 + minutos;

    // 08:00 = 480 minutos, 20:00 = 1200 minutos
    return horaEnMinutos >= 480 && horaEnMinutos <= 1200;
}

/**
 * Valida que el campo tenga un mínimo de caracteres
 */
function validarMinimo(valor, minimo) {
    return valor.trim().length >= minimo;
}

/**
 * Valida que la credencial tenga al menos 5 caracteres alfanuméricos
 */
function validarCredencial(valor) {
    const regex = /^[a-zA-Z0-9]{5,}$/;
    return regex.test(valor);
}

// ===== FUNCIÓN PRINCIPAL DE VALIDACIÓN =====

/**
 * Valida el formulario completo y aplica estilos correspondientes
 */
function validarFormulario(event) {
    event.preventDefault();

    let formularioValido = true;
    const errores = [];

    // Obtener todos los campos
    const campos = {
        nombre: { elemento: document.getElementById('nombre'), validar: validarNombreApellido, mensaje: 'Solo se permiten letras y espacios' },
        apellido: { elemento: document.getElementById('apellido'), validar: validarNombreApellido, mensaje: 'Solo se permiten letras y espacios' },
        dni: { elemento: document.getElementById('dni'), validar: validarDNI, mensaje: 'DNI debe tener 7-8 dígitos' },
        email: { elemento: document.getElementById('email'), validar: validarEmail, mensaje: 'Email inválido' },
        telefono: { elemento: document.getElementById('telefono'), validar: validarTelefono, mensaje: 'Teléfono inválido (mínimo 8 dígitos)' },
        fecha_nacimiento: { elemento: document.getElementById('fecha_nacimiento'), validar: validarFechaNacimiento, mensaje: 'Fecha inválida (edad 0-120 años, no futura)' },
        genero: { elemento: document.getElementById('genero'), validar: validarRequerido, mensaje: 'Debe seleccionar un género' },
        especialidad: { elemento: document.getElementById('especialidad'), validar: validarRequerido, mensaje: 'Debe seleccionar una especialidad' },
        medico: { elemento: document.getElementById('medico'), validar: validarRequerido, mensaje: 'Debe seleccionar un médico' },
        tipo_consulta: { elemento: document.getElementById('tipo_consulta'), validar: validarRequerido, mensaje: 'Debe seleccionar un tipo de consulta' },
        fecha_turno: { elemento: document.getElementById('fecha_turno'), validar: validarFechaTurno, mensaje: 'Fecha inválida (debe ser lunes-viernes, con 24h de anticipación)' },
        hora_turno: { elemento: document.getElementById('hora_turno'), validar: validarHoraTurno, mensaje: 'Hora debe estar entre 08:00 y 20:00' },
        modalidad: { elemento: document.getElementById('modalidad'), validar: validarRequerido, mensaje: 'Debe seleccionar una modalidad' },
        cobertura: { elemento: document.getElementById('cobertura'), validar: validarRequerido, mensaje: 'Debe seleccionar una cobertura' },
        motivo_consulta: { elemento: document.getElementById('motivo_consulta'), validar: (v) => validarMinimo(v, 20), mensaje: 'Mínimo 20 caracteres' }
    };

    // Campos condicionales
    if (document.getElementById('modalidad').value === 'videoconsulta') {
        campos.plataforma = { elemento: document.getElementById('plataforma'), validar: validarRequerido, mensaje: 'Debe seleccionar una plataforma' };
    }

    if (document.getElementById('cobertura').value !== 'particular' && document.getElementById('cobertura').value !== '') {
        campos.numero_credencial = { elemento: document.getElementById('numero_credencial'), validar: validarCredencial, mensaje: 'Mínimo 5 caracteres alfanuméricos' };
        campos.plan = { elemento: document.getElementById('plan'), validar: validarRequerido, mensaje: 'El plan es requerido' };
    }

    if (document.getElementById('primera_visita').checked) {
        campos.como_nos_conocio = { elemento: document.getElementById('como_nos_conocio'), validar: validarRequerido, mensaje: 'Debe indicar cómo nos conoció' };
    }

    if (document.getElementById('estudios_previos').checked) {
        campos.descripcion_estudios = { elemento: document.getElementById('descripcion_estudios'), validar: (v) => validarMinimo(v, 20), mensaje: 'Mínimo 20 caracteres' };
    }

    // Validar cada campo
    for (const [campoNombre, campoInfo] of Object.entries(campos)) {
        const elemento = campoInfo.elemento;
        const valor = elemento.value;

        if (!campoInfo.validar(valor)) {
            // Campo inválido
            elemento.classList.remove('campo-ok');
            elemento.classList.add('campo-error');
            document.getElementById(`error-${campoNombre}`).textContent = campoInfo.mensaje;
            document.getElementById(`error-${campoNombre}`).classList.add('visible');
            formularioValido = false;

            if (errores.length === 0) {
                errores.push(elemento); // Guardar el primer error para scroll
            }
        } else {
            // Campo válido
            elemento.classList.remove('campo-error');
            elemento.classList.add('campo-ok');
            document.getElementById(`error-${campoNombre}`).textContent = '';
            document.getElementById(`error-${campoNombre}`).classList.remove('visible');
        }
    }

    // Si hay errores, scroll al primer campo inválido
    if (!formularioValido) {
        if (errores.length > 0) {
            errores[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Si todo es válido, mostrar confirmación
    mostrarConfirmacion();
}

/**
 * Muestra el mensaje de confirmación del turno
 */
function mostrarConfirmacion() {
    const formulario = document.getElementById('formularioTurno');
    const confirmacion = document.getElementById('confirmacion');

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const especialidad = document.getElementById('especialidad').options[document.getElementById('especialidad').selectedIndex].text;
    const fecha = document.getElementById('fecha_turno').value;
    const hora = document.getElementById('hora_turno').value;

    // Generar número de turno
    const numeroTurno = `TURN-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

    // Convertir fecha a formato legible
    const fechaObj = new Date(fecha + 'T00:00:00');
    const fechaFormato = fechaObj.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const horaFormato = hora;

    // Llenar datos en el mensaje de confirmación
    document.getElementById('numero-turno').textContent = numeroTurno;
    document.getElementById('paciente-nombre').textContent = `${nombre} ${apellido}`;
    document.getElementById('paciente-especialidad').textContent = especialidad;
    document.getElementById('paciente-fecha-hora').textContent = `${fechaFormato} a las ${horaFormato}`;

    // Ocultar formulario y mostrar confirmación
    formulario.style.display = 'none';
    confirmacion.style.display = 'block';

    // Scroll a la confirmación
    confirmacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
