const Post = require('../models/post');

exports.getCreatePost = (req, res, next) => {
    const post = {
        title: '',
        author: '',
        category: '',
        description: '',
    };
    res.render('post/create_post', {
        post: post,
        update: false,
        title: "Add New Post",
    });
};

exports.postCreatePost = async (req, res, next) => {

    try {
        // create an instance of Post collection
        const new_post =  new Post({
            title: req.body.title,
            category: req.body.category,
            author: req.body.author,
            description: req.body.description,
        });
    
        await new_post.save();
        res.redirect("/home");
    } catch(error) {
        console.log(error);
    }
};

exports.getPost = async(req, res, next) => {

    try {
        const post_id = req.params.post_id;
        const post = await Post.findById(post_id);
        res.render('post/post', {post: post})
    } catch (error) {
        console.log(error);
    }

};

exports.getUpdatePost = async(req, res, next) => {

    try {
        const post_id = req.params.post_id;
        const post = await Post.findById(post_id);
        res.render('post/create_post', {
            post: post,
            update: true,
            title: `Update ${post.title}`,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postUpdatePost = async(req, res, next) => {
    try {
        const update_info = {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
             description: req.body.description,
        };
        const post_id = req.params.post_id;

        await Post.findByIdAndUpdate(post_id, update_info);
        res.redirect("/home");
    } catch(error) {
        console.log(error);
    }
}

exports.postDeletePost = async(req, res, next) => {
    try {
        const post_id = req.params.post_id;
        await Post.findByIdAndDelete(post_id);
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}