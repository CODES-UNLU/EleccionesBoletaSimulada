# 📊 Dashboard de Votación - UNLu 2025 - Lista 110

Sistema completo de votación con dashboard en tiempo real para las elecciones UNLu 2025.

---

## 📁 Archivos del Sistema

### 🎯 Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| `dashboard.html` | **Dashboard visual** - Abre en tu navegador |
| `codigo-google-apps-script.js` | **Backend** - Copia en Google Apps Script |
| `GUIA_INSTALACION.md` | **📖 LEE ESTO PRIMERO** - Guía paso a paso completa |

---

## 🚀 Inicio Rápido (10 minutos)

### 1️⃣ Configura el Backend
```
1. Crea un Google Sheet
2. Extensiones → Apps Script
3. Copia el código de: codigo-google-apps-script.js
4. Implementa como "Aplicación web"
5. Copia la URL generada
```

### 2️⃣ Abre el Dashboard
```
1. Abre: dashboard.html en tu navegador
2. Pega la URL del paso anterior
3. Click en "Guardar y Cargar Datos"
4. ¡Listo! 🎉
```

### 3️⃣ Lee la Guía Completa
```
Abre: GUIA_INSTALACION.md
```

---

## ✨ Características

### 📊 Dashboard Incluye:
- ✅ 4 métricas en tiempo real
- ✅ 4 gráficos interactivos (Chart.js)
- ✅ Tabla detallada con barras de progreso
- ✅ Actualización automática cada 30 segundos
- ✅ Diseño responsivo (móvil + desktop)

### ⚙️ Backend Incluye:
- ✅ Creación automática del Sheet
- ✅ Datos de ejemplo para testing
- ✅ Menú personalizado en Google Sheets
- ✅ API REST (GET/POST)
- ✅ Estadísticas integradas

---

## 📊 Vista Previa

```
╔═══════════════════════════════════════════════╗
║  📊 Dashboard de Votación UNLu 2025          ║
║  Lista 110 - Estadísticas en Tiempo Real     ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  🗳️ Total: 150    📋 Listas: 1               ║
║  📍 Sedes: 5      🏆 Líder: Lista 110 (100%) ║
║                                               ║
║  ┌──────────┐  ┌──────────┐                  ║
║  │ Gráfico  │  │ Gráfico  │                  ║
║  │  Listas  │  │  Sedes   │                  ║
║  │  (Dona)  │  │ (Barras) │                  ║
║  └──────────┘  └──────────┘                  ║
║                                               ║
║  ┌──────────┐  ┌──────────┐                  ║
║  │  Cargos  │  │ Temporal │                  ║
║  │(Horizont)│  │  (Línea) │                  ║
║  └──────────┘  └──────────┘                  ║
║                                               ║
║  📋 Tabla Detallada de Votos                 ║
║  ┌────────────────────────────────────┐      ║
║  │ Lista │ Sede   │ Votos │ % │ ████ │      ║
║  └────────────────────────────────────┘      ║
╚═══════════════════════════════════════════════╝
```

---

## 🎯 Casos de Uso

### 📊 Monitoreo en Tiempo Real
Abre el dashboard durante la votación para ver estadísticas actualizadas cada 30 segundos.

### 📺 Pantallas Públicas
Muestra el dashboard en tablets o pantallas grandes para que todos vean los resultados.

### 📱 Acceso Móvil
El dashboard es completamente responsivo - funciona en celulares y tablets.

### 📈 Reportes
Exporta el Google Sheet a Excel o PDF para reportes oficiales.

---

## 🛠️ Tecnologías Usadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Gráficos**: Chart.js 4.0
- **Backend**: Google Apps Script
- **Base de datos**: Google Sheets
- **Hosting**: Cualquier servidor web estático

---

## 📖 Documentación

Todo está documentado en:
- **`GUIA_INSTALACION.md`** - Guía completa paso a paso
- **Código comentado** - Cada función explicada

---

## 🔒 Seguridad y Privacidad

- ✅ Datos anónimos (solo lista, sede, cargo)
- ✅ No se almacenan datos personales
- ✅ Google Apps Script maneja la autenticación
- ✅ Acceso controlado al Sheet

---

## 🌐 Publicar el Dashboard

### Opción 1: GitHub Pages
```bash
git add dashboard.html
git commit -m "Dashboard votación"
git push
# Configura GitHub Pages en Settings
```

### Opción 2: Netlify
Arrastra `dashboard.html` a [netlify.com](https://netlify.com)

### Opción 3: Compartir Archivo
Simplemente comparte `dashboard.html` - cada persona configura su URL

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Script no encontrado" | Verifica la URL del Apps Script |
| "No hay datos" | Ejecuta `inicializarSistema` en Apps Script |
| No se actualiza | Presiona Ctrl+Shift+R (recarga forzada) |
| Error al cargar | Verifica que el script esté como "Aplicación web" |

Ver más en: `GUIA_INSTALACION.md`

---

## 📞 Soporte

**Centro de Estudiantes CODES++**
- 🌐 Web: [codesunlu.vercel.app](https://codesunlu.vercel.app/)

---

## 📄 Licencia

Desarrollado para las Elecciones UNLu 2025 - Lista 110

© 2025 Centro de Estudiantes de Sistemas - CODES++

---

## ✅ Checklist Rápido

- [ ] Google Sheet creado
- [ ] Apps Script instalado
- [ ] Script implementado como Web App
- [ ] URL del script copiada
- [ ] Dashboard abierto
- [ ] URL configurada en dashboard
- [ ] Dashboard muestra datos correctamente

---

## 🎉 ¡Comienza Ahora!

1. **Abre**: `GUIA_INSTALACION.md`
2. **Sigue** los pasos
3. **Disfruta** de tu dashboard profesional

**Tiempo total: 10 minutos** ⏱️

---

_¡Éxito con las elecciones! 🗳️_

