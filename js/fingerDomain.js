/**
 * Finger Domain strip Util
 */
class fingerDomain {
    /**
     * Get current URL
     * @returns {string}
     */
    static currentURL() {
        var _return = window.location.href;
        return _return;
    }

    /**
     * get Get current protocol
     * http / https
     * @returns {string}
     */
    static getProtocol() {
        var _currentURL = this.currentURL();
        var _return = _currentURL.substr(0, _currentURL.indexOf(':'));
        return _return;
    }

    /**
     * get Current Domain
     * without protocol
     * @returns {string}
     */
    static getDomain() {
        var _currentURL = this.currentURL();
        var _tmp = _currentURL.substr(_currentURL.indexOf('//') + 2);
        var _return = _tmp.substr(0, _tmp.indexOf(('/')));
        return _return;
    }

    /**
     * get Current URL parameter
     * @returns {string}
     */
    static getParam() {
        var _currentURL = this.currentURL();
        var _currentDomain = this.getDomain();
        var _return = _currentURL.substr(_currentURL.indexOf(_currentDomain) + _currentDomain.length + 1);
        return _return;
    }
}