$.fn.fingerValidator = function (options) {
    var settings = $.extend({}, $.fn.fingerValidator.defaults, options);

    /**
     * Check item is undefined
     * @param item
     * @returns {boolean}
     * @private
     */
    function _isset(item) {
        var _return = true;
        if (item === undefined) {
            _return = false;
        }
        return _return;
    }

    /**
     * Message Notify
     * using Bootstrap Notify JQuery extension
     * http://bootstrap-notify.remabledesigns.com/
     * @param string message
     * @private
     */
    function _showMessageNotify(message) {
        $.fn.fingerValidator.notify(message, settings.notify_delay);
    }

    /**
     * Message standard alert
     * @param string message
     * @private
     */
    function _showMessageAlert(message) {
        alert(message);
    }

    /**
     * Show error message
     * @param DOM Element item
     * @param string error_type from item data tag
     * @param string default_error_message from options
     * @private
     */
    function _showError(item, error_type, default_error_message) {
        var _message = item.data(error_type);
        //Check data propert
        if (!_isset(_message)) {
            _label = $('label[for=' + item.attr('id') + ']');
            //check label for item
            if (!_isset(_label)) {
                // nothing found set default
                _message = item.attr('name') + ' ' + default_error_message; //settings.message_default;
            } else {
                // no found error message set message from label
                _message = _label.html() + ' ' + default_error_message; // settings.message_default;
            }
        }

        _ShowErrorBox(_message);
    }

    /**
     * show error message box
     * @param string message
     * @private
     */
    function _ShowErrorBox(message) {
        //find message type
        switch (settings.message_type) {
            case 'notify':
                _showMessageNotify(message);
                break;
            case 'alert':
                _showMessageAlert(message);
                break;
        }
    }

    /**
     * Check value is number
     * @param string value
     * @returns {boolean}
     * @private
     */
    function _isNumber(value) {
        var regex = /^\d+$/;
        return regex.test(value);
    }

    function _isURL(value) {
        var _return=false;
        if (value.substr(0,7) == 'http://' || value.substr(0,8) == 'https://') {
            _return=true;
        }
        return _return;
    }


    /**
     * Check value is email address
     * @param string value
     * @returns {boolean}
     */
    function _isEmail(value) {
        var regex = /\S+@\S+\.\S+/;
        return regex.test(value);
    }

    /**
     * Check item with type
     * @param DOMemenemt item
     * @param string type from data
     * @private
     */
    function _checkItemType(item, type) {
        var _return = true;
        switch (type) {
            case 'number':
                if (!_isNumber(item.val())) {
                    _showError(item, settings.data_prefix + 'message_number', settings.message_number_default);
                    _return = false;
                }
                break;
            case 'url':
                if (!_isURL(item.val())) {
                    _showError(item, settings.data_prefix + 'message_number', settings.message_url_default);
                    _return = false;
                }
                break;
            case 'email':
                if (!_isEmail(item.val())) {
                    _showError(item, settings.data_prefix + 'message_email', settings.message_email_default);
                    _return = false;
                }
                break;
        }
        return _return;
    }

    /**
     * check item validation
     * @param item
     * @returns {boolean}
     * @private
     */
    function _checkItem(item) {
        var _return = true;
        var _id = item.attr('id');
        var _type = '';
        // read type
        if (!_isset(item.data(settings.data_prefix + 'type'))) {
            _type = 'text';
        } else {
            _type = item.data(settings.data_prefix + 'type');
        }
        // check value not empty
        if (item.val() == '') {
            _return = false;
            _showError(item, settings.data_prefix + 'message_required', settings.message_required_default);
        } else {
            // not empty check type
            if (!_checkItemType(item, _type)) {
                _return = false;
            }
            if (_isset(item.data(settings.data_prefix + 'equal'))) {
                var _equal_id = item.data(settings.data_prefix + 'equal');
                if (item.val() != $('#' + _equal_id).val()) {
                    _ShowErrorBox(settings.message_non_equal_deafult);
                    _return = false;
                }
            }
        }
        return _return;
    }

    /**
     * on submit form event
     */
    $(this).submit(function (event) {

        event.preventDefault();
        var _valid = 1;
        // check google captcha
        if (_isset($('#g-recaptcha-response').val())) {
            if ($('#g-recaptcha-response').val() === '') {
                _valid = 0;
                _ShowErrorBox(settings.google_captcha_message);
            }
        }
        $('input, textarea, select').filter('.required').each(function (item) {
            if (!_checkItem($(this))) {
                _valid = 0;
            }
        });
        $(this).data(settings.data_prefix + 'valid', _valid);
    });
    return this;
};

/**
 * default values
 * @type {{data_prefix: string, google_captcha_message: string, message_required_default: string, message_number_default: string, message_email_default: string, message_type: string, notify_delay: number}}
 */
$.fn.fingerValidator.defaults = {
    data_prefix: 'finger_', //html data element prefix eg. finger_type
    google_captcha_message: 'Google captcha nincs ellenőrizve',
    message_required_default: 'mező kitöltése kötelező', //if no set error message use this
    message_number_default: 'mező csak szám lehet', //if not number error message use this
    message_email_default: 'mező csak email lehet', //if not email error message use this
    message_non_equal_deafult: 'a mezőknek egyeznie kell', //if not no equal error message use this
    message_url_default: 'mező csak URL-t tartalmazhat', //if not URL error message use this
    message_type: 'notify', // error notification type
    notify_delay: 100 //notify delay time
};

$.fn.fingerValidator.notify = function (message, delay) {
    if (delay === undefined) {
        delay = 100;
    }
    $.notify({
        message: message
    }, {
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        delay: delay,
        autoHide: false,
        clickToHide: true
    });
};
