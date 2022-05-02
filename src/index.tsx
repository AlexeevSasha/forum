import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {ThemeProvider} from "styled-components";
import {theme} from "./assets/style/theme";
import App from './App';
import './assets/style/index.css';
import {Provider} from "react-redux";
import {store} from "./core/redux/store";


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['ru', 'en'],
        fallbackLng: "en",
        lng: "ru",
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

const element = document.getElementById('root')
if (element === null) throw new Error('Root container missing in index.html')

const root = createRoot(element);
const app = (
    <Provider store={store}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
    </Provider>
)
root.render(app);



