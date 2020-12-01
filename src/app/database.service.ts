import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { ApiKey, Article, CountryList } from './models';

@Injectable()
export class DatabaseService extends Dexie{

  private countries: Dexie.Table<CountryList, string>
  private articles: Dexie.Table<Article, string>
  private apiKey: Dexie.Table<ApiKey, string>

  constructor() {
    super('appdb')

    this.version(1).stores({
      apiKey: 'id',
      countries: 'code',
      articles: 'publishedAt, code'
    })

    this.apiKey = this.table('apiKey')
    this.countries = this.table('countries')
    this.articles = this.table('articles')
    
   }

   saveApiKey(id: string, secret: string): Promise<string> {
		return this.apiKey.put({ id, secret })
	}

   getApiKey(id: string): Promise<string> {
		return this.apiKey.get(id).then(r => {
			if (!!r)
				return r.secret
			return ''
		})
  }
  
   deleteApiKey(id: string):Promise<any> {
     return this.apiKey.delete(id)
   }

   saveCountries(list: CountryList[]):Promise<any>{
     return this.countries.bulkPut(list);
   }

   getCountries():Promise<CountryList[]>{
     return this.countries.toArray();
   }

   getCountry(code: string): Promise<CountryList> {
		return this.countries.where('code').equalsIgnoreCase(code)
				.toArray()
				.then(result => {
					if (result.length > 0)
						return result[0]
					return null
				})
	}

   saveArticles(articles: Article[]):Promise<any>{
     return this.articles.bulkPut(articles);
   }

   getArticles(country: string): Promise<Article[]> {
		return this.articles.where('code').equalsIgnoreCase(country).toArray()
	}

   deleteArticles(articles: Article[]):Promise<any>{
     return this.articles.bulkDelete(articles.map(a => a.publishedAt))
   }

}
