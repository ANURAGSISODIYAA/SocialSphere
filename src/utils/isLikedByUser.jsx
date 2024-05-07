export const isLikedByReqUser = (reqUserId, post) => {
    if (post && post.like && Array.isArray(post.like)) {
        for (let user of post.like) {
            if (reqUserId === user.id) {
                return true;
            }
        }
    }
    return false;
};
