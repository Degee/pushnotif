import express from 'express';
import * as actions from './application';

const router = express.Router();

router.route('/applications')
  .get(actions.getApps)
  .post(actions.postApps);

router.route("/application/:id")
  .get(actions.getApp)
  .delete(actions.deleteApp)
  .put(actions.updateApp);

export default router;


/**
 * @apiDefine ApplicationNotFoundError
 *
 * @apiError ApplicationNotFound App by the given id not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Application was not found!"
 *     }
 *
 */

/**
 *
 *
 * @apiDefine ApplicationNotValidError
 *
 * @apiError InvalidData Sent data are invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "error": { ... }
 *     }
 */

/**
 * @api {get} /applications Get all applications
 * @apiPermission logged
 * @apiName GetApplications
 * @apiGroup Applications
 *
 * @apiSuccess {Array} applications Array of objects of application entities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "applications": [
 *          {_id, user, name ...},
 *          {_id, user, name ...},
 *       ]
 *     }
 */


/**
 * @api {post} /applications Create new application
 * @apiPermission logged
 * @apiName PostApplications
 * @apiGroup Applications
 *
 * @apiParam {String} [name] Name of the new application
 *
 * @apiSuccess (201) {String} message Message about result
 * @apiSuccess (201) {Object} app Entity of new created application
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Application successfully added!"
 *       "app": {
 *          _id,
 *          user,
 *          name,
 *          ...
 *       },
 *     }
 *
 * @apiUse ApplicationNotValidError
 */

/**
 * @api {get} /application/:id Get application by id
 * @apiPermission logged
 * @apiName GetApplication
 * @apiGroup Applications
 *
 * @apiParam {String} :id Id of application to be retrieved
 *
 * @apiSuccess {Object} app Entity of retrieved application
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "app": {
 *          _id,
 *          user,
 *          name,
 *          ...
 *       },
 *     }
 *
 * @apiUse ApplicationNotFoundError
 *
 */

/**
 * @api {put} /application/:id Update application by id
 * @apiPermission logged
 * @apiName PutApplication
 * @apiGroup Applications
 *
 * @apiParam {String} :id Id of application to be updated
 * @apiParam {Object} data Data which should be updated
 *
 *
 * @apiSuccess {String} message Message about result
 * @apiSuccess {Object} app Entity of updated application
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Application updated!"
 *       "app": {
 *          _id,
 *          user,
 *          name,
 *          ...
 *       },
 *     }
 *
 * @apiUse ApplicationNotFoundError
 * @apiUse ApplicationNotValidError
 *
 */


/**
 * @api {delete} /application/:id Delete application by id
 * @apiPermission logged
 * @apiName DeleteApplication
 * @apiGroup Applications
 *
 * @apiParam {String} :id Id of application to be deleted
 *
 * @apiSuccess {String} message Message about result
 * @apiSuccess {Object} app Entity of updated application
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Application successfully deleted!"
 *     }
 *
 * @apiUse ApplicationNotFoundError
 *
 */


