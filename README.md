# Crypto Key Converter 🔐

Una herramienta web segura y minimalista para derivar claves criptográficas (Hashes SHA-256) a partir de UUIDs y Secretos Compartidos.

## 🚀 Características

- **Generación de Llaves:**
  - UUID → Hash SHA-256 (Ideal para keys de AES-256)
  - Base64 → Hash SHA-256 (Ideal para keys de HMAC)
- **Privacidad Total:** Arquitectura 100% Client-Side. Ningún dato se envía a ningún servidor; todo ocurre en tu navegador.
- **Validación en Tiempo Real:** Feedback visual inmediato y manejo de errores limpio.
- **UI Moderna:** Diseño responsivo utilizando Tailwind CSS.

## 🛠️ Tecnologías

- HTML5
- JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) (vía CDN)
- [Crypto-JS](https://github.com/brix/crypto-js) (vía CDN)

## 📦 Instalación y Uso

No requieres instalar dependencias de Node.js ni servidores complejos.

1. Descarga los archivos del repositorio (`index.html`, `script.js`).
2. Asegúrate de tener conexión a internet (necesaria para cargar las librerías de Tailwind y Crypto-JS desde el CDN).
3. Abre el archivo `index.html` en tu navegador favorito.

## ⚠️ Nota de Seguridad

Esta herramienta genera **hashes** unidireccionales.
- El resultado del UUID es un hash SHA-256 hexadecimal (64 caracteres).
- El resultado del Base64 es un hash SHA-256 del binario decodificado.

Útil para estandarizar claves de cifrado, pero no es una herramienta de encriptación de texto plano.