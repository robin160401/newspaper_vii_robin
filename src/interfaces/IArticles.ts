export interface IArticles {
    status: string;
    totalResults: number;
    articles: IArticle[];
  }
  
export type IArticle = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
  

  