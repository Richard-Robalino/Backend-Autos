// Rutas Reserva
import { Router } from 'express';
import { authRequired } from '../middlewares/authMiddleware.js';
import { list, getOne, create, update, remove } from '../controllers/reservaController.js';


const router = Router();
router.use(authRequired);
router.get('/', list);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
export default router;
