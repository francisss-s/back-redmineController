// routers/index.router.js
import { Router } from 'express';
import redmineRouter from './router/redmine.router.js';

const router = Router();

// Monta las rutas de Redmine en /redmine
router.use('/redmine', redmineRouter);

export default router;
