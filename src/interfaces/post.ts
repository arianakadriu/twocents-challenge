export interface IAuthorMeta {
    bio?: string;
    age: number;
    gender: string;
    balance: number;
    arena?: string;
    subscription_type: number;
  }
  
  export interface IPost {
    uuid: string;
    created_at: string; 
    updated_at: string;
    author_uuid: string;
    upvote_count: number;
    comment_count: number;
    view_count: number;
    report_count: number;
    title: string;
    text: string;
    topic: string;
    author_meta: IAuthorMeta;
    post_meta: Record<string, unknown>;
    post_type: number;
  }
  