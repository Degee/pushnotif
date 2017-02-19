import express from 'express';
import * as actions from './notification';

const router = express.Router();

router.route('/application/:id/notifications')
  .get(actions.getNotifications)
  .post(actions.postNotifications);

router.route("/application/:appId/notification/:id")
  .get(actions.getNotification)
  .delete(actions.deleteNotification)
  .put(actions.updateNotification);

router.route('/summary')
  .get(actions.getSummary);

export default router;


/**
 * @apiDefine ApplicationNotFoundError
 *
 * @apiError ApplicationNotFound App by the given id not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No notifications found for application with id #235"
 *     }
 *
 */

/**
 *
 * @apiDefine NotificationNotFoundError
 *
 * @apiError notificationNotFound Notification by the given id not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Notification with id #123 not found!"
 *     }
 *
 */

/**
 * @api {get} /application/:id/notifications Get all notifications by application id
 * @apiPermission logged
 * @apiName GetNotifications
 * @apiGroup Notifications
 *
 * @apiParam {String} :id Id of application
 *
 * @apiSuccess {Array} notifications Array of objects of notification entities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "notifications": [
 *          {_id, title, text, datetime, ...},
 *          {_id, title, text, datetime, ...},
 *       ]
 *     }
 *
 * @apiUse ApplicationNotFoundError
 */

/**
 * @api {post} /application/:id/notifications Add new notification by application id
 * @apiPermission logged
 * @apiName PostNotifications
 * @apiGroup Notifications
 *
 * @apiParam {String} :id Id of application
 *
 * @apiSuccess (201) {String} message Message about result
 * @apiSuccess (201) {Object} notification Object of notification entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Notification successfully added!",
 *       "notification": {
 *           _id,
 *           app,
 *           title,
 *           text,
 *           datetime,
 *           ...
 *       },
 *       ]
 *     }
 *
 * @apiUse ApplicationNotFoundError
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
 * @api {get} /application/:appId/notification/:id Get notification by id and application id
 * @apiPermission logged
 * @apiName GetNotification
 * @apiGroup Notifications
 *
 * @apiParam {String} :appId Id of application
 * @apiParam {String} :id Id of notification to be retrieved
 *
 * @apiSuccess {Object} notification Entity of retrieved notification
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "notification": {
 *          "title",
 *          "text",
 *          "_id",
 *          ...
 *       }
 *     }
 *
 * @apiUse ApplicationNotFoundError
 * @apiUse NotificationNotFoundError
 *
 */

/**
 * @api {put} /application/:appId/notification/:id Update notification by id
 * @apiPermission logged
 * @apiName PutNotification
 * @apiGroup Notifications
 *
 * @apiParam {String} :appId Id of application
 * @apiParam {String} :id Id of notification to be updated
 *
 * @apiSuccess {String} message Message of result
 * @apiSuccess {Object} notification Entity of updated notification
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Notification updated!",
 *       "notification": {
 *          "title",
 *          "text",
 *          ...
 *       }
 *     }
 *
 * @apiUse ApplicationNotFoundError
 * @apiUse NotificationNotFoundError
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
 * @api {delete} /application/:appId/notification/:id Delete notification by id
 * @apiPermission logged
 * @apiName DeleteNotification
 * @apiGroup Notifications
 *
 * @apiParam {String} :appId Id of application
 * @apiParam {String} :id Id of notification to be deleted
 *
 * @apiSuccess {String} message Message of result
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Notification successfully deleted!"
 *     }
 *
 * @apiUse ApplicationNotFoundError
 * @apiUse NotificationNotFoundError
 *
 *
 */

/**
 * @api {get} /summary Get summary of notifications
 * @apiPermission logged
 * @apiName GetSummary
 * @apiGroup Notifications
 *
 * @apiSuccess {Array} notifications Array of object of notification entities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "notifications": [
 *          {_id, title, text, summary}
 *       ]
 *     }
 *
 *
 */



