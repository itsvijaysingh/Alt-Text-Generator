# Alt Text Generator

Elevate your website's image accessibility, improve SEO, and enhance the overall user experience by effortlessly providing meaningful descriptions for your visuals. Alt Text Generator is an easy-to-use tool that uses artificial intelligence (AI) to automatically generate SEO-friendly alt text for images.

## ❓ How it Works

It leverages [Microsoft's Azure Computer Vision API](https://azure.microsoft.com/en-in/products/ai-services/ai-vision) to analyze and describe the content of an image, providing information about the image content and context.

## 🔧 Requirements

Before you begin, ensure you have met the following requirements:

- Node.js >= 16.14.0

## 🚀 Installation from source

Follow these steps to get the project up and running on your own machine.

1. Clone the repository:
   ```sh
   git clone https://github.com/itsvijaysingh/alt-text-generator.git
   ```
   
2. Install project dependencie using:
   ```sh
   npm install / npm i
   ```
3. Set up your environment variables:
   To configure the project, create a **.env** file in the project root and add the following variables:
   ```sh
    - PORT: Port number for the server (Default: 5500).
    - AZURE_VISION_API_KEY: Your Azure Computer Vision API key.
    - AZURE_VISION_ENDPOINT: Your Azure Computer Vision API endpoint.
    - AZURE_VISION_MODEL_VERSION: (Optional) Azure model version (Default: 2023-02-01-preview).
    - AZURE_VISION_FEATURES: (Optional) Azure features to use (Default: caption).
    - AZURE_VISION_GENDER_NEUTRAL: (Optional) Enable gender-neutral captions  (Default: true).
    ```
   
5. Run the Project
  To start the project, use npm:
    ```sh
    node app.js
    ```

- The application will be available at http://localhost:5500 (if hosting locally).

## 💯 Usage
- Upload an image using the provided interface.
- Click the "_Generate Alt Texts_" button.
- The AI will analyze the image and provide an alt text description.

## 🗒️ License
This project is licensed under the GNU General Public License (GPL-3.0). See the [LICENSE file](https://github.com/itsvijaysingh/Alt-Text-Generator/blob/main/LICENSE) for details.
