import React from 'react';
import * as css from './_result.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Speaker from '../speaker/simple/Speaker';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Utils from '../../../utils/Utils';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import * as FontAwesome from 'font-awesome-webpack';
import {clearRecognition} from '../../../actions/RecognitionAction';

const ProgressValue = (props) => (
    <div className="progress-score">{props.value} {props.sign}</div>
);

let ProgressSpace = (props) => {
    let space = 100 / props.totalSpace;
    let percentProgress = [];
    for (let i = 1; i <= props.totalSpace; i++) {
        let percent = space * i;
        percentProgress.push(percent)
    }
    let percentProgressObject = percentProgress.map((percent) =>
        <ProgressValue key={percent.toString()} value={percent} sign="%"/>
    )


    return (<div>{percentProgressObject}</div>);

};

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {totalSpace: 10, open: false};
        this.processingData = this.processingData.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTryAgain = this.handleTryAgain.bind(this);
    }

    componentDidMount() {
        this.processingData();
    }

    processingData() {
        let {vocabset, lang, result} = this.props;
        let text = vocabset ? vocabset.name : '';
        let phonetics = Utils.getPhoneticsByLanguage(vocabset, lang);

        let inputStringArr = text.split(" ");
        let inputPhonicArr = phonetics.split(" ");
        let resultStringArr = result.split(" ");
        let vchildrent = (vocabset && vocabset.children) ? vocabset.children : [];

        if (inputStringArr.length === 0) {
            return [];
        }
        let totalTrue = 0;
        let percent = 0;

        var output = vchildrent.map((vocab, i) => {
            vocab = Utils.formatVocabsetToDisplay(vocab, lang);
            console.log(vocab);
            let isCorrect = this.testData(vocab.name, resultStringArr);
            isCorrect ? totalTrue++ : totalTrue;
            vocab.isCorrect = isCorrect;
            return vocab
        });

        this.setState({voiceResult: output});
        this.setState({percent: Math.floor(totalTrue * 100 / inputStringArr.length)});
    }

    testData(text, arrayText) {
        for (let i = 0; i < arrayText.length; i++) {
            if (arrayText[i].toUpperCase() == text.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    handleOpen(videoId) {
        if (!videoId) {
            this.setState({open: false});
            return;
        }
        this.setState({open: true, videoId: videoId});
    }

    handleClose() {
        this.setState({open: false});
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    handleTryAgain() {
        let {dispatch} = this.props;
        dispatch(clearRecognition());
    }

    render() {
        let {vocabset, lang, result} = this.props;
        let {voiceResult, percent, videoId} = this.state;

        let text = vocabset ? vocabset.name : '';
        let phonetics = Utils.getPhoneticsByLanguage(vocabset, lang);
        let audioFile = Utils.getAudioByLanguage(vocabset, lang, text);

        let position = this.state.percent - this.state.totalSpace;
        if (position < 0) {
            position = 0;
        }
        let styleScore = {left: position + "%"};
        let styleBg = {width: position + "%"};

        const actions = [
            <FlatButton
                label="Đóng"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div className="d-recognition-speaker d-result-recognition">
                <Header/>

                <div className="ui-content-panel">
                    <div>
                        <div className="ui-content-center">
                            <Speaker url={audioFile} text={text}/>
                            <div className="ui-text-content">
                                <div className="ui-text">{text} </div>
                                <div className="ui-spelling">/{phonetics}/</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="ui-content-center">
                            <div className="progress-panel">
                                <div className="progress-bg" style={styleBg}/>
                                <div className="score" style={styleScore}>{percent + "%"}</div>
                                <ProgressSpace totalSpace={10}/>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="ui-content-center">
                            <div className="table-panel">
                                {voiceResult &&
                                <Table displayRowCheckbox={false}
                                       displaySelectAll={false}
                                       adjustForCheckbox={false}
                                       enableSelectAll={false}
                                       className="result-data">
                                    <TableHeader displayRowCheckbox={false}
                                                 displaySelectAll={false}
                                                 adjustForCheckbox={false}
                                                 enableSelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn className="ui-word ui-word-head"
                                                               tooltip="Từ">Từ</TableHeaderColumn>
                                            <TableHeaderColumn className="ui-guild  ui-guild-head" tooltip="Đúng/Sai">Đúng/Sai</TableHeaderColumn>
                                            <TableHeaderColumn className="ui-guild  ui-guild-head" tooltip="Hướng dẫn">Học</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {voiceResult.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableRowColumn className="ui-word">
                                                    <div>{row.name}</div>
                                                    <div className="text-color-blue">/{row.phonetics}/</div>
                                                </TableRowColumn>
                                                <TableRowColumn className="ui-guild"> {row.isCorrect ?
                                                    <i className="fa fa-check-circle-o corect-color icon-size"
                                                       aria-hidden="true"></i>
                                                    :
                                                    <i className="fa fa-times text-color-red icon-size"
                                                       aria-hidden="true"></i>
                                                }
                                                </TableRowColumn>
                                                <TableRowColumn className="ui-guild">
                                                    {row.video &&
                                                    <i onClick={() => {
                                                        this.handleOpen(row.video);
                                                    }}
                                                       className="ui-cursor-pointer fa fa-play-circle-o text-color-blue icon-size"
                                                       aria-hidden="true"></i>
                                                    }
                                                    {!row.video &&
                                                    <span>
                                                            <Speaker className="simple-speaker" text={row.name}/>
                                                        </span>
                                                    }
                                                </TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                }
                            </div>
                            <div className="ui-try-again-panel">
                                <FlatButton className="ui-button"
                                            label="Thử lại"
                                            primary={true}
                                            keyboardFocused={true}
                                            onTouchTap={this.handleTryAgain}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>

                <Dialog
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <iframe width="99%" height="300px"
                            src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}>
                    </iframe>
                </Dialog>
            </div>
        );
    }
}

const populateStateToProps = (state) => {
    let result = state.recognition.result;

    return {
        result: result
    }
};
Result.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(populateStateToProps)(Result);