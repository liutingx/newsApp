import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { NEWS_API } from '../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private db: DatabaseService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      secret: this.fb.control('', Validators.required)
    })
  }

  async deleteApi(){
    console.log('delete',this.form.get('secret').value)
    await this.db.deleteApiKey(NEWS_API)
    this.form.reset();
  }

  async addApi(){
    console.log('secret',this.form.get('secret').value)
    await this.db.saveApiKey(NEWS_API, this.form.get('secret').value)
    this.router.navigate(['/countrylist'])
  }

}
