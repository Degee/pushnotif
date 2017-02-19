import express from 'express';
import checkPermissions from './authorization';
import appsRouter from './actions/apps';
import usersRouter from './actions/users';
import { devicesRouter, devicesRouterUnsecured } from './actions/devices';
import notificationsRouter from './actions/notifications';

const router = express.Router();
router.use(devicesRouterUnsecured);

// Our easy ACL
router.use(checkPermissions);

router.use(devicesRouter);
router.use(appsRouter);
router.use(usersRouter);
router.use(notificationsRouter);


export default router;

/**
 * @apiDefine logged Logged user access only
 * Only logged user can access to this endpoint.
 */

/**
 * @apiDefine 201 Created 201
 */

/**
 * @apiDefine 205 Reset Content 205
 */

