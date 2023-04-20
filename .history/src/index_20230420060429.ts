import _ from "lodash";
import { Callable, CallableString } from "src/stores/typings/General";

export interface ErrorType {
  [name: string]: [string];
}

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

  reset() {
    const fields = Object.keys(this.defaults);

    _.forEach(fields, (value: string) => {
      // this[value] = ''
      this.defaults[value] = "";

      // if(!this.prototype.hasOwnProperty('defaults')){
      // Object.assign(this.defaults, this[value]= '' )
      // }
    });
    return this;
  }
}

export default MyForm;
