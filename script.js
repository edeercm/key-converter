// ========================================
// CRYPTO KEY CONVERTER - Lógica Principal
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a elementos del DOM ---
    const uuidInput = document.getElementById('uuidInput');
    const base64Input = document.getElementById('base64Input');
    
    // Botones de conversión
    const btnConvertUUID = document.getElementById('btnConvertUUID');
    const btnConvertBase64 = document.getElementById('btnConvertBase64');
    
    // Botones de copiado (Nuevos IDs agregados en el HTML)
    const btnCopyAES = document.getElementById('btnCopyAES');
    const btnCopyHMAC = document.getElementById('btnCopyHMAC');

    // --- Funciones de Utilidad ---

    /**
     * Muestra u oculta errores y gestiona estilos del input
     */
    const toggleError = (inputElement, errorElement, message) => {
        if (message) {
            // Mostrar error
            errorElement.querySelector('span').textContent = message;
            errorElement.classList.remove('hidden');
            
            // Estilo de error (rojo)
            inputElement.classList.add('border-red-500', 'bg-red-900/10');
            inputElement.classList.remove('border-blue-400/30', 'border-purple-400/30');
        } else {
            // Ocultar error
            errorElement.classList.add('hidden');
            
            // Restaurar estilos (quitar rojo)
            inputElement.classList.remove('border-red-500', 'bg-red-900/10');
            
            // Restaurar borde original según el tipo de input
            if(inputElement.id === 'uuidInput') {
                inputElement.classList.add('border-blue-400/30');
            } else {
                inputElement.classList.add('border-purple-400/30');
            }
        }
    };

    /**
     * Maneja el copiado al portapapeles de forma segura
     * @param {string} textId - ID del elemento que contiene el texto
     * @param {HTMLElement} btnElement - El botón que fue presionado
     * @param {string} originalColorClass - Clase de color original para restaurar (ej: text-blue-300)
     */
    const handleCopy = async (textId, btnElement, originalColorClass) => {
        const text = document.getElementById(textId).textContent;
        if (!text) return; // No hacer nada si está vacío

        try {
            // Intentar copiar
            await navigator.clipboard.writeText(text);
            
            // Feedback Visual (Éxito)
            const originalHTML = btnElement.innerHTML;
            btnElement.textContent = '✅ ¡Copiado!';
            
            // Cambiar colores
            btnElement.classList.remove(originalColorClass);
            btnElement.classList.add('text-green-400');
            
            // Restaurar después de 2 segundos
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
                btnElement.classList.remove('text-green-400');
                btnElement.classList.add(originalColorClass);
            }, 2000);

        } catch (err) {
            console.error('Error al copiar:', err);
            // Feedback Visual (Error discreto en el botón, sin popup)
            const originalText = btnElement.textContent;
            btnElement.textContent = '❌ Error';
            setTimeout(() => btnElement.textContent = originalText, 2000);
        }
    };

    // --- Lógica de Conversión ---

    const processUUID = () => {
        const input = uuidInput.value.trim();
        const errorEl = document.getElementById('uuidError');
        const outputEl = document.getElementById('aesOutput');
        const resultDiv = document.getElementById('aesResult');

        if (!input) {
            toggleError(uuidInput, errorEl, "Campo requerido");
            resultDiv.classList.add('hidden');
            return;
        }

        try {
            toggleError(uuidInput, errorEl, null); // Limpiar error
            
            const hash = CryptoJS.SHA256(input);
            outputEl.textContent = hash.toString(CryptoJS.enc.Hex);
            
            resultDiv.classList.remove('hidden');
        } catch (error) {
            toggleError(uuidInput, errorEl, "Error: " + error.message);
        }
    };

    const processBase64 = () => {
        const input = base64Input.value.trim();
        const errorEl = document.getElementById('base64Error');
        const outputEl = document.getElementById('hmacOutput');
        const resultDiv = document.getElementById('hmacResult');

        if (!input) {
            toggleError(base64Input, errorEl, "Campo requerido");
            resultDiv.classList.add('hidden');
            return;
        }

        try {
            toggleError(base64Input, errorEl, null); // Limpiar error

            const decoded = CryptoJS.enc.Base64.parse(input);
            const hash = CryptoJS.SHA256(decoded);
            outputEl.textContent = hash.toString(CryptoJS.enc.Hex);
            
            resultDiv.classList.remove('hidden');
        } catch (error) {
            toggleError(base64Input, errorEl, "Base64 inválido");
        }
    };

    // --- Event Listeners ---
    
    // 1. Botones de Conversión
    if(btnConvertUUID) btnConvertUUID.addEventListener('click', processUUID);
    if(btnConvertBase64) btnConvertBase64.addEventListener('click', processBase64);

    // 2. Botones de Copiado (Con parámetros fijos para evitar errores de referencia)
    if(btnCopyAES) {
        btnCopyAES.addEventListener('click', () => handleCopy('aesOutput', btnCopyAES, 'text-blue-300'));
    }
    if(btnCopyHMAC) {
        btnCopyHMAC.addEventListener('click', () => handleCopy('hmacOutput', btnCopyHMAC, 'text-purple-300'));
    }

    // 3. Limpieza de errores al escribir
    uuidInput.addEventListener('input', () => toggleError(uuidInput, document.getElementById('uuidError'), null));
    base64Input.addEventListener('input', () => toggleError(base64Input, document.getElementById('base64Error'), null));

    // 4. Tecla Enter
    uuidInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processUUID(); });
    base64Input.addEventListener('keypress', (e) => { if (e.key === 'Enter') processBase64(); });

    // 5. Tecla Escape (Limpiar todo)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            uuidInput.value = '';
            base64Input.value = '';
            document.getElementById('aesResult').classList.add('hidden');
            document.getElementById('hmacResult').classList.add('hidden');
            toggleError(uuidInput, document.getElementById('uuidError'), null);
            toggleError(base64Input, document.getElementById('base64Error'), null);
        }
    });

    console.log('🔐 Sistema cargado y listo');
});