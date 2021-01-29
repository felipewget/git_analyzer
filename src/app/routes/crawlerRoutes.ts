import { Router } from 'express';
import { checkAuth } from './../middlewares/authMiddleware'
import CrawlerController from './../controllers/crawlerController'

let router: Router = Router();

router.get('/crawler/github/:git_username/repositories', checkAuth, CrawlerController.getGitBasicData )

export default router;