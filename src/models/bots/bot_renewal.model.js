import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'bot_renewals';

class BotRenewal extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }
}

export default BotRenewal;
