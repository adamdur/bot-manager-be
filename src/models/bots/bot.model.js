import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'bots';

/**
 * Bot model.
 */
class Bot extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }
}

export default Bot;
