/**
 * @swagger
 * tags:
 *   - name: Admin users
 *     description: Admin only Users operations
 */
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - username
 *       - password
 *     properties:
 *       email:
 *         type: email
 *         example: mail@mail.com
 *       username:
 *         type: string
 *         description: Min 4 chars
 *         example: username
 *       password:
 *         type: string
 *         example: superPassword123
 *       active:
 *         type: boolean
 *         example: 1
 *
 *   UserUpdate:
 *     type: object
 *     required:
 *       - email
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         description: Min 4 chars
 *         example: username
 *       old_password:
 *         type: string
 *         example: superPassword123
 *       new_password:
 *         type: string
 *         example: newPassword123
 *       new_password_check:
 *         type: string
 *         example: newPassword123
 *
 *   Role:
 *     type: object
 *     required:
 *       - code
 *     properties:
 *       id:
 *         type: integer
 *         description: id of role
 *       code:
 *         type: string
 *         description: code of role
 *         example: user
 *
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */


/* =====================================
    @endpoint [GET] /admin/users
   ===================================== */
/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags:
 *       - Admin users
 *     summary: "Get all users"
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       401:
 *         description: Unauthorized
 */

/* =====================================
    @endpoint [POST] /admin/users
   ===================================== */
/**
 * @swagger
 * /admin/users:
 *   post:
 *     tags:
 *       - Admin users
 *     summary: "Create new User"
 *     security:
 *       - bearerAuth: []
 *     operationId: createUserAdmin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       400:
 *         description: User already exists
 *         schema:
 *           $ref: '#/definitions/User'
 */

/* =====================================
    @endpoint [GET] /admin/users/roles
   ===================================== */
/**
 * @swagger
 * /admin/users/roles:
 *   get:
 *     tags:
 *       - Admin users
 *     summary: "Get all roles"
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Role"
 *       401:
 *         description: Unauthorized
 */

/* =====================================
    @endpoint [POST] /admin/users/roles
   ===================================== */
/**
 * @swagger
 * /admin/users/roles:
 *   post:
 *     tags:
 *       - Admin users
 *     summary: "Create new User role"
 *     security:
 *       - bearerAuth: []
 *     operationId: createRoleAdmin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Role"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Role"
 *       400:
 *         description: Role already exists
 *         schema:
 *           $ref: '#/definitions/Role'
 */

/* =====================================
    @endpoint [PATCH] /admin/users/{id}
   ===================================== */
/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     tags:
 *       - Admin users
 *     summary: "Update User"
 *     security:
 *       - bearerAuth: []
 *     operationId: updateUserAdmin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of updated user
 *         required: true
 *         type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/UserUpdate"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/UserUpdate"
 *       400:
 *         description: User already exists
 *         schema:
 *           $ref: '#/definitions/UserUpdate'
 */

/* =====================================
    @endpoint [DELETE] /admin/users/{id}
   ===================================== */
/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin users
 *     summary: "Update User"
 *     security:
 *       - bearerAuth: []
 *     operationId: updateUserAdmin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of deleted user
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/UserUpdate"
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/UserUpdate'
 */
