import { IsEnum, IsIn, isIn, IsNotEmpty } from "class-validator";
import { Section } from "src/enums/sections.enum";

export class AddPatientDto {
    @IsNotEmpty()
    patientId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    section: Section;

    waitingNumber: number;

    arrivalTime: Date;

    isActive: boolean;
}