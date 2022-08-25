import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import { Applicant } from '../entity';
import { ErrorHandler } from '../error';

class ApplicantsController {
    public async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const applicant = req.body;

            const { id } = await AppDataSource.getRepository(Applicant).save(applicant);

            res.status(201).json({ id });
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const applicant = req.body;

            await AppDataSource.getRepository(Applicant).update(id, applicant);

            res.status(200).json();
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await AppDataSource.getRepository(Applicant).delete({ id: Number(id) });

            res.status(204).json();
        } catch (e) {
            next(new ErrorHandler());
        }
    }
}

export const applicantsController = new ApplicantsController();
