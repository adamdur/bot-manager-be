import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'bots';

class Bot extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }
}

export default Bot;
