import {
  BadGatewayException,
  Body,
  Get,
  Post,
  Param,
  UsePipes,
  Controller,
  ValidationPipe
} from '@nestjs/common';

import { UrlService } from 'src/services/UrlService';

import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
import { YupValidationPipe } from 'src/pipes/YupValidationPipe';
import { patchRuleValidationScheme } from 'src/validator/createUrlValidationSchena';
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post('/submit')
  @UsePipes(new YupValidationPipe(patchRuleValidationScheme))
  async create(@Body() dto: ShortCodeDTO) {
    console.log('dto', dto)
    return dto;
  }
}