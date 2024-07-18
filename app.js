$(document).ready(function() {
   $('.header__burger').click(function() {
      $('.header__burger, .header__menu').toggleClass('active');
      $('body').toggleClass('lock');
   });

   const userLang = navigator.language || navigator.userLanguage;
   let lang = localStorage.getItem('lang') || (userLang.startsWith('ru') ? 'ru' : 'fi');

   function loadTranslations() {
   fetch(`${lang}.json`)
      .then(response => response.json())
      .then(translations => {
         document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[key]) {
               element.innerHTML = translations[key];
            }
         });
      });
}

   loadTranslations();

   $('#lang-switch').click(function() {
      lang = lang === 'ru' ? 'fi' : 'ru';
      localStorage.setItem('lang', lang);
      loadTranslations();
   });
});