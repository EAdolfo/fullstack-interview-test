import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {

  public endpoint = 'pull-requests/';
  public url = '/pull-requests';

  public itemStructure: any = {
    headers: [
      {
        label: 'Author',
        path: 'author',
        type: 'text'
      },
      {
        label: 'Title',
        path: 'title',
        type: 'text'
      },
      {
        label: 'Description',
        path: 'body',
        type: 'text'
      },
      {
        label: 'Head',
        path: 'head',
        type: 'text'
      },
      {
        label: 'Base',
        path: 'base',
        type: 'text'
      },
      {
        label: 'State',
        path: 'state',
        type: 'text'
      }
    ],
    actions: [
      {
        label: 'Close',
        conditions: {
          value: 'open',
          path: 'state',
          set_value: 'closed'
        },
        action: 'edit',
      }
    ],
  };

  constructor(
  ) { }

  ngOnInit() {
  }

}
