// ========================================
// GLOBAL VARIABLES AND STATE
// ========================================
let currentSection = 'hero';
let pomodoroTimer = null;
let pomodoroState = {
    isRunning: false,
    isBreak: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    studyTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    sessionsCompleted: 0,
    currentSession: 1
};

let tasks = [];
let quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" }
];

let affirmations = [
    "You are capable of amazing things! 🌟",
    "Today is full of possibilities and opportunities 💫",
    "You have the strength to overcome any challenge ✨",
    "Your potential is limitless and beautiful 🦋",
    "You are growing stronger with each step you take 🌱",
    "Believe in yourself - you're doing great! 💖",
    "Your efforts today are building tomorrow's success 🌈",
    "You are worthy of all the good things coming your way 💝"
];

let savedQuotes = [];
let waterGlasses = 0;
let currentMood = null;
let conversationHistory = [];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSavedData();
    setupBackgroundVideo();
    showDailyGreeting();
});

function initializeApp() {
    // Set random daily affirmation
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    document.getElementById('daily-affirmation-text').textContent = randomAffirmation;
    
    // Initialize water tracker
    updateWaterDisplay();
    
    // Initialize timer display
    updateTimerDisplay();
    
    // Load initial quote
    displayRandomQuote();
    
    // Setup breathing exercise
    setupBreathingExercise();
}

function setupEventListeners() {
    // Navigation event listeners
    setupNavigationListeners();
    
    // Pomodoro timer listeners
    setupPomodoroListeners();
    
    // Task management listeners
    setupTaskListeners();
    
    // Quote management listeners
    setupQuoteListeners();
    
    // Self-care listeners
    setupSelfCareListeners();
    
    // AI assistant listeners
    setupAIAssistantListeners();
    
    // Background video listeners
    setupVideoListeners();
    
    // General UI listeners
    setupGeneralListeners();
}

// ========================================
// NAVIGATION SYSTEM
// ========================================
function setupNavigationListeners() {
    // Menu toggle
    document.getElementById('menu-toggle-btn').addEventListener('click', toggleNavigation);
    
    // Navigation close
    document.getElementById('nav-close-btn').addEventListener('click', closeNavigation);
    
    // Navigation links
    document.querySelectorAll('.nav-link, .action-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
                closeNavigation();
            }
        });
    });
}

function navigateToSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }
}

function toggleNavigation() {
    const nav = document.getElementById('navigation');
    nav.classList.toggle('visible');
}

function closeNavigation() {
    document.getElementById('navigation').classList.remove('visible');
}

