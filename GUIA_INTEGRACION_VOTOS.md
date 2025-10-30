# 🗳️ Guía de Integración - Sistema de Votación Real

Esta guía te explica cómo integrar el sistema de votación real en tus boletas HTML.

## 📋 Archivos Necesarios

- ✅ `sistema-votacion.js` - El script principal (ya está creado)
- ✅ `codigo-google-apps-script.js` - Ya configurado en Google Sheet
- ✅ `dashboard.html` - Ya configurado con la URL

## 🚀 Paso 1: Incluir el Script en tus Boletas

Agrega esta línea **antes del cierre de `</body>`** en cada boleta HTML:

```html
<!-- Justo antes de </body> -->
<script src="sistema-votacion.js"></script>
<script>
  // Inicializar con el nombre de la sede
  inicializarSistemaVotacion('LUJÁN'); // Cambiar según la boleta
</script>
</body>
```

### Sedes por archivo:

- `boleta-lujan.html` → `'LUJÁN'`
- `boleta-chivilcoy.html` → `'Centro Regional CHIVILCOY'`
- `boleta-san-miguel.html` → `'Centro Regional SAN MIGUEL'`
- `boleta-campana.html` → `'Centro Regional CAMPANA'`
- `boleta-san-fernando.html` → `'Delegación SAN FERNANDO'`

## 🚀 Paso 2: Agregar Botón de Confirmación

Agrega un botón al final de cada boleta (antes del script):

```html
<div style="text-align: center; margin: 40px 0; padding: 20px; background: #f5f5f5; border-radius: 10px;">
  <h3 style="color: #ff9800; margin-bottom: 15px;">¿Terminaste de votar?</h3>
  <p style="margin-bottom: 20px; color: #666;">
    Revisa tus selecciones antes de confirmar. Una vez enviado, no podrás modificar tu voto.
  </p>
  <button 
    onclick="enviarVotosAlSheet()" 
    style="
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
      transition: transform 0.2s;
    "
    onmouseover="this.style.transform='scale(1.05)'"
    onmouseout="this.style.transform='scale(1)'"
  >
    ✅ Son Correctos
  </button>
</div>

<script src="sistema-votacion.js"></script>
<script>
  inicializarSistemaVotacion('LUJÁN'); // Cambiar según la sede
</script>
```

## ✨ Paso 3: Funcionamiento Automático

El sistema capturará automáticamente:

### ✅ Voto de Lista Completa
```javascript
// Se captura cuando hacen click en "LISTA COMPLETA"
{
  tipoVoto: 'Lista Completa',
  listaCompleta: 'Lista 110',
  cargo: 'Todos los cargos',
  candidato: '-',
  agrupacion: 'Lista 110'
}
```

### ✅ Votos Individuales por Cargo
```javascript
// Se captura cada checkbox marcado
{
  tipoVoto: 'Individual',
  listaCompleta: '-',
  cargo: 'Asamblea Universitaria',
  candidato: 'PANESSI LUCILA',
  agrupacion: 'Lista 110'
}
```

### ✅ Votos de Fórmulas
```javascript
// Se captura cada fórmula seleccionada
{
  tipoVoto: 'Fórmula',
  listaCompleta: '-',
  cargo: 'Rector/Vicerrector',
  candidato: 'PANESSI / NUÑEZ',
  agrupacion: 'Fórmula B: PANESSI / NUÑEZ'
}
```

## 🎯 Paso 4: Configurar Data Attributes (IMPORTANTE)

Para que el script funcione correctamente, asegúrate de que tus checkboxes tengan estos atributos:

### Para Lista Completa:
```html
<div class="checkbox" 
  data-type="completa"
  data-lista="110"
></div>
```

### Para Votos Individuales:
```html
<div class="checkbox"
  data-type="individual"
  data-lista="110"
  data-cargo="asamblea"
  data-candidato="PANESSI LUCILA"
  data-agrupacion="Lista 110"
></div>
```

### Para Fórmulas:
```html
<div class="checkbox"
  data-type="formula"
  data-formula="Rector/Vicerrector"
  data-candidato="PANESSI / NUÑEZ"
  data-agrupacion="Fórmula B: PANESSI / NUÑEZ"
></div>
```

## 📊 Paso 5: Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Haz selecciones en la boleta
3. Deberías ver mensajes como:
   ```
   ✅ Sistema de votación inicializado para: LUJÁN
   ✅ Voto agregado: {...}
   📊 Total selecciones: 3
   ```

4. Click en "Confirmar y Enviar Voto"
5. Deberías ver:
   ```
   📤 Enviando votos al Sheet...
   ✅ Votos enviados correctamente
   ```

6. Verifica en el Google Sheet que aparezcan los datos

## 🔧 Modo Prueba vs Producción

En `sistema-votacion.js` línea 17:

```javascript
const VOTACION_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/...',
  MODO_PRUEBA: true, // ← Cambiar a false para producción
};
```

- **MODO_PRUEBA: true** → Solo registra en consola, no envía al Sheet
- **MODO_PRUEBA: false** → Envía los votos reales al Sheet

## ✅ Checklist Final

Antes de ponerlo en producción:

- [ ] El script está incluido en todas las boletas
- [ ] Cada boleta tiene el nombre de sede correcto
- [ ] Los data-attributes están configurados
- [ ] El botón "Confirmar Voto" está agregado
- [ ] MODO_PRUEBA está en `false`
- [ ] Probaste el envío y aparece en el Google Sheet
- [ ] El dashboard muestra los votos correctamente

## 🎉 ¡Listo!

Ahora tu sistema está completo:
- ✅ Boletas capturan votos automáticamente
- ✅ Los votos se envían al Google Sheet
- ✅ El dashboard muestra estadísticas en tiempo real

---

## 🆘 Problemas Comunes

### "No se detectó la sede"
→ Verifica que llamaste `inicializarSistemaVotacion('NOMBRE_SEDE')`

### "No has realizado ninguna selección"
→ Verifica que los checkboxes tengan `class="checkbox"` y los data-attributes correctos

### "Error al enviar el voto"
→ Verifica que `SCRIPT_URL` sea correcta y que el Apps Script esté implementado como "Web App"

### Los datos no aparecen en el Sheet
→ Verifica que ejecutaste "Inicializar Sistema" en el menú del Sheet

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver mensajes de debug.

