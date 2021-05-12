const router = require('express').Router();
const { User } = require('../../models');


    //creates new user
router.post('/', async (req, res) => {
    // console.log('before try ', req.body)
    try {
        const userData = await User.create({email: req.body.email, password: req.body.password, name: req.body.name});
        
        
        req.session.save(() => {
            //creating the 'user_id' & 'logged_in' on the user obj?
            req.session.user_id=userData.id;
            req.session.logged_in = true;  

            res.status(200).json(userData);
        });
    } catch (err) {
        // console.log("catch", err);
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    // console.log(req.body)
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

            // console.log('success');
            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/logout', (req, res) => {
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