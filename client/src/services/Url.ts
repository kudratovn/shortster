import { SERVER_ROUTES } from "../constants/server";
import { ShortCodeDTO } from "../models/dto/ShortCodeDTO";
import { ResultContainer } from "../models/ResultContainer";
import { Url } from "../models/Urls";
import http from "./Http";


export class UrlService {
  async createUrl(dto: ShortCodeDTO): Promise<ResultContainer<Url, string>> {
    try {
      const { data } = await http.post<ResultContainer<Url, string>>(
        SERVER_ROUTES.SUBMIT,
        dto
      );
      return data;
    } catch (error) {
      return {
        status: "error",
        error: "server error"
      }
    }
  }

  async redirect(short_code: string): Promise<ResultContainer<string, string>> {
    try {
      const { data } = await http.get<ResultContainer<string, string>>(
        `/${short_code}`
      );
      return data;
    } catch (error) {
      return {
        status: "error",
        error: "server error"
      }
    }
  }
}

export const urlService = new UrlService();