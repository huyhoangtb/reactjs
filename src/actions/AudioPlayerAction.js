/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const STOP_AUDIO = 'STOP_AUDIO';

export function playAudio(playing, recognitionResult) {
    return {type: PLAY_AUDIO, playing, recognitionResult}
}

export function stopAudio(recognitionResult) {
    return {type: STOP_AUDIO, recognitionResult}
}
