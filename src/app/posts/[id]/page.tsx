import BackButton from "@/components/BackButton";
import { getNetWorthTier, timeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { fetchPost, fetchComments, fetchPolls } from "@/services/posts";
import { IComment } from "@/interfaces/comment";
import Comment from "@/components/Comment";
import PollResult from "@/components/PollResult";

function nestComments(comments: IComment[], parentId: string): IComment[] {
  return comments
    .filter((c) => c.reply_parent_uuid === parentId)
    .map((c) => ({
      ...c,
      children: nestComments(comments, c.uuid),
    }));
}

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let post, flatComments, pollResults;

  try {
    post = await fetchPost(id);
    flatComments = await fetchComments(id);
    pollResults = await fetchPolls(id);
  } catch {
    return notFound();
  }

  const nestedComments = nestComments(flatComments, post.uuid);
  const { colorClasses, borderColor, textColor } = getNetWorthTier(post.author_meta.balance);

  return (
    <div className="px-6 md:px-12 py-10 min-h-screen text-white space-y-6 bg-[#1c1c1e]">
      <BackButton />
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div
          className={`inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-gradient-to-r ${colorClasses} ${textColor} font-semibold ${borderColor} border-2`}
        >
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs ${textColor} bg-gradient-to-r ${colorClasses} border-current`}
          >
            $
          </div>
          <span className="text-xs">{Number(post.author_meta.balance).toLocaleString()}</span>
        </div>
      </div>

      <p className="text-gray-300">{post.text}</p>

      {post.post_meta?.poll && pollResults && (
        <PollResult
          options={post.post_meta.poll}
          results={pollResults}
        />
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#8a8a8f]">
        <div className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined">cake</span>
          <span>{post.author_meta.age}</span>
        </div>
        <div
          className={`inline-flex items-center gap-1 ${post.author_meta.gender === "F" ? "text-[#781f2f]" : "text-[#04427d]"
            }`}
        >
          <span className="material-symbols-outlined text-xs">person</span>
          <span>{post.author_meta.gender}</span>
        </div>

        <div className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined">near_me</span>
          {post.author_meta.arena && post.author_meta.arena.trim() !== "," && (
            <span>{post.author_meta.arena}</span>
          )}
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined">pace</span>
          <span>{timeAgo(post.created_at)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#8a8a8f]">
        <div className="inline-flex items-center gap-1 text-[#daaa7f]">
          <span className="material-symbols-outlined">arrow_upward</span>
          <span>{post.upvote_count}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined">chat</span>
          <span>{post.comment_count}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined">visibility</span>
          <span>{post.view_count}</span>
        </div>
        <div className="inline-flex items-center gap-1 underline text-amber-500/80 text-xs">
          <span>{post.topic}</span>
        </div>
      </div>

      <div>
        {nestedComments.length > 0 ? (
          <ul className="space-y-4">
            {nestedComments.map((comment) => (
              <Comment key={comment.uuid} comment={comment} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No replies yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;