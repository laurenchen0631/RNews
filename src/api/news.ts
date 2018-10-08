import { newsApiKey } from './keys';

export type NewsCountry =
'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' | 'cn' | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr' |
'hk' | 'hu' | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' | 'lt' | 'lv' | 'ma' | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' |
'ph' | 'pl' | 'pt' | 'ro' | 'rs' | 'ru' | 'sa' | 'se' | 'sg' | 'si' | 'sk' | 'th' | 'tr' | 'tw' | 'ua' | 'us' | 've' | 'za'

export type NewsCategory = 
    | 'general'
    | 'business'
    | 'entertainment'
    | 'health'
    | 'science'
    | 'sports'
    | 'technology'

export interface Article {
    source: {
        id: string | null;
        name: string;
    },
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;  // xxxxxxxx... [+n chars]
}

interface ApiTopHeadlinesResponse {
    totalResults: number;
    articles: Article[];
}

enum NewsApi {
    headlines = 'https://newsapi.org/v2/top-headlines',
}



export function fetchTopHeadlines(category: NewsCategory, country: NewsCountry = 'tw'): Promise<ApiTopHeadlinesResponse> {
    let params = `category=${category}&apiKey=${newsApiKey}`;
    if (country) {
        params += `&country=${country}`;
    }
    return fetch(`${NewsApi.headlines}?${params}`)
        .then((response) => {
            return response.json();
        });
}