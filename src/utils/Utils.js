/**
 * Created by Peter Hoang Nguyen on 3/20/2017.
 */

class Utils {
    getPhoneticsByLanguage(vocab, lang) {
        lang = 'us' ? 'en-US' : 'en-GB';
        let phonetics = null;

        if ( vocab && vocab.audio) {
            if (lang == 'us' && vocab.audio.us) {
                phonetics = vocab.audio.us.phonetics;
            }
            if (lang == 'gb' && vocab.audio.gb) {
                phonetics = vocab.audio.gb.phonetics;
            }
            phonetics = phonetics ? phonetics : vocab.audio.phonetics;
        }

        return phonetics;
    }

    getAudioByLanguage(vocab, lang, text) {
        lang = 'us' ? 'us' : 'gb';
        let audio = null;
        if (!vocab || !vocab.audio) {
            return false;
            if (!text) {
                return '';
            }
            return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=' + text;
        }
        if (lang == 'us' && vocab && vocab.audio.us) {
            audio = vocab.audio.us.mp3;
        }
        if (lang == 'us' && vocab && vocab.audio.gb) {
            audio = vocab.audio.gb.mp3;
        }
        audio = audio ? audio : false;
        return audio;
    }

    formatVocabsetToDisplay(vocab, lang) {
        lang = 'us' ? 'us' : 'gb';
        let result = {};
        result.phonetics = this.getPhoneticsByLanguage(vocab, lang);
        result.name = vocab ? vocab.name : '';
        if(lang === 'us') {
            if(vocab && vocab.vid_us) {
                result.video = vocab.vid_us;
            } else {
                result.video = vocab.vimeo_vid_us;
            }
        } else {
            if(vocab && vocab.vid_gb) {
                result.video = vocab.vid_gb;
            } else {
                result.video = vocab.vimeo_vid_gb;
            }
        }
        return result;
    }
}

var utils = new Utils();

export default utils;