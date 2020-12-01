import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Article } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-displaynews',
  templateUrl: './displaynews.component.html',
  styleUrls: ['./displaynews.component.css']
})
export class DisplaynewsComponent implements OnInit {

  news: Article[] = [];
  country;

  constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute,
    private newsSvc: NewsService) { }

  ngOnInit(): void {
    const countrycode = this.activatedRoute.snapshot.params['country']
    Promise
    .all([this.db.getCountry(countrycode), this.newsSvc.getArticleList(countrycode)])
    .then(result => {
      this.country = result[0].country,
      this.news = result[1]

    })
    
    
  }

  async saved(article){
    article.saved = !article.saved;
    await this.db.saveArticles(this.news)

  }

}
