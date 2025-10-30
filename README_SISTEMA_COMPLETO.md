# 🗳️ Sistema de Votación UNLu 2025 - Completo

## 📦 Resumen del Sistema

Sistema completo para simular votaciones y visualizar resultados en tiempo real, conectado con Google Sheets.

---

## 🎯 ¿Qué tienes ahora?

### ✅ 1. **Dashboard de Estadísticas** (Funcionando)
- **Archivo:** `dashboard.html`
- **URL:** https://codes-unlu.github.io/eleccionesBoletaSimulada/dashboard.html
- **Estado:** ✅ Configurado y funcionando
- **Funcionalidad:**
  - Muestra estadísticas en tiempo real
  - Lee datos del Google Sheet automáticamente
  - Se actualiza cada 2 minutos
  - Muestra gráficos y tablas profesionales

### ✅ 2. **Google Apps Script** (Funcionando)
- **Archivo:** `codigo-google-apps-script.js`
- **URL:** https://script.google.com/macros/s/AKfycb...exec
- **Estado:** ✅ Implementado como Web App
- **Funcionalidad:**
  - Recibe votos (POST)
  - Envía datos al dashboard (GET)
  - Genera datos de ejemplo
  - Gestiona el Google Sheet

### ✅ 3. **Boletas de Votación** (Existentes)
- **Archivos:**
  - `boleta-lujan.html`
  - `boleta-chivilcoy.html`
  - `boleta-san-miguel.html`
  - `boleta-campana.html`
  - `boleta-san-fernando.html`
  - `boleta-template.html`
- **Estado:** ✅ Funcionan como simuladores
- **Pendiente:** Integrar sistema de envío real

---

## 🆕 ¿Qué acabas de recibir?

### 🎁 4. **Sistema de Envío de Votos** (NUEVO)
- **Archivo:** `sistema-votacion.js`
- **Estado:** ✅ Creado y listo para usar
- **Funcionalidad:**
  - Captura votos automáticamente de las boletas
  - Los envía al Google Sheet en tiempo real
  - Muestra notificaciones al usuario
  - Valida antes de enviar

### 📖 5. **Guías de Integración** (NUEVO)
- **`GUIA_INTEGRACION_VOTOS.md`** - Paso a paso completo
- **`EJEMPLO_INTEGRACION.html`** - Ejemplo de código

---

## 🚀 Próximos Pasos

### Opción A: Solo Mostrar el Dashboard (Ya funciona)
Si solo quieres mostrar estadísticas con datos de ejemplo:

1. ✅ Ya está listo
2. Comparte: https://codes-unlu.github.io/eleccionesBoletaSimulada/dashboard.html

### Opción B: Activar Envío Real de Votos
Si quieres que las boletas envíen votos reales:

1. **Incluir el script en cada boleta:**
   ```html
   <script src="sistema-votacion.js"></script>
   <script>
     inicializarSistemaVotacion('LUJÁN'); // Cambiar según sede
   </script>
   ```

2. **Agregar botón de confirmación:**
   ```html
   <button onclick="enviarVotosAlSheet()">
     ✅ Confirmar y Enviar Voto
   </button>
   ```

3. **Configurar data-attributes en los checkboxes**
   (Ver `GUIA_INTEGRACION_VOTOS.md` para detalles)

4. **Probar y verificar**
   - Votar en una boleta
   - Ver que aparezca en el Google Sheet
   - Ver que se actualice en el dashboard

---

## 📊 Flujo Completo del Sistema

```
┌─────────────────┐
│ Usuario vota en │
│    boleta.html  │
└────────┬────────┘
         │
         │ (Click en checkboxes)
         │
         ▼
┌─────────────────────────┐
│ sistema-votacion.js     │
│ Captura automáticamente │
└────────┬────────────────┘
         │
         │ (Click "Confirmar Voto")
         │
         ▼
┌──────────────────────────┐
│ POST al Google Apps Script│
│ (SCRIPT_URL)             │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Google Sheet             │
│ Almacena el voto         │
└────────┬─────────────────┘
         │
         │ (Auto-actualización cada 2 min)
         │
         ▼
┌──────────────────────────┐
│ dashboard.html           │
│ Muestra estadísticas     │
└──────────────────────────┘
```

---

## 📁 Estructura de Archivos

