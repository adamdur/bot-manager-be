import {StatusCodes} from 'http-status-codes';
import Bot from '../../models/bots/bot.model';
import BotRenewal from '../../models/bots/bot_renewal.model';
import logger from "../../../config/winston";
import * as helper from "../../utils/helpers/errors.helper";

/**
 * Find all bots
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const bots = await Bot.forge().fetchAll();
        let botPairs = {};
        for (let bot of bots.toJSON()) {
            botPairs[bot.id] = bot.name;
        }
        res.json(botPairs)
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Create bot
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function create(req, res) {
    const {name, active} = req.body;

    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const bot = await Bot.forge().where({name}).fetch({require: false})
        if (bot) return await helper.alreadyExists(res, `Bot with name '${name}' already exists.`);

        const newBot = await Bot.forge({name, active}).save();
        if (newBot) {
            res.json({
                success: true,
                data: newBot.toJSON()
            });
        }
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Find Bot by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findById(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const bot = await Bot.where({id: req.params.id}).fetch({require: false})
        if (!bot) return await helper.notFound(res, 'Bot not found.');

        const renewals = await BotRenewal.where({bot_id: req.params.id})
            .orderBy('price')
            .fetchAll({require: false})

        if (bot && renewals) {
            let renewalsArr = [];
            for (let renewal of renewals) {
                renewalsArr.push({
                    id: renewal.get('id'),
                    price: renewal.get('price'),
                    period: renewal.get('period')
                });
            }
            bot.set('renewals', renewalsArr);
        }
        return res.json(bot)
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Find Bot renewals by bot id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findRenewalsByBotId(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const bot = await Bot.where({id: req.params.id}).fetch({require: false})
        if (!bot) return await helper.notFound(res, 'Bot not found.');

        const renewals = await BotRenewal.where({bot_id: req.params.id})
            .orderBy('price')
            .fetchAll({require: false})

        return res.json(renewals)
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Create bot renewal
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function addBotRenewal(req, res) {
    const {price, period} = req.body;

    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const bot = await Bot.forge().where({id: req.params.id}).fetch({require: false});
        if (!bot) return await helper.notFound(res, `Bot with '${req.params.id}' not found.`);

        const renewal = await BotRenewal.forge({bot_id: bot.get('id'), price, period}).fetch({require: false});
        if (renewal) return await helper.alreadyExists(res, `Renewal type for bot with id '${bot.get('id')}' already exists.`);

        const newRenewal = await BotRenewal.forge({bot_id: bot.get('id'), price, period}).save();
        if (newRenewal) {
            res.json({
                success: true,
                data: newRenewal.toJSON()
            });
        }
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}
