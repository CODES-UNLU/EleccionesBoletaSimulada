/**
 * ═══════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT - SISTEMA DE VOTACIÓN UNLu 2025
 * ═══════════════════════════════════════════════════════════════
 * 
 * INSTALACIÓN:
 * 1. Crea un nuevo Google Sheet
 * 2. Ve a: Extensiones → Apps Script
 * 3. Copia y pega TODO este código
 * 4. Guarda (Ctrl+S)
 * 5. Click en "Implementar" → "Nueva implementación"
 * 6. Tipo: "Aplicación web"
 * 7. Ejecutar como: "Yo"
 * 8. Quién tiene acceso: "Cualquier usuario"
 * 9. Click "Implementar"
 * 10. Copia la URL generada (la necesitarás para el dashboard)
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  SHEET_NAME: 'Votos',
  TIMEZONE: 'America/Argentina/Buenos_Aires',
  COLUMNS: [
    'Timestamp',
    'Sede',
    'Tipo de Voto',
    'Lista Completa',
    'Cargo',
    'Candidato Votado',
    'Agrupación'
  ]
};

// ═══════════════════════════════════════════════════════════════
// INICIALIZACIÓN AUTOMÁTICA DEL SHEET
// ═══════════════════════════════════════════════════════════════

/**
 * Se ejecuta automáticamente al abrir el Sheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Sistema de Votación')
    .addItem('🔧 Inicializar Sistema', 'inicializarSistema')
    .addItem('📈 Ver Estadísticas', 'mostrarEstadisticas')
    .addItem('🔄 Limpiar Votos de Prueba', 'limpiarVotosPrueba')
    .addSeparator()
    .addItem('📋 Obtener URL del Dashboard', 'mostrarURLDashboard')
    .addToUi();
}

/**
 * Inicializa el sistema: crea la hoja y los encabezados
 */
function inicializarSistema() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (!ss) {
      throw new Error('No hay spreadsheet activo. Asegúrate de ejecutar este script desde un Google Sheet (Extensiones → Apps Script)');
    }
    
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  // Crear hoja si no existe
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    Logger.log('✅ Hoja "' + CONFIG.SHEET_NAME + '" creada');
  }
  
  // Verificar si ya tiene encabezados
  if (sheet.getLastRow() === 0) {
    // Crear encabezados
    sheet.appendRow(CONFIG.COLUMNS);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, CONFIG.COLUMNS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#667eea');
    headerRange.setFontColor('#ffffff');
    headerRange.setHorizontalAlignment('center');
    
    // Ajustar ancho de columnas
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 120); // Lista
    sheet.setColumnWidth(3, 120); // Sede
    sheet.setColumnWidth(4, 200); // Cargo
    
    // Congelar fila de encabezados
    sheet.setFrozenRows(1);
    
    // Agregar datos de ejemplo
    agregarDatosEjemplo(sheet);
    
    SpreadsheetApp.getUi().alert(
      '✅ Sistema Inicializado\n\n' +
      'Se creó la hoja "' + CONFIG.SHEET_NAME + '" con:\n' +
      '- Encabezados formateados\n' +
      '- 10 votos de ejemplo\n\n' +
      'Ahora puedes:\n' +
      '1. Implementar este script como Web App\n' +
      '2. Usar la URL en tu dashboard'
    );
  } else {
    SpreadsheetApp.getUi().alert(
      '⚠️ Sistema Ya Inicializado\n\n' +
      'La hoja "' + CONFIG.SHEET_NAME + '" ya existe con datos.\n\n' +
      'Si quieres reiniciar, elimina la hoja manualmente primero.'
    );
  }
  } catch (error) {
    Logger.log('❌ Error en inicializarSistema:', error);
    SpreadsheetApp.getUi().alert(
      '❌ Error al inicializar\n\n' +
      error.message + '\n\n' +
      '🔧 Solución:\n' +
      '1. Asegúrate de abrir este script desde el Google Sheet\n' +
      '2. Ve al Sheet: Extensiones → Apps Script\n' +
      '3. Ejecuta la función desde ahí'
    );
  }
}

/**
 * 🎯 DATOS REALES DE LAS ELECCIONES UNLu 2025
 * Fuente: datos-elecciones.json oficial
 */
