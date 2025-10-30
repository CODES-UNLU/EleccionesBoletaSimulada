/**
 * ═══════════════════════════════════════════════════════════════
 * SISTEMA DE VOTACIÓN REAL - UNLu 2025
 * ═══════════════════════════════════════════════════════════════
 * 
 * Este script captura los votos del simulador y los envía al Google Sheet
 * 
 * INTEGRACIÓN:
 * 1. Incluir este script en tus páginas de votación
 * 2. Llamar a inicializarSistemaVotacion() al cargar la página
 * 3. El sistema capturará automáticamente todas las selecciones
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════

const VOTACION_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzHuN_KAhJoQgHEqoXO06UOqS9Spf-Fv4Q5Lsm9F7zcmaRn2SgT_XMXLHU5ViO3fq3sFQ/exec',
  MODO_PRUEBA: false, // Cambiar a false para producción real
};

// ═══════════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════════

const votacionState = {
  sede: null,
  votosSeleccionados: []
};

// ═══════════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════

/**
 * Inicializa el sistema de votación
 * Llama esta función cuando cargue la página de votación
 */
function inicializarSistemaVotacion(sedeActual) {
  votacionState.sede = sedeActual;
  votacionState.votosSeleccionados = [];
  
  console.log('✅ Sistema de votación inicializado para:', sedeActual);
  
  // Agregar listeners a todos los checkboxes
  agregarListenersVotacion();
}

/**
 * Agrega listeners a todos los elementos de votación
 */
function agregarListenersVotacion() {
  document.addEventListener("DOMContentLoaded", function () {
    // Capturar clicks en checkboxes de la boleta
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
      const originalClick = checkbox.onclick;
      checkbox.addEventListener("click", function (e) {
        // Ejecutar la lógica original primero
        if (originalClick) {
          originalClick.call(this, e);
        }
        // Luego capturar el voto
        setTimeout(() => capturarVoto(checkbox), 100);
      });
    });
  });
}

/**
 * Captura un voto individual
 */
function capturarVoto(checkbox) {
  const tipo = checkbox.dataset.type;
  const lista = checkbox.dataset.lista;
  const cargo = checkbox.dataset.cargo;
  const candidato = checkbox.dataset.candidato;
  const formula = checkbox.dataset.formula;
  const agrupacion = checkbox.dataset.agrupacion;
  
  const estaSeleccionado = checkbox.classList.contains('checked');
  
  if (estaSeleccionado) {
    // Agregar voto
    const voto = construirObjetoVoto(tipo, lista, cargo, candidato, formula, agrupacion);
    votacionState.votosSeleccionados.push(voto);
    console.log('✅ Voto agregado:', voto);
  } else {
    // Remover voto
    votacionState.votosSeleccionados = votacionState.votosSeleccionados.filter(v => {
      if (tipo === 'completa') {
        return !(v.tipoVoto === 'Lista Completa' && v.listaCompleta === `Lista ${lista}`);
      } else if (tipo === 'individual') {
        return !(v.cargo === mapearCargo(cargo) && v.candidato === candidato);
      } else if (tipo === 'formula') {
        return !(v.cargo === formula && v.candidato === candidato);
      }
      return true;
    });
    console.log('❌ Voto removido');
  }
  
  console.log('📊 Total selecciones:', votacionState.votosSeleccionados.length);
}

/**
 * Construye el objeto de voto según el tipo
 */
function construirObjetoVoto(tipo, lista, cargo, candidato, formula, agrupacion) {
  if (tipo === 'completa') {
    return {
      tipoVoto: 'Lista Completa',
      listaCompleta: `Lista ${lista}`,
      cargo: 'Todos los cargos',
      candidato: '-',
      agrupacion: `Lista ${lista}`
    };
  } else if (tipo === 'individual') {
    return {
      tipoVoto: 'Individual',
      listaCompleta: '-',
      cargo: mapearCargo(cargo),
      candidato: candidato || 'Candidato',
      agrupacion: agrupacion || `Lista ${lista}`
    };
  } else if (tipo === 'formula') {
    return {
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: formula,
      candidato: candidato,
      agrupacion: agrupacion || formula
    };
  }
}

