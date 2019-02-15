import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsboardComponent } from './newsboard/newsboard.component';
import { ArticleComponent } from './article/article.component';
import { AppComponent } from './app.component';
import { RankerComponent } from './ranker/ranker.component';

const routes: Routes = [
  {path : '', component : AppComponent},
  {path: 'news', component: NewsboardComponent },
  {path:'article/:value',component : ArticleComponent},
  {path:'rank',component : RankerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
