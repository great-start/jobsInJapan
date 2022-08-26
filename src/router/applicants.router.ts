import { Router } from 'express';

import { applicantsController } from '../controller';

const router = Router();

router.post('/', applicantsController.createOne);
router.put('/:id', applicantsController.updateOne);
router.delete('/:id', applicantsController.deleteOne);

export const applicantsRouter = router;
