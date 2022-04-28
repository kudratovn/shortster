import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ShortUniqueId from 'short-unique-id';
import * as moment from 'moment';

import Urls from 'src/entity/Urls';
import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Urls)
    private readonly urlRepository: Repository<Urls>
  ) {  }

  async getUrlByCode(code: string): Promise<Urls | null> {
    const url = await this.urlRepository.findOne({ where: { short_code: code } });
    return url || null;
  }

  async createUrl(dto: ShortCodeDTO): Promise<Urls | null> {
    let code;
    const { short_code = null, url } = dto;
    if(dto.autoGenerate) {
      code = await this.generateUrl();
    } else {
      if(!short_code)
        return null;
      const url = await this.getUrlByCode(short_code);
      if(url)
        return null;
      code = short_code;
    }
    const newUrl = Urls.create(url, code)
    await this.urlRepository.save(newUrl);
    return newUrl;
  }

  async generateUrl() {
    let generatedCode = this.generateCode();
    let url = await this.getUrlByCode(generatedCode);
    if(!url) {
      return generatedCode;
    } else {
      await this.generateUrl()
    }
  }

  generateCode() {
    const uid = new ShortUniqueId();
    return uid();
  }
}