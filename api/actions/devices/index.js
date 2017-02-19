import express from 'express';
import * as actions from './devices';


export const devicesRouter = express.Router();

devicesRouter.route('/devices')
  .get(actions.getDevices);

devicesRouter.route('/application/:id/devices')
  .get(actions.getDevicesByApplication);


export const devicesRouterUnsecured = express.Router();

devicesRouterUnsecured.route('/application/:id/devices')
  .post(actions.postDevice);

devicesRouterUnsecured.route('/application/:appId/device/:id')
  .delete(actions.deleteDevice);



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
 * @api {get} /application/:id/devices Get all devices by application id
 * @apiPermission logged
 * @apiName GetDevices
 * @apiGroup Devices
 *
 * @apiParam {String} :id Id of application
 *
 * @apiSuccess {Array} devices Array of objects of devices entities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "devices": [
 *          {_id, app, registeredId, info, registeredAt},
 *          {_id, app, registeredId, info, registeredAt},
 *       ]
 *     }
 *
 * @apiUse ApplicationNotFoundError
 */

/**
 * @api {post} /application/:id/devices Add new devices by application id
 * @apiPermission logged
 * @apiName PostDevices
 * @apiGroup Devices
 *
 * @apiParam {String} :id Id of application
 *
 * @apiSuccess (201) {String} message Message about result
 * @apiSuccess (201) {Object} device Object of device entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Device successfully added!",
 *       "device": {
 *           _id,
 *           app,
 *           registeredId,
 *           info,
 *           registeredAt
 *       },
 *       ]
 *     }
 *
 * @apiUse ApplicationNotFoundError
 *
 * @apiError DeviceAlreadyExist Device is already registered
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "message": "Device already registered!"
 *
 */


/**
 * @api {delete} /application/:appId/device/:id Delete device by id
 * @apiPermission logged
 * @apiName DeleteDevice
 * @apiGroup Devices
 *
 * @apiParam {String} :appId Id of application
 * @apiParam {String} :id Id of device to be deleted
 *
 * @apiSuccess {String} message Message of result
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Device successfully deleted!"
 *     }
 *
 * @apiUse ApplicationNotFoundError
 *
 * @apiError DeviceNotFound Device by the given id not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Device with id #123 not found!"
 *     }
 *
 *
 */



/**
 * @api {get} /devices Get all devices
 * @apiPermission logged
 * @apiName GetAllDevices
 * @apiGroup Devices
 *
 * @apiSuccess {Array} devices Array of objects of devices entities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "devices": [
 *          {_id, app, registeredId, info, registeredAt},
 *          {_id, app, registeredId, info, registeredAt},
 *       ]
 *     }
 */