/**
 * Mapea los códigos de cargo a nombres legibles
 */
function mapearCargo(codigo) {
  const mapeo = {
    'asamblea': 'Asamblea Universitaria',
    'consejo': 'Consejo Superior',
    'basicas': 'Consejo Departamental - Ciencias Básicas',
    'sociales': 'Consejo Departamental - Ciencias Sociales',
    'educacion': 'Consejo Departamental - Educación',
    'tecnologia': 'Consejo Departamental - Tecnología',
    'asesor': 'Consejo Asesor'
  };
  return mapeo[codigo] || codigo;
}

// ═══════════════════════════════════════════════════════════════
// ENVÍO DE VOTOS
// ═══════════════════════════════════════════════════════════════

/**
 * Recolecta todos los votos marcados en la boleta
 * Se llama justo antes de enviar para asegurar que capturamos todo
 */
function recolectarVotosActuales() {
  votacionState.votosSeleccionados = [];
  
  console.log('🔍 Recolectando votos de la boleta...');
  
  // Buscar todos los checkboxes seleccionados
  const checkboxesSeleccionados = document.querySelectorAll('.checkbox.selected, .checkbox-small.selected, .formula-checkbox.selected');
  
  console.log('📊 Checkboxes seleccionados encontrados:', checkboxesSeleccionados.length);
  
  // Primero identificar qué listas tienen voto completo
  const listasCompletas = new Set();
  checkboxesSeleccionados.forEach(checkbox => {
    if (checkbox.classList.contains('checkbox') && checkbox.hasAttribute('data-type')) {
      const tipo = checkbox.getAttribute('data-type');
      const listaNumero = checkbox.getAttribute('data-lista');
      if (tipo === 'completa' && listaNumero) {
        listasCompletas.add(listaNumero);
        console.log('📋 Lista completa detectada:', listaNumero);
      }
    }
  });
  
  // Recolectar votos, omitiendo individuales de listas completas
  checkboxesSeleccionados.forEach(checkbox => {
    const voto = extraerVotoDeCheckbox(checkbox);
    if (voto) {
      // Si es un voto individual y esa lista ya tiene voto completo, omitirlo
      if (voto.tipoVoto === 'Individual') {
        const listaNumero = voto.agrupacion?.replace('Lista ', '');
        if (listasCompletas.has(listaNumero)) {
          console.log('⏭️ Voto individual omitido (lista completa ya marcada):', voto.cargo, '-', voto.candidato);
          return; // Saltar este voto
        }
      }
      
      votacionState.votosSeleccionados.push(voto);
      console.log('✅ Voto capturado:', voto);
    }
  });
  
  console.log('📋 Total de votos recolectados:', votacionState.votosSeleccionados.length);
}

/**
 * Extrae la información del voto desde un checkbox marcado
 */
