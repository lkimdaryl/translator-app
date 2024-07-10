# Translator App

## Overview
The Translator App is a mobile application built with React Native and TypeScript, designed to translate text between different languages. It provides a variety of input methods, including speech-to-text and keyboard input, and displays translations on the device screen using text-to-speech.

![]("./assets/HelloWorld.mp4")

## Features
- **Input Methods**: Allows users to input text via speech-to-text or keyboard.
- **Output Display**: Displays translations directly on the device screen.
- **Text-to-Speech Output**: Provides translations in another language through audio playback.
- **Language Selection**: Supports selection of both input and output languages from a list of available options.


## Technologies Used
- React Native: Framework for building native mobile applications using JavaScript and React.
- TypeScript: Typed superset of JavaScript that enhances code quality and developer productivity.
- Expo: Toolchain built around React Native to streamline development and deployment.

## Challenges and Solutions
During the development of the Translator App, several challenges were encountered and addressed as follows:

- Managing Environment Variables: Ensuring that environment variables are securely and correctly set up using react-native-dotenv.

> Solution:     
Read through the official documentation of react-native-dotenv to understand the proper setup and usage. Implemented best practices for managing environment variables.

- Integration with Expo: Dealing with the complexities of using Expo for development, especially when requiring features like speech-to-text and text-to-speech.

> Solution:     
Consulted Expo's comprehensive documentation and community forums to understand how to integrate and configure these features. Utilized example projects and code snippets provided in the documentation.

## Installation
To run the Translator App locally on your machine:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd translator-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:        
Create a .env file in the root directory with the following variables:      
    ```bash
    OPEN_AI_API_KEY=<your_openai_api_key>
    OPEN_AI_API_ENDPOINT='https://api.openai.com/v1/chat/completions'
    ORGANIZATION_ID=<your_organization_id>
    PROJECT_ID=<your_project_id>
    ```
This requires you to [open an account with open ai](https://platform.openai.com/docs/overview) and create a secret key under the [API keys](https://platform.openai.com/api-keys) tab.   
Organization IDs can be found on your [Organization settings](https://platform.openai.com/settings/organization/general) page. Project IDs can be found on your General settings page by selecting the specific project.

4. Start the application    
    ```bash
    npx expo start
    ```
    or, if you are behind a firewall or experiencing network issues:    
    ```bash
    npx expo start --tunnel
    ```
This will start the Expo development server.

5. Use Expo Go or an emulator to view the app on your mobile device.

### API Integration
The app integrates with a translation API to perform language translations. Replace the placeholder values in the .env file with your actual API details.

