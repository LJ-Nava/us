# US Web Agency - Notas del Proyecto

## Stack Tecnológico
- **Vite** - Build tool
- **React** - UI Library
- **SCSS** - Preprocesador CSS

---

## Metodología BEM (OBLIGATORIA)

### Estructura BEM
```
.bloque {}
.bloque__elemento {}
.bloque--modificador {}
.bloque__elemento--modificador {}
```

### Reglas Estrictas

1. **BLOQUE**: Componente independiente con significado propio
   ```scss
   .header {}
   .hero {}
   .card {}
   ```

2. **ELEMENTO**: Parte del bloque que no tiene sentido solo
   - Siempre con doble guion bajo `__`
   ```scss
   .header__logo {}
   .header__nav {}
   .card__title {}
   ```

3. **MODIFICADOR**: Variación de bloque o elemento
   - Siempre con doble guion `--`
   ```scss
   .button--primary {}
   .card--featured {}
   .header__nav-link--active {}
   ```

### Prohibiciones
- NO anidar bloques dentro de otros
- NO usar más de un elemento encadenado (`.bloque__elemento__subelemento`)
- NO mezclar metodologías (no usar clases utilitarias sueltas)

### Ejemplo Correcto
```jsx
<article className="card card--featured">
  <img className="card__image" />
  <h3 className="card__title">Título</h3>
  <p className="card__description">Descripción</p>
  <a className="card__link card__link--primary">Ver más</a>
</article>
```

---

## Estructura de Carpetas

```
src/
├── components/          # Componentes React
├── styles/
│   ├── abstracts/       # Variables, mixins (no generan CSS)
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/            # Reset, tipografía
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── components/      # Estilos de componentes (BEM)
│   │   ├── _header.scss
│   │   ├── _hero.scss
│   │   └── _footer.scss
│   ├── layout/          # Estructura general
│   │   └── _app.scss
│   └── main.scss        # Archivo principal (importa todo)
├── App.jsx
└── main.jsx
```

---

## Convenciones de Código

### SCSS
- Cada componente tiene su propio archivo `_componente.scss`
- Usar variables para colores, espaciados, breakpoints
- Comentar cada bloque BEM claramente

### React (JSX)
- Clases BEM en `className`
- Un componente = Un bloque BEM (generalmente)

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de build
```
