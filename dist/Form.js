function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import _ from 'lodash';
var MyForm = /*#__PURE__*/function () {
  function MyForm(defaults) {
    _classCallCheck(this, MyForm);
    this.error = {};
    this.defaults = defaults;
    if (this.defaults) {
      Object.assign(this, this.defaults);
    }
  }
  _createClass(MyForm, [{
    key: "hasError",
    value: function hasError(field) {
      return this.error.hasOwnProperty(field);
    }
  }, {
    key: "errorOut",
    value: function errorOut(field) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var b;
      _.forEach(this.error, function (sms, key) {
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
  }, {
    key: "clearAll",
    value: function clearAll() {
      return this.error = {};
    }
  }, {
    key: "clear",
    value: function clear(field) {
      delete this.error[field];
    }
  }, {
    key: "any",
    value: function any() {
      return _.isEmpty(this.error);
    }
  }, {
    key: "clearInput",
    value: function clearInput(field) {
      var fieldName = field;
      this[fieldName] = "";
      this.defaults[field] = "";
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;
      var fields = Object.keys(this.defaults);
      _.forEach(fields, function (value) {
        var fieldName = value;
        _this.defaults[value] = "";
        _this[fieldName] = "";
      });
      return this;
    }
  }, {
    key: "removeProperty",
    value: function removeProperty(field) {
      var fieldName = field;
      delete this[fieldName];
      delete this.defaults[field];
    }
  }, {
    key: "removeProperties",
    value: function removeProperties(fields) {
      var _this2 = this;
      fields.forEach(function (field) {
        var fieldName = field;
        if (_this2.hasOwnProperty(fieldName)) {
          delete _this2[fieldName];
        }
        if (_this2.defaults.hasOwnProperty(field)) {
          delete _this2.defaults[field];
        }
      });
    }
  }, {
    key: "resetToZero",
    value: function resetToZero() {
      var _this3 = this;
      var fields = Object.keys(this.defaults);
      _.forEach(fields, function (value) {
        var fieldName = value;
        _this3.defaults[value] = 0;
        _this3[fieldName] = 0;
      });
      return this;
    }
    // Helper method to get typed field value
  }, {
    key: "getField",
    value: function getField(field) {
      return this[field];
    }
    // Helper method to set typed field value
  }, {
    key: "setField",
    value: function setField(field, value) {
      var fieldName = field;
      this[fieldName] = value;
      this.defaults[field] = value;
    }
    // Get all form data as typed object
  }, {
    key: "getData",
    value: function getData() {
      var _this4 = this;
      var data = {};
      var fields = Object.keys(this.defaults);
      fields.forEach(function (field) {
        data[field] = _this4[field];
      });
      return data;
    }
  }]);
  return MyForm;
}();
export { MyForm as default };
