import { Router } from 'express';
import { checkAuth } from './../middlewares/authMiddleware'
import { checkPermissionGitUser } from './../middlewares/userMiddleware'

import UserController from './../controllers/userController'

let router: Router = Router();

// Filters
// -> Name
// -> Tecs
// -> Limite
// -> Sort
//      -> Name
//      -> Create
//      -> Tec/Size
//      -> Size of Repo
//      -> Num of Repo
router.get('/users', checkAuth, UserController.listGitUsers )

router.get('/user/:git_username', checkAuth, checkPermissionGitUser, UserController.getGitUser )

export default router;