const User = require('../../models/User');

const router = require('express').Router();


    //creates new user
    router.post('/', async (req, res) => {
        try {
            const userData = await User.create(req.body);

            req.session.save(() => {
                //creating the 'user_id' & 'logged_in' on the user obj?
                req.session.user_id=userData.id;
                req.session.logged_in = true;

                res.status(200).json(userData);
            })
        } catch (err) {
            res.status(500).json(err);
        };
    });

module.exports = router;