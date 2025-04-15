# Sistema de Protección de Pago para Shopify

Este proyecto implementa un sistema de protección de pago para tiendas Shopify mediante un overlay que bloquea el acceso al sitio cuando el estado de pago no es "completed".

## Estructura del Proyecto

```
/protection-status-server/
├── api/
│   └── status.js        # Endpoint que devuelve el estado del pago
├── public/
│   └── protect.js       # Script de protección para Shopify
├── vercel.json          # Configuración de Vercel
└── README.md            # Este archivo
```

## Instrucciones de Despliegue

1. **Clonar el Proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd protection-status-server
   ```

2. **Configurar el Endpoint**
   - Edita el archivo `api/status.js` para personalizar la lógica de verificación de pago según las necesidades del cliente.
   - Por defecto, el endpoint devuelve:
     ```json
     {
       "paymentStatus": "completed",
       "message": ""
     }
     ```

3. **Desplegar en Vercel**
   ```bash
   vercel deploy
   ```
   - Sigue las instrucciones en pantalla para completar el despliegue.
   - Anota la URL de despliegue (será algo como `https://[nombre].vercel.app`).

4. **Configurar en Shopify**
   - Edita el archivo `public/protect.js` y reemplaza `[nombre]` en la constante `API_URL` con el nombre de tu proyecto en Vercel.
   - Sube el archivo `protect.js` a los assets de tu tema Shopify.
   - Inserta el siguiente código en el archivo `theme.liquid` justo antes del cierre de `</body>`:
     ```liquid
     {{ 'protect.js' | asset_url | script_tag }}
     ```

## Personalización

### Mensaje del Overlay
Para personalizar el mensaje que se muestra en el overlay, modifica el objeto de respuesta en `api/status.js`:

```javascript
const response = {
  paymentStatus: "completed",
  message: "Tu mensaje personalizado aquí"
};
```

### Estilo del Overlay
El estilo del overlay puede ser modificado en el archivo `public/protect.js` dentro de la función `createOverlay()`.

## Notas Importantes

- El sistema utiliza `Cache-Control: no-store` para evitar el cacheo en Shopify.
- El overlay se muestra solo cuando `paymentStatus` es diferente de "completed".
- Asegúrate de que la URL de la API en `protect.js` coincida con tu despliegue en Vercel.

## Solución de Problemas

Si el overlay no se muestra:
1. Verifica que la URL de la API sea correcta.
2. Comprueba la consola del navegador para ver si hay errores.
3. Asegúrate de que el endpoint esté devolviendo el formato JSON correcto.

## Soporte

Para soporte o preguntas, contacta al administrador del sistema. 