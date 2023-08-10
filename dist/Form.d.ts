import { CallableString, ErrorType } from "./typings/index";
interface WithV {
    [key: string]: any;
    defaults: {
        [key: string]: string | number;
    };
}
declare class MyForm implements WithV {
    [k: string]: any;
    error: ErrorType;
    defaults: {
        [key: string]: string | number;
    };
    constructor(defaults: {
        [key: string]: string | number;
    });
    hasError(field: string): boolean;
    errorOut(field: string, callback?: CallableString | null): undefined;
    clearAll(): {};
    clear(field: string): void;
    any(): boolean;
    clearInput(field: string): void;
    reset(): this;
    removeProperty(field: string): void;
    removeProperties(fields: string[]): void;
    resetToZero(): this;
}
export default MyForm;