function extraerVotoDeCheckbox(checkbox) {
  // Buscar el contenedor padre para obtener contexto
  const listaCard = checkbox.closest('.lista-card');
  const formulaBox = checkbox.closest('.formula-box');
  
  // CASO 1: Voto de Lista Completa
  if (checkbox.classList.contains('checkbox') && checkbox.hasAttribute('data-type')) {
    const tipo = checkbox.getAttribute('data-type');
    const listaNumero = checkbox.getAttribute('data-lista');
    
    if (tipo === 'completa' && listaNumero) {
      return {
        tipoVoto: 'Lista Completa',
        listaCompleta: `Lista ${listaNumero}`,
        cargo: 'Todos los cargos',
        candidato: '-',
        agrupacion: `Lista ${listaNumero}`
      };
    }
  }
  
  // CASO 2: Voto Individual de Candidato
  if (checkbox.classList.contains('checkbox-small') && checkbox.hasAttribute('data-type')) {
    const tipo = checkbox.getAttribute('data-type');
    const listaNumero = checkbox.getAttribute('data-lista');
    const cargoCodigo = checkbox.getAttribute('data-cargo');
    
    if (tipo === 'individual' && listaNumero && cargoCodigo) {
      // Mapear el código de cargo a nombre legible
      const mapaoCargos = {
        'asamblea': 'Asamblea Universitaria',
        'consejo': 'Consejo Superior',
        'basicas': 'Consejo Departamental - Ciencias Básicas',
        'sociales': 'Consejo Departamental - Ciencias Sociales',
        'educacion': 'Consejo Departamental - Educación',
        'tecnologia': 'Consejo Departamental - Tecnología',
        'asesor': 'Consejo Asesor'
      };
      
      const cargoTexto = mapaoCargos[cargoCodigo] || cargoCodigo;
      
      // Obtener los nombres de candidatos de la celda
      const celda = checkbox.closest('td');
      const candidatosElements = celda?.querySelectorAll('.candidato');
      const candidatos = candidatosElements ? Array.from(candidatosElements).map(el => el.textContent.trim()) : [];
      
      // Tomar solo el primer candidato como representante (quitar el "1-")
      let nombreCandidato = 'Candidatos Lista ' + listaNumero;
      if (candidatos.length > 0) {
        nombreCandidato = candidatos[0].replace(/^\d+-?\s*/, ''); // Quitar el "1- "
      }
      
      return {
        tipoVoto: 'Individual',
        listaCompleta: '-',
        cargo: cargoTexto,
        candidato: nombreCandidato,
        agrupacion: `Lista ${listaNumero}`
      };
    }
  }
  
  // CASO 3: Voto de Fórmula
  if (checkbox.classList.contains('formula-checkbox')) {
    // Buscar la celda que contiene este checkbox
    const celdaFormula = checkbox.closest('td.formula-candidatos');
    const filaFormula = checkbox.closest('tr');
    
    if (celdaFormula && filaFormula) {
      // Obtener el cargo desde la primera celda (formula-instancia)
      const celdaCargo = filaFormula.querySelector('td.formula-instancia');
      let cargoTexto = celdaCargo?.textContent.replace(/\s+/g, ' ').trim() || 'Fórmula';
      
      // Simplificar el cargo
      if (cargoTexto.includes('RECTOR')) {
        cargoTexto = 'Rector/Vicerrector';
      } else if (cargoTexto.includes('CIENCIAS BÁSICAS')) {
        cargoTexto = 'Decano Ciencias Básicas';
      } else if (cargoTexto.includes('CIENCIAS SOCIALES')) {
        cargoTexto = 'Decano Ciencias Sociales';
      } else if (cargoTexto.includes('EDUCACIÓN')) {
        cargoTexto = 'Decano Educación';
      } else if (cargoTexto.includes('TECNOLOGÍA')) {
        cargoTexto = 'Decano Tecnología';
      }
      
      // Obtener los nombres de la fórmula (están en div.formula-nombre dentro de esta celda)
      const nombresElements = celdaFormula.querySelectorAll('.formula-nombre');
      const nombres = Array.from(nombresElements).map(el => el.textContent.trim());
      
      // Crear nombre corto de la fórmula (primer apellido de cada uno)
      const apellidos = nombres.map(nombre => {
        const partes = nombre.split(',');
        return partes[0].trim(); // Primer apellido
      });
      const nombreCorto = apellidos.join(' / ');
      
      // Detectar si hay letra (A o B)
      const dataFormula = checkbox.getAttribute('data-formula') || '';
      const todasLasCeldas = Array.from(filaFormula.querySelectorAll('td.formula-candidatos'));
      const indiceCelda = todasLasCeldas.indexOf(celdaFormula);
      
      let agrupacion = `Fórmula: ${nombreCorto}`;
      if (todasLasCeldas.length > 1) {
        // Hay más de una opción, usar letras
        const letra = String.fromCharCode(65 + indiceCelda); // A, B, C...
        agrupacion = `Fórmula ${letra}: ${nombreCorto}`;
      }
      
      return {
        tipoVoto: 'Fórmula',
        listaCompleta: '-',
        cargo: cargoTexto,
        candidato: nombreCorto,
        agrupacion: agrupacion
      };
    }
  }
  
  console.warn('⚠️ No se pudo determinar el tipo de voto para:', checkbox);
  return null;
}

