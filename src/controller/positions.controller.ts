import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import {Category, Position} from '../entity';

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
            const { category } = req.query;

            const positions = await AppDataSource.getRepository(Position).find({
                    where: {
                        category: category as Category,
                    },
                });

            res.status(201).json(positions);
        } catch (e) {
            next(e);
        }
    }
}

export const positionsController = new PositionsController();
