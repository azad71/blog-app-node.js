exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}

exports.postLogin = (req, res, next) => {
    res.redirect('/home');
}

exports.getLogout = (req, res, next) => {
    res.redirect('/');
} 

exports.postSignup = (req, res, next) => {
    res.redirect('/home');
}