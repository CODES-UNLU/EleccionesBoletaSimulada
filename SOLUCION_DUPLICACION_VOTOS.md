# 🔧 Solución: Duplicación de Votos en Lista Completa

## ❌ Problema

Cuando se votaba **Lista Completa**, se registraban:
1. ✅ 1 voto de "Lista Completa"
2. ❌ **7 votos individuales** (uno por cada cargo)
3. ✅ Votos de fórmulas

**Ejemplo del problema:**
```
Lista Completa | Lista 110 | Todos los cargos          ← ✅ Correcto
Individual     | Lista 110 | Asamblea Universitaria    ← ❌ Duplicado
Individual     | Lista 110 | Consejo Superior          ← ❌ Duplicado
Individual     | Lista 110 | Consejo Departamental...  ← ❌ Duplicado
... (5 más)
Fórmula        | -         | Rector/Vicerrector        ← ✅ Correcto
```

**Resultado:** 1 voto se contaba como **9 votos** (1 completo + 7 individuales + 1 fórmula)

---

## ✅ Solución

Modificación en `sistema-votacion.js` → función `recolectarVotosActuales()`:

### **Lógica nueva:**
1. **Primero detecta** qué listas tienen voto completo marcado
2. **Luego recolecta** los votos, pero:
   - ✅ Si es "Lista Completa" → **lo registra**
   - ✅ Si es "Fórmula" → **lo registra** (siempre)
   - ⏭️ Si es "Individual" de una lista que ya tiene voto completo → **lo omite**

### **Código agregado:**
```javascript
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
```

---

## 📊 Resultados Esperados

### **Caso 1: Solo Lista Completa + Fórmulas**

**Usuario vota:**
- ✅ Lista 110 completa
- ✅ Rector: Fórmula B (PANESSI / NÚÑEZ)

**Datos enviados al Sheet:**
```
Lista Completa | Lista 110 | Todos los cargos
Fórmula        | -         | Rector/Vicerrector | PANESSI / NÚÑEZ
```
**Total:** 2 votos ✅

---

### **Caso 2: Lista Completa + Votos Individuales de OTRA Lista**

**Usuario vota:**
- ✅ Lista 110 completa
- ✅ Consejo Superior: Lista 117 (individual)
- ✅ Rector: Fórmula B (PANESSI / NÚÑEZ)

**Datos enviados al Sheet:**
```
Lista Completa | Lista 110 | Todos los cargos
Individual     | Lista 117 | Consejo Superior      ← ✅ De otra lista, se registra
Fórmula        | -         | Rector/Vicerrector
```
**Total:** 3 votos ✅

---

### **Caso 3: Solo Votos Individuales (sin lista completa)**

**Usuario vota:**
- ✅ Asamblea: Lista 110 (individual)
- ✅ Consejo: Lista 110 (individual)
- ✅ Rector: Fórmula B (PANESSI / NÚÑEZ)

**Datos enviados al Sheet:**
```
Individual | Lista 110 | Asamblea Universitaria
Individual | Lista 110 | Consejo Superior
Fórmula    | -         | Rector/Vicerrector
```
**Total:** 3 votos ✅

---

### **Caso 4: Votos Mixtos de Múltiples Listas**

**Usuario vota:**
- ✅ Lista 110 completa
- ✅ Asamblea: Lista 117 (individual) ← De otra lista
- ✅ Consejo: Lista 101 (individual) ← De otra lista
- ✅ Rector: Fórmula B (PANESSI / NÚÑEZ)

**Datos enviados al Sheet:**
```
Lista Completa | Lista 110 | Todos los cargos
Individual     | Lista 117 | Asamblea Universitaria
Individual     | Lista 101 | Consejo Superior
Fórmula        | -         | Rector/Vicerrector
```
**Total:** 4 votos ✅

---

## 🧪 Cómo Probar

1. **Recarga la página con caché limpio:**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

2. **Abre la consola (F12):**
   - Ve a la pestaña "Console"