// ========================================
// BACKGROUND VIDEO MANAGEMENT
// ========================================
function setupBackgroundVideo() {
    const video = document.getElementById('background-video');
    const controls = document.getElementById('video-controls');
    const leftHoverZone = document.createElement('div');
    
    // Create left hover zone for fade controls
    leftHoverZone.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100vh;
        z-index: 999;
        pointer-events: none;
    `;
    document.body.appendChild(leftHoverZone);
    
    let fadeTimeout;
    
    // Auto-fade controls after 3 seconds
    function startFadeTimer() {
        clearTimeout(fadeTimeout);
        controls.classList.remove('fade-out');
        fadeTimeout = setTimeout(() => {
            controls.classList.add('fade-out');
        }, 3000);
    }
    
    // Show controls on mouse enter left zone
    leftHoverZone.addEventListener('mouseenter', () => {
        controls.classList.remove('fade-out');
        clearTimeout(fadeTimeout);
    });
    
    // Start fade timer on mouse leave
    leftHoverZone.addEventListener('mouseleave', startFadeTimer);
    
    // Controls hover behavior
    controls.addEventListener('mouseenter', () => {
        controls.classList.remove('fade-out');
        clearTimeout(fadeTimeout);
    });
    
    controls.addEventListener('mouseleave', startFadeTimer);
    
    // Start initial fade timer
    startFadeTimer();
    
    // Set initial volume
    video.volume = 0.3;
}

function setupVideoListeners() {
    const video = document.getElementById('background-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });
    
    volumeSlider.addEventListener('input', (e) => {
        video.volume = e.target.value;
        if (video.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
}

// ========================================
// POMODORO TIMER FUNCTIONALITY
// ========================================
function setupPomodoroListeners() {
    document.getElementById('start-pause-btn').addEventListener('click', toggleTimer);
    document.getElementById('reset-btn').addEventListener('click', resetTimer);
    document.getElementById('pomodoro-settings-btn').addEventListener('click', showPomodoroSettings);
}

function toggleTimer() {
    const btn = document.getElementById('start-pause-btn');
    
    if (pomodoroState.isRunning) {
        // Pause timer
        clearInterval(pomodoroTimer);
        pomodoroState.isRunning = false;
        btn.innerHTML = '<i class="fas fa-play"></i> Start';
        btn.classList.remove('pause');
        btn.classList.add('start');
    } else {
        // Start timer
        pomodoroState.isRunning = true;
        btn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        btn.classList.remove('start');
        btn.classList.add('pause');
        
        pomodoroTimer = setInterval(() => {
            pomodoroState.timeLeft--;
            updateTimerDisplay();
            
            if (pomodoroState.timeLeft <= 0) {
                handleSessionComplete();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(pomodoroTimer);
    pomodoroState.isRunning = false;
    pomodoroState.timeLeft = pomodoroState.studyTime * 60;
    pomodoroState.isBreak = false;
    
    const btn = document.getElementById('start-pause-btn');
    btn.innerHTML = '<i class="fas fa-play"></i> Start';
    btn.classList.remove('pause');
    btn.classList.add('start');
    
    updateTimerDisplay();
}

function handleSessionComplete() {
    clearInterval(pomodoroTimer);
    pomodoroState.isRunning = false;
    
    // Play notification sound
    playNotificationSound();
    
    if (!pomodoroState.isBreak) {
        // Study session completed
        pomodoroState.sessionsCompleted++;
        pomodoroState.isBreak = true;
        
        // Determine break type
        const isLongBreak = pomodoroState.sessionsCompleted % 4 === 0;
        pomodoroState.timeLeft = isLongBreak ? pomodoroState.longBreakTime * 60 : pomodoroState.breakTime * 60;
        
        showNotification('Study session complete! Time for a break! 🎉');
        updateSessionStats();
        
    } else {
        // Break completed
        pomodoroState.isBreak = false;
        pomodoroState.timeLeft = pomodoroState.studyTime * 60;
        pomodoroState.currentSession++;
        
        showNotification('Break time over! Ready to study again? 💪');
    }
    
    updateTimerDisplay();
    
    const btn = document.getElementById('start-pause-btn');
    btn.innerHTML = '<i class="fas fa-play"></i> Start';
    btn.classList.remove('pause');
    btn.classList.add('start');
}

function updateTimerDisplay() {
    const minutes = Math.floor(pomodoroState.timeLeft / 60);
    const seconds = pomodoroState.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timer-display').textContent = timeString;
    document.getElementById('timer-status').textContent = pomodoroState.isBreak ? 'Break Time' : 'Study Time';
    
    // Update progress circle
    const totalTime = pomodoroState.isBreak 
        ? (pomodoroState.sessionsCompleted % 4 === 0 ? pomodoroState.longBreakTime : pomodoroState.breakTime) * 60
        : pomodoroState.studyTime * 60;
    
    const progress = 1 - (pomodoroState.timeLeft / totalTime);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference * (1 - progress);
    
    const progressCircle = document.getElementById('timer-progress');
    progressCircle.style.strokeDashoffset = offset;
}

function updateSessionStats() {
    const sessionsToday = localStorage.getItem('puppi_sessionsToday') || 0;
    const totalMinutes = localStorage.getItem('puppi_totalMinutes') || 0;
    const currentStreak = localStorage.getItem('puppi_currentStreak') || 0;
    
    const newSessions = parseInt(sessionsToday) + 1;
    const newMinutes = parseInt(totalMinutes) + pomodoroState.studyTime;
    const newStreak = parseInt(currentStreak) + 1;
    
    localStorage.setItem('puppi_sessionsToday', newSessions);
    localStorage.setItem('puppi_totalMinutes', newMinutes);
    localStorage.setItem('puppi_currentStreak', newStreak);
    
    document.getElementById('sessions-today').textContent = newSessions;
    document.getElementById('total-minutes').textContent = newMinutes;
    document.getElementById('current-streak').textContent = newStreak;
}

function showPomodoroSettings() {
    const modalContent = `
        <h2>Pomodoro Settings</h2>
        <div class="settings-form">
            <div class="setting-item">
                <label for="study-time">Study Time (minutes):</label>
                <input type="number" id="study-time" value="${pomodoroState.studyTime}" min="1" max="60">
            </div>
            <div class="setting-item">
                <label for="break-time">Short Break (minutes):</label>
                <input type="number" id="break-time" value="${pomodoroState.breakTime}" min="1" max="30">
            </div>
            <div class="setting-item">
                <label for="long-break-time">Long Break (minutes):</label>
                <input type="number" id="long-break-time" value="${pomodoroState.longBreakTime}" min="1" max="60">
            </div>
            <div class="setting-actions">
                <button class="primary-btn" onclick="savePomodoroSettings()">Save Settings</button>
                <button class="secondary-btn" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;
    showModal(modalContent);
}

