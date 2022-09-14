import { Router } from 'express';
import AdController from './controllers/AdController';
import GameController from './controllers/GameController';

const router = Router();

// games
router.get('/games', GameController.index);

// ads
router.get('/games/:id/ads', AdController.showGameId);
router.post('/games/:id/ads', AdController.create);
router.get('/ads/:id/discord', AdController.showDiscordId);

export default router;
