const router = require('express').Router();
const { User } = require('../../models');
router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const userData = await User.findOne({
        where: { user_name: req.body.username },
      });
      const validPassword = await userData.checkPassword(req.body.password);
      
      if (!userData) {
        res
          .status(400)
          .json({
            message: "Invalid username or password. Please try again.",
          });
        return;
      }
     
      if (!validPassword) {
        res
          .status(400)
          .json({
            message:
              "Invalid email address or password. Please try again.",
          });
        return;
      }
      
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({
          user: userData,
          message: "You have successfully logged in.",
        });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.post("/logout", (req, res) => {
    req.session.logged_in
      ? req.session.destroy(() => res.status(204).end())
      : res.status(404).end();
  });
  
  module.exports = router;
module.exports = router;