const DATOS_REALES = {
  sedes: ['LUJÁN', 'Centro Regional CHIVILCOY', 'Centro Regional SAN MIGUEL', 'Centro Regional CAMPANA', 'Delegación SAN FERNANDO'],
  listas: ['110', '117', '101', '111'],
  
  candidatos: {
    '110': {
      'Asamblea Universitaria': ['PANESSI LUCILA', 'PEREZ EMILIANO F.', 'PIERDOMENICO VANESA S.', 'LOBO MARCOS J.', 'KAMM BRENDA N.', 'ROCHA JAVIER A.'],
      'Consejo Superior': ['FREITA FRANCO E.', 'IGLESIAS VALERIA M.', 'RESSIA J. JESUS', 'ARINA ELOISA F.', 'CARPANCHAY FRANCO M.'],
      'Consejo Departamental - Ciencias Básicas': ['VACCARO GIANFRANCO', 'LASALA MICAELA', 'CORONEL BAREIRO ALFREDO'],
      'Consejo Departamental - Ciencias Sociales': ['LENCINA THIAGO S.', 'VEGA MICAELA E.', 'EMANUELE JAN E.'],
      'Consejo Departamental - Educación': ['CASSE CLAUDIA M.', 'DOMINGUEZ PROVENZANO M.', 'PERTICARARI YESICA L.'],
      'Consejo Departamental - Tecnología': ['CIRULLI FATIMA D.', 'CRUZ MAXIMO N.', 'PORTUGUEZ CAIPE ELIZABETH D.'],
      'Consejo Asesor': ['RESSIA J. JESUS', 'RIZZO FEDERICO S.', 'BASALDUA SARA B.', 'PEREZ EMILIANO F.']
    },
    '117': {
      'Asamblea Universitaria': ['LUCERO LORENA P.', 'MANTIÑAN CRISTIAN U.', 'RODRIGUEZ JULIETA B.', 'YAHARI CORVALAN MATIAS I.', 'BARBOSA ROMINA E.', 'ANDRADA ELIO J.'],
      'Consejo Superior': ['NUÑEZ KAREN G.', 'ALVAREZ MARTIN', 'PIANALTO AZUL D.', 'MONTERO SATLER IVAN L.', 'PANIAGUA SOFIA M.'],
      'Consejo Departamental - Ciencias Básicas': ['CABRERA MARTIN O.', 'MIRANDA MILAGROS A.', 'YAHARI CORVALAN MATIAS I.'],
      'Consejo Departamental - Ciencias Sociales': ['RIVERO FACUNDO D.', 'COLOMBO MONTERO NAZARENA', 'LEIVA ALEJANDRO A.'],
      'Consejo Departamental - Educación': ['PIANALTO AZUL D.', 'DA SILVA GERONIMO T.', 'BARON MALENA C.'],
      'Consejo Departamental - Tecnología': ['MONTERO HUGO R.', 'GALLI GEORGINA', 'CASSANO MARTIN F.']
    },
    '101': {
      'Asamblea Universitaria': ['DI MATTEO BRAMBILLA M.', 'CHAVARRIA LUZ M.', 'GONZALEZ DA SILVA TOMAS', 'SUQUELE MARIA B.', 'SIDDERS FACUNDO', 'RIQUELME LUDMILA M.'],
      'Consejo Superior': ['RIVERO GIANELLA', 'RAJAL RAMIRO', 'MARTELETTI MAZU LUCIA', 'HAYDEN ANIGSTEIN ANTONIO', 'LITARDO MARIA A.'],
      'Consejo Departamental - Ciencias Básicas': ['LEZCANO MICAELA C.', 'HAYDEN ANIGSTEIN ANTONIO', 'ROUDE FLORENCIA A.'],
      'Consejo Departamental - Ciencias Sociales': ['KLUG JUAN S.', 'IESI LUDMILA', 'BELLIDO LAUTARO'],
      'Consejo Departamental - Educación': ['MARTINO MARIA E.', 'DE LA PEÑA SABRINA E.', 'AVILA MENDEZ CINTHIA L.'],
      'Consejo Departamental - Tecnología': ['SBERNA LUCIO', 'GONZALEZ DA SILVA TOMAS', 'BIGATA JUAN M.']
    },
    '111': {
      'Asamblea Universitaria': ['FOIS CATTERINA S.', 'ALONSO JOAQUIN', 'GALVAN ABRIL L.', 'GOMEZ HECTOR A.', 'BIANCO SATRAGNI FIORELLA', 'BENITES MONJE FACUNDO T.'],
      'Consejo Superior': ['PALACIN AGOSTINA', 'BARRERA JORGE F.', 'RUSSO SOFIA R.', 'YAQUINI OLIVER M.', 'AURELIO RUT A.'],
      'Consejo Departamental - Ciencias Básicas': ['ORUE ROSSO MILENA', 'LECCE NICOLAS A.', 'VELAZQUEZ FLORENCIA M.'],
      'Consejo Departamental - Ciencias Sociales': ['BELIERA MELINA M.', 'MELEGARI VALENTINA', 'BENITES MONJE FACUNDO T.'],
      'Consejo Departamental - Educación': ['AURELIO RUT A.', 'MONZON BRIAN N.', 'BURGOS MONICA E.'],
      'Consejo Departamental - Tecnología': ['YAQUINI OLIVER M.', 'BUGLIOLO NAHUEL A.'],
      'Consejo Asesor': ['PALACIN AGOSTINA', 'BARRERA JORGE F.', 'HIEBRA SOL A.', 'YAQUINI OLIVER M.']
    }
  },
  
  formulas: [
    // Rector/Vicerrector (2 fórmulas)
    {cargo: 'Rector/Vicerrector', letra: 'A', nombre: 'CRAIG / GIORGI', instancia: 'Candidatos/as'},
    {cargo: 'Rector/Vicerrector', letra: 'B', nombre: 'PANESSI / NUÑEZ', instancia: 'Candidatos/as'},
    // Decano Ciencias Básicas (2 fórmulas)
    {cargo: 'Decano Ciencias Básicas', letra: 'A', nombre: 'DE MARZI / TORREMORELL', instancia: 'Candidatos/as'},
    {cargo: 'Decano Ciencias Básicas', letra: 'B', nombre: 'DI SALVO / REAL', instancia: 'Candidatos/as'},
    // Decano Ciencias Sociales (única fórmula)
    {cargo: 'Decano Ciencias Sociales', nombre: 'LARRETAPE / CARLIS', instancia: 'Candidatos/as'},
    // Decano Educación (única fórmula)
    {cargo: 'Decano Educación', nombre: 'DI MATTEO / GONZALEZ', instancia: 'Candidatos/as'},
    // Decano Tecnología (única fórmula)
    {cargo: 'Decano Tecnología', nombre: 'SANTADINO / MARCHINI', instancia: 'Candidatos/as'}
  ]
};

