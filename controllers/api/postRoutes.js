const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
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

router.post('/comments', async (req, res) => {
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

module.exports = router;