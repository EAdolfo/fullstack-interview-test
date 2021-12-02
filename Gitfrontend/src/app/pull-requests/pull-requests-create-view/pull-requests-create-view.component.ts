import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-pull-requests-create-view',
  templateUrl: './pull-requests-create-view.component.html',
  styleUrls: ['./pull-requests-create-view.component.css']
})
export class PullRequestsCreateViewComponent implements OnInit {

  public formPR: FormGroup;
  public endpoint = 'pull-requests/';

  public structurePR: any = {
    label: 'Create Pull Request',
    fields: [
      {
        label: 'Base',
        path: 'head',
        type: 'api-select',
        required: true,
        options: {
          endpoint: 'branches/list/',
          path: 'name'
        }
      }, {
        label: 'Compare',
        path: 'base',
        type: 'api-select',
        required: true,
        options: {
          endpoint: 'branches/list/',
          path: 'name'
        }
      }, {
        label: 'Title',
        path: 'title',
        type: 'text',
        required: true
      }, {
        label: 'Body',
        path: 'body',
        type: 'textarea',
        required: true
      }
    ]
  };

  public options: any = {};
  public loaded: boolean;

  public errors: any = [];
  public messages: any = [];

  constructor(
    public api: ApiService,
    private fb: FormBuilder,
    public util: UtilService,
  ) { }

  ngOnInit() {
    this.loadPR();
  }

  loadPR() {
    this.loaded = false;
    this.prepareData(this.structurePR.fields);
    this.formPR = this.util.buildForm(this.structurePR.fields);
    this.loaded = true;
  }

  prepareData(fields) {
    if (fields && fields.length > 0) {
      for (let idx in fields) {
        const field = fields[idx];
        if (field.type === 'api-select') {
          this.options[field.path] = [];
          const field_endpoint = field.options.endpoint;
          this.api.get(field_endpoint).then((res:any) => {
            if (res.code === 200 ) {
              for (let jdx in res.data) {
                this.options[field.path].push(res.data[jdx][field.options.path]);
              }
            }
          });
        }
      }
    }
  }

  save(merge) {
    this.cleanMessages();
    let data = {};
    if (!this.formPR.disabled) {
      [data, this.errors] = this.util.getForm(this.structurePR.fields, this.formPR);
      if (data) {
        this.formPR.disable();
        this.messages.push('Saving...');
        let response = this.api.post(this.endpoint, {}, data);
        response.then((res: any) => {
          this.cleanMessages();
          if (res.code === 200 || res.code === 201) {
            if (merge) {
              const new_item = res.data;
              this.merge(new_item);
            } else {
              this.util.goBack();
            }
            this.messages.push(res.message);
          } else {
            this.errors.push(res.message);
          }
          this.formPR.enable();
        });
      }
    }
  }

  merge(item) {
    this.cleanMessages();
    let data = {};
    if (item.id) {
      data['pull_id'] = item.id;
      data['state'] = 'merged';
    }
    this.messages.push('Merging...');
    let response = this.api.post(this.endpoint, {}, data);
    response.then((res: any) => {
      this.cleanMessages();
      if (res.code === 200) {
        this.util.goBack();
      } else {
        this.errors.push(res.message);
      }
    });
  }

  cleanMessages() {
    this.messages = [];
    this.errors = [];
  }
}
