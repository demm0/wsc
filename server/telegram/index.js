import cli from 'server/cli';
import TeleBot from 'telebot';
import controller from 'server/telegram/controller';
import config from 'config';

export function initializebot() {
    const API_KEY = config.get('TELEGRAM_API_KEY');
    if(!API_KEY) {
        cli.log('Cannot initialize without key');
        return;
    }
    cli.log('Initialize bot');
    const bot = new TeleBot({
        token: API_KEY, // Required. Telegram Bot API token.
        pooling: { // Optional. Use pooling.
            interval: 1000, // Optional. How often check updates (in ms).
            timeout: 0, // Optional. Update pulling timeout (0 - short polling).
            limit: 100, // Optional. Limits the number of updates to be retrieved.
            retryTimeout: 5000 // Optional. Reconnecting timeout (in ms).
        },
    });

    bot.on('/stat', (msg) => controller.stat(bot, msg));
    bot.on('/start', (msg) => controller.start(bot, msg));
    bot.on('/finish', (msg) => controller.finish(bot, msg));

    bot.connect();
}
