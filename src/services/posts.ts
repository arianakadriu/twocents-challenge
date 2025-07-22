const BASE_API_URL = "https://api.twocents.money/prod";

export async function fetchTopPosts() {
    const body = {
        jsonrpc: "2.0",
        id: "anon",
        method: "/v1/posts/arena",
        params: { filter: "topAllTime" },
    };

    try {
        const res = await fetch(BASE_API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.result?.posts || [];
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch posts");
    }
}

export async function fetchPost(postUuid: string) {
    const body = {
        jsonrpc: "2.0",
        id: "anon",
        method: "/v1/posts/get",
        params: { post_uuid: postUuid },
    };

    const res = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await res.json();

    if (data.error || !data.result?.post) {
        throw new Error(data.error?.message || "Failed to fetch post");
    }

    return data.result.post;
}

export async function fetchComments(postUuid: string) {
    const body = {
        jsonrpc: "2.0",
        id: "anon",
        method: "/v1/comments/get",
        params: { post_uuid: postUuid },
    };

    const res = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await res.json();

    if (data.error) {
        throw new Error(data.error.message || "Failed to fetch comments");
    }

    return data.result?.comments || [];
}



export async function fetchUserPosts(userUuid: string) {

    const body = {
        jsonrpc: "2.0",
        id: "anon",
        method: "/v1/users/get",
        params: { user_uuid: userUuid },
    };

    const res = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await res.json();

    if (data.error) {
        throw new Error(data.error.message || "Failed to fetch user posts");
    }

    return data.result?.recentPosts || [];
}
