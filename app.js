const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.use(express.json());

app.post('/', async (req, res) => {
    let results = [];
    
    for (let i = 0; i < 3; ++i) {
        const test = fs.readFileSync(`images/${req.body.images[i]}`);

        const result = await fetch('https://cvi620computervision.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Tags&language=en&model-version=latest', {
            method: 'POST',
            headers: new Headers({
                'Ocp-Apim-Subscription-Key' : 'deb863e511b04a11b475ad9f36add7b4',
                'Content-Type' : 'application/octet-stream'
            }),
            body: test
        });

        results[i] = await result.json();
    }

    let checker = [ true, true, true ];

    for (let i = 0; i < 3; ++i) {
        results[i].tags.forEach((tag) => {
            if (tag.name.includes(req.body.thing) && tag.confidence > 0.70) {
                checker[i] = false;
            }
        })
    }

    return res.status(200).json({ robot : checker.includes(true) ? true : false });
});

app.listen(8080, () => {
    console.log('Ready to check for robots on port ' + 8080);
});