/**
 * Envía los votos al Google Sheet
 * Llama esta función cuando el usuario confirme su voto
 */
async function enviarVotosAlSheet() {
  if (!votacionState.sede) {
    mostrarNotificacion('error', '⚠️ Error: No se detectó la sede');
    return false;
  }
  
  // Recolectar votos al momento de confirmar
  recolectarVotosActuales();
  
  // Permitir voto en blanco
  if (votacionState.votosSeleccionados.length === 0) {
    const confirmarBlanco = confirm('No has realizado ninguna selección.\n\n¿Deseas enviar un voto en blanco?');
    if (!confirmarBlanco) {
      return false;
    }
  }
  
  // Confirmar antes de enviar
  const confirmacion = await confirmarEnvio();
  if (!confirmacion) {
    return false;
  }
  
  try {
    console.log('📤 Enviando votos al Sheet...', {
      sede: votacionState.sede,
      totalVotos: votacionState.votosSeleccionados.length
    });
    
    const payload = {
      sede: votacionState.sede,
      votos: votacionState.votosSeleccionados
    };
    
    const response = await fetch(VOTACION_CONFIG.SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Necesario para Google Apps Script
      body: JSON.stringify(payload)
    });
    
    // Con no-cors no podemos leer la respuesta, pero si llegó aquí, se envió
    console.log('✅ Votos enviados correctamente');
    
    mostrarNotificacion('success', '🗳️ Contamos con tu voto el 12 de noviembre');
    
    // Limpiar el estado
    votacionState.votosSeleccionados = [];
    
    // Opcional: Deshabilitar la boleta después de votar
    deshabilitarBoleta();
    
    return true;
    
  } catch (error) {
    console.error('❌ Error al enviar votos:', error);
    mostrarNotificacion('error', '❌ Error al enviar el voto. Por favor, intenta nuevamente.');
    return false;
  }
}

/**
 * Confirma con el usuario antes de enviar
 */
async function confirmarEnvio() {
  if (votacionState.votosSeleccionados.length === 0) {
    // Es un voto en blanco, ya fue confirmado antes
    const mensaje = `
¿Confirmas enviar el voto en blanco?

Sede: ${votacionState.sede}

⚠️ Una vez enviado, no podrás modificarlo.
    `.trim();
    return confirm(mensaje);
  }
  
  const mensaje = `
¿Los datos son correctos?

Sede: ${votacionState.sede}
Total de selecciones: ${votacionState.votosSeleccionados.length}

⚠️ Una vez enviado, no podrás modificarlo.
  `.trim();
  
  return confirm(mensaje);
}

/**
 * Deshabilita la boleta después de votar
 */
function deshabilitarBoleta() {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(cb => {
    cb.style.pointerEvents = 'none';
    cb.style.opacity = '0.5';
  });
}

// ═══════════════════════════════════════════════════════════════
// UI / NOTIFICACIONES
// ═══════════════════════════════════════════════════════════════

/**
 * Muestra una notificación al usuario
 */
function mostrarNotificacion(tipo, mensaje) {
  // Crear elemento de notificación
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 20px 30px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  
  if (tipo === 'success') {
    notif.style.background = '#4caf50';
    notif.style.color = 'white';
  } else if (tipo === 'error') {
    notif.style.background = '#f44336';
    notif.style.color = 'white';
  } else {
    notif.style.background = '#ff9800';
    notif.style.color = 'white';
  }
  
  notif.textContent = mensaje;
  document.body.appendChild(notif);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 5000);
}

/**
 * Muestra/oculta el loading
 * (Deshabilitado - no mostrar mensajes de carga)
 */
function mostrarLoading(mostrar) {
  // No hacer nada
}

// ═══════════════════════════════════════════════════════════════
// AGREGAR ANIMACIONES CSS
// ═══════════════════════════════════════════════════════════════

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════════
// EXPORTAR FUNCIONES PRINCIPALES
// ═══════════════════════════════════════════════════════════════

console.log('📋 Sistema de votación cargado correctamente');

