import {
  person,
  newsletter,
  social,
  home,
  about,
  blog,
  work,
  gallery,
} from "./content";
import { createI18nContent } from "./content-i18n";
import { i18n } from "./config";

const renderContent = (t) => {
  return {
    person,
    social,
    newsletter,
    home,
    about,
    blog,
    work,
    gallery,
  };
};

export { renderContent };
