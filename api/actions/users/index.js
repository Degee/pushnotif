import express from 'express';
import * as actions from './users';
import loadAuth from './loadAuth';

const router = express.Router();


router.route('/users')
  .post(actions.postUsers);

router.route('/users/login')
  .post(actions.login);

router.route('/users/logout')
  .get(actions.logout);

router.route('/users/forgottenPassword')
  .post(actions.forgottenPassword);

router.route('/user/:id')
  .put(actions.updateUser);

router.route('/user/:id/apiConfig')
  .get(actions.getApiConfig)
  .post(actions.postApiConfig);

router.route('/loadAuth')
  .get(loadAuth)


export default router;

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {post} /users Create a new user (registration)
 * @apiPermission none
 * @apiName PostUsers
 * @apiGroup Users
 *
 * @apiParam {String} email Email of new user
 * @apiParam {String} password  Password of new user
 *
 * @apiSuccess (201) {String} message Message about result
 * @apiSuccess (201) {Object} user User entity from database
 * @apiSuccess (201) {Object} settings Settings entity of user from database
 * @apiSuccess (201) {String} token Access token for use on Authorization header
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "User successfully added!!",
 *       "user": {
 *          "_id", "email", "isActive", "createdAt"
 *       },
 *       "settings": {
 *          "fcmToken"
 *       },
 *       "token"
 *     }
 *
 * @apiError UserAlreadyExist User with email already exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "message": "User already exist!"
 *     }
 */


/**
 * @api {post} /users/forgottenPassword Send new password to given email
 * @apiPermission none
 * @apiName PostUsersFP
 * @apiGroup Users
 *
 * @apiParam {String} email Email of forgotten password
 *
 * @apiSuccess {String} message Message about result
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password successfully renewed! Check your email.",
 *     }
 *
 * @apiUse UserNotFoundError
 *
 */

/**
 * @api {post} /users/login Login user and get identity
 * @apiPermission none
 * @apiName PostUsersLogin
 * @apiGroup Users
 *
 * @apiParam {String} email Email of user
 * @apiParam {String} password Password of user
 *
 * @apiSuccess {String} message Message about result
 * @apiSuccess {Object} user User entity
 * @apiSuccess {String} token Access token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User successfulyl logged in!",
 *       "user": {
 *          ...
 *       },
 *       token: "supersecretToken"
 *     }
 *
 *
 * @apiError BadCredentials Bad credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Bad credentials"
 *     }
 *
 *
 *
 */

/**
 * @api {get} /users/logout Logout current user
 * @apiPermission logged
 * @apiName GetUsersLogout
 * @apiGroup Users
 *
 * @apiSuccess (205) {String} message Message about result
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 205 Reset Content
 *     {
 *       "message": "User was logged out!",
 *     }
 *
 */


/**
 * @api {put} /user/:id Update user by id
 * @apiPermission logged
 * @apiName PutUser
 * @apiGroup Users
 *
 * @apiParam {String} :id Id of user to be updated
 *
 * @apiSuccess {String} message Message about result
 * @apiSuccess {Object} user User entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User was updated!",
 *       "user": {
 *          ...
 *       },
 *     }
 *
 *
 * @apiError InvalidData Data sent are invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "err": {...}
 *
 */



/**
 * @api {put} /user/:id/apiConfig Update user settings
 * @apiPermission logged
 * @apiName PutUserConfig
 * @apiGroup Users
 *
 * @apiParam {String} :id Id of user for find settings to be updated
 *
 * @apiSuccess {Object} settings Settings entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "settings": {
 *          ...
 *       },
 *     }
 *
 *
 * @apiUse UserNotFoundError
 *
 * @apiError InvalidData Data sent are invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "err": {...}
 *
 */



/**
 * @api {get} /user/:id/apiConfig Get user settings
 * @apiPermission logged
 * @apiName GetUserConfig
 * @apiGroup Users
 *
 * @apiParam {String} :id Id of user for settings
 *
 * @apiSuccess {Object} settings Settings entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "settings": {
 *          ...
 *       },
 *     }
 *
 *
 */