/**
 * Agregar datos de ejemplo usando candidatos reales
 */
function agregarDatosEjemplo(sheet) {
  const ejemplos = [];
  
  // ════════════════════════════════════════════════════════════
  // 1. VOTOS DE LISTA COMPLETA
  // Lista 110 gana con 12 votos, las demás con 3-4 cada una
  // ════════════════════════════════════════════════════════════
  DATOS_REALES.listas.forEach(lista => {
    // Lista 110 tiene ventaja clara
    const numVotos = lista === '110' ? 12 : (Math.floor(Math.random() * 2) + 3); // 110: 12 votos, otras: 3-4 votos
    
    for (let i = 0; i < numVotos; i++) {
      const sedeAleatoria = DATOS_REALES.sedes[Math.floor(Math.random() * DATOS_REALES.sedes.length)];
      ejemplos.push([
        sedeAleatoria,
        'Lista Completa',
        'Lista ' + lista,
        'Todos los cargos',
        '-',
        'Lista ' + lista
      ]);
    }
  });
  
  // ════════════════════════════════════════════════════════════
  // 2. VOTOS INDIVIDUALES CON CANDIDATOS REALES
  // Lista 110 tiene más votos individuales también
  // ════════════════════════════════════════════════════════════
  DATOS_REALES.listas.forEach(lista => {
    const candidatosPorCargo = DATOS_REALES.candidatos[lista];
    
    Object.keys(candidatosPorCargo).forEach(cargo => {
      const candidatos = candidatosPorCargo[cargo];
      
      if (candidatos && candidatos.length > 0) {
        // Lista 110 tiene 4-6 votos por cargo, las demás 2-3
        const numVotos = lista === '110' 
          ? Math.floor(Math.random() * 3) + 4  // 110: 4-6 votos
          : Math.floor(Math.random() * 2) + 2; // Otras: 2-3 votos
        
        for (let i = 0; i < numVotos; i++) {
          const candidatoAleatorio = candidatos[Math.floor(Math.random() * candidatos.length)];
          const sedeAleatoria = DATOS_REALES.sedes[Math.floor(Math.random() * DATOS_REALES.sedes.length)];
          
          ejemplos.push([
            sedeAleatoria,
            'Individual',
            '-',
            cargo,
            candidatoAleatorio,
            'Lista ' + lista
          ]);
        }
      }
    });
  });
  
  // ════════════════════════════════════════════════════════════
  // 3. VOTOS DE FÓRMULAS REALES
  // PANESSI / NUÑEZ (Fórmula B) gana en Rector/Vicerrector
  // Las demás fórmulas tienen distribución normal
  // ════════════════════════════════════════════════════════════
  DATOS_REALES.formulas.forEach(formula => {
    // Fórmula B de PANESSI / NUÑEZ tiene ventaja: 15 votos
    // Fórmula A de CRAIG / GIORGI: 8 votos
    // Las demás fórmulas: 4-6 votos cada una
    let numVotos;
    if (formula.nombre === 'PANESSI / NUÑEZ') {
      numVotos = 15;  // Ganadora clara
    } else if (formula.nombre === 'CRAIG / GIORGI') {
      numVotos = 8;   // Segunda
    } else {
      numVotos = Math.floor(Math.random() * 3) + 4; // Otras: 4-6 votos
    }
    
    for (let i = 0; i < numVotos; i++) {
      const sedeAleatoria = DATOS_REALES.sedes[Math.floor(Math.random() * DATOS_REALES.sedes.length)];
      
      // Si tiene letra (A o B), agregarla al nombre
      const nombreCompleto = formula.letra 
        ? 'Fórmula ' + formula.letra + ': ' + formula.nombre 
        : 'Fórmula: ' + formula.nombre;
      
      ejemplos.push([
        sedeAleatoria,
        'Fórmula',
        '-',
        formula.cargo,
        formula.nombre,  // Nombre corto de la fórmula (ej: "CRAIG / GIORGI")
        nombreCompleto   // Agrupación con letra (ej: "Fórmula A: CRAIG / GIORGI")
      ]);
    }
  });
  
  // ════════════════════════════════════════════════════════════
  // Insertar todos los votos
  // ════════════════════════════════════════════════════════════
  ejemplos.forEach(voto => {
    sheet.appendRow([
      obtenerFechaHora(),
      voto[0], // Sede
      voto[1], // Tipo de Voto
      voto[2], // Lista Completa
      voto[3], // Cargo
      voto[4], // Candidato
      voto[5]  // Agrupación
    ]);
  });
  
  Logger.log('✅ Agregados ' + ejemplos.length + ' votos con DATOS REALES de UNLu 2025');
  Logger.log('   📋 4 listas (110, 117, 101, 111)');
  Logger.log('   🏢 5 sedes');
  Logger.log('   👥 ' + Object.keys(DATOS_REALES.candidatos['110']).length + ' cargos por lista');
  Logger.log('   🎯 7 fórmulas reales');
}

