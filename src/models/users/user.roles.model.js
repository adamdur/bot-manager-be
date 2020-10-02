import bookshelf from '../../../config/bookshelf';
const TABLE_NAME = 'user_roles';

/**
 * User model.
 */
class UserRoles extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }
}

export default UserRoles;
