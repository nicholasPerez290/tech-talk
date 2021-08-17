const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const Auth = require('../utils/auth');
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
          include: [
            {
              model: User,
              attributes: ['user_name'],
            },
            {
              model: Comment,
              attributes: ['comment_body', 'user_id'],
              include: [User]
            }
          ],
        });
    
        const blogs = blogData.map((story) => story.get({ plain: true }));
        // Pass serialized data and session flag into template
        
    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in
    });
}
catch (err){
    res.status(500).json(err);
}
})
router.get('/login', (req, res) => {
    res.render('login')
});
router.get('/signup', (req, res) => {
    res.render('signup')
})
router.get('/newpost', (req, res) => {
  res.render('newPost')
})
router.get('/dashboard', async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Blog }],
  });
  const user = userData.get({ plain: true });
  // data and session flag to template
  console.log(user)
  res.render('dashboard', {
    ...user,
    logged_in: req.session.logged_in
  });
})
module.exports = router;