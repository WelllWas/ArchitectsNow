import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idClient:string;

    @Column()
    idArchitect:string;

    @Column()
    description:string;

    @Column()
    status:string;
}
