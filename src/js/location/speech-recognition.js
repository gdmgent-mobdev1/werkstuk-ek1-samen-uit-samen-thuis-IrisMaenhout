// Activates the help me btn on the map with speech recognition

function activateHelpMeWithspeechRecognition() {

    if ("webkitSpeechRecognition" in window) {
        console.log('ok');
        // Speech Recognition Stuff goes here
        let speechRecognition = new webkitSpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;

        speechRecognition.addEventListener("speechstart", e => {
            console.log('hi');
            console.log(e);
        });

    } else {
        console.log("Speech Recognition Not Available")
    }
    // window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



    // const recognition = new SpeechRecognition();
    // recognition.interimResults = true;

    // recognition.addEventListener('result', e => {
    //     console.log('hi');
    //     console.log(e);
    // });

    // recognition.start();



}
export default activateHelpMeWithspeechRecognition;