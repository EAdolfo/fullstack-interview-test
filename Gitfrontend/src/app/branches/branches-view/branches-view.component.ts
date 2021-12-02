import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-branches-view',
  templateUrl: './branches-view.component.html',
  styleUrls: ['./branches-view.component.css']
})
export class BranchesViewComponent implements OnInit {

  public id: string;
  public endpoint = 'branches/detail/';
  public url = '/commit';

  public items: Array<any>;

  public itemStructure: any = {
    headers: [
      {
        label: 'Date',
        path: 'datetime',
        type: 'datetime'
      },
      {
        label: 'Autor',
        path: 'author',
        type: 'text'
      },
      {
        label: 'Message',
        path: 'message',
        type: 'text'
      }
    ],
    actions: [
      {
        label: 'Go',
        id_path: 'commit_id',
        url: this.url + '/view/{{id}}/',
        action: 'navigate'
      }
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.url.length > 2) {
      this.id = this.route.snapshot.url[2].path;
    }
    this.getBranchCommits();
  }

  getBranchCommits() {
    let response = this.api.get('branches/detail/', {
      branch_name: this.id,
    });
    response.then((res:any) => {
      this.items =  res.data;
    });
  }

}
