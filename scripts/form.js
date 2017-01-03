jQuery(document).ready(function($) {
"use strict";

// Contact Form
var request;

$('form').submit(function(event) {

  $('input[name="name"], input[name="email"], textarea').removeClass('error');

  if ($('input[name="name"]').val() == '') {
    $('p.error').addClass('active').html('Please enter your name.');
    $('input[name="name"]').focus();
    return false;
  }

  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  if ($('input[name="email"]').val() == '') {
    $('p.error').addClass('active').html('Please enter your email.');
    $('input[name="email"]').focus();
    return false;
  }

  if(!IsEmail($("input[name='email']").val())) {
    $('p.error').addClass('active').html('Looks like that email address is not correct. Try again.');
    $('input[name="email"]').focus();
    return false;
  }

  if ($("textarea").val() == "") {
    $('p.error').addClass('active').html('Please enter your message.');
    $('textarea').focus();
    return false;
  }

  if (request) {
    request.abort();
  }

  var $form = $(this);
  var $inputs = $form.find('input, button, textarea');
  var serializedData = $form.serialize();

  $inputs.prop('disabled', true);

  request = $.ajax({
    url: 'contact.php',
    // url: 'trista_mccleary@yahoo.com',
    type: 'post',
    data: serializedData
  });

  request.done(function (response, textStatus, jqXHR){
    $('p.error').hide();
    $('p.message').html('Contact Form Submitted! I will be in touch soon.').fadeOut(2000);
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    console.error(
      'The following error occured: '+
      textStatus, errorThrown
    );
  });

  request.always(function () {
    $inputs.prop('disabled', false);
  });

  event.preventDefault();

});

});
