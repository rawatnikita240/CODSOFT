import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

//router object
const router = express.Router();

//routes
/***
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *        - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto general id of user collection
 *         name:
 *           type: string
 *           description: User name
 *         last name:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           description: User email || address
 *         password:
 *           type: string
 *           description: User password and it should be more than 8 character
 *         location:
 *           type: string
 *           description:  User location
 */



/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: authentication apis
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *       description: user created succesfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      500:
 *       description: internet server error
 */

//REGISTER || POST
router.post('/register',registerController);


/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *     summary: login page
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: login successfull
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *      500:
 *        description: something gone wrong
 */
//LOGIN || POST
router.post('/login',loginController); 

//export
export default router;