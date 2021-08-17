const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, async (req, res) => {
    try {
      if (!req.session.logged_in){
        
      }
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
router.get('/dashboard', withAuth, async (req, res) => {
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