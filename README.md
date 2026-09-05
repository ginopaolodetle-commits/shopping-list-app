# 🛒 Shopping List App - Lista de Compras

Una aplicación web moderna y responsiva para crear listas de compras con cálculo automático de precios totales. Perfecta para usar en el supermercado desde tu celular o PC.

## ✨ Características

- ✅ **Diseño Responsivo**: Funciona perfectamente en celular, tablet y PC
- ✅ **Agregar Productos**: Ingresa el nombre y precio de cada producto
- ✅ **Cálculo Automático**: Ve el total en tiempo real
- ✅ **Eliminar Productos**: Quita items de la lista fácilmente
- ✅ **Persistencia de Datos**: Tu lista se guarda automáticamente en el navegador
- ✅ **Interfaz Intuitiva**: Diseño moderno y fácil de usar
- ✅ **Sin Conexión**: Funciona completamente offline

## 🚀 Cómo Usar

### 1. Abrir la Aplicación
- Descarga los archivos o abre directamente desde GitHub Pages
- Abre `index.html` en tu navegador

### 2. Agregar Productos
1. Escribe el nombre del producto en el campo "Nombre del producto"
2. Ingresa el precio en el campo "Precio"
3. Haz clic en "Agregar" o presiona Enter
4. ¡El producto se agregará a tu lista!

### 3. Ver el Total
- El total se actualiza automáticamente en la sección de resumen
- Puedes ver cuántos productos tienes y el precio total

### 4. Eliminar Productos
- Haz clic en el botón "🗑️ Eliminar" junto a cada producto
- El total se actualizará automáticamente

### 5. Limpiar la Lista
- Haz clic en "Limpiar Lista" para eliminar todos los productos
- Tendrás que confirmar la acción

## 📱 Responsividad

La aplicación está optimizada para:
- **Móviles**: 320px - 480px (celulares)
- **Tablets**: 481px - 768px (tablets)
- **Escritorio**: 769px+ (computadoras)

## 💾 Almacenamiento

- Los datos se guardan automáticamente en el **localStorage** del navegador
- Tu lista persiste incluso si cierras y vuelves a abrir la aplicación
- Cada dispositivo tiene su propia lista independiente

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsivos y animaciones
- **JavaScript Vanilla**: Lógica sin dependencias externas

## 📦 Estructura del Proyecto

```
shopping-list-app/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Este archivo
```

## 🎨 Colores Utilizados

- **Primario**: #ff6b6b (Rojo)
- **Secundario**: #4ecdc4 (Turquesa)
- **Éxito**: #00b894 (Verde)
- **Fondo**: Gradiente púrpura

## ⚠️ Validaciones

La aplicación valida:
- ✓ No permite agregar productos sin nombre
- ✓ No permite precios negativos o inválidos
- ✓ Confirma antes de limpiar la lista completa

## 🔒 Seguridad

- Escapado de caracteres especiales para prevenir inyecciones XSS
- Validación de entrada del usuario
- Sin envío de datos a servidores externos

## 📝 Notas

- La lista se guarda localmente en tu dispositivo
- Los datos no se sincronizarán entre dispositivos
- Limpiar el caché del navegador eliminará los datos

## 🚀 Futuras Mejoras Posibles

- 📊 Exportar lista a PDF
- 📤 Compartir lista con otros usuarios
- 🏪 Predefinir productos populares
- 📈 Historial de compras
- 🎯 Establecer presupuesto máximo
- 🏷️ Categorizar productos

## 👨‍💻 Autor

Creado con ❤️ para hacer más fácil tu experiencia de compras

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT - siéntete libre de usarlo, modificarlo y compartirlo.

---

**¿Te gusta? ⭐ Dale una estrella en GitHub!**
