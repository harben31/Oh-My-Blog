const router = require('express').Router();
const { load } = require('dotenv');
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create post
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
    console.log(req.body);
    try {
        console.log('look it works');
        console.log(req.session.user_id);
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }   
});

router.delete('/:id', async (req, res) => {
    // console.log(req.params.id, '!!!!!!!!!!del orute');
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!postData){
            res.status(404).json({ message: 'by some weird error we cannot find this post'})
        };

        res.status(200).end();
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;