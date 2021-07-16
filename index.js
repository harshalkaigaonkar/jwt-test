const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const app = express();
const secret = 'Any thing giberish...'
let jwtoken = undefined;
const payload = {
    user: {
        id: uuid.v4(),
    },
};
//creation of JWT 

app.get('/creation', (req, res) => {
    jwt.sign(
        payload,
        secret,
        {
            expiresIn: '1d',
        },
        (err, token) => {
            if (err) throw err;
            jwtoken = token;
            console.log(token);
            res.json({ token });
        }
    );
})

app.get('/verification', (req, res) => {
    const tokenInfo = jwt.verify(
        jwtoken,
        secret,
    );
    if (payload.user.id === tokenInfo.user.id) {
        console.log('Verified User.');
        res.send('<h1>Verified</h1>');
    } else {
        console.log('Something is wrong.');
        res.send('<h1>Something is wrong</h1>');
    }
})





const PORT = 3000;

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`))