// Accessibility
let fontSize = 18;
function changeFontSize(delta) {
    fontSize += delta;
    if (fontSize < 14) fontSize = 14;
    if (fontSize > 28) fontSize = 28;
    document.body.style.fontSize = fontSize + "px";
}
document.getElementById("increase-font").addEventListener("click", () => changeFontSize(2));
document.getElementById("decrease-font").addEventListener("click", () => changeFontSize(-2));

// Language Selection Feature
function changeLanguage() {
    alert("This is a demo. In production, load translations for the selected language.");
}

document.getElementById("languageSelect").addEventListener("change", changeLanguage);

// Voice Command Feature
// This code adds a voice command feature to the chatbot, allowing users to speak their queries instead of typing them.
function startVoiceCommand() {
    // Use standard SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice recognition not supported in this browser.");
        return;
    }
    const lang = document.getElementById("languageSelect").value;
    // Map language code for speech recognition
    const langMap = { en: "en-US", hi: "hi-IN", es: "es-ES" };
    const recognition = new SpeechRecognition();
    recognition.lang = langMap[lang] || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        document.getElementById("user-input").placeholder = "Listening...";
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        document.getElementById("user-input").placeholder = translations[lang].ask;
        // Optionally, auto-send the message:
        // document.getElementById("send-btn").click();
    };

    recognition.onerror = function (event) {
        alert("Voice recognition error: " + event.error);
        document.getElementById("user-input").placeholder = translations[lang].ask;
    };

    recognition.onend = function () {
        document.getElementById("user-input").placeholder = translations[lang].ask;
    };

    recognition.start();
}

document.getElementById("voice-command-btn").addEventListener("click", startVoiceCommand);

// Feedback Submission 
function submitFeedback(){
    alert("Thanks for your feedback! We appreciate your input and will use it to improve our services.");
}
