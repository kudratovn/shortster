export default class Urls {
    readonly id: string;
    url: string;
    short_code: string;
    times_redeemed: number;
    readonly created_at: Date;
    updated_at: Date | null;
    private constructor();
    static create(url: string, short_code: string): Urls;
}
