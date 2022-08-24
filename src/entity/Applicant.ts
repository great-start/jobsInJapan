import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum Categories {
    nodejs = 'nodejs',
    angular = 'angular',
    javascript = 'javascript',
    react = 'react',
}

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column({
        type: 'enum',
        enum: Categories,
        array: true,
    })
    categories: Categories[];

    @Column()
    japaneseKnowledge: boolean;

    @Column()
    level: string;
}
