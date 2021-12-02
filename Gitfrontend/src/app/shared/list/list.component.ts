import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css',]
})
export class ListComponent implements OnInit {

  @Input() endpoint: string;
  @Input() url: string;
  @Input() itemStructure: any;

  @Input() items: Array<any>;

  @Input() back?: true;

  constructor(
    private api: ApiService,
    public util: UtilService,
  ) { }

  ngOnInit() {
    if (!this.items) {
      this.getItems();
    }
  }

  getItems() {
    let response = this.api.get(this.endpoint);
    response.then((res: any) => {
      if (res.code && res.code === 200) {
        this.items = res.data;
      } else {
        this.items = res;
      }
    });
  }

  navigationURL(url: string, item: any, path?: string) {
    if (path) {
      return url.replace('{{id}}', this.util.getValueByPath(item, path));
    } else {
      return url.replace('{{id}}', item);
    }
  }

  change(action: any, item: any) {
    let data = {};
    if (item.id) {
      data['id'] = item.id;
    }
    data[action.conditions['path']] = action.conditions['set_value'];
    let response = this.api.post(this.endpoint, {}, data);
    response.then((res: any) => {
      if (res.code === 200) {
        this.getItems();
      }
    });
  }

}
