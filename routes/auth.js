const router = require("express").Router();
const httpRequest = require("request");
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.redirect(
    "https://api.instagram.com/oauth/authorize/?client_id=2690149747939469&redirect_uri=https://about.instagram.com/&scope=user_profile&response_type=code"
  );
});
router.post("/callback", (req, res) => {
  httpRequest(
    {
      url: "https://api.instagram.com/oauth/access_token",
      method: "POST",
      form: {
        client_id: "2690149747939469",
        client_secret: "41cb929c262b7872f58f2b17368e84cd",
        grant_type: "authorization_code",
        redirect_uri: "https://about.instagram.com/",
        code: req.query.code,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const { access_token, user_id } = JSON.parse(body);
        fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`)
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch(() => console.error('error'))
      }
    }
  );
  res.end();
});

module.exports = router;
