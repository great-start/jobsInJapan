import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import { Applicant } from '../entity';
import { ErrorHandler } from '../error';
import { HttpStatus } from '../constants';

class ApplicantsController {
    public createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.body as Applicant;

            await this.checkApplicantExist(email);

            const { id } = await AppDataSource.getRepository(Applicant).save({
                ...req.body,
                email: email.toLowerCase(),
            });

            res.status(201).json({ id });
        } catch (e) {
            next(e);
        }
    };

    public updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { email } = req.body as Applicant;

            await this.checkApplicantExist(email);

            await AppDataSource.getRepository(Applicant).update(id, req.body);

            res.status(200).end();
        } catch (e) {
            next(e);
        }
    };

    public async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await AppDataSource.getRepository(Applicant)
                .findOneOrFail({ where: { id: Number(id) } })
                .catch(() => {
                    next(
                        new ErrorHandler(
                            HttpStatus.BAD_REQUEST,
                            400,
                            `Applicant with id ${id} does not exist`
                        )
                    );
                    return;
                });

            await AppDataSource.getRepository(Applicant).delete({ id: Number(id) });

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }

    public async checkApplicantExist(email: string): Promise<Applicant | null> {
        const existedApplicant = await AppDataSource.getRepository(Applicant).findOneBy({
            email: email.toLowerCase(),
        });

        if (existedApplicant) {
            throw new ErrorHandler(
                HttpStatus.BAD_REQUEST,
                400,
                `An applicant with this email ${email} already exists`
            );
        }

        return existedApplicant;
    }
}

export const applicantsController = new ApplicantsController();