3. **Marca SOLO "Lista Completa" de Lista 110**

4. **Marca una fórmula (ej: Rector - Fórmula B)**

5. **Click en "✅ Son Correctos"**

6. **Verifica en la consola:**
   ```
   🔍 Recolectando votos de la boleta...
   📊 Checkboxes seleccionados encontrados: 9
   📋 Lista completa detectada: 110
   ✅ Voto capturado: {tipoVoto: 'Lista Completa', ...}
   ⏭️ Voto individual omitido (lista completa ya marcada): Asamblea Universitaria - PANESSI, LUCILA
   ⏭️ Voto individual omitido (lista completa ya marcada): Consejo Superior - FREITA, FRANCO E.
   ... (5 más)
   ✅ Voto capturado: {tipoVoto: 'Fórmula', cargo: 'Rector/Vicerrector', ...}
   📋 Total de votos recolectados: 2
   ```

7. **Revisa el Google Sheet:**
   - Deberías ver **SOLO 2 filas**: 1 de lista completa + 1 de fórmula
   - ✅ Sin duplicados de votos individuales

---

## 🔍 Logs de Debugging

### **Logs en Consola:**
- `📋 Lista completa detectada: 110` → Detectó voto completo
- `⏭️ Voto individual omitido...` → Omitió duplicados
- `✅ Voto capturado:` → Registró votos válidos

### **Ejemplo de log completo:**
```
🔍 Recolectando votos de la boleta...
📊 Checkboxes seleccionados encontrados: 9
📋 Lista completa detectada: 110
✅ Voto capturado: {
  tipoVoto: 'Lista Completa',
  listaCompleta: 'Lista 110',
  cargo: 'Todos los cargos',
  candidato: '-',
  agrupacion: 'Lista 110'
}
⏭️ Voto individual omitido (lista completa ya marcada): Asamblea Universitaria - PANESSI, LUCILA
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Superior - FREITA, FRANCO E.
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Departamental - Ciencias Básicas - VACCARO, GIANFRANCO
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Departamental - Ciencias Sociales - LENCINA, THIAGO S.
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Departamental - Educación - CASSE, CLAUDIA M.
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Departamental - Tecnología - CIRULLI, FATIMA D.
⏭️ Voto individual omitido (lista completa ya marcada): Consejo Asesor - RESSIA, J. JESÚS
✅ Voto capturado: {
  tipoVoto: 'Fórmula',
  listaCompleta: '-',
  cargo: 'Rector/Vicerrector',
  candidato: 'PANESSI / NÚÑEZ',
  agrupacion: 'Fórmula B: PANESSI / NÚÑEZ'
}
📋 Total de votos recolectados: 2
```

---

## ⚠️ Importante

Esta solución **NO afecta** el comportamiento visual de la boleta:
- ✅ Los checkboxes se siguen marcando/desmarcando normalmente
- ✅ El usuario ve la misma interfaz
- ✅ Solo cambia qué datos se envían al Sheet

La diferencia es **SOLO en el momento de enviar**: se filtran los votos duplicados antes de enviarse al Google Sheet.

---

## 🎯 Casos Edge

### **¿Qué pasa si el usuario desmarca la lista completa después?**
- Si el usuario marca "Lista Completa" y luego la desmarca, los checkboxes individuales permanecerán marcados
- En ese caso, se registrarán como votos individuales ✅

### **¿Qué pasa si marca lista completa de DOS listas diferentes?**
- El sistema omitirá los votos individuales de AMBAS listas
- Solo registrará los 2 votos de lista completa + las fórmulas ✅

### **¿Las fórmulas se siguen registrando siempre?**
- Sí, las fórmulas (Rector/Decanos) se registran **SIEMPRE**
- No se consideran parte de la "lista completa" ✅

---

**Versión:** 1.3.0  
**Fecha:** 30 de Octubre de 2025  
**Estado:** ✅ Probado y Funcional

