# 🗳️ Nueva Métrica: Personas que Votaron

## ✅ Cambio Implementado

Se agregó al dashboard una nueva métrica destacada que muestra **cuántas personas votaron**, diferenciándola del total de votos/tildes.

---

## 📊 Diferencia entre Métricas

### **Personas que Votaron** 🗳️
- Cuenta los **timestamps únicos**
- Cada timestamp = **1 persona**
- Si una persona vota lista completa + 3 fórmulas = **1 persona**

### **Total de Votos (Tildes)** ✅
- Cuenta todos los **registros/filas** en el Sheet
- Si una persona vota lista completa + 3 fórmulas = **4 votos**

---

## 🎨 Diseño Visual

La nueva métrica se destaca con:
- 🎨 **Fondo degradado morado** (diferente a las demás)
- 🗳️ **Icono de urna electoral**
- 📍 **Posición destacada** (primera card)
- ⚪ **Texto en blanco** para mejor contraste

---

## 📈 Ejemplo Práctico

### **Escenario:**
- **3 personas** votaron:
  - **Persona 1:** Lista 110 completa + Fórmula B (Rector)
  - **Persona 2:** 5 cargos individuales + Fórmula A (Rector) + Fórmula B (Decano Básicas)
  - **Persona 3:** Voto en blanco

### **Dashboard mostrará:**

| Métrica | Valor | Explicación |
|---------|-------|-------------|
| 🗳️ Personas que Votaron | **3** | 3 timestamps únicos |
| ✅ Total de Votos (Tildes) | **9** | 1+1+5+1+1+0 = 9 filas en el Sheet |
| 📋 Votos Lista Completa | **1** | Solo persona 1 |
| 🎯 Votos por Cargo | **5** | Los 5 individuales de persona 2 |
| 👥 Votos de Fórmulas | **3** | 2 de persona 2 + 1 de persona 1 |

---

## 🔧 Implementación Técnica

### 1. **HTML - Nueva Card (Primera Posición)**
```html
<div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
  <div class="stat-icon">🗳️</div>
  <div class="stat-label" style="color: rgba(255,255,255,0.9);">Personas que Votaron</div>
  <div class="stat-value" id="personasVotaron" style="color: white;">0</div>
</div>
```

### 2. **JavaScript - Conteo de Timestamps Únicos**
```javascript
// En procesarDatos():
const stats = {
  totalVotos: filas.length,
  personasUnicas: new Set(), // ← Nuevo: Set para timestamps únicos
  // ... resto de contadores
};

// Dentro del forEach:
if (timestamp) {
  stats.personasUnicas.add(timestamp); // ← Agregar cada timestamp
}
```

### 3. **JavaScript - Actualización del Dashboard**
```javascript
// En actualizarDashboard():
const personasQueVotaron = stats.personasUnicas.size;
document.getElementById('personasVotaron').textContent = personasQueVotaron.toLocaleString();
```

---

## 🧪 Cómo Verificar

### **Paso 1: Abrir el Dashboard**
```
dashboard.html
```

### **Paso 2: Verificar la Nueva Métrica**
Deberías ver en la primera posición:
```
┌─────────────────────────────────┐
│  🗳️                              │
│  PERSONAS QUE VOTARON           │
│  15                             │ ← (ejemplo)
└─────────────────────────────────┘
```

### **Paso 3: Comparar con Total de Votos**
```
Personas que Votaron:  15
Total de Votos:        67  ← Más alto porque incluye todos los tildes
```

### **Paso 4: Probar con Nuevos Votos**
1. Vota desde una boleta
2. Espera que el dashboard se actualice (2 minutos o recarga manual)
3. Verifica que **"Personas que Votaron"** aumente en **1**
4. Verifica que **"Total de Votos"** aumente según cuántos tildes marcaste

---

## 📊 Casos de Uso

### **Caso 1: Medir Participación**
```
Personas que Votaron: 850
Estudiantes totales: 5000
Participación: 17%
```

### **Caso 2: Detectar Patrones de Votación**
```
Personas que Votaron: 100
Total de Votos: 450
Promedio por persona: 4.5 tildes
```
→ En promedio, cada persona vota 4-5 opciones

### **Caso 3: Comparar por Sede**
```
LUJÁN:
  - Personas: 250
  - Votos: 1100
  - Promedio: 4.4

CHIVILCOY:
  - Personas: 150
  - Votos: 820
  - Promedio: 5.5
```
→ En Chivilcoy votan más opciones en promedio

---

## 🔍 Lógica del Timestamp

### **¿Cómo se agrupan los votos de una persona?**

Cuando un usuario confirma su voto, **todos** sus votos reciben el **mismo timestamp**:

```
Timestamp            | Tipo    | Lista/Fórmula
---------------------|---------|------------------
29/10/2025 21:30:45 | Lista   | Lista 110
29/10/2025 21:30:45 | Fórmula | PANESSI / NÚÑEZ
29/10/2025 21:30:45 | Fórmula | DE MARZI / TORREMORELL
```

**Resultado:** 1 persona, 3 votos

---

## 🎯 Ventajas de esta Métrica

✅ **Medir participación real** (no solo cantidad de tildes)
✅ **Comparar entre sedes** (¿dónde hay más participación?)
✅ **Detectar anomalías** (ej: muchos votos pero pocas personas = votos complejos)
✅ **Reportes de participación** (% de estudiantes que votaron)
✅ **Métrica más clara** para comunicar resultados

---

## 📋 Posición de las Métricas (Orden Nuevo)

### **Primera Fila (Principales):**
1. 🗳️ **Personas que Votaron** ← NUEVO (destacado en morado)
2. ✅ Total de Votos (Tildes)
3. 📋 Votos Lista Completa
4. 🎯 Votos por Cargo
5. 👥 Votos de Fórmulas

### **Segunda Fila (Secundarias):**
1. 📊 Listas Participantes
2. 📍 Sedes Activas
3. 🏆 Lista Líder
4. ⏱️ Última Actualización

---

## 🔄 Actualización Automática

La métrica se actualiza automáticamente:
- ⏱️ Cada **2 minutos** (auto-refresh)
- 🔄 Al **recargar manualmente** el dashboard
- 📊 Junto con todas las demás estadísticas

---

## 🐛 Solución de Problemas

### **Problema: Muestra 0 personas**
**Solución:**
- Verifica que haya datos en el Google Sheet
- Asegúrate de que la columna "Timestamp" tenga valores
- Recarga el dashboard con `Ctrl + F5`

### **Problema: El número es igual a "Total de Votos"**
**Posible causa:**
- Cada persona está votando solo 1 opción
- Verifica en el Sheet: si cada persona tiene solo 1 fila, es normal

### **Problema: El número parece muy alto**
**Posible causa:**
- Timestamps con milisegundos diferentes
- Verifica el formato del timestamp en el Google Apps Script
- Debería ser: `29/10/2025 21:30:45` (sin milisegundos)

---

## 📝 Código de Referencia

### **Generar Timestamp en Google Apps Script:**
```javascript
function obtenerFechaHora() {
  const fecha = new Date();
  return Utilities.formatDate(fecha, 'America/Argentina/Buenos_Aires', 'dd/MM/yyyy HH:mm:ss');
}
```

Este formato asegura que todos los votos de una persona tengan el **mismo timestamp** (hasta el segundo).

---

**Versión:** 1.5.0  
**Fecha:** 30 de Octubre de 2025  
**Estado:** ✅ Implementado y Funcional

