export interface RedditPost {
    title: string;
    category: string;
    date_posted: Date;
    position: number;
    body: string;
    thumbnail: string;
    created: Date;
    num_comments: number;
    author: number;
    score: number;
}
