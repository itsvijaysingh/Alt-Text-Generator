const express = require('express');
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');

// Secrets
const port = process.env.PORT || 5500;
const azureApiKey = process.env.AZURE_VISION_API_KEY;
const azureEndpoint = process.env.AZURE_VISION_ENDPOINT;
const apiVersion = process.env.AZURE_VISION_MODEL_VERSION || "2023-02-01-preview";
const features = process.env.AZURE_VISION_FEATURES || "caption";
const isGenderNeutral = process.env.AZURE_VISION_GENDER_NEUTRAL || true;

const app = express();

app.use(express.static('public'));
app.use(express.static('assets'));
app.use(fileUpload());

app.post('/api', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ altText: 'Invalid file.' });
    }

    const endPoint = `${azureEndpoint}computervision/imageanalysis:analyze?api-version=${apiVersion}&features=${features}&gender-neutral-caption=${isGenderNeutral}`;
    const image = req.files.image.data;

    const azureRes = await fetch(endPoint, {
      method: 'POST',
      body: image,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': azureApiKey,
      },
    });

    if (azureRes.status !== 200) {
      return res.status(400).json({ altText: 'Alt text not found.' });
    }

    const azureResBody = await azureRes.json();

    if (azureResBody.captionResult) {
      res.status(200).json({ altText: azureResBody.captionResult.text });
    } else {
      res.status(400).json({ altText: 'Alt text not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ altText: 'Error generating alt text.' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
