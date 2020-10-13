import bookshelf from '../../../config/bookshelf';
import UserRoles from "./user.roles.model";
import Role from "./roles.model";
const TABLE_NAME = 'users';

class User extends bookshelf.Model {

    get tableName() {
        return TABLE_NAME;
    }

    get hasTimestamps() {
        return true;
    }

    verifyPassword(password) {
        return this.get('password') === password;
    }

    roles() {
        return this.hasMany(UserRoles)
    }
}

export default User;
