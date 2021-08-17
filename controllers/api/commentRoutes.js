const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// route to post new comment to the databse with appropriate foreign keys
router.post('/', withAuth, async (req, res) => {
    
  try {
      console.log(res.body)
    
    const newComment = await Comment.create({
        comment_body: req.body.comment_id,
        blog_id: blog,
        user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// export for index
module.exports = router;