document.addEventListener('DOMContentLoaded', function () {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceSearchButton = document.getElementById('voice-search-button');

    $(document).ready(function () {
        // Initialize Slick slider
        $('.slider-container').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
        });

        // Smooth scroll to sections
        $('.menu-bar a').on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800);
            }
        });

    // Function to add a message to the chatbot
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.innerHTML = message; // Use innerHTML to render HTML content
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the bottom of the chat
    }

    // Function to handle user input
    function handleUserInput() {
        const userMessage = inputField.value.trim().toLowerCase(); // Trim whitespace from the input and convert to lowercase
        if (userMessage === '') {
            return; // Don't send empty messages
        }
        addMessage(userMessage, 'user');

        // Logic for generating a bot response based on user input
        let botResponse = '';

        // Example dataset
        const chatbotDataset = [
            {
                input: 'hi',
                output: 'Hello! How can we assist you today?',
            },
            {
                input: 'hello',
                output: 'Hi there! How can we help you?',
            },
            {
                input: 'good morning',
                output: 'Good morning! How may we assist you?',
            },
            {
                input: 'sasa',
                output: 'poa sana! How may we assist you?',
            },
            {
                input: 'good afternoon',
                output: 'Good afternoon! How may we assist you?',
            },
            {
                input: 'good evening',
                output: 'Good evening! How can we assist you?',
            },
            {
                input: 'services',
                output: 'We offer various services. What are you interested in?<br>' +
                    '<a href="https://knh.or.ke/">Healthcare Services</a><br>' +
                    '<a href="http://www.enacoach.co.ke/#/">Transportation Services</a><br>' +
                    '<a href="education.html">Education Services</a><br>' +
                    '<a href="housing.html">Accessible Housing</a><br>' +
                    '<a href="employment.html">Employment Assistance</a><br>' +
                    '<a href="recreation.html">Recreation and Leisure</a>',
            },
            {
                input: 'healthcare',
                output: 'You can find accessible healthcare services near you. Our chatbot is here to help you with any questions or assistance you may need. <a href="https://hospitals.aku.edu/">Learn more</a>.',
            },
            {
                input: 'transportation',
                output: 'Explore accessible transportation options in your area. Our chatbot can provide information on accessible routes and services. <a href="http://www.enacoach.co.ke/#/">Learn more</a>.',
            },
            {
                input: 'education',
                output: 'Access information about inclusive education programs and facilities. Our chatbot can answer your education-related queries. <a href="education.html">Learn more</a>.',
            },
            {
                input: 'housing',
                output: 'Find housing options that are adapted to meet the accessibility needs of individuals with disabilities. Our services can help you find the right accessible housing. <a href="housing.html">Learn more</a>.',
            },
            {
                input: 'employment',
                output: 'Discover job opportunities and support for people with disabilities. Our services can help you find employment that suits your abilities. <a href="employment.html">Learn more</a>.',
            },
            {
                input: 'recreation',
                output: 'Access information on inclusive recreational activities and facilities, ensuring that everyone can enjoy their leisure time. <a href="recreation.html">Learn more</a>.',
            },
            {
                input: 'contact',
                output: 'For any inquiries or assistance, feel free to contact us via email at <a href="mailto:info@empowerminds.com">info@empowerminds.com</a>.',
            },
            {
                input: 'rada',
                output: 'Rada ni gani? How can we assist you today?',
            },
            {
                input: 'niaje',
                output: 'Niaje! How can we assist you today?',
            },
            {
                input: 'chonjo',
                output: 'Chonjo! How can we assist you today?',
            },
            {
                input: 'woza',
                output: 'Woza! How can we assist you today?',
            },
        ];

        // Check user input against the dataset
        const matchedResponse = chatbotDataset.find(entry => entry.input === userMessage);

        if (matchedResponse) {
            showTypingIndicator();
            setTimeout(() => {
                addMessage(matchedResponse.output, 'bot');
            }, 1500); // Simulate a delay before the bot responds
        } else {
            botResponse = "I'm sorry, I couldn't understand your request. Please ask a different question.";
            showTypingIndicator();
            setTimeout(() => {
                addMessage(botResponse, 'bot');
            }, 1500); // Simulate a delay before the bot responds
        }

        // Clear the input field
        inputField.value = '';
    }

    // Function to show a typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('bot-message', 'typing-indicator');
        typingIndicator.innerHTML = 'Typing...';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the bottom of the chat
    }

    // Event listener for send button click
    sendButton.addEventListener('click', handleUserInput);

    // Event listener for user input (e.g., pressing Enter)
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    // Event listener for voice search button click
    voiceSearchButton.addEventListener('click', () => {
        // Check if the browser supports the Web Speech API
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onstart = function () {
                // Speech recognition has started
                console.log('Voice recognition started');
            };

            recognition.onresult = function (event) {
                // Get the recognized text
                const transcript = event.results[0][0].transcript;
                inputField.value = transcript;
            };

            recognition.onend = function () {
                // Speech recognition has ended
                console.log('Voice recognition ended');
                handleUserInput();
            };

         recognition.start();
        } else {
            console.log('Voice recognition not supported in this browser');
        }
    });
});
});