import { Component, OnInit, Input} from '@angular/core';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() item: any;
  @Input() itemStructure: any;

  constructor(
    public util: UtilService,
  ) { }

  ngOnInit() {
  }

}
