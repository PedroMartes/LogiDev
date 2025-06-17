const jwt = require('jsonwebtoken');

// Middleware -> Autenticação
function authenticate(req, res, next) {
    // Capturando token da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            msg: "Token not provided"
        });
    }

    const [bearer, token] = authHeader.split(" ");

    try {
        req.user = jwt.verify(token, "V2luZ2hzbG9tcHNvbiBvIG1haW9yIGRvIEJyYXNpbCBFIGRlIEN1YmE=");
        //caso o token seja valido
        return next(); // prosseguir | siga com a req
    } catch (error) {
        // token invalido ou mal formatado
        return res.status(401).json({
            msg: "Invalid or expired token."
        })
    }
}

module.exports = authenticate;