import {
  BadGatewayException,
  Body,
  Get,
  Post,
  Param,
  UsePipes,
  Controller,
  ValidationPipe,
  Response as Res
} from '@nestjs/common';
import { Response } from 'express';

import { UrlService } from 'src/services/UrlService';

import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
import { YupValidationPipe } from 'src/pipes/YupValidationPipe';
import { patchRuleValidationScheme } from 'src/validator/createUrlValidationSchena';
import { RESULT_STATUSES } from 'src/constants/common';
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post('/submit')
  @UsePipes(new YupValidationPipe(patchRuleValidationScheme))
  async create(
    @Body() dto: ShortCodeDTO,
    @Res() res: Response
    ) {
    const url = await this.urlService.createUrl(dto);
    if(url) {
      return res.send({
        status: RESULT_STATUSES.SUCCESS,
        data: url,
      })
    } else {
      return res.send({
        status: RESULT_STATUSES.ERROR,
        error: 'Failed to create url',
      })
    }
  }
}