function savePomodoroSettings() {
    const studyTime = parseInt(document.getElementById('study-time').value);
    const breakTime = parseInt(document.getElementById('break-time').value);
    const longBreakTime = parseInt(document.getElementById('long-break-time').value);
    
    if (studyTime > 0 && breakTime > 0 && longBreakTime > 0) {
        pomodoroState.studyTime = studyTime;
        pomodoroState.breakTime = breakTime;
        pomodoroState.longBreakTime = longBreakTime;
        
        if (!pomodoroState.isRunning) {
            pomodoroState.timeLeft = studyTime * 60;
            updateTimerDisplay();
        }
        
        localStorage.setItem('puppi_pomodoroSettings', JSON.stringify({
            studyTime, breakTime, longBreakTime
        }));
        
        closeModal();
        showNotification('Settings saved successfully! 🎉');
    }
}

// ========================================
// TASK MANAGEMENT
// ========================================
function setupTaskListeners() {
    document.getElementById('add-task-btn').addEventListener('click', showAddTaskModal);
    
    // Task filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterTasks(this.getAttribute('data-filter'));
        });
    });
}

function showAddTaskModal() {
    const modalContent = `
        <h2>Add New Task</h2>
        <div class="task-form">
            <div class="form-group">
                <label for="task-title">Task Title:</label>
                <input type="text" id="task-title" placeholder="Enter task title" maxlength="100">
            </div>
            <div class="form-group">
                <label for="task-description">Description (optional):</label>
                <textarea id="task-description" placeholder="Enter task description" rows="3" maxlength="500"></textarea>
            </div>
            <div class="form-group">
                <label for="task-priority">Priority:</label>
                <select id="task-priority">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="primary-btn" onclick="addTask()">Add Task</button>
                <button class="secondary-btn" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;
    showModal(modalContent);
}

function addTask() {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const priority = document.getElementById('task-priority').value;
    
    if (!title) {
        showNotification('Please enter a task title', 'error');
        return;
    }
    
    const task = {
        id: Date.now().toString(),
        title,
        description,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasksToStorage();
    renderTasks();
    closeModal();
    showNotification('Task added successfully! 🎉');
}

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    let filteredTasks = tasks;
    if (activeFilter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (activeFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">No tasks found. Add your first task to get started! 🌟</div>';
        return;
    }
    
    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')"></div>
            <div class="task-content">
                <div class="task-text">${task.title}</div>
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                <div class="task-meta">
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="task-action-btn" onclick="editTask('${task.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-action-btn" onclick="deleteTask('${task.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        
        if (task.completed) {
            showNotification('Task completed! Great job! 🎉');
        }
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToStorage();
        renderTasks();
        showNotification('Task deleted successfully');
    }
}

function filterTasks(filter) {
    renderTasks();
}

function saveTasksToStorage() {
    localStorage.setItem('puppi_tasks', JSON.stringify(tasks));
}

// ========================================
// QUOTES MANAGEMENT
// ========================================
function setupQuoteListeners() {
    document.getElementById('new-quote-btn').addEventListener('click', displayRandomQuote);
    document.getElementById('save-quote-btn').addEventListener('click', saveCurrentQuote);
    document.getElementById('share-quote-btn').addEventListener('click', shareCurrentQuote);
}

function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('current-quote').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
}

function saveCurrentQuote() {
    const quoteText = document.getElementById('current-quote').textContent;
    const quoteAuthor = document.getElementById('quote-author').textContent;
    
    const quote = {
        text: quoteText,
        author: quoteAuthor,
        savedAt: new Date().toISOString()
    };
    
    savedQuotes.push(quote);
    localStorage.setItem('puppi_savedQuotes', JSON.stringify(savedQuotes));
    renderSavedQuotes();
    showNotification('Quote saved! 💝');
}

function shareCurrentQuote() {
    const quoteText = document.getElementById('current-quote').textContent;
    const quoteAuthor = document.getElementById('quote-author').textContent;
    const shareText = `${quoteText} ${quoteAuthor}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: shareText
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Quote copied to clipboard! 📋');
        });
    }
}

