document.getElementById('send-button').addEventListener('click', async () => {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (!message) return;

    const messagesContainer = document.getElementById('messages');

    // Append user message to chat
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="name">You</div>
        <div class="text">${message.replace(/\n/g, '<br>')}</div>
    `;
    messagesContainer.appendChild(userMessage);

    input.value = '';

    // Show typing indicator
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'block';

    // Send message to backend
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Hide typing indicator
    typingIndicator.style.display = 'none';

    // Append AI response to chat
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai';
    aiMessage.innerHTML = `
        <div class="name">Synthia</div>
        <div class="text">${data.response}</div>
    `;
    messagesContainer.appendChild(aiMessage);

    // Scroll to bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// New chat button functionality
document.getElementById('new-chat-btn').addEventListener('click', () => {
    document.getElementById('messages').innerHTML = '';
});
