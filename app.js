const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill({
    verticalFlip: true,
    horizontalFlip: true
});
const Raspivid = require('node-raspivideo').Raspivid;
const raspivid = new Raspivid({
    videoFolder: './videos',
    width: 1280,
    height: 720,
    verticalFlip: true,
    horizontalFlip: true,
    format: 'mp4',
    bitrate: 2000000
});

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Hello'))

bot.command('pic', (ctx) => {
    camera.takePhoto().then((photo) => {
        ctx.replyWithPhoto({ source: photo })
    });
})
bot.command('vid', (ctx) => {
    const now = Math.floor(Date.now() / 1000);
    raspivid.record(''+now, 15000)
        .then(() => {
            console.log('record done!');
            ctx.replyWithVideo({ source: './videos/'+now+'_converted.mp4' })
        })
        .catch((err) => {
            console.error(err);
            ctx.reply('sorry, could not record video!');
            ctx.replyWithVideo({ source: './videos/'+now+'.h264' })
        });
})
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.launch()