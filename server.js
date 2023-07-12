const express = require('express');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/schedule', (req, res) => {
    const launchSaasData = require('./public/data/launch-saas.json');
    res.send(launchSaasData);
});

app.get('/unplanned', (req, res) => {
    const unplannedData = require('./public/data/unplanned.json');
    res.send(unplannedData);
});

app.listen(port, () => {
    console.log(`Server started at: ${port}`);
});
