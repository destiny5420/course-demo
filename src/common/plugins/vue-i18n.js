import Vue from 'vue';
import VueI18n from 'vue-i18n';
import TW from '@/common/lang/config/tw';
import EN from '@/common/lang/config/en';

Vue.use(VueI18n);
let messages = {};
messages = { ...messages, TW, EN };

console.warn('messages: ', messages);
const lang = localStorage.getItem('language') || 'TW';

const i18n = new VueI18n({
  locale: lang,
  messages: messages,
});

export default i18n;
