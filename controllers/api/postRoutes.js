const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err)
    };
});

//updates users post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
            ...req.body
            },
            {
                where: {
                id: req.params.id
                }
            });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create comment
router.post('/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }   
});

//delete users post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!postData){
            res.status(404).json({ message: 'post not found'})
        };

        res.status(200).end();
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;