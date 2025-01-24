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

2. Crea un archivo `.env` en la raíz del proyecto con las variables necesarias. *Consulta el archivo `example.env`.*

3. Ejecuta estos dos comandos en la terminal Bash en la raíz del proyecto:

```bash
# Instalar todos los paquetes del proyecto
npm i --save

# Ejecutar el proyecto
npm run send_free_games_alert
```
(*Siempre puedes ejecutar con `docker-compose` para no tener que instalar nada más que Docker.*)

4. Espera hasta que puedas ver el mensaje llegar al canal especificado en tu webhook.

## Mejoras futuras

Planeo agregar otras plataformas como Origin o Primer Gaming. Además, futuras actualizaciones incluirán soporte para otros canales de notificación populares como correo electrónico 📧 y Slack 💼 para mejorar la accesibilidad y la compatibilidad con las preferencias del usuario.

## Licencia
Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más información.

## ¡Dale una estrella al repositorio! ⭐

Si pude ayudarte, por favor dale una estrella al repositorio. Esto me ayudará en mi trabajo futuro.

## Contáctame:

[Discord](https://discord.gg/yGMknyc9)

