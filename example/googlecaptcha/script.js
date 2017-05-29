jQuery(document).ready(function ($) {
    $.fn.fingerValifator.defaults.message_type = "notify";
    $.fn.fingerValifator.defaults.data_prefix = "f_";
    $('#form-example-1').fingerValifator().submit(function () {
        alert('Validation result:' + $(this).data('f_valid'));
    });
});