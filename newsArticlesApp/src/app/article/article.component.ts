import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { container } from '@angular/core/src/render3';


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

  private goToRanker(){
    this.router.navigateByUrl("/rank");
  }  

  private goBack(){
    this.router.navigateByUrl('/news');
  }

  private goToArticle(number){
    let navToArticleurl = `${this.articleURL}/${number}`;
    this.router.navigateByUrl(navToArticleurl)
  }

  private goToArticleLeft(){
    console.log("calledLeft")
    if(this.articleId=="1"){
      this.router.navigateByUrl('/rank');
    }else{
      this.articleId = (parseInt(this.articleId)-1).toString();
      let navToArticleurl = `${this.articleURL}/${this.articleId}`;
      this.router.navigateByUrl(navToArticleurl)
    }
    
  }

  private goToArticleRight(){
    console.log("calledLeft")
    if(this.articleId=="5"){
      this.router.navigateByUrl('/rank');
    }else{
      this.articleId = (parseInt(this.articleId)+1).toString();
      let navToArticleurl = `${this.articleURL}/${this.articleId}`;
      this.router.navigateByUrl(navToArticleurl)
    }
    
  }

  private buildDivContent(articleId:string){
    this.parseJSON(this.articleId).subscribe(response=>{
    let body = response.body;
    if(body && body.length >0){
      this.divContent = "";
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
    return "<div class = \"row\"><article>"+content+"</article></div><br/>";
  }

  private constructHeading(content:string){
    return "<div class = \"row\"><h1>"+content+"</h1></div><br/>";
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
    listContent = listContent + listEnd + "<br/>";
    return listContent;
  }

  private constructImage(content:any){
    return "<div class = \"row\"><img src = "+content.url+" class='rounded img-fluid float-center' width = "+content.width+" height = "+content.height+ " alt = '"+ content.altText +"' ></div><br/>";
  }

}
