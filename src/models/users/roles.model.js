import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'roles';

/**
 * User model.
 */
class Role extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }
}

export default Role;
