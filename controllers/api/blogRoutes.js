const router = require('express').Router();
const { Blog } = require('../../models');
const Auth = require('../../utils/auth');


router.post('/', Auth, async (req, res) => {

  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;