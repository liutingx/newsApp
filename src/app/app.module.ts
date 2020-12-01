import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { CountrylistComponent } from './components/countrylist.component';
import { DisplaynewsComponent } from './components/displaynews.component';
import { DatabaseService } from './database.service';
import { SettingsComponent } from './components/settings.component';
import { MainComponent } from './components/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from './news.service';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'settings', component: SettingsComponent},
  {path:'countrylist', component: CountrylistComponent},
  {path:'news/:country', component: DisplaynewsComponent},
  {path:'**', redirectTo:'/', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CountrylistComponent,
    DisplaynewsComponent,
    SettingsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatabaseService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
