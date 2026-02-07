// ========================================
// CRYPTO KEY CONVERTER - Main Logic
// ========================================

/**
 * Convierte UUID a AES-256 (SHA-256 hash en hexadecimal)
 */
function convertUUID() {
    const input = document.getElementById('uuidInput').value.trim();
    
    if (!input) {
        showToast('⚠️ Por favor ingresa un UUID válido', 'warning');
        showError('Por favor ingresa un UUID/Key válido');
        return;
    }

    try {
        // Generar SHA-256 hash del UUID
        const hash = CryptoJS.SHA256(input);
        const hexResult = hash.toString(CryptoJS.enc.Hex);
        
        // Mostrar resultado
        document.getElementById('aesOutput').textContent = hexResult;
        document.getElementById('aesResult').classList.remove('hidden');
        hideError();
        
        showToast('✨ UUID convertido exitosamente', 'success');
        console.log('UUID convertido exitosamente');
        console.log('Longitud:', hexResult.length, 'caracteres');
    } catch (error) {
        showToast('❌ Error al procesar UUID', 'error');
        showError('Error al procesar el UUID: ' + error.message);
        console.error('Error en convertUUID:', error);
    }
}

/**
 * Convierte Base64 a HMAC-256 (SHA-256 hash en hexadecimal)
 */
function convertBase64() {
    const input = document.getElementById('base64Input').value.trim();
    
    if (!input) {
        showToast('⚠️ Por favor ingresa un Shared Secret válido', 'warning');
        showError('Por favor ingresa un Shared Secret válido');
        return;
    }

    try {
        // Decodificar Base64
        const decoded = CryptoJS.enc.Base64.parse(input);
        
        // Generar SHA-256 hash
        const hash = CryptoJS.SHA256(decoded);
        const hexResult = hash.toString(CryptoJS.enc.Hex);
        
        // Mostrar resultado
        document.getElementById('hmacOutput').textContent = hexResult;
        document.getElementById('hmacResult').classList.remove('hidden');
        hideError();
        
        showToast('✨ Base64 convertido exitosamente', 'success');
        console.log('Base64 convertido exitosamente');
        console.log('Longitud:', hexResult.length, 'caracteres');
    } catch (error) {
        showToast('❌ Error al procesar Base64', 'error');
        showError('Error al procesar el Base64: ' + error.message);
        console.error('Error en convertBase64:', error);
    }
}

/**
 * Copia texto al portapapeles con toast notification
 * @param {string} elementId - ID del elemento que contiene el texto a copiar
 */
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar toast notification
        showToast('✅ ¡Copiado al portapapeles!', 'success');
        console.log('Texto copiado:', text.substring(0, 20) + '...');
    }).catch(err => {
        showToast('❌ Error al copiar', 'error');
        showError('Error al copiar: ' + err.message);
        console.error('Error en copyToClipboard:', err);
    });
}

/**
 * Muestra una toast notification
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación: 'success', 'error', 'info', 'warning'
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    // Crear el toast
    const toast = document.createElement('div');
    toast.className = `transform transition-all duration-300 ease-in-out translate-x-0 opacity-100`;
    
    // Colores según el tipo
    const colors = {
        success: 'bg-green-500 border-green-600',
        error: 'bg-red-500 border-red-600',
        info: 'bg-blue-500 border-blue-600',
        warning: 'bg-yellow-500 border-yellow-600'
    };
    
    toast.innerHTML = `
        <div class="${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg border-l-4 flex items-center space-x-3 min-w-[250px]">
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-white hover:text-gray-200">
                ✕
            </button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove después de 3 segundos
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(message) {
    document.getElementById('errorText').textContent = message;
    document.getElementById('errorMessage').classList.remove('hidden');
}

/**
 * Oculta el mensaje de error
 */
function hideError() {
    document.getElementById('errorMessage').classList.add('hidden');
}

/**
 * Limpia todos los campos y resultados
 */
function clearAll() {
    document.getElementById('uuidInput').value = '';
    document.getElementById('base64Input').value = '';
    document.getElementById('aesResult').classList.add('hidden');
    document.getElementById('hmacResult').classList.add('hidden');
    hideError();
    console.log('Campos limpiados');
}

// ========================================
// EVENT LISTENERS
// ========================================

// Limpiar campos al presionar Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        clearAll();
    }
});

// Permitir conversión con Enter
document.addEventListener('DOMContentLoaded', function() {
    const uuidInput = document.getElementById('uuidInput');
    const base64Input = document.getElementById('base64Input');
    
    if (uuidInput) {
        uuidInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                convertUUID();
            }
        });
    }
    
    if (base64Input) {
        base64Input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                convertBase64();
            }
        });
    }
    
    console.log('🔐 Crypto Key Converter cargado exitosamente');
    console.log('Presiona ESC para limpiar campos');
});