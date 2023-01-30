import { IsNotEmpty } from "class-validator";
import { Section } from "src/enums/sections.enum";

export class AddPatientDto {
    @IsNotEmpty()
    patientId: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    section: Section;

    @IsNotEmpty()
    waitingNumber: number;

    arrivalTime: Date;

    isActive: boolean;
}