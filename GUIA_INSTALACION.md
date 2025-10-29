# 🚀 Guía de Instalación - Dashboard de Votación UNLu 2025

## 📋 Resumen del Sistema

Este sistema consta de **2 componentes**:

1. **Google Apps Script** (Backend) - Maneja el Sheet y los datos
2. **Dashboard HTML** (Frontend) - Muestra las estadísticas

---

## ⏱️ Tiempo Total: 10 minutos

---

## 📍 PASO 1: Configurar Google Apps Script (5 minutos)

### 1.1 Crear el Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una **nueva hoja de cálculo**
3. Nómbrala: **"Votación UNLu 2025 - Lista 110"**

### 1.2 Instalar el Script

1. En tu Google Sheet, ve a: **Extensiones → Apps Script**

2. Se abrirá un editor. **Borra** todo el código que aparece por defecto

3. **Copia TODO** el contenido del archivo `codigo-google-apps-script.js`

4. **Pega** el código en el editor

5. Click en **💾 Guardar** (o Ctrl+S)

6. Cambia el nombre del proyecto arriba: **"Sistema Votación UNLu"**

### 1.3 Inicializar el Sistema

1. En el editor de Apps Script, arriba hay un menú desplegable

2. Selecciona la función: **`inicializarSistema`**

3. Click en el botón **▶️ Ejecutar**

4. **Primera vez**: Te pedirá permisos
   - Click en **"Revisar permisos"**
   - Selecciona tu cuenta de Google
   - Click en **"Avanzado"** (abajo a la izquierda)
   - Click en **"Ir a Sistema Votación UNLu (no seguro)"**
   - Click en **"Permitir"**

5. Espera unos segundos

6. Vuelve a tu Google Sheet - ¡Debería tener datos de ejemplo! ✅

### 1.4 Implementar como Web App

1. En el editor de Apps Script, click en **"Implementar"** (arriba a la derecha)

2. Selecciona **"Nueva implementación"**

3. En "Tipo", click en el ícono ⚙️ y selecciona **"Aplicación web"**

4. Configura:
   - **Descripción**: `Dashboard Votación`
   - **Ejecutar como**: `Yo (tu email)`
   - **Quién tiene acceso**: `Cualquier usuario`

5. Click en **"Implementar"**

