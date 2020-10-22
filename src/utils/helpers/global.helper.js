export async function getUserRoleString(user) {
    let admin = Object.values(user.get('roles')).includes("admin");
    let premium = Object.values(user.get('roles')).includes("premium");
    let userRole = Object.values(user.get('roles')).includes("user");
    if (admin) {
        return 'admin';
    } else if (!admin && premium) {
        return 'premium';
    } else if (!admin && !premium && userRole) {
        return 'user';
    }
}