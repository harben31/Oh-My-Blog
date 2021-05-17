const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

//gets all posts by all users and passes the data to the homepage handlebar file
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['name', 'id'],
            },
            {
                model: Comment,
                attributes: ['comment_main_text', 'createdAt'],
            },
        ]
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

//finds only users posts and passes the  data to the dashboard handlebar
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['createdAt', 'DESC']],
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
                    attributes: ['comment_main_text', 'createdAt'],
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

//redirects user from url/login to home page w/ and telling the handlebars the user needs to log in
router.get('/login', async (req, res) => {
    try {
        res.render('homepage', {
            needLogIn: true
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;