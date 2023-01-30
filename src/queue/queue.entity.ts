import { Section } from 'src/enums/sections.enum';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Queue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    patientId: number;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'enum', enum: Section, default: Section[0] })
    section: Section;

    @Column({ unique: true })
    waitingNumber: number;

    @Column({ default: new Date() })
    arrivalTime: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}