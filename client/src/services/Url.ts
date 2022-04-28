import { SERVER_ROUTES } from "../constants/server";
import { ShortCodeDTO } from "../models/dto/ShortCodeDTO";
import { ResultContainer } from "../models/ResultContainer";
import http from "./Http";


export class UrlService {
  async createUrl(dto: ShortCodeDTO): Promise<ResultContainer<string, string>> {
    try {
      const { data } = await http.post<ResultContainer<string, string>>(
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
}

export const urlService = new UrlService();