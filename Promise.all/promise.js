const posts = [];
let lastActivityTime = null;

function createPost(title) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const post = {title: title};
            posts.push(post);
            resolve(post);
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            lastActivityTime = new Date();
            resolve(lastActivityTime);
        }, 1000);
    });
}

function deleteLastPost() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else {
                reject("ERROR: ARRAY IS EMPTY");
            }
        }, 1000);
    });
}

function printPostsAndActivityTime() {
    console.log(posts);
    console.log(lastActivityTime);
}

createPost("POST1")
.then(function(post1) {
    return Promise.all([createPost("POST2"), updateLastUserActivityTime()])
    .then(function([post2, activityTime]) {
        printPostsAndActivityTime();
        return deleteLastPost();
    })
    .then(function(deletedPost) {
        console.log("Deleted post: ", deletedPost);
        console.log("New posts: ", posts);
    })
    .catch(function(error) {
        console.log(error);
    });
})
.catch(function(error) {
    console.log(error);
});
