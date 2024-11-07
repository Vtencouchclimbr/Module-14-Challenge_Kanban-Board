import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';

// initialize router instance
const router = Router();

// use /ticket and /users routes
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

export default router;
