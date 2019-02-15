import { Component, OnInit } from '@angular/core';
import {RankClass} from '../model/rank.model';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.css']
})
export class RankerComponent implements OnInit {

  public rank : RankClass;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { 
    this.rank=new RankClass();
  }

  ngOnInit() {
  }

  public submitRanks(){
    // this.http.post("./assets/ranks.json", this.rank, this.httpOptions).subscribe(response=>{console.log(response)})
    console.log(this.rank);
  }
}