6. **IMPORTANTE**: Aparecerá una URL como esta:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```
   
7. **📋 COPIA ESTA URL** - La necesitarás en el siguiente paso

---

## 📍 PASO 2: Configurar el Dashboard (2 minutos)

### 2.1 Abrir el Dashboard

1. Abre el archivo **`dashboard.html`** en tu navegador
   - Puedes hacer doble click en el archivo
   - O arrastrarlo a tu navegador

### 2.2 Configurar la URL

1. En la pantalla que aparece, verás un campo de texto

2. **Pega la URL** que copiaste en el paso 1.4

3. Click en **"💾 Guardar y Cargar Datos"**

4. ¡El dashboard debería cargar las estadísticas! 🎉

---

## 📍 PASO 3: Verificar que Funciona (3 minutos)

### 3.1 Revisar el Dashboard

Deberías ver:
- ✅ Total de votos: 10
- ✅ 4 gráficos con datos
- ✅ Tabla con detalles
- ✅ Estadísticas actualizadas

### 3.2 Probar Agregar Datos

Vuelve a tu Google Sheet y:

1. Agrega una nueva fila al final:
   ```
   [Fecha actual] | Lista 110 | Luján | Rector
   ```

2. Vuelve al dashboard

3. Click en **"🔄 Actualizar Datos"**

4. ¡Deberías ver 11 votos ahora! ✅

### 3.3 Usar el Menú del Sheet

En tu Google Sheet, arriba debería aparecer un nuevo menú: **"📊 Sistema de Votación"**

Prueba las opciones:
- **📈 Ver Estadísticas**: Muestra un resumen en el Sheet
- **🔄 Limpiar Votos de Prueba**: Elimina todos los votos (útil antes de producción)

---

## ✅ Checklist de Instalación

- [ ] Google Sheet creado
- [ ] Apps Script copiado y guardado
- [ ] Función `inicializarSistema` ejecutada
- [ ] Permisos otorgados
- [ ] Datos de ejemplo visibles en el Sheet
- [ ] Script implementado como Web App
- [ ] URL del script copiada
- [ ] Dashboard abierto en navegador
- [ ] URL configurada en dashboard
- [ ] Dashboard muestra estadísticas correctamente
- [ ] Menú "Sistema de Votación" visible en el Sheet

---

## 🎯 Características del Sistema

### ✨ Google Apps Script Incluye:

- ✅ Creación automática de la estructura del Sheet
- ✅ Datos de ejemplo para testing
- ✅ Menú personalizado en el Sheet
- ✅ Endpoint GET para que el dashboard lea datos
- ✅ Endpoint POST para recibir votos nuevos
- ✅ Estadísticas integradas
- ✅ Función de limpieza de datos

### ✨ Dashboard Incluye:

- ✅ 4 métricas principales (total votos, listas, sedes, líder)
- ✅ 4 gráficos interactivos (Chart.js)
  - Distribución por lista (dona)
  - Votos por sede (barras)
  - Votos por cargo (barras horizontales)
  - Evolución temporal (línea)
- ✅ Tabla detallada con progreso visual
- ✅ Actualización automática cada 30 segundos
- ✅ Diseño responsivo (móvil, tablet, desktop)
- ✅ Configuración guardada en localStorage

---

## 🔄 Actualización Automática

El dashboard se actualiza solo cada **30 segundos** cuando está abierto.

También puedes presionar **"🔄 Actualizar Datos"** manualmente en cualquier momento.

---

## 📊 Agregar Votos Nuevos

### Opción 1: Manual (Para Testing)

1. Abre el Google Sheet
2. Agrega una nueva fila con el formato:
   ```
   [Fecha] | [Lista] | [Sede] | [Cargo]
   ```
3. El dashboard lo detectará en la próxima actualización

### Opción 2: Desde un Formulario (Para Producción)

Si tienes un formulario de votación, envía los votos con un POST:

```javascript
fetch('TU_URL_DEL_SCRIPT', {
  method: 'POST',
  body: JSON.stringify({
    lista: 'Lista 110',
    sede: 'Luján',
    cargo: 'Asamblea Universitaria'
  })
});
```

---

## 🌐 Publicar el Dashboard

### Opción 1: GitHub Pages (Gratis, Fácil)

1. Sube el archivo `dashboard.html` a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama y carpeta
4. ¡Listo! Tu dashboard tendrá una URL pública

### Opción 2: Netlify (Gratis, Drag & Drop)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra el archivo `dashboard.html`
3. ¡Automáticamente se publica!

### Opción 3: Hosting Local

Simplemente comparte el archivo `dashboard.html` con tu equipo.
Cada persona puede abrirlo en su navegador y configurar la URL del script.

---

## 🐛 Solución de Problemas

### ❌ "Script no encontrado" o Error 404

**Causa**: La URL del script es incorrecta

**Solución**:
1. Vuelve al Apps Script
2. Ve a "Implementar" → "Administrar implementaciones"
3. Copia la URL de nuevo
4. Pégala en el dashboard

### ❌ "Error al cargar datos"

**Causa**: El script no está implementado como Web App

**Solución**:
1. Ve al Apps Script
2. Click en "Implementar" → "Nueva implementación"
3. Asegúrate de seleccionar "Aplicación web"
4. Acceso: "Cualquier usuario"

### ❌ "No hay datos en el Sheet"

**Causa**: No se ejecutó `inicializarSistema`

**Solución**:
1. En Apps Script, selecciona la función `inicializarSistema`
2. Click en ▶️ Ejecutar
3. Espera a que termine
4. Vuelve al dashboard y actualiza

### ❌ Dashboard no se actualiza

**Solución**:
1. Presiona Ctrl+Shift+R (recarga forzada)
2. Verifica que la URL del script sea correcta
3. Abre la consola del navegador (F12) para ver errores

---

## 📱 Uso en Producción

### Antes del Día de Votación:

1. **Limpia los datos de prueba**:
   - En el Sheet: Menú "Sistema de Votación" → "Limpiar Votos de Prueba"

2. **Verifica que todo funcione**:
   - Agrega un voto de prueba manualmente
   - Confirma que aparece en el dashboard

3. **Comparte el dashboard**:
   - Publica en GitHub Pages o Netlify
   - O comparte el archivo HTML directamente

### Durante la Votación:

1. **Monitorea en tiempo real**:
   - Abre el dashboard en tu computadora
   - Se actualizará cada 30 segundos

2. **Muestra en pantallas**:
   - Abre el dashboard en tablets o pantallas grandes
   - El diseño es responsivo

3. **Genera reportes**:
   - Usa el menú del Sheet: "Ver Estadísticas"
   - O exporta el Sheet a Excel/PDF

---

## 🎓 Estructura del Sistema

```
┌─────────────────────────────────────────┐
│                                         │
│     🗳️ Formulario de Votación          │
│     (Tu página de votación)             │
│                                         │
└───────────────┬─────────────────────────┘
                │
                │ POST: Envía votos
                ▼
┌─────────────────────────────────────────┐
│                                         │
│  ⚙️ Google Apps Script (Backend)       │
│  - Recibe votos (POST)                  │
│  - Guarda en Sheet                      │
│  - Entrega datos (GET)                  │
│                                         │
└───────────────┬─────────────────────────┘
                │
                │ GET: Lee datos
                ▼
┌─────────────────────────────────────────┐
│                                         │
│    📊 Dashboard HTML (Frontend)         │
│    - Muestra estadísticas               │
│    - Gráficos interactivos              │
│    - Actualización automática           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📞 Soporte

Si tienes algún problema:

1. Revisa esta guía paso a paso
2. Verifica el checklist completo
3. Revisa la sección de "Solución de Problemas"
4. Abre la consola del navegador (F12) para ver errores específicos

---

## 🎉 ¡Listo!

Ahora tienes un sistema completo de votación con:
- ✅ Backend robusto (Google Apps Script)
- ✅ Dashboard profesional
- ✅ Actualización en tiempo real
- ✅ Gráficos interactivos
- ✅ Fácil de usar y mantener

**¡Éxito con las elecciones UNLu 2025!** 🗳️

---

_Desarrollado por CODES++ - Centro de Estudiantes de Sistemas UNLu_

