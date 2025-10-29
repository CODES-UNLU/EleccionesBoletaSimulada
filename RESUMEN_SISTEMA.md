# 📊 Sistema Completo de Votación - UNLu 2025

## ✅ Sistema Actualizado y Listo

El sistema ahora captura **TODOS los votos detallados** de cada persona:

---

## 📋 Estructura de Datos (Google Sheet)

Cada **selección individual** se guarda con esta información:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| **Timestamp** | Fecha y hora | 29/10/2025 19:30:15 |
| **Sede** | Dónde votó | Luján, Campana, San Miguel... |
| **Tipo de Voto** | Cómo votó | Lista Completa / Individual / Fórmula |
| **Lista Completa** | Si votó lista completa | Lista 110 o "-" |
| **Cargo** | Cargo específico | Asamblea Universitaria, Consejo... |
| **Candidato Votado** | Nombre del candidato | Juan Pérez, María García... |
| **Agrupación** | Lista del candidato | Lista 110, Lista 110 - Fórmula 1... |

---

## 🎯 Ejemplos de Uso

### Ejemplo 1: Voto de Lista Completa
```javascript
{
  sede: 'Luján',
  votos: [
    {
      tipoVoto: 'Lista Completa',
      listaCompleta: 'Lista 110',
      cargo: 'Todos los cargos',
      candidato: '-',
      agrupacion: 'Lista 110'
    }
  ]
}
```

**Resultado en el Sheet:**
```
29/10/2025 19:30:15 | Luján | Lista Completa | Lista 110 | Todos los cargos | - | Lista 110
```

---

### Ejemplo 2: Votos Individuales
```javascript
{
  sede: 'Campana',
  votos: [
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
    }
  ]
}
```

**Resultado en el Sheet:**
```
29/10/2025 19:31:00 | Campana | Individual | - | Asamblea Universitaria | Juan Pérez | Lista 110
29/10/2025 19:31:00 | Campana | Individual | - | Consejo Superior | María García | Lista 110
```

---

### Ejemplo 3: Votos de Fórmulas
```javascript
{
  sede: 'San Miguel',
  votos: [
    {
      tipoVoto: 'Fórmula',
      listaCompleta: '-',
      cargo: 'Rector/Vicerrector',
      candidato: 'Carlos Rodríguez / Ana Martínez',
      agrupacion: 'Lista 110 - Fórmula 1'
    }
  ]
}
```

**Resultado en el Sheet:**
```
29/10/2025 19:32:00 | San Miguel | Fórmula | - | Rector/Vicerrector | Carlos Rodríguez / Ana Martínez | Lista 110 - Fórmula 1
```

---

## 📊 Estadísticas que Puedes Obtener

Con esta estructura puedes analizar:

### 1. Comportamiento de Voto
- ✅ ¿Cuántos votan lista completa vs individual?
- ✅ ¿Qué porcentaje vota selectivamente?
- ✅ ¿Combinan lista completa con fórmulas individuales?

### 2. Popularidad de Candidatos
- ✅ ¿Qué candidatos son más votados?
- ✅ ¿Qué cargos generan más interés?
- ✅ ¿Qué fórmulas son más populares?

### 3. Análisis por Sede
- ✅ ¿Qué sedes votan más lista completa?
- ✅ ¿Diferencias de preferencias entre sedes?
- ✅ ¿Actividad de votación por sede?

### 4. Tendencias Temporales
- ✅ ¿A qué hora votan más?
- ✅ ¿Evolución de votos durante el día?
- ✅ ¿Picos de actividad?

---

## 🚀 Cómo Conectar tu Formulario

### Paso 1: Incluir el Script

En tu `boleta-template.html` o `seleccion-sede.html`:

```html
<script src="enviar-votos.js"></script>
```

### Paso 2: Configurar la URL

En `enviar-votos.js`, cambia:
```javascript
const SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
```

### Paso 3: Adaptar la Función

Adapta `capturarYEnviarVotosDelFormulario()` según tu HTML. El archivo tiene ejemplos completos.

### Paso 4: Agregar al Botón

```html
<button onclick="capturarYEnviarVotosDelFormulario()">
  ✅ Confirmar Voto
</button>
```

---

