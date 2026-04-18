import _ from "lodash";
import { CallableString, ErrorType } from "./typings/index";

// Generic interface for form data
interface FormDataDefaults<T = Record<string, any>> {
  [key: string]: any;
  defaults: T;
}

class MyForm<T extends Record<string, any> = Record<string, any>>
  implements FormDataDefaults<T>
{
  [k: string]: any;
  public error: ErrorType;
  public defaults: T;

  constructor(defaults: T) {
    this.error = {};
    this.defaults = defaults;
    if (this.defaults) {
      Object.assign(this, this.defaults);
    }
  }

  hasError(field: string): boolean {
    return this.error.hasOwnProperty(field);
  }

  errorOut(
    field: string,
    callback: CallableString | null = null
  ): string | undefined {
    let b: string | undefined;
    _.forEach(this.error, (sms: [string], key: string) => {
      if (key === field) {
        if (callback) {
          b = callback(sms[0]);
        } else {
          b = sms[0];
        }
      }
    });
    return b;
  }

  clearAll(): {} {
    return (this.error = {});
  }

  clear(field: string): void {
    delete this.error[field];
  }

  any(): boolean {
    return _.isEmpty(this.error);
  }

  clearInput<K extends keyof T>(field: K): void {
    const fieldName = field as string;
    this[fieldName] = "";
    this.defaults[field] = "" as any;
  }

  reset(): this {
    const fields = Object.keys(this.defaults) as Array<keyof T>;

    _.forEach(fields, (value: keyof T) => {
      const fieldName = value as string;
      this.defaults[value] = "" as any;
      this[fieldName] = "";
    });
    return this;
  }

  removeProperty<K extends keyof T>(field: K): void {
    const fieldName = field as string;
    delete this[fieldName];
    delete this.defaults[field];
  }

  removeProperties<K extends keyof T>(fields: K[]): void {
    fields.forEach((field) => {
      const fieldName = field as string;
      if (this.hasOwnProperty(fieldName)) {
        delete this[fieldName];
      }
      if (this.defaults.hasOwnProperty(field as string)) {
        delete this.defaults[field];
      }
    });
  }

  resetToZero(): this {
    const fields = Object.keys(this.defaults) as Array<keyof T>;

    _.forEach(fields, (value: keyof T) => {
      const fieldName = value as string;
      this.defaults[value] = 0 as any;
      this[fieldName] = 0;
    });
    return this;
  }

  // Helper method to get typed field value
  getField<K extends keyof T>(field: K): T[K] {
    return this[field as string] as T[K];
  }

  // Helper method to set typed field value
  setField<K extends keyof T>(field: K, value: T[K]): void {
    const fieldName = field as string;
    this[fieldName] = value;
    this.defaults[field] = value;
  }

  // Get all form data as typed object
  getData(): T {
    const data = {} as T;
    const fields = Object.keys(this.defaults) as Array<keyof T>;
    fields.forEach((field) => {
      data[field] = this[field as string] as T[typeof field];
    });
    return data;
  }
}

export default MyForm;
