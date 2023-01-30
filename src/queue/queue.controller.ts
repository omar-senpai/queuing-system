import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Section } from 'src/enums/sections.enum';
import { AddPatientDto } from './dto/add-patient';
import { QueueService } from './queue.service';

@Controller('api/v1/queue')
export class QueueController {
    constructor(private readonly queueService: QueueService) { }

    @Post()
    create(@Body() addPatientDto: AddPatientDto) {
        return this.queueService.create(addPatientDto);
    }

    @Post(':id')
    update(@Param('id') id: number) {
        return this.queueService.update(id);
    }

    @Get(':section')
    getBySection(@Param('section') section: Section) {
        return this.queueService.getBySection(section);
    }

    @Get()
    getPatients() {
        return this.queueService.getPatients();
    }
}
