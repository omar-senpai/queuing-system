import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Section } from 'src/enums/sections.enum';
import { AddPatientDto } from './dto/add-patient';
import { Queue } from './queue.entity';

@Injectable()
export class QueueService {
    async create(addPatientDto: AddPatientDto) {
        // check if user exist
        if (await this.isPatientExist(addPatientDto))
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'sorry this patient already exist',
            }, HttpStatus.CONFLICT);
        addPatientDto.section = Object.values(Section)[addPatientDto.section];
        const newPatient = Queue.create(addPatientDto);
        await newPatient.save();
    }
    async isPatientExist(addPatientDto: AddPatientDto) {
        return Queue.findOne({
            where: {
                patientId: addPatientDto.patientId,
                isActive: true
            }
        });
    }

    async update(id: number) {
        const patient = await Queue.findOne({ where: { id } });
        if (!patient)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Patient not found',
            }, HttpStatus.NOT_FOUND);
        patient.isActive = false;
        await patient.save();
        return patient;
    }

    async getBySection(section: Section) {
        const patients = await Queue.find(
            {
                where: {
                    section: Object.values(Section)[section],
                    isActive: true
                }
            }
        );
        return patients;
    }

}
