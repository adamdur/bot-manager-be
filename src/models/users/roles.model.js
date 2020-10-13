import bookshelf from '../../../config/bookshelf';
import UserRoles from "./user.roles.model";
const TABLE_NAME = 'roles';

class Role extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    user_roles() {
        this.hasMany(UserRoles);
    }
}

export default Role;
