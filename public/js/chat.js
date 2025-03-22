function toggleChat() {
    var chatPopup = document.getElementById('chatPopup');
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
      chatPopup.style.display = 'block';
    } 
    else {
      chatPopup.style.display = 'none';
    }
  }

