import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-commit-view',
  templateUrl: './commit-view.component.html',
  styleUrls: ['./commit-view.component.css']
})
export class CommitViewComponent implements OnInit {

  public id: string;
  public endpoint = 'branches/detail/';
  public url = '/commit';

  public item: Array<any>;

  public itemStructure: any = {
    headers: [
      {
        label: 'Date',
        path: 'datetime',
        type: 'datetime'
      },
      {
        label: 'Author',
        path: 'author',
        type: 'text'
      },
      {
        label: 'Email',
        path: 'email',
        type: 'text'
      },
      {
        label: 'Message',
        path: 'message',
        type: 'text'
      },
      {
        label: 'Number of files changed',
        path: 'files',
        type: 'text'
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
    this.getCommitDetails();
  }

  getCommitDetails() {
    let response = this.api.get('commit/detail/', {
      commit_id: this.id,
    });
    response.then((res:any) => {
      this.item =  res.data;
    });
  }
}
