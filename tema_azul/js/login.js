/** 
 * Inspired by New Material Text-Fields from Srikant Shetty
 * https://dribbble.com/shots/2197140-New-Material-Text-Fields
 */

// Cache elements
const loginElement = document.getElementById('login');
const loginFormElement = document.getElementById('login-form');
const usernameInputElement = document.getElementById('username');
const passwordInputElement = document.getElementById('password');
const statusElement = document.getElementById('status');

// Adds a class to the input field so that we know it's "dirty" or
// has been interacted with
function inputEventHandler(event) {
  event.target.classList.add('is-Login-input-dirty');
}

// Fires off inputEventHandler when either email or password field
// come in focus
usernameInputElement.addEventListener('focus', inputEventHandler);
passwordInputElement.addEventListener('focus', inputEventHandler);

// Handles submitting
loginFormElement.addEventListener('submit', event => {
  event.preventDefault();

  var myForm = document.getElementById('login-form');
  var fd = new FormData(myForm);
  console.log(fd);

  jQuery.ajax({

    url : 'http://localhost:8080/oauth',
    type : 'POST',
    contentType : false,
    data : fd,
    processData : false,
    error : function(data) {
      jQuery('div.console').html(JSON.stringify(data));
    },
    success : function(data) {
      loginElement.classList.add('is-Login-success');
      // Adds aria-hidden="true" attribute to tell the screen reader
      // not to allow focus or read anything in the form whilst
      // the form is covered and showing the ticket
      loginFormElement.setAttribute('aria-hidden', 'true');
      // For accessbility purposes, inform the screenreader
      // that login is successful
      statusElement.innerHTML = "Login success!";

      // Reset the form for the purpose of this demo
      window.setTimeout(() => {
        loginElement.classList.remove('is-Login-success');
        loginFormElement.setAttribute('aria-hidden', 'false');
        usernameInputElement.classList.remove('is-Login-input-dirty');
        passwordInputElement.classList.remove('is-Login-input-dirty');
        usernameInputElement.value = '';
        passwordInputElement.value = '';
        statusElement.innerHTML = '';
      }, 3000);
    }
  });


});