import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import { Applicant } from '../entity';
import { ErrorHandler } from '../error';
import { HttpStatus } from '../constants';

class ApplicantsController {
    public async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body as Applicant;

            const existedApplicant = await AppDataSource.getRepository(Applicant).findOneBy({
                email: email.toLowerCase(),
            });

            if (existedApplicant) {
                next(
                    new ErrorHandler(
                        `An applicant with this email ${email} already exists`,
                        400,
                        HttpStatus.BAD_REQUEST
                    )
                );
                return;
            }

            const { id } = await AppDataSource.getRepository(Applicant).save({
                ...req.body,
                email: email.toLowerCase(),
            });

            res.status(201).json({ id });
        } catch (e) {
            next(e);
        }
    }

    public updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { email } = req.body as Applicant;

            await this.checkApplicantExist(id);

            await AppDataSource.getRepository(Applicant).update(id, {
                ...req.body,
                email: email.toLowerCase(),
            });

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    };

    public deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            await this.checkApplicantExist(id);

            await AppDataSource.getRepository(Applicant).delete({ id: Number(id) });

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    };

    public async checkApplicantExist(id: string): Promise<void> {
        await AppDataSource.getRepository(Applicant)
            .findOneOrFail({ where: { id: Number(id) } })
            .catch(() => {
                throw new ErrorHandler(
                    `Applicant with id ${id} does not exist`,
                    400,
                    HttpStatus.BAD_REQUEST
                );
            });
    }
}

export const applicantsController = new ApplicantsController();
