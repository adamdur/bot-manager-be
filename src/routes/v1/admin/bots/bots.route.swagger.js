/**
 * @swagger
 * tags:
 *   - name: Admin bots
 *     description: Admin only Bots operations
 */
/**
 * @swagger
 * definitions:
 *   Bot:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: Name of bot
 *         example: Cybersole
 *       active:
 *         type: boolean
 *         description: Active state
 *         example: true
 *
 *   BotRenewal:
 *     type: object
 *     required:
 *       - price
 *       - period
 *     properties:
 *       price:
 *         type: integer
 *         description: Price of renewal
 *         example: 60
 *       period:
 *         type: string
 *         description: Period of renewal
 *         example: '6m'
 *       currency:
 *         type: string
 *         description: Currency of renewal - allowed ['USD', 'EUR', 'GBP']
 *         example: USD
 *
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */


/* =====================================
    @endpoint [POST] /admin/bots
   ===================================== */
/**
 * @swagger
 * /admin/bots:
 *   post:
 *     tags:
 *       - Admin bots
 *     summary: "Create a new Bot"
 *     security:
 *       - bearerAuth: []
 *     operationId: createBot
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Bot"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Bot"
 *       400:
 *         description: Bot already exists
 *         schema:
 *           $ref: '#/definitions/Bot'
 */

/* =====================================
    @endpoint [POST] /admin/bots/:id/renewals
   ===================================== */
/**
 * @swagger
 * /admin/bots/{id}/renewals:
 *   post:
 *     tags:
 *       - Admin bots
 *     summary: "Create new Bot renewal"
 *     security:
 *       - bearerAuth: []
 *     operationId: createBotRenewal
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of bot to which renewal will be assigned
 *         required: true
 *         type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/BotRenewal"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BotRenewal"
 *       400:
 *         description: Bot already exists
 *         schema:
 *           $ref: '#/definitions/BotRenewal'
 */