import { createI18n } from "vue-i18n";
import langEn from "./en";
// import langTw from './tw';
import langAr from "./ar";
import langAz from "./az";

import langRu from "./ru";
import langDe from "./de";

import langEs from "./es";
import langFa from "./fa";

import langFr from "./fr";

const messages = {
  // 'tw': langTw,
  en: langEn,
  ar: langAr,
  az: langAz,
  ru: langRu,
  fa: langFa,
  es: langEs,
  de: langDe,
  fr: langFr,
};

let cur_lang = uni.getStorageSync("lang");

if (cur_lang == "ar") {
  let eles = document.querySelector("html");
  document.querySelector("html").setAttribute("dir", "rtl");
}

const i18n = createI18n({
  globalInjection: true, //全局$t 生效
  locale: uni.getStorageSync("lang") || "en",
  messages,
  legacy: false,
});

export default i18n;
