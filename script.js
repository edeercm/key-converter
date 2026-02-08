// ========================================
// CRYPTO KEY CONVERTER - Lógica Principal
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const uuidInput = document.getElementById('uuidInput');
    const base64Input = document.getElementById('base64Input');
    const btnConvertUUID = document.getElementById('btnConvertUUID');
    const btnConvertBase64 = document.getElementById('btnConvertBase64');

    // --- Funciones de Utilidad Visual ---

    /**
     * Muestra u oculta errores específicos por campo y altera estilos
     * @param {HTMLElement} inputElement - El input que tiene el error
     * @param {HTMLElement} errorElement - El elemento <p> del mensaje de error
     * @param {string|null} message - El mensaje a mostrar (null para ocultar)
     */
    const toggleError = (inputElement, errorElement, message) => {
        if (message) {
            // Mostrar error
            errorElement.querySelector('span').textContent = message;
            errorElement.classList.remove('hidden');
            
            // Estilo de error en el input (borde rojo y fondo rojizo)
            inputElement.classList.add('border-red-500', 'bg-red-900/10');
            inputElement.classList.remove('border-blue-400/30', 'border-purple-400/30');
        } else {
            // Ocultar error
            errorElement.classList.add('hidden');
            
            // Restaurar estilos originales
            inputElement.classList.remove('border-red-500', 'bg-red-900/10');
            // Re-agregar el borde azul o morado según corresponda (simple check por ID)
            if(inputElement.id === 'uuidInput') {
                inputElement.classList.add('border-blue-400/30');
            } else {
                inputElement.classList.add('border-purple-400/30');
            }
        }
    };

    // --- Lógica de Negocio ---

    const handleUuidConversion = () => {
        const input = uuidInput.value.trim();
        const errorEl = document.getElementById('uuidError');
        const outputEl = document.getElementById('aesOutput');
        const resultDiv = document.getElementById('aesResult');

        // Validación
        if (!input) {
            toggleError(uuidInput, errorEl, "Campo requerido");
            resultDiv.classList.add('hidden');
            return;
        }

        try {
            toggleError(uuidInput, errorEl, null); // Limpiar errores previos
            
            // Generar SHA-256 hash del UUID
            const hash = CryptoJS.SHA256(input);
            const hexResult = hash.toString(CryptoJS.enc.Hex);

            // Mostrar resultado
            outputEl.textContent = hexResult;
            resultDiv.classList.remove('hidden');
            
            console.log('UUID procesado exitosamente');
        } catch (error) {
            toggleError(uuidInput, errorEl, "Error al procesar: " + error.message);
            console.error(error);
        }
    };

    const handleBase64Conversion = () => {
        const input = base64Input.value.trim();
        const errorEl = document.getElementById('base64Error');
        const outputEl = document.getElementById('hmacOutput');
        const resultDiv = document.getElementById('hmacResult');

        // Validación
        if (!input) {
            toggleError(base64Input, errorEl, "Campo requerido");
            resultDiv.classList.add('hidden');
            return;
        }

        try {
            toggleError(base64Input, errorEl, null); // Limpiar errores previos

            // Decodificar Base64 y luego Hash
            const decoded = CryptoJS.enc.Base64.parse(input);
            const hash = CryptoJS.SHA256(decoded);
            const hexResult = hash.toString(CryptoJS.enc.Hex);

            // Mostrar resultado
            outputEl.textContent = hexResult;
            resultDiv.classList.remove('hidden');
            
            console.log('Base64 procesado exitosamente');
        } catch (error) {
            toggleError(base64Input, errorEl, "Base64 inválido o mal formado");
            console.error(error);
        }
    };

    // --- Event Listeners ---
    
    // Clic en botones
    if(btnConvertUUID) btnConvertUUID.addEventListener('click', handleUuidConversion);
    if(btnConvertBase64) btnConvertBase64.addEventListener('click', handleBase64Conversion);

    // Limpiar error visual cuando el usuario empieza a escribir
    uuidInput.addEventListener('input', () => toggleError(uuidInput, document.getElementById('uuidError'), null));
    base64Input.addEventListener('input', () => toggleError(base64Input, document.getElementById('base64Error'), null));

    // Permitir Enter para convertir
    uuidInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUuidConversion(); });
    base64Input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleBase64Conversion(); });

    // Tecla Escape para limpiar todo (opcional, pero útil)
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

    console.log('🔐 Crypto Key Converter cargado exitosamente');
});

/**
 * Copia texto al portapapeles (Función Global auxiliar)
 * @param {string} elementId - ID del elemento que contiene el texto a copiar
 */
function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const text = textElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Encontrar el botón que disparó el evento para darle feedback
        // Nota: window.event es una forma rápida de obtener el evento actual
        const button = window.event.target.closest('button'); 
        
        if (button) {
            const originalText = button.innerHTML; // Guardamos el HTML (icono + texto)
            button.textContent = '✅ ¡Copiado!';
            button.classList.add('text-green-400');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('text-green-400');
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar al portapapeles');
    });
}