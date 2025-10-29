/**
 * ═══════════════════════════════════════════════════════════════
 * SCRIPT PARA ENVIAR VOTOS DESDE TU FORMULARIO
 * ═══════════════════════════════════════════════════════════════
 * 
 * Incluye este script en tu página de votación (boleta-template.html o seleccion-sede.html)
 * 
 * USO:
 * 1. Reemplaza SCRIPT_URL con la URL de tu Google Apps Script
 * 2. Cuando el usuario termine de votar, llama a enviarVotos()
 * 3. El sistema guardará todas las selecciones en el Sheet
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════

const SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';

// ═══════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════

/**
 * Envía los votos al Google Sheet
 * @param {string} sede - Sede donde se votó (Luján, Campana, etc.)
 * @param {Array} votosRealizados - Array con todos los votos
 */
async function enviarVotos(sede, votosRealizados) {
  try {
    console.log('📤 Enviando votos...', votosRealizados);
    
    const payload = {
      sede: sede,
      votos: votosRealizados
    };
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('✅ Votos enviados correctamente');
    mostrarExito('¡Votos registrados exitosamente!');
    return true;
    
  } catch (error) {
    console.error('❌ Error al enviar votos:', error);
    mostrarError('Error al registrar votos. Por favor, intenta nuevamente.');
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════
// EJEMPLOS DE USO
// ═══════════════════════════════════════════════════════════════

/**
 * EJEMPLO 1: Voto de Lista Completa
 */
function ejemploListaCompleta() {
  const sede = 'Luján'; // Obtener de un selector en tu página
  
  const votos = [
    {
      tipoVoto: 'Lista Completa',
      listaCompleta: 'Lista 110',
      cargo: '-',
      candidato: '-',
      agrupacion: 'Lista 110'
    }
  ];
  
  enviarVotos(sede, votos);
}

/**
 * EJEMPLO 2: Votos Individuales por Cargo
 */
function ejemploVotosIndividuales() {
  const sede = 'Campana';
  
  const votos = [
    {
      tipoVoto: 'Individual',
      listaCompleta: '-',
      cargo: 'Asamblea Universitaria',
      candidato: 'Juan Pérez',
      agrupacion: 'Lista 110'
    },
    {
      tipoVoto: 'Individual',
      listaCompleta: '-',
      cargo: 'Consejo Superior',
      candidato: 'María García',
      agrupacion: 'Lista 110'
    },
    {
      tipoVoto: 'Individual',
      listaCompleta: '-',
      cargo: 'Consejo Departamental Sistemas',
      candidato: 'Pedro López',
      agrupacion: 'Lista 110'
    }
  ];
  
  enviarVotos(sede, votos);
}

/**
 * EJEMPLO 3: Votos de Fórmulas
 */
function ejemploVotosFormulas() {
  const sede = 'San Miguel';
  
  const votos = [
    {
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Rector/Vicerrector',
      candidato: 'Carlos Rodríguez / Ana Martínez',
      agrupacion: 'Lista 110 - Fórmula 1'
    },
    {
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Decano/Vicedecano Sistemas',
      candidato: 'Diego Sánchez / Laura Fernández',
      agrupacion: 'Lista 110 - Fórmula A'
    }
  ];
  
  enviarVotos(sede, votos);
}

/**
 * EJEMPLO 4: Voto Mixto (Lista + algunas fórmulas individuales)
 */
function ejemploVotoMixto() {
  const sede = 'Chivilcoy';
  
  const votos = [
    // Votó lista completa
    {
      tipoVoto: 'Lista Completa',
      listaCompleta: 'Lista 110',
      cargo: 'Todos los cargos',
      candidato: '-',
      agrupacion: 'Lista 110'
    },
    // Pero cambió la fórmula de Rector
    {
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Rector/Vicerrector',
      candidato: 'Otra Fórmula',
      agrupacion: 'Lista 110 - Fórmula 2'
    }
  ];
  
  enviarVotos(sede, votos);
}

// ═══════════════════════════════════════════════════════════════
// INTEGRACIÓN CON TU FORMULARIO EXISTENTE
// ═══════════════════════════════════════════════════════════════

/**
 * Captura los votos del formulario y los envía
 * Adapta esta función según la estructura de tu HTML
 */
function capturarYEnviarVotosDelFormulario() {
  // 1. Obtener la sede seleccionada
  const sedeSelect = document.querySelector('select[name="sede"]');
  if (!sedeSelect || !sedeSelect.value) {
    alert('⚠️ Por favor selecciona una sede');
    return;
  }
  const sede = sedeSelect.value;
  
  // 2. Recopilar todos los votos
  const votosRealizados = [];
  
  // 2a. Verificar si votó lista completa
  const listaCompletaCheckbox = document.querySelector('input[name="lista_completa"]:checked');
  if (listaCompletaCheckbox) {
    votosRealizados.push({
      tipoVoto: 'Lista Completa',
      listaCompleta: listaCompletaCheckbox.value,
      cargo: 'Todos los cargos',
      candidato: '-',
      agrupacion: listaCompletaCheckbox.value
    });
  } else {
    // 2b. Recopilar votos individuales por cargo
    
    // Asamblea Universitaria
    const asambleaCheckboxes = document.querySelectorAll('input[name="asamblea_universitaria"]:checked');
    asambleaCheckboxes.forEach(cb => {
      votosRealizados.push({
        tipoVoto: 'Individual',
        listaCompleta: '-',
        cargo: 'Asamblea Universitaria',
        candidato: cb.dataset.candidato || cb.value,
        agrupacion: cb.dataset.agrupacion || 'Lista 110'
      });
    });
    
    // Consejo Superior
    const consejoCheckboxes = document.querySelectorAll('input[name="consejo_superior"]:checked');
    consejoCheckboxes.forEach(cb => {
      votosRealizados.push({
        tipoVoto: 'Individual',
        listaCompleta: '-',
        cargo: 'Consejo Superior',
        candidato: cb.dataset.candidato || cb.value,
        agrupacion: cb.dataset.agrupacion || 'Lista 110'
      });
    });
    
    // Consejo Departamental
    const deptoCheckboxes = document.querySelectorAll('input[name="consejo_departamental"]:checked');
    deptoCheckboxes.forEach(cb => {
      votosRealizados.push({
        tipoVoto: 'Individual',
        listaCompleta: '-',
        cargo: 'Consejo Departamental Sistemas',
        candidato: cb.dataset.candidato || cb.value,
        agrupacion: cb.dataset.agrupacion || 'Lista 110'
      });
    });
  }
  
  // 2c. Recopilar votos de fórmulas (siempre se votan, independiente de lista completa)
  
  // Rector/Vicerrector
  const rectorRadio = document.querySelector('input[name="rector"]:checked');
  if (rectorRadio) {
    votosRealizados.push({
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Rector/Vicerrector',
      candidato: rectorRadio.dataset.candidato || rectorRadio.value,
      agrupacion: rectorRadio.dataset.agrupacion || 'Lista 110'
    });
  }
  
  // Decano/Vicedecano
  const decanoRadio = document.querySelector('input[name="decano"]:checked');
  if (decanoRadio) {
    votosRealizados.push({
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Decano/Vicedecano Sistemas',
      candidato: decanoRadio.dataset.candidato || decanoRadio.value,
      agrupacion: decanoRadio.dataset.agrupacion || 'Lista 110'
    });
  }
  
  // 3. Validar que haya al menos un voto
  if (votosRealizados.length === 0) {
    alert('⚠️ No has realizado ninguna selección');
    return;
  }
  
  // 4. Confirmar antes de enviar
  const confirmar = confirm(
    `¿Confirmas tu voto?\n\n` +
    `Sede: ${sede}\n` +
    `Selecciones realizadas: ${votosRealizados.length}\n\n` +
    `Una vez confirmado, no podrás modificarlo.`
  );
  
  if (!confirmar) {
    return;
  }
  
  // 5. Enviar los votos
  enviarVotos(sede, votosRealizados);
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════════

function mostrarExito(mensaje) {
  alert('✅ ' + mensaje);
  // O usa tu sistema de notificaciones personalizado
}

function mostrarError(mensaje) {
  alert('❌ ' + mensaje);
  // O usa tu sistema de notificaciones personalizado
}

// ═══════════════════════════════════════════════════════════════
// AGREGAR A TU BOTÓN DE ENVÍO
// ═══════════════════════════════════════════════════════════════

/*
En tu HTML, agrega esto al botón de "Confirmar Voto":

<button onclick="capturarYEnviarVotosDelFormulario()">
  ✅ Confirmar Voto
</button>

O si ya tienes un botón:

document.getElementById('btnConfirmar').addEventListener('click', function() {
  capturarYEnviarVotosDelFormulario();
});
*/

// ═══════════════════════════════════════════════════════════════
// FORMATO DEL SHEET RESULTANTE
// ═══════════════════════════════════════════════════════════════

/*
Cada voto generará una fila como esta:

Timestamp             | Sede    | Tipo de Voto | Lista Completa | Cargo                  | Candidato Votado      | Agrupación
---------------------|---------|--------------|----------------|------------------------|----------------------|------------------
29/10/2025 19:30:15  | Luján   | Lista Completa| Lista 110     | Todos los cargos       | -                    | Lista 110
29/10/2025 19:31:22  | Campana | Individual   | -              | Asamblea Universitaria | Juan Pérez           | Lista 110
29/10/2025 19:31:22  | Campana | Individual   | -              | Consejo Superior       | María García         | Lista 110
29/10/2025 19:31:22  | Campana | Fórmula      | -              | Rector/Vicerrector     | Rodríguez / Martínez | Lista 110 - F1

CON ESTO PUEDES ANALIZAR:
- ¿Cuántos votaron lista completa vs individual?
- ¿Qué cargos son más votados?
- ¿Qué candidatos específicos prefieren?
- ¿Qué fórmulas son más populares?
- ¿Diferencias entre sedes?
*/

