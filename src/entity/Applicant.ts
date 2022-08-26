import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './Category.enum';
import { Level } from './Level.enum';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'enum', enum: Category, array: true })
    categories: Category[];

    @Column({ type: 'boolean', default: false })
    japaneseKnowledge: boolean;

    @Column({ type: 'enum', enum: Level })
    level: Level;
}
