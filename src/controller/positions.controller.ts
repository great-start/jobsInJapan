import { NextFunction, Request, Response } from 'express';
import { ArrayContains, Like, Raw } from 'typeorm';

import { Applicant, Category, Level, Position } from '../entity';
import { ErrorHandler } from '../error';
import { AppDataSource } from '../data-source';
import { HttpStatus } from '../constants';
import { emailService } from '../services/email.service';

class PositionsController {
    public createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { category, level, japaneseRequired } = req.body as Position;

            await this.checkCategoryOrLevelExist(category, level);

            const { id } = await AppDataSource.getRepository(Position).save(req.body);

            // find applicants to send emails
            const applicants = await AppDataSource.getRepository(Applicant).findBy({
                categories: ArrayContains([category]),
                level,
                japaneseKnowledge: Raw(
                    `CASE WHEN "Applicant"."japaneseKnowledge" = true THEN true 
                        WHEN "Applicant"."japaneseKnowledge" = false THEN ${japaneseRequired} 
                        END`
                ),
            });

            // sending emails if applicants exist
            !!applicants.length ? await emailService.sendEmail(applicants, req.body) : null;

            res.status(201).json({ id });
        } catch (e) {
            next(new ErrorHandler());
        }
    };

    public findAllOrByQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { category, level, tag } = req.query;

            await this.checkCategoryOrLevelExist(category as string, level as string);

            const positions = await AppDataSource.getRepository(Position).findBy({
                category: (category as Category) || undefined,
                level: (level as Level) || undefined,
                description: tag ? Like(`%${tag}%`) : undefined,
            });

            res.status(200).json(positions);
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public findOneById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            const actualPosition = await this.checkPositionExist(id);

            res.status(200).json(actualPosition);
        } catch (e) {
            next(e);
        }
    };

    public async checkPositionExist(id: string): Promise<Position> {
        const actualPosition = await AppDataSource.getRepository(Position).findOneBy({
            id: Number(id),
        });

        if (!actualPosition) {
            throw new ErrorHandler(
                `Position with id - ${id} does not exist`,
                400,
                HttpStatus.BAD_REQUEST
            );
        }
        return actualPosition;
    }

    public async checkCategoryOrLevelExist(category: string, level: string): Promise<void> {
        if (
            (category && !Object.values(Category).includes(category as Category)) ||
            (level && !Object.values(Level).includes(level as Level))
        ) {
            throw new ErrorHandler(
                'Input value for category or level is wrong',
                400,
                HttpStatus.BAD_REQUEST
            );
        }
    }

    public async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const body = req.body;

            await AppDataSource.getRepository(Position).update({ id: Number(id) }, body);

            res.status(200).json();
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            const actualPosition = await this.checkPositionExist(id);

            await AppDataSource.getRepository(Position).delete({ id: Number(id) });

            const { category, level, japaneseRequired } = actualPosition;

            const applicants = await AppDataSource.getRepository(Applicant).findBy({
                categories: ArrayContains([category]),
                level,
                japaneseKnowledge: Raw(
                    `CASE WHEN "Applicant"."japaneseKnowledge" = true THEN true
                        WHEN "Applicant"."japaneseKnowledge" = false THEN ${japaneseRequired}
                        END`
                ),
            });

            // send emails if applicants exist
            !!applicants.length ? await emailService.sendEmail(applicants, actualPosition) : null;

            res.status(204).json();
        } catch (e) {
            next(new ErrorHandler());
        }
    };
}

export const positionsController = new PositionsController();