## 📁 Archivos del Sistema

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `codigo-google-apps-script.js` | Backend (Google Apps Script) | ✅ Actualizado |
| `dashboard.html` | Dashboard con estadísticas | ✅ Actualizado |
| `enviar-votos.js` | Script de integración | ✅ Nuevo |
| `GUIA_INSTALACION.md` | Guía paso a paso | ✅ Existente |
| `RESUMEN_SISTEMA.md` | Este archivo | ✅ Nuevo |

---

## 🔧 Próximos Pasos

### 1. Actualiza el Google Sheet (2 min)
1. Elimina la hoja actual
2. En el Apps Script, ejecuta `inicializarSistema`
3. Se creará con la nueva estructura y datos de ejemplo

### 2. Prueba el Sistema (5 min)
1. Abre el dashboard
2. Verifica que muestre los nuevos datos
3. Revisa los gráficos y tabla

### 3. Conecta tu Formulario (10 min)
1. Abre `enviar-votos.js`
2. Lee los ejemplos
3. Adapta `capturarYEnviarVotosDelFormulario()`
4. Prueba enviando votos de prueba

---

## 📊 Vista Previa del Dashboard Actualizado

El dashboard ahora muestra:

```
┌─────────────────────────────────────────────┐
│  📊 Dashboard de Votación UNLu 2025        │
├─────────────────────────────────────────────┤
│                                             │
│  🗳️ Total: 150  📋 Listas: 1  📍 Sedes: 5 │
│  🏆 Líder: Lista 110 (87%)                 │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  📊 Tipo de Voto        📍 Votos por Sede  │
│  ┌───────────────┐     ┌──────────────┐   │
│  │ Lista Completa│     │ Luján: 45    │   │
│  │ Individual    │     │ Campana: 30  │   │
│  │ Fórmula       │     │ S.Miguel: 25 │   │
│  └───────────────┘     └──────────────┘   │
│                                             │
│  🎯 Votos por Cargo     📈 Actividad       │
│  ┌───────────────┐     ┌──────────────┐   │
│  │ Asamblea: 40  │     │ 8:00 - 12:00 │   │
│  │ Consejo: 35   │     │ 12:00 - 16:00│   │
│  │ Rector: 28    │     │ 16:00 - 20:00│   │
│  └───────────────┘     └──────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  📋 Top Candidatos Más Votados             │
│  ┌─────────────────────────────────────┐  │
│  │ 1. Juan Pérez (Asamblea) - 45 votos│  │
│  │ 2. María García (Consejo) - 38 votos│  │
│  │ 3. Lista 110 Completa - 32 votos    │  │
│  │ 4. Rodríguez/Martínez (F1) - 28 v. │  │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 💡 Casos de Uso Reales

### Caso 1: Análisis de Popularidad
"¿Qué candidatos de Asamblea son más votados?"
→ Filtra el Sheet por Cargo = "Asamblea Universitaria"
→ Cuenta candidatos individuales

### Caso 2: Preferencias por Sede
"¿En qué sede votan más lista completa?"
→ Dashboard muestra gráfico cruzado automáticamente

### Caso 3: Fórmulas más Populares
"¿Qué fórmula de Rector prefieren?"
→ Filtra Cargo = "Rector/Vicerrector"
→ Ve candidatos más votados

---

## ✅ Ventajas del Sistema

### Para Votantes:
- ✅ Pueden votar lista completa o selectivo
- ✅ Pueden combinar ambos modos
- ✅ Sus preferencias se registran exactamente

### Para el Centro de Estudiantes:
- ✅ Datos detallados de cada selección
- ✅ Análisis completo de tendencias
- ✅ Identificar candidatos más populares
- ✅ Optimizar campañas según datos

### Para el Análisis:
- ✅ Exportable a Excel/CSV
- ✅ Gráficos automáticos
- ✅ Datos en tiempo real
- ✅ Filtros y segmentaciones ilimitadas

---

## 🎯 Próximamente

Mejoras posibles:
- [ ] Exportar reportes en PDF
- [ ] Comparar entre sedes
- [ ] Análisis predictivo
- [ ] Gráficos adicionales
- [ ] Filtros interactivos

---

## 📞 Soporte

**Centro de Estudiantes CODES++**
🌐 [codesunlu.vercel.app](https://codesunlu.vercel.app/)

---

**¡Sistema completo y listo para las elecciones!** 🗳️✨

_Desarrollado para capturar cada detalle del proceso electoral_

