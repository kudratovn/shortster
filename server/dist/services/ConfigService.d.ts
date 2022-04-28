interface Config {
    NODE_ENV: string;
    PORT: number;
    AUTHORITY: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
}
export declare class ConfigService {
    config: Config;
    constructor();
}
export {};
