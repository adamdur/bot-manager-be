import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'bot_renewals';

/**
 * Bot model.
 */
class BotRenewal extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }
}

export default BotRenewal;
