import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Section } from "src/enums/sections.enum";

export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsPhoneNumber("SA")
    phoneNumber: string;

    specialty: Section;
}