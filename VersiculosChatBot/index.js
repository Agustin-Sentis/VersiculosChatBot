require('dotenv').config();
const tmi = require('tmi.js');

const versiculos = [
    ["Proverbios 12:22", "Los labios mentirosos son abominación a Jehová, pero los que actúan con verdad son su deleite."],
    ["1 Tesalonicenses 5:16-18 (NVI)", "Estén siempre alegres, oren sin cesar, den gracias a Dios en toda situación, porque esta es su voluntad para ustedes en Cristo Jesús."],
    ["Lucas 22:48", "Entonces Jesús le dijo: Judas, ¿con un beso entregas al Hijo del Hombre?"],
    ["Salmo 55:12-14", "El que practica el engaño no morará en mi casa; el que habla mentiras no permanecerá en mi presencia."],
    ["Romanos 12:21", "No te dejes vencer por el mal; al contrario, vence el mal con el bien."]
];

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH
    },
    channels: [process.env.TWITCH_CHANNEL.toLowerCase()]
});

client.connect()
    .then(() => {
        console.log(`Bot conectado al canal: ${process.env.TWITCH_CHANNEL}`);
        client.say(process.env.TWITCH_CHANNEL.toLowerCase(), "Bot de versículos conectado ✅");
    })
    .catch((err) => {
        console.error("Error conectando a Twitch:", err);
    });

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    console.log(`${tags.username}: ${message}`);

    const comando = message.trim().toLowerCase();

    if (comando === '!versiculos' || comando === '!versiculo') {
        const r = versiculos[Math.floor(Math.random() * versiculos.length)];
        const respuesta = `${r[0]} — "${r[1]}"`;

        console.log("Enviando al chat:", respuesta);

        client.say(channel, respuesta).catch((err) => {
            console.error("No se pudo enviar el mensaje:", err);
        });
    }
});