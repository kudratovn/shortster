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

import { UrlService } from './../services/UrlService';

import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
import { YupValidationPipe } from './..//pipes/YupValidationPipe';
import { patchRuleValidationScheme } from './../validator/createUrlValidationSchena';
import { RESULT_STATUSES } from './../constants/common';
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
      return res.status(201).send({
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
  @Get('/:short_code')
  async redirect(
    @Param('short_code') short_code: string,
    @Res() res: Response
  ) {
    const url = await this.urlService.getUrlByCode(short_code);
    if(url) {
      await this.urlService.useUrl(url);
      return res.send({
        status: RESULT_STATUSES.SUCCESS,
        data: url.url,
      })
    } else {
      return res.send({
        status: RESULT_STATUSES.ERROR,
        error: 'Failed to create url',
      })
    }
  }
  @Get('/:short_code/stats')
  async get(
    @Param('short_code') short_code: string,
    @Res() res: Response
  ) {
    const url = await this.urlService.getUrlByCode(short_code);
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