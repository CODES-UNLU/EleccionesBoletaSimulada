# 🔧 Formato de Datos Corregido

## ❌ Problema Anterior
```
29/10/2025 21:07:39  Centro Regional CHIVILCOY  Fórmula  -  Fórmula  Fórmula  Fórmula: undefined
```

## ✅ Formato Nuevo Corregido

### 📋 **Voto de Lista Completa**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Lista Completa
Lista Completa: Lista 110
Cargo: Todos los cargos
Candidato Votado: -
Agrupación: Lista 110
```

---

### 🎯 **Voto Individual (Asamblea Universitaria)**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Individual
Lista Completa: -
Cargo: Asamblea Universitaria
Candidato Votado: PANESSI, LUCILA
Agrupación: Lista 110
```

---

### 👥 **Voto de Fórmula (Rector/Vicerrector - Opción A)**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Fórmula
Lista Completa: -
Cargo: Rector/Vicerrector
Candidato Votado: CRAIG / GIORGI
Agrupación: Fórmula A: CRAIG / GIORGI
```

---

### 👥 **Voto de Fórmula (Rector/Vicerrector - Opción B)**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Fórmula
Lista Completa: -
Cargo: Rector/Vicerrector
Candidato Votado: PANESSI / NÚÑEZ
Agrupación: Fórmula B: PANESSI / NÚÑEZ
```

---

### 👤 **Voto de Fórmula Única (Decano Ciencias Sociales)**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Fórmula
Lista Completa: -
Cargo: Decano Ciencias Sociales
Candidato Votado: LARRETAPE / CARLIS
Agrupación: Fórmula: LARRETAPE / CARLIS
```

---

### ⬜ **Voto en Blanco**
```
Timestamp: 30/10/2025 21:30:15
Sede: Centro Regional CHIVILCOY
Tipo de Voto: Voto en Blanco
Lista Completa: -
Cargo: -
Candidato Votado: -
Agrupación: -
```

---

## 🔍 Cambios Realizados en `sistema-votacion.js`

### 1. **Extracción de Lista Completa**
- ✅ Ahora usa `data-type="completa"` y `data-lista="110"`
- ✅ Detecta correctamente el número de lista

### 2. **Extracción de Votos Individuales**
- ✅ Usa `data-type="individual"`, `data-lista="110"`, `data-cargo="asamblea"`
- ✅ Busca los candidatos en `<div class="candidato">`
- ✅ Extrae solo el **primer candidato** como representante (en lugar de listar todos)
- ✅ Limpia el formato (quita "1- " del inicio)

### 3. **Extracción de Fórmulas**
- ✅ Busca la celda `td.formula-candidatos`
- ✅ Obtiene el cargo desde `td.formula-instancia`
- ✅ Lee todos los nombres desde `.formula-nombre`
- ✅ Crea nombre corto con apellidos (ej: "CRAIG / GIORGI")
- ✅ Detecta automáticamente si hay letra (A o B) según la posición
- ✅ Si solo hay una fórmula, no usa letra (ej: "Fórmula: LARRETAPE / CARLIS")

---

## 🧪 Ejemplo Completo de Votación

### **Usuario vota:**
- ✅ Lista Completa: Lista 110
- ✅ Consejo Superior individual: Opción de Lista 117
- ✅ Rector/Vicerrector: Fórmula B (PANESSI / NÚÑEZ)
- ✅ Decano Ciencias Básicas: Fórmula A (DE MARZI / TORREMORELL)

### **Datos enviados al Sheet:**

#### Fila 1:
```
30/10/2025 21:30:15 | Centro Regional CHIVILCOY | Lista Completa | Lista 110 | Todos los cargos | - | Lista 110
```

#### Fila 2:
```
30/10/2025 21:30:15 | Centro Regional CHIVILCOY | Individual | - | Consejo Superior | LUCERO, LORENA P. | Lista 117
```

#### Fila 3:
```
30/10/2025 21:30:15 | Centro Regional CHIVILCOY | Fórmula | - | Rector/Vicerrector | PANESSI / NÚÑEZ | Fórmula B: PANESSI / NÚÑEZ
```

#### Fila 4:
```
30/10/2025 21:30:15 | Centro Regional CHIVILCOY | Fórmula | - | Decano Ciencias Básicas | DE MARZI / TORREMORELL | Fórmula A: DE MARZI / TORREMORELL
```

---

## 🎯 Mapeo de Cargos

La función convierte códigos cortos a nombres completos:

| Código | Nombre Completo |
|--------|-----------------|
| `asamblea` | Asamblea Universitaria |
| `consejo` | Consejo Superior |
| `basicas` | Consejo Departamental - Ciencias Básicas |
| `sociales` | Consejo Departamental - Ciencias Sociales |
| `educacion` | Consejo Departamental - Educación |
| `tecnologia` | Consejo Departamental - Tecnología |
| `asesor` | Consejo Asesor |

---

## 🚀 Próximos Pasos

1. ✅ **Recarga la página** (Ctrl + F5) para cargar el nuevo JavaScript
2. ✅ **Abre la consola** (F12) para ver los logs
3. ✅ **Marca algunos checkboxes** en la boleta
4. ✅ **Click en "✅ Son Correctos"**
5. ✅ **Verifica en la consola** que los datos se capturen correctamente:
   ```
   🔍 Recolectando votos de la boleta...
   📊 Checkboxes seleccionados encontrados: 4
   ✅ Voto capturado: {tipoVoto: 'Lista Completa', listaCompleta: 'Lista 110', ...}
   ✅ Voto capturado: {tipoVoto: 'Individual', cargo: 'Consejo Superior', ...}
   ✅ Voto capturado: {tipoVoto: 'Fórmula', cargo: 'Rector/Vicerrector', ...}
   ✅ Voto capturado: {tipoVoto: 'Fórmula', cargo: 'Decano Ciencias Básicas', ...}
   📋 Total de votos recolectados: 4
   ```
6. ✅ **Revisa el Google Sheet** para ver los datos registrados

---

## 🐛 Debugging

Si los datos siguen mostrando "undefined":

1. **Abre la consola del navegador** (F12)
2. **Busca errores en rojo**
3. **Verifica que el archivo `sistema-votacion.js` se haya recargado** (usa Ctrl + F5)
4. **Revisa los logs** de `🔍 Recolectando votos...`
5. **Si dice "⚠️ No se pudo determinar el tipo de voto"**, copia ese checkbox en la consola para inspeccionarlo

---

**Versión:** 1.2.0  
**Fecha:** 30 de Octubre de 2025  
**Estado:** ✅ Corregido y Listo para Probar

