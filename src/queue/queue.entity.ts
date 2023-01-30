import { type } from 'os';
import { Section } from 'src/enums/sections.enum';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Queue extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    patientId: string;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'enum', enum: Section, default: Section[0] })
    section: Section;

    @Column({ type: 'text', nullable: true })
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