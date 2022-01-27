const AuthRepository = require('./../repository/AuthRepository');
const secret = require('./../config/auth/auth.config');

const jwt = require('jsonwebtoken');

exports.registerAccount = async (req, res, next) => {
    const added = await AuthRepository.registerAccount(req.body);
    if(!added)
        return res.status(500).json('Server Error');
    return res.status(200).json({ success: true })
}

exports.signIn = async (req, res, next) => {
    const client = await AuthRepository.signIn(req.body);
    if(!client)
        return res.status(401).json({
                    accessToken: null,
                    message: "Invalid Email or Password!"
                });
    const refreshToken = await AuthRepository.updateRefreshToken(client.id);     
    if(!refreshToken)
        return res.status(500).json({
            accessToken: null,
            message: "Server Error"
    });   
    const jwtToken = jwt.sign(
        {
            id: client.id,
            role: client.role.name,
            userName: client.firstName + ' ' + client.lastName,
        },
        secret.secret,
        {expiresIn: '1h'}
    );

    return res.status(200).json(
        {
            refreshToken: refreshToken,
            accessToken: jwtToken,
            message: "Success"
        }
    )
}

exports.updateRefreshToken = async (req, res, next) => {
    const idClient = req.idClient;
    const client = await AuthRepository.checkRefreshToken(req.body,idClient);
    if(!client)
        return res.status(401).json('Unauthorized');
    const refreshToken = await AuthRepository.updateRefreshToken(idClient);
    if(!refreshToken)
        return res.status(500).json('Server Error');

    const jwtToken = jwt.sign(
            {
                id: client.id,
                role: client.role.name,
                userName: client.firstName + ' ' + client.lastName,
            },
            secret.secret,
            {expiresIn: '1h'}
    );
    return res.status(200).json({
        refreshToken: refreshToken,
        accessToken: jwtToken
    });
}