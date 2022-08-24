import { Router } from 'express';
import { positionsController } from '../controller';

const router = Router();

router.get('/', positionsController.findPositions);
router.post('/', positionsController.createPosition);

export const positionsRouter = router;
