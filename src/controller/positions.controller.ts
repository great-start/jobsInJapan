import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category, Level, Position } from '../entity';
import {Like} from 'typeorm';

class PositionsController {
    public async createPosition(req: Request, res: Response, next: NextFunction) {
        try {
            const position = req.body;

            const { id } = await AppDataSource.getRepository(Position).save(position);

            res.status(201).json({
                id,
            });
        } catch (e) {
            next(e);
        }
    }

    public async findPositions(req: Request, res: Response, next: NextFunction) {
        try {
            const { category, level, tag } = req.query;

            const positions = await AppDataSource.getRepository(Position).findBy({
                    category: category as Category || undefined,
                    level: level as Level || undefined,
                    description: tag ? Like(`%${tag}%`) : undefined,
            });

            res.status(201).json(positions);
        } catch (e) {
            next(e);
        }
    }
}

export const positionsController = new PositionsController();
