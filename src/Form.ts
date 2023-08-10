import _ from "lodash";
import { CallableString, ErrorType } from "./typings/index";

interface WithV {
  [key: string]: any;
  defaults: {
    [key: string]: string | number;
  };
}

class MyForm implements WithV {
  [k: string]: any;
  public error: ErrorType;
  public defaults;
  constructor(defaults: { [key: string]: string | number }) {
    this.error = {};
    this.defaults = defaults;
    if (this.defaults) {
      Object.assign(this, this.defaults);
    }
  }

  hasError(field: string) {
    return this.error.hasOwnProperty(field);
  }

  errorOut(field: string, callback: CallableString | null = null) {
    let b;
    _.forEach(this.error, (sms, key: string) => {
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

  clearAll() {
    return (this.error = {});
  }

  clear(field: string) {
    delete this.error[field];
  }

  any() {
    return _.isEmpty(this.error);
  }

  clearInput(field: string) {
    this[field] = "";
    this.defaults[field] = "";
  }

  reset() {
    const fields = Object.keys(this.defaults);

    _.forEach(fields, (value: string) => {
      // this[value] = ''
      this.defaults[value] = "";
      this[value] = "";

      // if(!this.prototype.hasOwnProperty('defaults')){
      // Object.assign(this.defaults, this[value]= '' )
      // }
    });
    return this;
  }

  removeProperty(field: string) {
    delete this[field];
    delete this.defaults[field];
  }

  removeProperties(fields: string[]) {
    fields.forEach((field) => {
      if (this.hasOwnProperty(field)) {
        delete this[field];
      }
      if (this.defaults.hasOwnProperty(field)) {
        delete this.defaults[field];
      }
    });
  }

  resetToZero() {
    const fields = Object.keys(this.defaults);

    _.forEach(fields, (value: string) => {
      // this[value] = ''
      this.defaults[value] = 0;
      this[value] = 0;

      // if(!this.prototype.hasOwnProperty('defaults')){
      // Object.assign(this.defaults, this[value]= '' )
      // }
    });
    return this;
  }
}

export default MyForm;
