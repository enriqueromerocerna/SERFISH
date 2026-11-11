# Cotizador SERFISH

App web estática para generar cotizaciones en formato flyer (PNG) en segundos.
No necesita servidor ni base de datos: corre 100 % en el navegador.

## Cómo se usa

1. **Cotizar**: llenar datos del cliente → indicar tipo de espacio e invitados (la app recomienda cuántos parlantes) → marcar los servicios y elegir la opción → elegir zona de movilidad → **Descargar flyer** o **Compartir** por WhatsApp.
2. **Precios y ajustes**: cambiar precios, viñetas, fotos de cada servicio (bartender, parlantes, DJ, luces), logo, zonas de movilidad y frase final.

> Los precios que vienen cargados son **ejemplos**. Hay que reemplazarlos por los reales en "Precios y ajustes".

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub (por ejemplo `cotizador-serfish`).
2. Subir estos archivos manteniendo la estructura:
   ```
   index.html
   css/style.css
   js/app.js
   README.md
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → **Save**.
4. En 1–2 minutos la app queda en `https://TU-USUARIO.github.io/cotizador-serfish/`.

## Importante

- Los precios, fotos y logo se guardan **en el navegador** del dispositivo donde se editan (localStorage). Si se usa en otro celular o PC, hay que usar **Exportar / Importar** en "Precios y ajustes".
- Necesita internet solo para cargar la tipografía Poppins desde Google Fonts.
- Al ser una página pública en GitHub Pages, cualquiera con el enlace puede abrirla (los precios no se publican, viven en cada navegador, pero los valores de ejemplo del código sí son visibles). Para uso privado, se puede usar un repositorio privado con Pages (plan de pago) o no compartir el enlace.
