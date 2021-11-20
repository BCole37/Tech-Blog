const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//miniproject
router.get("/", async (req, res) => {
    try {
        // gets all posts
        const postData = await Post.findAll({
            include: [{ model: User }],
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//miniproject
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // gets all users posts
        const postData = await Post.findAll({
            include: [{ model: User }],
            where: {
                user_id: req.session.user_id,
            },
            order: [["date_created", "DESC"]],
        });

        const posts = postData.map((user) => user.get({ plain: true }));
       
        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        // find post by the id
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        // takes to edit page
        res.render("edit", {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// creates a post
router.get("/create", withAuth, async (req, res) => {
    res.render("create");
});


//miniproject
router.get("/login", (req, res) => {
      // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
      // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

module.exports = router;