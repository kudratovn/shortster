export interface Values {
    [field: string]: any;
}
declare type Errors<V> = {
    [K in keyof V]?: V[K] extends any[] ? V[K][number] extends Record<string, unknown> ? Array<Errors<V[K][number]>> | string | string[] : string | string[] : V[K] extends Record<string, unknown> ? Errors<V[K]> : string;
};
export declare function yupToFormErrors<V>(yupError: any): Errors<V>;
export {};
