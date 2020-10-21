import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  public limit = 50;
  public page = 0;
  public _query = new BehaviorSubject({
    "limit": this.limit,
    "offset": this.page * this.limit,
    "timeDimensions": [
      {
        "dimension": "Orders.createdAt",
        "granularity": "day"
      }
    ],
    "dimensions": [
      "Users.id",
      "Orders.id",
      "Orders.size",
      "Users.fullName",
      "Users.city",
      "Orders.price",
      "Orders.status",
      "Orders.createdAt"
    ],
    filters: []
  });
  public query = null;
  public changePage = (obj) => {
    this._query.next({
      "limit": obj.pageSize,
      "offset": obj.pageIndex * obj.pageSize,
      ...this._query.value
    });
  };
  public statusChanged(value) {
    this._query.next({...this._query.value,
      "filters": this.getFilters(value)});
  };
  private getFilters = (value) => {
    return [
      {
        "dimension": "Orders.status",
        "operator": value === 'all' ? "set" : "equals",
        "values": [
          value
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this._query.subscribe(query => {
      this.query = query;
    });
  }

}
