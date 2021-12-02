import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  public endpoint = 'branches/list/';
  public url = '/branches';

  public itemStructure: any = {
    headers: [
      {
        label: 'Branch',
        path: 'name',
        type: 'text'
      }
    ],
    actions: [
      {
        label: 'Go',
        id_path: 'name',
        url: this.url + '/view/{{id}}/',
        action: 'navigate',
      }
    ],
  };

  constructor(
  ) { }

  ngOnInit() {
  }

}