function renderSavedQuotes() {
    const savedQuotesList = document.getElementById('saved-quotes-list');
    
    if (savedQuotes.length === 0) {
        savedQuotesList.innerHTML = '<div class="empty-state">No saved quotes yet. Save your favorites! 💖</div>';
        return;
    }
    
    savedQuotesList.innerHTML = savedQuotes.slice(-5).reverse().map((quote, index) => `
        <div class="saved-quote-item">
            <div class="saved-quote-text">${quote.text}</div>
            <div class="saved-quote-author">${quote.author}</div>
            <div class="saved-quote-date">${new Date(quote.savedAt).toLocaleDateString()}</div>
        </div>
    `).join('');
}

// ========================================
// SELF-CARE FEATURES
// ========================================
function setupSelfCareListeners() {
    document.getElementById('drink-water-btn').addEventListener('click', drinkWater);
    
    // Mood selector buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectMood(this.getAttribute('data-mood'));
        });
    });
    
    document.getElementById('start-breathing-btn').addEventListener('click', startBreathingExercise);
}

function drinkWater() {
    waterGlasses = Math.min(waterGlasses + 1, 8);
    localStorage.setItem('puppi_waterGlasses', waterGlasses);
    updateWaterDisplay();
    
    if (waterGlasses >= 8) {
        showNotification('Amazing! You\'ve reached your daily water goal! 🎉💧');
    } else {
        showNotification('Great job staying hydrated! 💧');
    }
}

function updateWaterDisplay() {
    const waterGlassesContainer = document.getElementById('water-glasses');
    waterGlassesContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const glass = document.createElement('div');
        glass.className = `water-glass ${i < waterGlasses ? 'filled' : ''}`;
        waterGlassesContainer.appendChild(glass);
    }
}

function selectMood(mood) {
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
    
    currentMood = mood;
    localStorage.setItem('puppi_currentMood', mood);
    
    const moodMessages = {
        happy: 'So glad you\'re feeling happy! Keep spreading those positive vibes! ✨',
        neutral: 'That\'s okay! Some days are just neutral, and that\'s perfectly fine 🌿',
        sad: 'I\'m here for you. Remember, it\'s okay to feel sad sometimes 💙',
        excited: 'Your excitement is contagious! What\'s got you feeling so great? 🎉',
        tired: 'Rest is important. Maybe take a little break and recharge 😴'
    };
    
    showNotification(moodMessages[mood]);
}

function setupBreathingExercise() {
    // Breathing exercise is set up in the listener
}

function startBreathingExercise() {
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    const btn = document.getElementById('start-breathing-btn');
    
    let isBreathing = false;
    let breathingInterval;
    
    if (!isBreathing) {
        isBreathing = true;
        btn.textContent = 'Stop Breathing';
        
        let isInhaling = true;
        
        breathingInterval = setInterval(() => {
            if (isInhaling) {
                circle.classList.add('inhale');
                circle.classList.remove('exhale');
                text.textContent = 'Breathe In...';
            } else {
                circle.classList.add('exhale');
                circle.classList.remove('inhale');
                text.textContent = 'Breathe Out...';
            }
            isInhaling = !isInhaling;
        }, 4000);
        
    } else {
        isBreathing = false;
        clearInterval(breathingInterval);
        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Click to start';
        btn.textContent = 'Start Breathing';
    }
}

