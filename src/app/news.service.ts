import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DatabaseService } from './database.service';
import { Article, countries, CountryList, NEWS_API } from './models';

@Injectable()
export class NewsService{

    constructor(private http: HttpClient, private db: DatabaseService){}

    async getCountryList():Promise<CountryList[]>{

        let list = await this.db.getCountries();
        const url = 'https://restcountries.eu/rest/v2/alpha'

        if(list.length <= 0){
            const params = (new HttpParams()).set('codes', countries)
            const results = await this.http.get<any>(url, {params}).toPromise()

            list = results.map(ea => {
                return {
                    country: ea.name,
                    code: ea.alpha2Code.toLowerCase(),
                    flag: ea.flag
                } as CountryList
            })
            console.log(list)
            await this.db.saveCountries(list)
        }
        return list;    
    }

    async getArticleList(country: string):Promise<any>{
        let articles = await this.db.getArticles(country);
        // should refresh if there are no articles
		let refresh = articles.length <= 0

        if(articles.length>0){
            const a = articles.find(a => !a.saved)
            if ((Date.now() - a.timestamp) >= 30000) {
                await this.db.deleteArticles(articles.filter(a => !a.saved))
                articles = articles.filter(a => a.saved)

                refresh = true;
            }
        }
        if(refresh){
            const secret = await this.db.getApiKey(NEWS_API)
            const url = 'https://newsapi.org/v2/top-headlines'
            const params = (new HttpParams())
                .set('country', `${country}`)
                .set('pageSize', '30')
                .set('category', 'general')
            const headers = (new HttpHeaders()).set('X-Api-Key', secret)

            const result = await this.http.get<any>(url, { params, headers }).toPromise()

			// primary keys of all the saved articles
			const saveSet = new Set()
			articles.forEach(a => {
				saveSet.add(a.publishedAt)
			})

			const timestamp = Date.now()
			const newArticles = result.articles
					// Filter all articles that are in the saveSet
					.filter(a => !saveSet.has(a['publishedAt']))
					.map(a => {
						return {
                            title: a['title'],
							publishedAt:a['publishedAt'],
							code: country,
							saved: false,
							source: a['source']['name'],
							author: a['author'],
							description: a['description'],
							url: a['url'],
							urlToImage: a['urlToImage']? a['urlToImage']: 'assets/placeholder.jpg',
							content: a['content'],
							timestamp
						} as Article
					})
			// save all new articles
			await this.db.saveArticles(newArticles.reverse())
			// combine the saved articles and the new articles
            //articles = [ ...articles, ...newArticles ]
            newArticles.map( r => {
                articles.push(r)
            })
		}

		return articles
    }
    
}