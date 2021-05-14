const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['name', 'id'],
            },
            {
                model: Comment,
                attributes: ['comment_main_text', 'createdAt']
            },
        ],
    });
    
    const post = postData.map((post) => post.get({ plain:true }));

    res.render('homepage', {
        post,
        logged_in: req.session.logged_in,
        isDash: false
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
                {
                    model: Comment,
                    attributes: ['comment_main_text', 'createdAt']
                },
            ],
        });

        const post = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            post,
            logged_in: req.session.logged_in,
            isDash: true,
        })

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;