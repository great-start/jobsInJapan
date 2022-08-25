import { Router } from 'express';

import { positionsController } from '../controller';

const router = Router();

router.get('/', positionsController.findAllOrByQuery);
router.get('/:id', positionsController.findOneById);
router.post('/', positionsController.createOne);
router.patch('/:id', positionsController.updateOne);
router.delete('/:id', positionsController.delete);

export const positionsRouter = router;
