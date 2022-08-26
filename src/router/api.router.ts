import { NextFunction, Router, Response, Request } from 'express';

import { applicantsRouter } from './applicants.router';
import { positionsRouter } from './positions.controller';
import { ErrorHandler } from '../error';
import { HttpStatus } from '../constants';

const router = Router();

router.use('/applicants', applicantsRouter);
router.use('/positions', positionsRouter);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler(HttpStatus.BAD_REQUEST, 400, 'Bad request'));
});

router.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
    // custom errorHandler
    res.status(err.statusCode || 500).json({
        message: err.message,
        statusCode: err.statusCode || 500,
        error: err.error || 'Something went wrong',
    });
});

export const apiRouter = router;
