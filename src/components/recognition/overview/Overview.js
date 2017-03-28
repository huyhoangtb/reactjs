import React from 'react';
import * as css from './_overview.scss';
import Speaker from '../speaker/Speaker';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Recorder from '../recorder/Recorder';
import * as FontAwesome from 'font-awesome-webpack';
import {connect} from 'react-redux';
import {changeRecognitionData} from '../../../actions/RecognitionAction';
import Utils from '../../../utils/Utils';

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {vocabset, lang} = this.props;
        let text = vocabset ? vocabset.name : '';

        let phonetics = Utils.getPhoneticsByLanguage(vocabset, lang);
        let audioFile = Utils.getAudioByLanguage(vocabset, lang, text);

        return (
            <div className="d-recognition-speaker">
                <Header/>

                <div className="ui-content-panel">
                    <div className="ui-content-center">
                        <Speaker url={audioFile} text={text}/>
                        <div className="ui-text-content">
                            <div className="ui-text">{text}</div>
                            <div className="ui-spelling">/{phonetics}/</div>
                        </div>
                        <Recorder/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Overview;