// ═══════════════════════════════════════════════════════════════
// ENDPOINT GET - Dashboard lee los datos aquí
// ═══════════════════════════════════════════════════════════════

/**
 * Maneja peticiones GET - El dashboard llama a esta función
 */
function doGet(e) {
  try {
    const sheet = obtenerHoja();
    
    if (!sheet) {
      return crearRespuestaError('Hoja no encontrada. Ejecuta "Inicializar Sistema" desde el menú.');
    }
    
    // Obtener todos los datos
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return crearRespuestaError('No hay datos en la hoja');
    }
    
    // Formato compatible con Google Sheets API
    const response = {
      success: true,
      values: data,
      totalRows: data.length - 1, // Sin contar encabezados
      lastUpdate: obtenerFechaHora()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error en doGet:', error);
    return crearRespuestaError(error.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// ENDPOINT POST - Recibe votos nuevos
// ═══════════════════════════════════════════════════════════════

/**
 * Maneja peticiones POST - Recibe votos desde el formulario
 * Puede recibir:
 * 1. Un solo voto: { sede: 'Luján', votos: [...] }
 * 2. Múltiples votos: array de selecciones
 */
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error('No se recibieron datos');
    }
    
    const data = JSON.parse(e.postData.contents);
    
    // Validar sede
    if (!data.sede) {
      throw new Error('Falta dato obligatorio: sede');
    }
    
    const sheet = obtenerHoja();
    const timestamp = obtenerFechaHora();
    let votosGuardados = 0;
    
    // Si envió un array de votos
    if (data.votos && Array.isArray(data.votos)) {
      data.votos.forEach(voto => {
        sheet.appendRow([
          timestamp,
          data.sede,
          voto.tipoVoto || 'Individual',
          voto.listaCompleta || '-',
          voto.cargo || '-',
          voto.candidato || '-',
          voto.agrupacion || '-'
        ]);
        votosGuardados++;
      });
      
      Logger.log('✅ ' + votosGuardados + ' votos guardados desde ' + data.sede);
    } 
    // Si envió un solo voto (compatibilidad)
    else {
      sheet.appendRow([
        timestamp,
        data.sede,
        data.tipoVoto || 'Individual',
        data.listaCompleta || '-',
        data.cargo || '-',
        data.candidato || '-',
        data.agrupacion || '-'
      ]);
      votosGuardados = 1;
      
      Logger.log('✅ Voto guardado desde ' + data.sede);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: votosGuardados + ' voto(s) registrado(s) correctamente',
        votosGuardados: votosGuardados,
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error en doPost:', error);
    return crearRespuestaError(error.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════════

/**
 * Obtiene la hoja de votos
 */
function obtenerHoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(CONFIG.SHEET_NAME);
}

/**
 * Obtiene fecha y hora actual formateada
 */
function obtenerFechaHora() {
  return Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    'dd/MM/yyyy HH:mm:ss'
  );
}

/**
 * Crea una respuesta de error
 */
function crearRespuestaError(mensaje) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: mensaje
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES DEL MENÚ
// ═══════════════════════════════════════════════════════════════

/**
 * Muestra estadísticas en un diálogo
 */
function mostrarEstadisticas() {
  const sheet = obtenerHoja();
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('⚠️ Error: Hoja no encontrada. Inicializa el sistema primero.');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const votos = data.slice(1); // Sin encabezados
  
  // Contar por lista
  const porLista = {};
  const porSede = {};
  
  votos.forEach(row => {
    const lista = row[1];
    const sede = row[2];
    
    porLista[lista] = (porLista[lista] || 0) + 1;
    porSede[sede] = (porSede[sede] || 0) + 1;
  });
  
  let mensaje = '📊 ESTADÍSTICAS DE VOTACIÓN\n\n';
  mensaje += '🗳️ Total de votos: ' + votos.length + '\n\n';
  
  mensaje += '📋 Por Lista:\n';
  Object.keys(porLista).forEach(lista => {
    mensaje += '  • ' + lista + ': ' + porLista[lista] + ' votos\n';
  });
  
  mensaje += '\n📍 Por Sede:\n';
  Object.keys(porSede).forEach(sede => {
    mensaje += '  • ' + sede + ': ' + porSede[sede] + ' votos\n';
  });
  
  SpreadsheetApp.getUi().alert(mensaje);
}

/**
 * Limpia votos de prueba
 */
function limpiarVotosPrueba() {
  const ui = SpreadsheetApp.getUi();
  const respuesta = ui.alert(
    '⚠️ Confirmar',
    '¿Eliminar todos los votos excepto los encabezados?\n\nEsta acción NO se puede deshacer.',
    ui.ButtonSet.YES_NO
  );
  
  if (respuesta === ui.Button.YES) {
    const sheet = obtenerHoja();
    const lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
      ui.alert('✅ Votos eliminados correctamente');
    } else {
      ui.alert('ℹ️ No hay votos para eliminar');
    }
  }
}

/**
 * Muestra la URL para el dashboard
 */
function mostrarURLDashboard() {
  const url = ScriptApp.getService().getUrl();
  
  const mensaje = 
    '📋 URL DEL SCRIPT\n\n' +
    'Copia esta URL y úsala en tu dashboard:\n\n' +
    url + '\n\n' +
    '⚠️ IMPORTANTE:\n' +
    'Si aún no implementaste el script como Web App:\n\n' +
    '1. Click en "Implementar" → "Nueva implementación"\n' +
    '2. Tipo: "Aplicación web"\n' +
    '3. Ejecutar como: "Yo"\n' +
    '4. Quién tiene acceso: "Cualquier usuario"\n' +
    '5. Click "Implementar"\n' +
    '6. Copia la URL que aparece';
  
  SpreadsheetApp.getUi().alert(mensaje);
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES ADICIONALES
// ═══════════════════════════════════════════════════════════════

/**
 * Función de prueba - Ejecutar manualmente para verificar
 */
function testScript() {
  Logger.log('🧪 Iniciando test...');
  
  const sheet = obtenerHoja();
  
  if (!sheet) {
    Logger.log('❌ Hoja no encontrada. Ejecuta inicializarSistema() primero.');
    return;
  }
  
  // Simular un voto
  const votoTest = {
    lista: 'Lista 110 TEST',
    sede: 'Luján TEST',
    cargo: 'TEST'
  };
  
  sheet.appendRow([
    obtenerFechaHora(),
    votoTest.lista,
    votoTest.sede,
    votoTest.cargo
  ]);
  
  Logger.log('✅ Test exitoso - Voto de prueba agregado');
  Logger.log('Total de votos:', sheet.getLastRow() - 1);
}

