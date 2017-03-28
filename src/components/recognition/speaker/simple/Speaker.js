import React from 'react';
import * as css from '../_speaker.scss';
import * as FontAwesome from 'font-awesome-webpack';
import audioPlayer from '../../../../class/AudioPlayer'


class Speaker extends React.Component {
    constructor(props) {
        super(props);
        this.onPlayAudio = this.onPlayAudio.bind(this);
        this.audioOnEnd = this.audioOnEnd.bind(this);
        this.state = {playing: false}
    }

    onPlayAudio(e) {

        if (!this.state.playing) {
            this.setState({playing: true});
            setTimeout(() => {
                audioPlayer.playAudio(this.props.url, this.props.text);
                if (audioPlayer.typeAudio) {
                    audioPlayer.audioPlayer.onended = this.audioOnEnd;
                } else {
                    audioPlayer.speechSynthesisUtterance.onend = this.audioOnEnd;
                }
            }, 100)

        } else {
            this.setState({playing: false});
            audioPlayer.stopAudio();
        }
    }

    audioOnEnd() {
        this.setState({playing: false});
    }

    render() {
        let {className} = this.props;
        className = className ? className : '';

        return (
            <div className={className}>
                <div className="ui-speaker" onClick={this.onPlayAudio}>
                    <i className={!this.state.playing ? "fa fa-volume-up" : "fa fa-pause "}
                       aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}
;


export default Speaker;