const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill({
    verticalFlip: true,
    horizontalFlip: true,
    width: 1920,
    height: 1080
});

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))

bot.command('pic', (ctx) => {
    camera.takePhoto().then((photo) => {
        ctx.replyWithPhoto({ source: photo })
    });
})
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.launch()