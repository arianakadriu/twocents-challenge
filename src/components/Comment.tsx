import { IComment } from "@/interfaces/comment";
import { getNetWorthTier } from "@/lib/utils";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const getPaddingLeftClass = (level: number) => {
    switch (level) {
        case 1: return "md:pl-4";
        case 2: return "md:pl-8";
        case 3: return "md:pl-12";
        case 4: return "md:pl-16";
        case 5: return "md:pl-20";
        default: return "";
    }
};

const Comment = ({ comment, level = 0 }: { comment: IComment; level?: number }) => {
    const { colorClasses, borderColor, textColor } = getNetWorthTier(comment.author_meta.balance);
    const paddingLeftClass = level > 0 ? getPaddingLeftClass(level) : "";

    return (
        <li className={`relative py-3 ${paddingLeftClass}`}>
            {level === 0 && (
                <hr className="border-t border-gray-500 mb-3 block" />
            )}

            {level > 0 && (
                <span className="absolute top-0 left-0 h-full border-l border-gray-500 md:hidden" />
            )}

            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-6 mb-4 text-sm">
                <Link
                    href={`/users/${comment.author_uuid}`}
                    className={`inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-gradient-to-r ${colorClasses} ${textColor} font-semibold ${borderColor} border-2`}
                >
                    <div
                        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs ${textColor} bg-gradient-to-r ${colorClasses} border-current`}
                    >
                        $
                    </div>
                    <span className="text-xs">{Number(comment.author_meta.balance).toLocaleString()}</span>
                </Link>

                <div className="inline-flex items-center gap-1 text-[#8a8a8f]">
                    <span className="material-symbols-outlined">arrow_upward</span>
                    <span>{comment.upvote_count}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[#8a8a8f]">
                    <span className="material-symbols-outlined text-xs">cake</span>
                    <span>{comment.author_meta.age}</span>
                </div>

                <div
                    className={`inline-flex items-center gap-1 ${comment.author_meta.gender === "F" ? "text-[#781f2f]" : "text-[#04427d]"
                        }`}
                >
                    <span className="material-symbols-outlined text-xs">person</span>
                    <span>{comment.author_meta.gender}</span>
                </div>


                <div className="inline-flex items-center gap-1 text-[#8a8a8f] italic text-xs">
                    {timeAgo(comment.created_at)}
                </div>
            </div>

            <p className="text-sm text-gray-200">{comment.text}</p>

            {comment.children && comment.children.length > 0 && (
                <ul className="mt-2 space-y-2">
                    {comment.children.map((child) => (
                        <Comment key={child.uuid} comment={child} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Comment;
