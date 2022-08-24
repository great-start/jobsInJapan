import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Level } from './Level.enum';
import { Category } from './Category.enum';

@Entity()
export class Position {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'enum', enum: Category })
    category: Category;

    @Column({ type: 'enum', enum: Level })
    level: Level;

    @Column({ type: 'varchar', length: 100 })
    company: string;

    @Column({ type: 'varchar', length: 1000, default: '' })
    description?: string;

    @Column({ type: 'boolean', default: false })
    japaneseRequired: boolean;
}
