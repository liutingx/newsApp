import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CountryList } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {

  list: CountryList[] = []
 
  constructor(private newsSvc: NewsService, private db: DatabaseService) { }

  ngOnInit(): void {
    this.newsSvc.getCountryList()
    .then(results => {
      this.list = results;
    })
  }

}
