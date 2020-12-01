import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { NEWS_API } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private secret = ''

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.db.getApiKey(NEWS_API)
      .then(result => {
        this.secret = result
				if (!!result) {
					this.router.navigate(['/countrylist'])
        }
        else{
          this.router.navigate(['/settings'])
        }
				
      })
  }

}
