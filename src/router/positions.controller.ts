import { Router } from 'express';
import { positionsController } from '../controller';

const router = Router();

router.get('/', positionsController.findAllOrByQuery);
router.get('/:position_id', positionsController.findOneById);
router.post('/', positionsController.createOne);

export const positionsRouter = router;
