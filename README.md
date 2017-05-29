#FingerValidation  
###JQuery validation extension
####Simple form validation  
####HTML INPUT data tags
- __{prefix}type__  
  _field type_  
text - simple text item  
number - only number  
email - e-mail format
- __{prefix}required__  
field is required most be filled  
- __{prefix}message_required__  
_when the filled is empty show this message_  
- __{prefix}message_number__  
_when the field is not number show this message_
- __{prefix}message_email__  
_when the the fieldis not e-mail show this message_

Use like this:
```
jQuery(document).ready(function ($) {  
    $.fn.fingerValifator.defaults.message_type = "notify";  
    $.fn.fingerValifator.defaults.data_prefix = "f_";  
    $('#form-example-1').fingerValifator().submit(function () {
        console.log($(this).data('f_valid'));  
    });  
});  
```
see the exapmle directory
   
####Defults
- data_prefix: html data element prefix eg. finger_type  default ='finger_'  
- google_captcha_message: google captcha error message  
- message_required_default: required default message 
- message_number_default: not number error message  
- message_email_default: not email error message  
- message_type: error notification type 'notify'/'alert'  
- notify_delay: notify delay time