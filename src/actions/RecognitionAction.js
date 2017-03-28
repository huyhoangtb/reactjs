/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */
export const START_RECOGNITION_ACTION = 'START_RECOGNITION';
export const STOP_RECOGNITION_ACTION = 'STOP_RECOGNITION';
export const INIT_RECOGNITION_TEXT_ACTION = 'INIT_RECOGNITION_TEXT';
export const VOICE_RECOGNITION_RESULT_ACTION = 'VOICE_RECOGNITION_RESULT';
export const CLEAR_RECOGNITION_ACTION = 'CLEAR_RECOGNITION';

export function startRecognition(startTimeStamp,callbackWhenFinishedAndError) {
    return {type: START_RECOGNITION_ACTION, startTimeStamp, callbackWhenFinishedAndError}
}

export function stopRecognition() {
    return {type: STOP_RECOGNITION_ACTION}
}

export function voiceSpeechRecognitionResult(result) {
    return {type: VOICE_RECOGNITION_RESULT_ACTION, result}
}
export function clearRecognition() {
    return {type: CLEAR_RECOGNITION_ACTION}
}

export function changeRecognitionData(text, phonic) {
    return {type: INIT_RECOGNITION_TEXT_ACTION, text, phonic}
}