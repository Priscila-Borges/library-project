function isLoggedIn(req, res, next){
    if(req.session.userDetails){
        next();
    } else {
        res.redirect("/login")
    }
}


module.exports = isLoggedIn;