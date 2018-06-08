const jwt = require('jsonwebtoken');
const cookie = require('cookie');


exports.get = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes('token')) {
    res.render('home');
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, process.env.SECRET, (error, result) => {
      if (error) {
        res.render('home');
      } else {
        const name = result.username;
        const id = result.id;
        res.render('home', {
          name,
          id
        });
      }
    })
  }
}
