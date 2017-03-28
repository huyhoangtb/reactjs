/**
 * Created by Peter Hoang Nguyen on 3/20/2017.
 */

class AudioPlayer {
    playAudio(url = null, text = null) {
        if (!url && !text) {
            return;
        }

        if (url) {
            this.audioPlayer = new Audio(url);
            this.typeAudio = true;
            this.audioPlayer.play();
        }
        if (text) {
            this.speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
            this.typeAudio = false;
            this.audioPlayer = window.speechSynthesis.speak(this.speechSynthesisUtterance);
        }
    }

    stopAudio() {
        window.speechSynthesis.cancel();
        if (!this.audioPlayer) {
            return;
        }
        this.playing = false;
        try {
            if (this.typeAudio) {
                this.audioPlayer.pause();
                this.audioPlayer.currentTime = 0;
            } else {
                window.speechSynthesis.cancel();
            }

        } catch (exception) {
            console.log(exception);
        }
    }

    getAudioPlayer() {
        return this.audioPlayer;
    }
}
let audioPlayer = new AudioPlayer();
export default audioPlayer;

