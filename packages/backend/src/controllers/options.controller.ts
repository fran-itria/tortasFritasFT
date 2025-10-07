import { Controller, Get, NotFoundException } from '@nestjs/common';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}
  @Get()
  async getOptions() {
    const options = await this.optionsService.findOptions();
    if (options.length > 0) {
      return options;
    } else {
      throw new NotFoundException('No se encontraron opciones');
    }
  }
}
