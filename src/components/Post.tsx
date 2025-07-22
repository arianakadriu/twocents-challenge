import { IPost } from "@/interfaces/post";
import { getNetWorthTier } from "@/lib/utils";
import Link from "next/link";

interface PostProps {
    data: IPost;
  }
  
  const Post = ({ data }: PostProps) => {
  const { colorClasses, borderColor } = getNetWorthTier(data.author_meta.balance);

  return (
    <Link href={`/posts/${data.uuid}`}>
      <div className="w-full h-full p-6 bg-[#1c1c1e] border-[#1c1c1e] rounded-lg shadow-sm space-y-4 hover:bg-[#2c2c2e] transition-colors duration-200 cursor-pointer">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-1 py-1 bg-gradient-to-r ${colorClasses} text-transparent bg-clip-text font-semibold ${borderColor} border-2`}
        >
          <div
            className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs text-transparent bg-clip-text bg-gradient-to-r ${colorClasses} ${borderColor}`}
          >
            $
          </div>
          <span className="text-xs">
            {Number(data.author_meta.balance).toLocaleString()}
          </span>
        </div>

        <h2 className="text-lg font-bold">{data.title}</h2>

        <div className="flex gap-x-4 text-[#8a8a8f] text-sm">
          <div className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">cake</span>
            <span>{data.author_meta.age}</span>
          </div>

          <div className="inline-flex text-[#04427d] items-center gap-1">
            <span className="material-symbols-outlined text-xs">person</span>
            <span>{data.author_meta.gender}</span>
          </div>

          <div className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">near_me</span>
            <span>{data.author_meta.arena}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
