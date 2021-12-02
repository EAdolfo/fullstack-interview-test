import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class UtilService {

  constructor(
    private _location: Location,
    private fb: FormBuilder,
  ) { }

  getValueByPath(data: any, path: string, _default?: string) {
    try {

      if (path === undefined) {
          return '';
      }
      const keys = path.split('__');
      for (let idx in keys) {
          data = data[keys[idx]];
          if (data === undefined || data === null) {
            break;
          }
      }
      if(!data && _default) {
        return _default;
      }
      return data;
    } catch(exc) {
      console.dir(exc);
    }
  }

  isoDateToFormat(isoDate) {
    const format_value = new Date(isoDate).toLocaleString('es-Mx', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return format_value;
  }

  goBack() {
    this._location.back();
  }

  buildForm(form) {
    let data = {};
    for (let idx in form) {
      const field = form[idx];
      const validators = [];
      let value = null;
      let disabled = false;
      if ('value' in field) {
        value = field.value;
      } else {
      }
      if ('required' in field && field.required) {
        validators.push(Validators.required);
      }
      data[field.path] = new FormControl({value, disabled}, Validators.compose(validators));
    }
    return this.fb.group(data);
  }

  getForm(fields, form) {
    let data = {};
    for (let idx in fields) {
      const field = fields[idx];
      if (form.controls[field.path].errors) {
          const errors = this.showErrors(field, form.controls[field.path].errors);
          return [false, errors];
      }
      data[field.path] = this.recoverValue(field.path, form);
    }
    return [data, []];
  }

  showErrors(field: any, errors: any) {
    let errors_list = [];
    for (let key in errors) {
        if (key === 'required' && errors[key]) {
            errors_list.push('Field ' + field.label + ' is required');
        }
    }
    return errors_list;
  }

  recoverValue(key: string, form) {
    return form.controls[key].value;
  }
}
