// Variables globales
let items = [];

// Elementos del DOM
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addBtn = document.getElementById('addBtn');
const itemsList = document.getElementById('itemsList');
const emptyMessage = document.getElementById('emptyMessage');
const itemCountSpan = document.getElementById('itemCount');
const totalPriceSpan = document.getElementById('totalPrice');
const clearBtn = document.getElementById('clearBtn');

// Cargar datos del localStorage cuando se abre la página
window.addEventListener('DOMContentLoaded', loadItems);

// Eventos
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

// Permitir agregar item con Enter en los inputs
productNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

productPriceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

// Función para agregar un item
function addItem() {
    const name = productNameInput.value.trim();
    const rawPrice = productPriceInput.value.trim();
    
    // Si la persona ingresó precio se procesa, de lo contrario se deja en 0
    const price = rawPrice !== '' ? parseFloat(rawPrice) : 0;

    // Validaciones: solo verificamos el nombre
    if (!name) {
        showNotification('Por favor ingresa el nombre del producto', 'error');
        productNameInput.focus();
        return;
    }

    if (isNaN(price) || price < 0) {
        showNotification('Por favor ingresa un precio válido o déjalo vacío', 'error');
        productPriceInput.focus();
        return;
    }

    // Crear objeto del item
    const item = {
        id: Date.now(),
        name: name,
        price: price
    };

    // Agregar a la lista
    items.push(item);

    // Guardar en localStorage
    saveItems();

    // Limpiar inputs
    productNameInput.value = '';
    productPriceInput.value = '';
    productNameInput.focus();

    // Actualizar la visualización
    renderItems();
    updateSummary();
}

// Función para actualizar el precio de un producto desde la lista
function updateItemPrice(id, newPrice) {
    const parsedPrice = parseFloat(newPrice);
    const validPrice = !isNaN(parsedPrice) && parsedPrice >= 0 ? parsedPrice : 0;

    items = items.map((item) => {
        if (item.id === id) {
            return { ...item, price: validPrice };
        }
        return item;
    });

    saveItems();
    updateSummary();
}

// Función para renderizar los items en la pantalla
function renderItems() {
    itemsList.innerHTML = '';

    if (items.length === 0) {
        emptyMessage.classList.add('show');
        itemsList.style.display = 'none';
    } else {
        emptyMessage.classList.remove('show');
        itemsList.style.display = 'flex';

        items.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            
            // Si el precio es 0, mostramos el campo listo para cargar el valor
            const priceValue = item.price > 0 ? item.price : '';

            itemElement.innerHTML = `
                <div class="item-details" style="display: flex; align-items: center; gap: 10px; width: 100%;">
                    <div class="item-name" style="flex: 1;">${escapeHtml(item.name)}</div>
                    <div class="item-price" style="display: flex; align-items: center; gap: 4px;">
                        <span>$</span>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            min="0" 
                            step="0.01" 
                            value="${priceValue}"
                            style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid #ccc;"
                            onchange="updateItemPrice(${item.id}, this.value)"
                            onkeyup="updateItemPrice(${item.id}, this.value)"
                        />
                    </div>
                </div>
                <div class="item-actions">
                    <button class="delete-btn" onclick="deleteItem(${item.id})">🗑️</button>
                </div>
            `;
            itemsList.appendChild(itemElement);
        });
    }
}

// Función para eliminar un item
function deleteItem(id) {
    items = items.filter((item) => item.id !== id);
    saveItems();
    renderItems();
    updateSummary();
}

// Función para actualizar el resumen (cantidad y total)
function updateSummary() {
    itemCountSpan.textContent = items.length;

    const total = items.reduce((sum, item) => sum + item.price, 0);
    totalPriceSpan.textContent = `$${total.toFixed(2)}`;
}

// Función para limpiar toda la lista
function clearList() {
    if (items.length === 0) {
        showNotification('La lista ya está vacía', 'info');
        return;
    }

    if (confirm('¿Estás seguro de que quieres limpiar toda la lista?')) {
        items = [];
        saveItems();
        renderItems();
        updateSummary();
        showNotification('Lista limpiada correctamente', 'success');
    }
}

// Función para guardar en localStorage
function saveItems() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Función para cargar desde localStorage
function loadItems() {
    const saved = localStorage.getItem('shoppingList');
    if (saved) {
        try {
            items = JSON.parse(saved);
            renderItems();
            updateSummary();
        } catch (e) {
            console.error('Error al cargar los datos:', e);
            items = [];
        }
    } else {
        renderItems();
        updateSummary();
    }
}

// Función para mostrar notificaciones (feedback al usuario)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#00b894' : '#4ecdc4'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
        word-break: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para escapar caracteres especiales (seguridad XSS)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
