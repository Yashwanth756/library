function speechToText(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US'; 
    recognition.interimResults = true; 
    recognition.continuous = true; 

    recognition.onstart = function() {
        console.log('listenting......\n')
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            }
        }
        console.log('output : ',transcript.toLowerCase());
        if(transcript.toLowerCase() == 'forward.'){
            window.location.href = "https://www.google.com";
        }
        textToSpeech(transcript)
        

    };

    recognition.onend = function() {
        // Restart recognition after a delay
        setTimeout(function() {
            recognition.start();
        }, 1000); // Delay in milliseconds
    };

    recognition.start(); // Start recognition automatically

    // Stop listening when the page is unloaded
    window.addEventListener('beforeunload', function() {
        recognition.stop();
    });
}


function textToSpeech(textInput){
    var utterance = new SpeechSynthesisUtterance(textInput);
    speechSynthesis.speak(utterance);
}


speechToText()
//  Access the audio element
// window.onload = function(){
//     document.getElementById('myAudio').play()
// }