// ========================================
// AI ASSISTANT
// ========================================
function setupAIAssistantListeners() {
    document.getElementById('ai-toggle-btn').addEventListener('click', toggleAIAssistant);
    document.getElementById('ai-close-btn').addEventListener('click', closeAIAssistant);
    document.getElementById('ai-send-btn').addEventListener('click', sendAIMessage);
    
    document.getElementById('ai-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
}

function toggleAIAssistant() {
    const chatWindow = document.getElementById('ai-chat-window');
    chatWindow.classList.toggle('visible');
}

function closeAIAssistant() {
    document.getElementById('ai-chat-window').classList.remove('visible');
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    input.value = '';
    
    // Show typing indicator
    addMessageToChat('assistant', 'Puppi is typing...', 'typing');
    
    // Simulate AI response (since we can't make real API calls in static version)
    setTimeout(() => {
        // Remove typing indicator
        const messages = document.getElementById('ai-messages');
        const typingMessage = messages.querySelector('.typing');
        if (typingMessage) {
            typingMessage.remove();
        }
        
        // Add AI response
        const response = generateAIResponse(message);
        addMessageToChat('assistant', response);
        
        // Update conversation history
        conversationHistory.push({ role: 'user', content: message });
        conversationHistory.push({ role: 'assistant', content: response });
        
        // Keep only last 10 messages
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
    }, 1500);
}

function addMessageToChat(sender, message, className = '') {
    const messagesContainer = document.getElementById('ai-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender} ${className}`;
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = [
        "That's wonderful! I'm here to support you on your study journey! 🐶✨",
        "I understand! Sometimes studying can be challenging, but you're doing great! 💪",
        "Your dedication to learning is amazing! Keep up the fantastic work! 🌟",
        "Remember to take breaks and stay hydrated while studying! Self-care is important! 💖",
        "I believe in you! You have everything it takes to succeed! 🎉",
        "That sounds like a great plan! I'm rooting for you every step of the way! 🐕",
        "You're making such good progress! I'm proud of how hard you're working! ✨",
        "Don't forget to celebrate your small wins too! Every step forward counts! 🎊"
    ];
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
        return "I can sense you're feeling stressed. Remember to breathe deeply and take things one step at a time. You've got this! 🌸💙";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleep')) {
        return "It sounds like you need some rest! Don't forget that good sleep is essential for learning. Maybe try a short break or some relaxation? 😴💤";
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('unmotivated') || lowerMessage.includes('give up')) {
        return "I understand motivation can be tough sometimes! Remember why you started this journey. You're stronger than you think! 🔥💪";
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('focus') || lowerMessage.includes('concentrate')) {
        return "Great to hear you're focused on studying! Try using the Pomodoro timer - it really helps with concentration! 📚⏰";
    }
    
    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
        return "Aww, you're so welcome! I'm always here to help and cheer you on! You make my puppy heart happy! 🐶💕";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function showDailyGreeting() {
    const today = new Date().toDateString();
    const lastGreeting = localStorage.getItem('puppi_lastGreeting');
    
    if (lastGreeting !== today) {
        setTimeout(() => {
            toggleAIAssistant();
            
            const hour = new Date().getHours();
            let timeGreeting = "";
            if (hour < 12) {
                timeGreeting = "Good morning! ";
            } else if (hour < 17) {
                timeGreeting = "Good afternoon! ";
            } else {
                timeGreeting = "Good evening! ";
            }
            
            const greetings = [
                "Hi there! Welcome back to Puppi ur companion🐶! ✨",
                "Hello, lovely! Ready for another productive day? 💖",
                "Hey study buddy! I'm here to make your day amazing! 🌟",
                "Welcome back! Let's make today wonderful together! 🦋"
            ];
            
            const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            const fullGreeting = `${timeGreeting}${randomGreeting}\n\nHow has your day been so far? I'd love to hear about it and help you with anything you need! 💕`;
            
            addMessageToChat('assistant', fullGreeting);
            
            localStorage.setItem('puppi_lastGreeting', today);
        }, 2000);
    }
}

// ========================================
// GENERAL UI FUNCTIONS
// ========================================
function setupGeneralListeners() {
    // Kinder Joy button
    document.getElementById('kinder-joy-btn').addEventListener('click', () => {
        showNotification('Surprise! You found a special treat! 🎁✨');
    });
    
    // Close modal on overlay click
    document.getElementById('modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function showModal(content) {
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = content;
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'error' ? 'var(--error)' : 'var(--success)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: 0 8px 24px var(--shadow);
        z-index: var(--z-toast);
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform var(--transition-base);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function playNotificationSound() {
    const audio = document.getElementById('notification-sound');
    if (audio) {
        audio.play().catch(() => {
            // Ignore if sound fails to play
        });
    }
}

// ========================================
// DATA PERSISTENCE
// ========================================
function loadSavedData() {
    // Load saved tasks
    const savedTasks = localStorage.getItem('puppi_tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
    
    // Load saved quotes
    const savedQuotesData = localStorage.getItem('puppi_savedQuotes');
    if (savedQuotesData) {
        savedQuotes = JSON.parse(savedQuotesData);
        renderSavedQuotes();
    }
    
    // Load water intake
    const savedWater = localStorage.getItem('puppi_waterGlasses');
    if (savedWater) {
        waterGlasses = parseInt(savedWater);
        updateWaterDisplay();
    }
    
    // Load current mood
    const savedMood = localStorage.getItem('puppi_currentMood');
    if (savedMood) {
        currentMood = savedMood;
        const moodBtn = document.querySelector(`[data-mood="${savedMood}"]`);
        if (moodBtn) {
            moodBtn.classList.add('selected');
        }
    }
    
    // Load pomodoro settings
    const savedPomodoroSettings = localStorage.getItem('puppi_pomodoroSettings');
    if (savedPomodoroSettings) {
        const settings = JSON.parse(savedPomodoroSettings);
        pomodoroState.studyTime = settings.studyTime;
        pomodoroState.breakTime = settings.breakTime;
        pomodoroState.longBreakTime = settings.longBreakTime;
        pomodoroState.timeLeft = settings.studyTime * 60;
    }
    
    // Load session stats
    const sessionsToday = localStorage.getItem('puppi_sessionsToday') || 0;
    const totalMinutes = localStorage.getItem('puppi_totalMinutes') || 0;
    const currentStreak = localStorage.getItem('puppi_currentStreak') || 0;
    
    document.getElementById('sessions-today').textContent = sessionsToday;
    document.getElementById('total-minutes').textContent = totalMinutes;
    document.getElementById('current-streak').textContent = currentStreak;
    
    // Reset daily data if it's a new day
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('puppi_lastDate');
    if (lastDate !== today) {
        localStorage.setItem('puppi_sessionsToday', '0');
        localStorage.setItem('puppi_totalMinutes', '0');
        localStorage.setItem('puppi_waterGlasses', '0');
        localStorage.setItem('puppi_lastDate', today);
        
        // Reset display
        document.getElementById('sessions-today').textContent = '0';
        document.getElementById('total-minutes').textContent = '0';
        waterGlasses = 0;
        updateWaterDisplay();
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ========================================
// ACCESSIBILITY FEATURES
// ========================================
document.addEventListener('keydown', function(e) {
    // Escape key to close modals and navigation
    if (e.key === 'Escape') {
        closeModal();
        closeNavigation();
        closeAIAssistant();
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================
// Lazy load heavy features
setTimeout(() => {
    // Initialize charts or other heavy components here if needed
}, 1000);

// Throttle scroll events if needed
const throttledScroll = debounce(function() {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', throttledScroll);

// ========================================
// FINAL INITIALIZATION
// ========================================
console.log('Puppi ur companion🐶 initialized successfully! 🐶✨');