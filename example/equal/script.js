jQuery(document).ready(function ($) {
    $.fn.fingerValidator.defaults.message_type = "notify";
    $.fn.fingerValidator.defaults.data_prefix = "f_";
    $('#form-example-1').fingerValidator().submit(function () {
        console.log($(this).data('f_valid'));
    });
});