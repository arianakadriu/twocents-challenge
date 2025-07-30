import { IPost } from "@/interfaces/post";
import { getNetWorthTier } from "@/lib/utils";
import Link from "next/link";

interface PostProps {
  data: IPost;
}

const Post = ({ data }: PostProps) => {
  const { colorClasses, borderColor, textColor } = getNetWorthTier(data.author_meta.balance);

  return (
    <Link href={`/posts/${data.uuid}`}>
      <div className="w-full h-full p-6 bg-[#1c1c1e] border-[#1c1c1e] rounded-lg shadow-sm space-y-4 hover:bg-[#2c2c2e] transition-colors duration-200 cursor-pointer">
        <div
          className={`inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-gradient-to-r ${colorClasses} ${textColor} font-semibold ${borderColor} border-2`}
        >
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs ${textColor} bg-gradient-to-r ${colorClasses} border-current`}
          >
            $
          </div>
          <span className="text-xs">
            {Number(data.author_meta.balance).toLocaleString()}
          </span>
        </div>

        <h2 className="text-md text-white font-normal">{data.title}</h2>
        <div className="flex gap-x-4 text-[#8a8a8f] text-sm flex-wrap">
          <div className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">cake</span>
            <span>{data.author_meta.age}</span>
          </div>

          <div
            className={`inline-flex items-center gap-1 ${data.author_meta.gender === "F" ? "text-[#781f2f]" : "text-[#04427d]"
              }`}
          >
            <span className="material-symbols-outlined text-xs">person</span>
            <span>{data.author_meta.gender}</span>
          </div>

          <div className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">near_me</span>
            {data.author_meta.arena && data.author_meta.arena.trim() !== "," && (
              <span>{data.author_meta.arena}</span>
            )}
          </div>

          {data.post_meta?.poll && data.post_meta.poll.length > 0 && (
            <div className="inline-flex items-center gap-1 text-amber-400">
              <span className="material-symbols-outlined text-xs">poll</span>
              <span className="hidden lg:block">Poll</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Post;
