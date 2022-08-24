import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Level {
    junior = 'junior',
    middle = 'middle',
    senior = 'senior',
}

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column({
        type: "enum",
        enum: Level,
    })
    level: Level;

    @Column()
    company: string;

    @Column()
    description?: string;

    @Column()
    japaneseRequired: boolean;
}