```
EleccionesUnlu/
├── 📊 DASHBOARD
│   └── dashboard.html ........................ ✅ Dashboard de estadísticas
│
├── 🗳️ BOLETAS (Simuladores)
│   ├── boleta-lujan.html .................... Boleta de Luján
│   ├── boleta-chivilcoy.html ................ Boleta de Chivilcoy
│   ├── boleta-san-miguel.html ............... Boleta de San Miguel
│   ├── boleta-campana.html .................. Boleta de Campana
│   └── boleta-san-fernando.html ............. Boleta de San Fernando
│
├── 🔧 BACKEND
│   └── codigo-google-apps-script.js ......... ✅ Script de Google Sheet
│
├── ⚡ SISTEMA DE VOTACIÓN (NUEVO)
│   └── sistema-votacion.js .................. 🆕 Captura y envía votos
│
├── 📖 DOCUMENTACIÓN
│   ├── GUIA_INTEGRACION_VOTOS.md ............ 🆕 Cómo integrar todo
│   ├── EJEMPLO_INTEGRACION.html ............. 🆕 Ejemplo de código
│   └── README_SISTEMA_COMPLETO.md ........... 🆕 Este archivo
│
└── 📂 OTROS
    ├── index.html ........................... Página principal
    ├── seleccion-sede.html .................. Selector de sede
    └── datos-elecciones.json ................ Datos de candidatos
```

---

## 🎓 Para Entender Mejor

### ¿Qué hace cada archivo?

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| `dashboard.html` | Muestra estadísticas visuales | ✅ Listo |
| `sistema-votacion.js` | Captura votos de las boletas | 🆕 Listo, pendiente integrar |
| `codigo-google-apps-script.js` | Gestiona Google Sheet | ✅ Implementado |
| `boleta-*.html` | Interfaces de votación | ✅ Funcionan, pendiente conectar |

### ¿Qué falta por hacer?

Si quieres activar el envío real:

1. ⏰ Agregar `sistema-votacion.js` a las boletas (5 min por boleta)
2. ⏰ Agregar botón "Confirmar Voto" (2 min por boleta)
3. ⏰ Verificar data-attributes en checkboxes (10 min por boleta)
4. ⏰ Probar con una boleta (5 min)

**Total:** ~2 horas para integrar en las 5 boletas

---

## ✅ Checklist de Estado Actual

### Dashboard
- [x] Configurado con URL del script
- [x] Muestra datos reales
- [x] Auto-actualización funciona
- [x] Gráficos y tablas profesionales
- [x] Lista 110 aparece como ganadora
- [x] Fórmula PANESSI / NUÑEZ ganadora

### Google Sheet
- [x] Script implementado como Web App
- [x] Recibe votos correctamente
- [x] Envía datos al dashboard
- [x] Genera datos de ejemplo
- [x] 158 votos de prueba cargados

### Sistema de Envío
- [x] Script creado (`sistema-votacion.js`)
- [x] Documentación completa
- [x] Ejemplo de integración
- [ ] Integrado en las boletas *(pendiente)*

---

## 🆘 Soporte

### Si algo no funciona:

1. **Dashboard no carga datos:**
   - Verifica que el Google Apps Script esté implementado
   - Abre consola (F12) y busca errores

2. **Votos no se envían:**
   - Verifica que `SCRIPT_URL` sea correcta
   - Verifica que los data-attributes estén bien

3. **Datos no aparecen en el Sheet:**
   - Ejecuta "Inicializar Sistema" desde el menú del Sheet

### Consola de debug:

Abre F12 en el navegador y verás mensajes como:
```
✅ Sistema de votación inicializado para: LUJÁN
✅ Voto agregado: {...}
📊 Total selecciones: 3
📤 Enviando votos al Sheet...
✅ Votos enviados correctamente
```

---

## 🎉 Resultado Final

Cuando esté todo integrado tendrás:

✅ **5 Boletas interactivas** que envían votos reales
✅ **Google Sheet** que almacena todos los votos
✅ **Dashboard profesional** que muestra estadísticas en tiempo real
✅ **Auto-actualización** cada 2 minutos
✅ **Datos reales** de las listas 110, 117, 101, 111
✅ **Fórmulas reales** de Rector y Decanos

---

**¿Listo para integrar?** Sigue la **GUIA_INTEGRACION_VOTOS.md** 🚀

