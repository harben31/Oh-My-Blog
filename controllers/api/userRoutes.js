const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//creates new user & start their session
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
           ...req.body
        });
        
        
        req.session.save(() => {
            req.session.user_id=userData.id;
            req.session.logged_in = true;  

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

//logs user in and starts their session
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        const checkPassword = userData.checkPassword(req.body.password);
        if(!checkPassword){
            res.status(404).json({ message: "login failed"})
        };

        req.session.save(() => {
            req.session.user_id=userData.id;
            req.session.logged_in = true; 
            req.session.email = userData.email; 

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(500).json(err)
    };
});

//logs user out and ends session
router.post('/logout', withAuth, (req, res) => {
    try {
        if(req.session.logged_in){
            req.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).json({ message: 'user not logged in' })
        }
    } catch (error) {
        res.status(500).json(err);
    };   
});

module.exports = router;