import bookshelf from '../../../config/bookshelf';
import User from "./user.model";
const TABLE_NAME = 'user_roles';

class UserRoles extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    user() {
        return this.belongsTo(User, 'user_id', 'user_id');
    }
}

export default UserRoles;
