const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({})
//     } catch (err) {
        
//     }
// })

router.post('/', async (req, res) => {
    console.log('!!!!!!', req.body);
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        console.log('!!!!!!!!!', newPost);
        res.status(200).json(newPost);
    } catch (err) {
        console.log('!!!!!!', err, '!!!!!!');
        res.status(500).json(err)
    };
});

module.exports = router;