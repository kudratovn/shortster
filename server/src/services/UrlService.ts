import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ShortUniqueId from 'short-unique-id';

import Urls from './../entity/Urls';
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

  async useUrl(url: Urls) {
    url.times_redeemed = url.times_redeemed + 1;
    url.updated_at = new Date();
    await this.urlRepository.save(url);
  }

  async createUrl(dto: ShortCodeDTO): Promise<Urls | null> {
    let code;
    const { short_code = null, url } = dto;
    if(dto.autoGenerate) {
      code = await this.generateCode();
    } else {
      code = await this.manualCode(short_code);
      if(!code)
        return null;
    }
    const newUrl = Urls.create(url, code)
    await this.urlRepository.save(newUrl);
    return newUrl;
  }

  async manualCode(short_code: string | null) {
    if(!short_code)
      return null;
    const url = await this.getUrlByCode(short_code);
    if(url)
      return null;
    return short_code;
  }

  async generateCode(): Promise<string> {
    const uid = new ShortUniqueId();
    let generatedCode = uid();
    let url = await this.getUrlByCode(generatedCode);
    if(!url) {
      return generatedCode;
    } else {
      return await this.generateCode()
    }
  }
}