import { Component, OnInit } from '@angular/core';
import {RankClass} from '../model/rank.model';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ifError } from 'assert';
import { error } from '@angular/compiler/src/util';
import { isError } from 'util';
import { Router } from "@angular/router";
import { delay } from 'q';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.css']
})
export class RankerComponent implements OnInit {
  errorFlag : Boolean;
  errorMessage : string;
  public rank : RankClass;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient,private router: Router) { 
    this.rank=new RankClass();
    this.errorMessage = "All fields are required!";
    this.errorFlag = false;
  }

  ngOnInit() {
    this.loadFormData();
  }

  public submitRanks(){
     this.http.post("http://localhost:4500/setRank", this.rank, this.httpOptions).subscribe(response=>{alert("Ranks saved successfully!")},error=>{alert("Error : Couldn't save changes!")})
     this.router.navigateByUrl('/news'); 
  }

  public clearAll(){
    this.rank.article1=null;
    this.rank.article2=null;
    this.rank.article3=null;
    this.rank.article4=null;
    this.rank.article5=null;
    this.errorFlag=true;
 }

 public clearAllAndSave(){
  this.rank.article1=null;
  this.rank.article2=null;
  this.rank.article3=null;
  this.rank.article4=null;
  this.rank.article5=null;
  this.errorFlag=true;
  this.http.post("http://localhost:4500/setRank", this.rank, this.httpOptions).subscribe(response=>{alert("Ranks cleared successfully!")},error=>{alert("Error : Couldn't save changes!")})
}



  private parseJSON():Observable<any>{
    return new Observable(observe=>{this.http.get('/assets/ranks.json')
    .subscribe(data => {
      observe.next(data)
     });
    });
  }

  private loadFormData(){
    this.parseJSON().subscribe(response=>{
      this.rank = <RankClass> response;
      this.rank.article1 = this.rank.article1 == "null"?"":this.rank.article1;
      this.rank.article2 = this.rank.article2 == "null"?"":this.rank.article2;
      this.rank.article3 = this.rank.article3 == "null"?"":this.rank.article3;
      this.rank.article4 = this.rank.article4 == "null"?"":this.rank.article4;
      this.rank.article5 = this.rank.article5 == "null"?"":this.rank.article5;
    })
  }
  onKeyUp(e: any) {
    if (parseInt(this.rank.article1)> 5 || parseInt(this.rank.article1) == parseInt(this.rank.article2) || parseInt(this.rank.article1) == parseInt(this.rank.article3) || parseInt(this.rank.article1) == parseInt(this.rank.article4) || parseInt(this.rank.article1) == parseInt(this.rank.article5)){
      this.rank.article1=null;
      alert("Article 1 - Invalid or already used rank");
      this.errorFlag=false;
    }if (parseInt(this.rank.article2)> 5 || parseInt(this.rank.article2) == parseInt(this.rank.article1) || parseInt(this.rank.article2) == parseInt(this.rank.article3) || parseInt(this.rank.article2) == parseInt(this.rank.article4) || parseInt(this.rank.article2) == parseInt(this.rank.article5)){
      this.rank.article2=null;
      alert("Article 2 - Invalid or already used rank");
      this.errorFlag=false;
    }if (parseInt(this.rank.article3)> 5 || parseInt(this.rank.article3) == parseInt(this.rank.article1) || parseInt(this.rank.article3) == parseInt(this.rank.article2) || parseInt(this.rank.article3) == parseInt(this.rank.article4) || parseInt(this.rank.article3) == parseInt(this.rank.article5)){
      this.rank.article3=null;
      alert("Article 3 - Invalid or already used rank");
      this.errorFlag=false;
    }if (parseInt(this.rank.article4)> 5 || parseInt(this.rank.article4) == parseInt(this.rank.article1) || parseInt(this.rank.article4) == parseInt(this.rank.article2) || parseInt(this.rank.article4) == parseInt(this.rank.article3) || parseInt(this.rank.article4) == parseInt(this.rank.article5)){
      this.rank.article4=null;
      alert("Article 4 - Invalid or already used rank");
      this.errorFlag=false;
    }if (parseInt(this.rank.article5)> 5 || parseInt(this.rank.article5) == parseInt(this.rank.article1) || parseInt(this.rank.article5) == parseInt(this.rank.article2) || parseInt(this.rank.article5) == parseInt(this.rank.article3) || parseInt(this.rank.article5) == parseInt(this.rank.article4)){
      this.rank.article5=null;
      alert("Article 5 - Invalid or already used rank");
      this.errorFlag=false;
    }if(this.rank.article1 == null||this.rank.article2==null||this.rank.article3==null||this.rank.article4==null||this.rank.article5==null){
      this.errorFlag=true;
    }else{
      this.errorFlag=false;
    }
    
  }
  onKeyPress(e: any) {
    const pattern = /[1-5\+\-\ ]/;
    let inputChar = String.fromCharCode(e.charCode);
    if (e.charCode>53 || e.charCode<49) {
        event.preventDefault();
      }
    var valid = 0;
}

}
