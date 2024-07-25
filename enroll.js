"use strict"

$(document).ready(function() {
   $.getScript('./app.js')
})

const lang = localStorage.getItem('lang') || 'ru'


document.addEventListener('DOMContentLoaded', function() {
   const form = document.getElementById('form')
   const wrapper = document.getElementById('wrapper')
   form.addEventListener('submit', formSend)

   async function formSend(e) {
      e.preventDefault()
   
      let error = formValidate(form)
      let payload = new FormData(form)

      if (error === 0) {
         form.classList.add('_sending')
         wrapper.classList.add('_sending')
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: payload,
         })
         if (response.ok) {
            let result = await response.json()
            alert(result.message)
            form.reset()
            form.classList.remove('_sending')
            wrapper.classList.remove('_sending')
         } else {
            console.log(response.status)
            console.log(error)
            alert('An error has occurred')
            form.classList.remove('_sending')
            wrapper.classList.remove('_sending')
         }
      } else {
         if(lang === 'ru') {
            alert('Пожалуйста убедитесь, что заполнены все обязательные поля и Вы дали согласие на обработку персональных данных')
         }  else if(lang === 'fi') {
            alert('Tarkista, että kaikki pakolliset kentät on täytetty ja ettei ole hyväksynyt yksityiskohtaiseen tietojen käsittelyyn')
         }
      }
   }
   
   function formValidate(form) {
      let error = 0
      let formReq = document.querySelectorAll('._req')

      for(let index = 0; index < formReq.length; index++) {
         const input = formReq[index]
         formRemoveError(input)

         if(input.classList.contains('_email')) {
            if(emailTest(input)) {
               formAddError(input)
               error++
            }
         } else if(input.classList.contains('_name') || input.classList.contains('_surename')) {
            if(nameTest(input)) {
               formAddError(input)
               error++
            }
         } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input)
            error++
         } else {
            if(input.value === '') {
               formAddError(input)
               error++
            }
         }
      }
      return error
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
   }

   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
   }
   function nameTest(input) {
      return !/^[A-Za-z\s-]+$/.test(input.value)
   }
})