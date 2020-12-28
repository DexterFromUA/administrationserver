const router = require("express").Router();
const httpRequest = require("request");
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.redirect(
    "https://api.instagram.com/oauth/authorize/?client_id=2690149747939469&redirect_uri=https://about.instagram.com/&scope=user_profile,user_media&response_type=code"
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
        // fetch(
        //   `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
        // )
        //   .then((fetchRes) => fetchRes.json())
        //   .then((fetchRes) => {
        //     fetchRes.access_token = access_token;
        //     console.log("INSTA RES: ", fetchRes);
        //     res.send(fetchRes);
        //     return fetchRes;
        //   })
        //   .catch(() => console.error("error"));

        // const username = await fetch(
        //   `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
        // );
        // const result = JSON.parse(username);
        console.log("Token:", access_token);
        console.log("ID:", user_id);
        res.status(200).send({ access_token: access_token, id: user_id });
      }
    }
  );
});

module.exports = router;
