import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languagedetector from 'i18next-browser-languagedetector';
import HttpApi from "i18next-http-backend";

import App from './App';
import {Provider} from 'react-redux';
import store from "./reducFeatures/store";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languagedetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'pt', 'ar'],
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator',
        'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

  const loadingMarkup = (
    <div className='py-4 text-center'>
      <h2>Loading ...</h2>

    </div>
  )
  ReactDOM.render(
    <Suspense fallback={loadingMarkup}>
      <React.StrictMode>

      <Provider store={store}>
        <App />
        </Provider>,

      </React.StrictMode>
    </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
