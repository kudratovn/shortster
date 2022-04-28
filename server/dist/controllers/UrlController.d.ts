import { UrlService } from 'src/services/UrlService';
import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    create(dto: ShortCodeDTO): Promise<ShortCodeDTO>;
}
