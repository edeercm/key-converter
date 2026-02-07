// ========================================
// CRYPTO KEY CONVERTER - Main Logic
// ========================================

/**
 * Convierte UUID a AES-256 (SHA-256 hash en hexadecimal)
 */
function convertUUID() {
    const input = document.getElementById('uuidInput').value.trim();
    
    if (!input) {
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
        
        console.log('UUID convertido exitosamente');
        console.log('Longitud:', hexResult.length, 'caracteres');
    } catch (error) {
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
        
        console.log('Base64 convertido exitosamente');
        console.log('Longitud:', hexResult.length, 'caracteres');
    } catch (error) {
        showError('Error al procesar el Base64: ' + error.message);
        console.error('Error en convertBase64:', error);
    }
}

/**
 * Copia texto al portapapeles
 * @param {string} elementId - ID del elemento que contiene el texto a copiar
 */
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ ¡Copiado!';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        showError('Error al copiar: ' + err.message);
        console.error('Error en copyToClipboard:', err);
    });
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