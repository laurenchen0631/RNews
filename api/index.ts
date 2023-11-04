import { Article, NewsCategory, NewsCountry } from "../model/article";

interface GetHeadlineParams {
    country?: NewsCountry;
    category?: NewsCategory;
    q?: string;
    pageSize?: number;
    page: number;
}

interface GetHeadlineResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}

export function toParamsString(params: Record<string,any>) {
    const keys = Object.keys(params);
    if (keys.length > 0) {
        return `?${keys.map(key => `${key}=${params[key]}`).join('&')}`
    }
    return '';
}

const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export async function getHeadlines({
    country = 'us',
    category = 'general',
    q,
    pageSize = 20,
    page,
}: GetHeadlineParams): Promise<GetHeadlineResponse> {
    const params: Record<string, any> = {};

    params['country'] = country;
    params['category'] = category;
    if (q && q.length > 0) params['q'] = q;
    params['pageSize'] = pageSize.toString();
    params['page'] = page.toString();
    params['apiKey'] = process.env.EXPO_PUBLIC_NEWS_API_KEY!;

    const res = await fetch(`${BASE_URL}${toParamsString(params)}`, { mode: 'cors' });
    const data = await res.json();
    return data;
}
