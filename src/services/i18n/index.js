/**
 * Created by Peter Hoang Nguyen on 3/29/2017.
 */
import {addLocaleData, IntlProvider, FormattedMessage} from 'react-intl';
import scriptjs from 'scriptjs'; //$script.js is an asynchronous JavaScript loader and dependency manager
import qs from 'qs'; //A querystring parser that supports nesting and arrays, with a depth limit.

const scripts = [];
// scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${locale}.js`);
// scripts.push(`/public/messages.json`);
const locale = qs.parse(location.search && location.search.slice(1)).locale || 'en-US';
const localePrefix = locale.slice(0, locale.indexOf('-'));


scripts.push("/public/messages.js");

const SupportI18N = (callback, locale) => {
    // addLocaleData(window.ReactIntlLocaleData[localePrefix]);

    window.i18nMessages = messagesI18N;

    for (var location in messagesI18N) {
        // skip loop if the property is from prototype
        if (!messagesI18N.hasOwnProperty(location)) continue;
        addLocaleData(messagesI18N[location]);
    }
    callback(locale);

}

const i18nIntegration = (callback) => {
    if (scripts.length) {
        scriptjs(scripts, function () {
            SupportI18N(callback, locale);
        });
    } else {
        SupportI18N();
    }
}

export default i18nIntegration;


