import { IAuthorMeta } from "./post";

export interface IComment {
    uuid: string;
    reply_parent_uuid: string;
    text: string;
    upvote_count: number;
    author_uuid: string;
    author_meta: IAuthorMeta;
    created_at: string;
    children?: IComment[];
  }