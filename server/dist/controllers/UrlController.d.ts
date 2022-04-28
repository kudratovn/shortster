import { Response } from 'express';
import { UrlService } from 'src/services/UrlService';
import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    create(dto: ShortCodeDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    redirect(short_code: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
