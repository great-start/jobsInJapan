import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category, Level, Position } from '../entity';
import { Like } from 'typeorm';
import { ErrorHandler } from '../error/errorHandler';

class PositionsController {
    public async createPosition(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const position = req.body;

            const { id } = await AppDataSource.getRepository(Position).save(position);

            res.status(201).json({ id });
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    public async findPositions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, level, tag } = req.query;

            if (
                category && !Object.values(Category).includes(category as Category) ||
                level && !Object.values(Level).includes(level as Level)
            ) {
                next(new ErrorHandler('Input value for category or level is wrong', 400,'Bad Request'));
                return;
            }

            const positions = await AppDataSource.getRepository(Position).findBy({
                category: (category as Category) || undefined,
                level: (level as Level) || undefined,
                description: tag ? Like(`%${tag}%`) : undefined,
            });

            res.status(201).json(positions);
        } catch (e) {
            next(new ErrorHandler());
        }
    }
}

export const positionsController = new PositionsController();
