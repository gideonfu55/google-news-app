# Getting Started with Google News App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install`

Please run this command to install application dependencies first before launching the application with `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Instruction for Creating and Adding API Keys to Application

Please create your API Keys by registering your account at [News API](https://newsapi.org/register).\
Next, create a js file using the following path and filename: src/services/apis/api-keys-list.js \
\
Lastly, add your keys in the following block in this file:

```js
  export const API_KEYS = [
    '<Key1>',
    '<Key2>',
    .
    .
    .
  ];
```
