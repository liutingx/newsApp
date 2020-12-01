export const NEWS_API = 'newsapi.org'

export const countries =
    'ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za';
  
export interface ApiKey{
    id: string,
    secret: string
}

export interface CountryList{
    country: string,
    code: string,
    flag: string
}

export interface Article{
    source: string,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
    saved: boolean,
    timestamp: number
}