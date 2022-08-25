import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category, Level, Position } from '../entity';
import { Like } from 'typeorm';
import { ErrorHandler } from '../error/errorHandler';
import { HttpStatus } from '../constants';

class PositionsController {
    public async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, level } = req.body as Position;

            if (
                (category && !Object.values(Category).includes(category as Category)) ||
                (level && !Object.values(Level).includes(level as Level))
            ) {
                next(
                    new ErrorHandler(
                        'Input value for category or level is wrong',
                        400,
                        HttpStatus.BAD_REQUEST
                    )
                );
                return;
            }

            const { id } = await AppDataSource.getRepository(Position).save(req.body);

            res.status(201).json({ id });
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public async findAllOrByQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, level, tag } = req.query;

            if (
                (category && !Object.values(Category).includes(category as Category)) ||
                (level && !Object.values(Level).includes(level as Level))
            ) {
                next(
                    new ErrorHandler(
                        'Input value for category or level is wrong',
                        400,
                        HttpStatus.BAD_REQUEST
                    )
                );
                return;
            }

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

    public async findOneById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const position = await AppDataSource.getRepository(Position).findOne({
                where: { id: Number(id) },
            });

            if (!position) {
                next(new ErrorHandler('This position does not exist', 400, HttpStatus.BAD_REQUEST));
                return;
            }

            res.status(200).json(position);
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const body = req.body;

            await AppDataSource.getRepository(Position).update(
                {
                    id: Number(id),
                },
                body
            );

            res.status(200).json();
        } catch (e) {
            next(new ErrorHandler());
        }
    }
}

export const positionsController = new PositionsController();
