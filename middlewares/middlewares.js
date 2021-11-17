module.exports = {
    sessionControl(req, res, next) {
        authorizatedPaths = ['/', '/login']
        if ( authorizatedPaths.includes(req.path) ) return next()
        if ((req.url).split('/')[1] == 'recuperarSenha') return next()

        if (req.session.login) {
            console.log(req.session.login)
            return next()
        }
        return res.redirect('/')
    },
    logRegister(req, res, next) {
        console.log(req.url + ' ' + req.method + ' ' + new Date())
        next();
    },
}