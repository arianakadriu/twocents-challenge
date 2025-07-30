import Post from "@/components/Post";
import { notFound } from "next/navigation";
import { fetchUserPosts } from "@/services/posts";
import { IPost } from "@/interfaces/post";
import { getNetWorthTier } from "@/lib/utils";
import BackButton from "@/components/BackButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

const UserPostsPage = async ({ params }: PageProps) => {
    const { id: userUuid } = await params;

    let posts: IPost[] = [];
    try {
        posts = await fetchUserPosts(userUuid);
    } catch (error) {
        return notFound();
    }

    if (!posts.length) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-amber-500/80 text-xl">No posts found for this user.</p>
            </div>
        );
    }

    const balance = posts[0].author_meta?.balance || 0;
    const { colorClasses, borderColor, textColor } = getNetWorthTier(balance);

    return (
        <div className="px-6 md:px-12 py-10">
            <BackButton />
            <h1 className={`font-bold mb-8 flex items-center gap-4`}>
                <span className="text-xl md:text-2xl text-amber-500">Posts by </span>
                <span
                    className={`inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-gradient-to-r ${colorClasses} ${textColor} font-semibold ${borderColor} border-2`}
                >
                    <div
                        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs ${textColor} bg-gradient-to-r ${colorClasses} border-current`}
                    >
                        $
                    </div>
                    <span>{Number(balance).toLocaleString()}</span>
                </span>
            </h1>

            <div className="text-amber-500/80 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Post key={post.uuid} data={post} />
                ))}
            </div>
        </div>
    );
};

export default UserPostsPage;
