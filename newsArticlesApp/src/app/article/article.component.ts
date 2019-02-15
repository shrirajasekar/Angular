import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private readonly articleURL = "article";
  holder: SafeHtml;
  public articleId:string='0';
  public divContent:string="";
  constructor(private route: ActivatedRoute,private router: Router,private sanitizer: DomSanitizer,private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(response=>{
      this.articleId = response.value;
      this.buildDivContent(this.articleId);
    })
  }

  

  private goBack(){
    this.router.navigateByUrl('/news');
  }

  private goToArticle(number){
    console.log("called")
    let navToArticleurl = `${this.articleURL}/${number}`;
    this.router.navigateByUrl(navToArticleurl)
  }

  private goToArticleLeft(){
    console.log("calledLeft")
    if(this.articleId=="1"){
      return
    }else{
      this.articleId = (parseInt(this.articleId)-1).toString();
      this.buildDivContent(this.articleId);
    }
    
  }

  private goToArticleRight(){
    console.log("calledLeft")
    if(this.articleId=="5"){
      return
    }else{
      this.articleId = (parseInt(this.articleId)+1).toString();
      this.buildDivContent(this.articleId);
    }
    
  }

  private buildDivContent(articleId:string){
    this.parseJSON(this.articleId).subscribe(response=>{
    let body = response.body;
    if(body && body.length >0){
      this.divContent = "";
     // this.divContent = "<button (click)= 'goBack()'> Left </button>"
      for(let elem of body){
        switch(elem.type){
          case "paragraph":           
          this.divContent = this.divContent + this.constructParagraph(elem.model.text);
          break;

          case "heading":           
          this.divContent = this.divContent + this.constructHeading(elem.model.text);
          break;

          case "list":           
          this.divContent = this.divContent + this.constructList(elem.model);
          break;

          case "image":           
          this.divContent = this.divContent + this.constructImage(elem.model);
          break;
        }
      }
    }
    console.log(body);
    console.log("_______________");
    console.log(this.divContent);
    this.holder = this.sanitizer.bypassSecurityTrustHtml(this.divContent);
  });
    
  }

  private parseJSON(articleId:string):Observable<any>{
    return new Observable(observe=>{this.http.get('/assets/article-'+articleId+'.json')
    .subscribe(data => {
      observe.next(data)
     });
    });
  }

  private constructParagraph(content:string){
    return "<p>"+content+"</p>";
  }

  private constructHeading(content:string){
    return "<h1>"+content+"</h1>";
  }

  private constructList(content:any){
    var listContent = "";
    var listEnd = "";
    if(content.type =="unordered"){
      listContent = "<ul>";
      listEnd = "</ul>";
    }else if(content.type =="ordered"){
      listContent = "<ol>";
      listEnd = "</ol>";
    }
    for(let e of content.items){
      listContent = listContent+ "<li>" + e + "</li>";
    }
    listContent = listContent + listEnd;
    return listContent;
  }

  private constructImage(content:any){
    return "<img src = "+content.url+" width = "+content.width+" height = "+content.height+ " alt = '"+ content.altText +"' >";
  }

}
