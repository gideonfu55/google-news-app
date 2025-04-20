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

## Steps for Creating and Adding API Keys to this App

Please create/register your account and API Keys at [News API](https://newsapi.org/register).\
Next, create a js file using the following path and filename: src/services/apis/api-keys-list.js \
\
Lastly, add your keys using following code block in the api-keys-list.js file, where <Key1>, <Key2> and so on are the api keys you have registered on News API:

```js
  export const API_KEYS = [
    '<Key1>',
    '<Key2>',
    .
    .
    .
  ];
```
