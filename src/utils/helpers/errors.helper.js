import {StatusCodes} from "http-status-codes";

export async function alreadyExists(res, message) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: {message: message || 'Already exists.'}
    });
}

export async function badRequest(res, message) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: {message: message || 'Bad request.'}
    });
}

export async function unauthorized(res, message) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {message: message || 'User not authorized.'}
    });
}

export async function notFound(res, message) {
    return res.status(StatusCodes.NOT_FOUND).json({
        error: {message: message || 'Not found.'}
    });
}

export async function isAdmin(user) {
    return Object.values(user.get('roles')).includes("admin");
}

export async function isPremium(user) {
    let admin = Object.values(user.get('roles')).includes("admin");
    let premium = Object.values(user.get('roles')).includes("premium");
    return admin || premium;
}

export async function isUser(user) {
    let admin = Object.values(user.get('roles')).includes("admin");
    let premium = Object.values(user.get('roles')).includes("premium");
    let userRole = Object.values(user.get('roles')).includes("user");
    return admin || premium || userRole;
}
