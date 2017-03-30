/**
 * Created by Peter Hoang Nguyen on 3/29/2017.
 */
import {injectIntl} from 'react-intl';
import  config from '../config/configuration';

/**
 * How to use:
 * FIRST WAY:
 *  - import I18nUtils from"utils/I18nUtils";
 *  - I18nUtils.injectIntl(Component)
 *  - let {intl} =this.props;
 *  - {I18nUtils.formatMessage(intl, "messages", I18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD)}
 * SECOND WAY:
 *  - import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";
 *  - injectI18N(Component);
 *  - let {intl} =this.props;
 *  - {t1(intl, "messages")}
 */
class I18nUtils {
    MESSAGES_NORMAL = 0;
    MESSAGES_UPPERCASE = 1;
    MESSAGES_LOWERCASE = 2;
    MESSAGES_UPPERCASE_FIRST_CHAR = 3;
    MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD = 4;

    injectIntl(T) {
        let a = injectIntl(T);
        console.log(a);
        return a;
    }

    formatMessage(intl, id, type, properties) {
        console.log('type');
        console.log(type);
        if (!id) {
            throw new Error("key of message not found");
        }
        if (!type) {
            type = this.MESSAGES_NORMAL;
        }
        let message = intl.formatMessage({...properties, id: id});
        switch (type) {
            case this.MESSAGES_NORMAL:
                break;
            case this.MESSAGES_LOWERCASE:
                message = message.toLowerCase();
                break;
            case this.MESSAGES_UPPERCASE:
                message = message.toUpperCase();
                break;
            case this.MESSAGES_UPPERCASE_FIRST_CHAR:
                message = capitalize(message);
                break;
            case this.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD:
                message = capitalizeString(message);
                break;
        }
        this.processMissingKey(intl, id);
        return message;
    }

    processMissingKey(intl, id) {
        let messages = intl.messages;
        if (config.autoDetectMissingMessage && messages && messages.hasOwnProperty(id)) {
            // send ajax
        }
    }
}

const capitalizeString = (message) => {
    if (!message || message.length <= 0) {
        return message;
    }
    let result = message[0].toUpperCase();
    for (let i = 1; i < message.length; i++) {
        if (message[i - 1] === ' ' && message[i] !== ' ') {
            result += message[i].toUpperCase();
            continue;
        }
        if (message[i - 1] !== ' ' && message[i] !== ' ') {
            result += message[i].toLowerCase();
            continue;
        }
        if (message[i - 1] !== ' ' && message[i] === ' ') {
            result += message[i];
        }
    }
    return result;
}

export const t = (intl, id, type, properties) => i18nUtils.formatMessage(intl, id, type, properties);

export const t1 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR, properties);

export const t2 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD, properties);

export const t3 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_UPPERCASE, properties);

export const t4 = (intl, id, properties) => i18nUtils.formatMessage(intl, id, i18nUtils.MESSAGES_LOWERCASE, properties);

export const injectI18N = (T) => i18nUtils.injectIntl(T);

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

let i18nUtils = new I18nUtils();

export default i18nUtils;