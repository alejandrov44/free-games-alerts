# Alertas de Juegos Gratis

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/alejandrov44/free-games-alerts/blob/master/README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/alejandrov44/free-games-alerts/blob/master/README.es.md)

## Índice

- [Descripción](#descripción)
- [Crear un webhook en Discord](#crear-un-webhook-en-discord)
- [Cómo ejecutar una alerta rápida](#cómo-ejecutar-una-alerta-rápida)
- [Añadir la extensión a navegadores Chromium](#añadir-la-extensión-a-navegadores-chromium)

## Descripción

Una manera sencilla de recibir notificaciones 📨 con toda la información sobre cada nuevo juego gratis en las principales plataformas de videojuegos, como Steam, Epic o GOG 🎮.

## Crear un webhook en Discord

Para poder recibir notificaciones en Discord, primero necesitas crear un webhook que permitirá al proyecto enviar mensajes a un canal de tu servidor.

1. Ve a `Configuración del Servidor` -> `Integraciones` -> `Webhooks` -> `Nuevo Webhook`.

2. Personaliza tu webhook y copia la URL que se te proporciona.
   La URL tiene 2 partes importantes:

```bash
# Ejemplo de URL de webhook
https://discord.com/api/webhooks/4684567458694593/aL2uEoXIwrkbGE67q9ihxHRPEnua3zXoII-t6k104rMJ0kpLv2HKFCUpTZlqaRF5HiKI
```

- El ID del webhook: `4684567458694593`.
- El token del webhook: `aL2uEoXIwrkbGE67q9ihxHRPEnua3zXoII-t6k104rMJ0kpLv2HKFCUpTZlqaRF5HiKI`.

Ambos son necesarios para poder enviar un mensaje con él, así que asegúrate de escribir ambos en los campos correspondientes del archivo `.env`.

## Cómo ejecutar una alerta rápida

1. Asegúrate de tener instalado Node.js.

2. Crea un archivo `.env` en la raíz del proyecto con las variables necesarias. _Consulta el archivo `example.env`._

3. Ejecuta estos dos comandos en la terminal Bash en la raíz del proyecto:

```bash
# Instalar todos los paquetes del proyecto
npm i --save

# Ejecutar el proyecto
npm run send_free_games_alert
```

(_Siempre puedes ejecutar con `docker-compose` para no tener que instalar nada más que Docker._)

4. Espera hasta que puedas ver el mensaje llegar al canal especificado en tu webhook.

## Mejoras futuras

Planeo agregar otras plataformas como Origin o Primer Gaming. Además, futuras actualizaciones incluirán soporte para otros canales de notificación populares como correo electrónico 📧 y Slack 💼 para mejorar la accesibilidad y la compatibilidad con las preferencias del usuario.

## ⭐ Muestra Tu Apoyo

Si encuentras este proyecto útil o inspirador, dale una ⭐ en GitHub. Significa mucho para mí y me ayudará en futuros desarrollos.

## 🐛 Errores y Solicitudes de Funcionalidades

¿Encontraste un error? ¿Tienes una idea para mejorar el juego? 🤔 No dudes en abrir un issue o sugerir una nueva funcionalidad.

1. Ve a la pestaña **Issues** en el repositorio.
2. Haz clic en **New Issue**.
3. Proporciona una descripción clara del error o solicitud de funcionalidad.
4. Si es aplicable, incluye capturas de pantalla o pasos para reproducir el problema.

Tu feedback es importante y ayuda a mejorar este proyecto para todos. ¡Gracias por contribuir!

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE.md). ¡Siéntete libre de usarlo, modificarlo y compartirlo! 🌈

## 📧 Contáctame

- 💼 [Sitio Web de Portafolio](https://alejandrov44.pages.dev/)
- 🔗 [LinkedIn](https://www.linkedin.com/in/alejandro-viana/)
- 📧 [Discord](https://discord.gg/yGMknyc9)
