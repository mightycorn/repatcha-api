const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    fs.readFile('images/skateboard/skateboard5.jpg', async (err, data) => {

        const test = await fetch('https://cvi620computervision.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Tags&language=en&model-version=latest', {
            method: 'POST',
            headers: new Headers({
                'Ocp-Apim-Subscription-Key' : 'deb863e511b04a11b475ad9f36add7b4',
                'Content-Type' : 'application/octet-stream'
            }),
            body: data
        });
        
        return res.status(200).send(await test.json());
    })
});



app.listen(8080, () => {
    console.log('Ready to handle requests on port ' + 8080);
});