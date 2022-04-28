import { Repository } from 'typeorm';
import Urls from 'src/entity/Urls';
import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: Repository<Urls>);
    getUrlByCode(code: string): Promise<Urls | null>;
    createUrl(dto: ShortCodeDTO): Promise<Urls | null>;
    generateUrl(): Promise<any>;
    generateCode(): any;
}
