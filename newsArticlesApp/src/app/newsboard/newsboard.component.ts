import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-newsboard',
  templateUrl: './newsboard.component.html',
  styleUrls: ['./newsboard.component.css']
})
export class NewsboardComponent implements OnInit {

  private readonly articleURL = "article"
  constructor(private router: Router) { }

  ngOnInit() {}

  private goToNews(value:string){
    let myurl = `${this.articleURL}/${value}`;
    this.router.navigateByUrl(myurl)
  }

}
