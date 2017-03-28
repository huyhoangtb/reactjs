import React from 'react';
import Overview from './overview/Overview';
import Result from './result/Result';
import {connect} from 'react-redux';
import axios from 'axios';

class Recognition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // axios.get('http://vlms.dev/api/v1/syllabus/get?iid=150487&ntype=vocabset&depth=3')
        axios.get('http://vlms.dev/api/v1/syllabus/get-vocabset?iid=150487')
            .then(response => {
                var result = response.data;
                if (result.success) {
                    this.setState({
                        vocabset: result.result,
                        lang: 'us'
                    })
                }
            });

        this.setState({
            text: 'How do you spell your first name?',
            phonic: 'haʊ duː juː spɜl jɔː fɜːst neɪm'
        })
    }

    render() {
        let {result} = this.props;
        return (
            <div>
                {!result ?
                    <Overview vocabset={this.state.vocabset} lang={this.state.lang}/>
                    :
                    <Result vocabset={this.state.vocabset} lang={this.state.lang}/>
                }
            </div>
        );
    }
}

const populateStateToProps = (state) => {
    let result = state.recognition.result;
    let recognitionResult = state.audio.recognitionResult;
    result = result || recognitionResult;
    return {
        result: result
    }
};

export default connect(populateStateToProps)(Recognition);