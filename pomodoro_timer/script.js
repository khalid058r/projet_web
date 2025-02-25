// Éléments DOM
const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');
const longBreakDurationInput = document.getElementById('longbreakDuration');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.querySelector('.timer-display');
const timerMode = document.querySelector('.timer-mode');
const progressRing = document.querySelector('.progress-ring__circle');
const xpProgress = document.querySelector('.xp-progress');
const xpText = document.querySelector('.xp-text');
const levelBadge = document.querySelector('.level-badge');
const todayPomodorosElement = document.getElementById('todayPomodoros');
const totalFocusTimeElement = document.getElementById('totalFocusTime');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');
const achievements = document.querySelectorAll('.achievement');

// Variables du timer
let timer;
let minutes;
let seconds;
let isRunning = false;
let mode = 'work'; // 'work', 'break', 'longBreak'
let pomodoroCount = 0;
let totalFocusMinutes = 0;
let xp = 0;
let level = 1;
let originalDuration;

// Configuration du cercle de progression
const radius = 45;
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = circumference;
progressRing.style.strokeDashoffset = 0;

// Initialisation du timer
function initTimer() {
    minutes = parseInt(workDurationInput.value);
    seconds = 0;
    originalDuration = minutes * 60;
    updateTimerDisplay();
    updateProgressRing(0);
}

// Mise à jour de l'affichage du timer
function updateTimerDisplay() {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Mise à jour de l'anneau de progression
function updateProgressRing(percentage) {
    const offset = circumference - (percentage / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
}

// Démarrer/Pauser le timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'Resume';
    } else {
        startTimer();
        startBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

// Démarrer le timer
function startTimer() {
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                timerComplete();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const totalSeconds = minutes * 60 + seconds;
        const percentage = 100 - (totalSeconds / originalDuration) * 100;
        updateProgressRing(percentage);
        updateTimerDisplay();
    }, 1000);
}

// Action lorsque le timer est terminé
function timerComplete() {
    const notification = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    notification.play();
    
    if (mode === 'work') {
        pomodoroCount++;
        totalFocusMinutes += parseInt(workDurationInput.value);
        updateStats();
        addXP(10); // Ajouter 10 XP pour chaque Pomodoro terminé
        
        // Vérifier et déverrouiller les succès
        if (pomodoroCount === 1) {
            unlockAchievement('first-pomodoro');
        }
        if (pomodoroCount >= 8) {
            unlockAchievement('productive-day');
        }
        
        // Alterner entre pause courte et longue
        if (pomodoroCount % 4 === 0) {
            mode = 'longBreak';
            timerMode.textContent = 'Long Break';
            minutes = parseInt(longBreakDurationInput.value);
        } else {
            mode = 'break';
            timerMode.textContent = 'Break Time';
            minutes = parseInt(breakDurationInput.value);
        }
    } else {
        mode = 'work';
        timerMode.textContent = 'Work Time';
        minutes = parseInt(workDurationInput.value);
    }
    
    seconds = 0;
    originalDuration = minutes * 60;
    updateTimerDisplay();
    updateProgressRing(0);
    isRunning = false;
    startBtn.textContent = 'Start';
}

// Réinitialiser le timer
function resetTimer() {
    clearInterval(timer);
    mode = 'work';
    timerMode.textContent = 'Work Time';
    initTimer();
    isRunning = false;
    startBtn.textContent = 'Start';
}

// Mettre à jour les statistiques
function updateStats() {
    todayPomodorosElement.textContent = pomodoroCount;
    const hours = Math.floor(totalFocusMinutes / 60);
    const mins = totalFocusMinutes % 60;
    totalFocusTimeElement.textContent = `${hours}h ${mins}m`;
}

// Système d'XP et de niveau
function addXP(amount) {
    xp += amount;
    
    // Vérifier si l'utilisateur passe au niveau suivant (100 XP par niveau)
    if (xp >= level * 100) {
        level++;
        levelBadge.textContent = `Level ${level}`;
        // Animation de niveau supérieur pourrait être ajoutée ici
    }
    
    // Mettre à jour la barre d'XP
    const xpForNextLevel = level * 100;
    const xpProgress2 = (xp % 100) / 100 * 100;
    xpProgress.style.width = `${xpProgress2}%`;
    xpText.textContent = `${xp % 100}/${xpForNextLevel} XP`;
}

// Déverrouiller un succès
function unlockAchievement(id) {
    const achievement = document.querySelector(`[data-achievement="${id}"]`);
    if (achievement && !achievement.classList.contains('unlocked')) {
        achievement.classList.add('unlocked');
        addXP(20); // Bonus XP pour déverrouiller un succès
        showNotification(`🎉 Achievement unlocked: ${achievement.querySelector('div:last-child').textContent}`);
    }
}

// Afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Ajouter une tâche
function addTask(text) {
    if (text.trim() === '') return;
    
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    
    const taskText = document.createElement('span');
    taskText.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });
    
    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.opacity = '0.6';
            addXP(5); // XP pour avoir terminé une tâche
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.opacity = '1';
        }
    });
    
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

// Écouteurs d'événements
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

workDurationInput.addEventListener('change', initTimer);
breakDurationInput.addEventListener('change', () => {
    if (mode === 'break') {
        minutes = parseInt(breakDurationInput.value);
        seconds = 0;
        originalDuration = minutes * 60;
        updateTimerDisplay();
    }
});

longBreakDurationInput.addEventListener('change', () => {
    if (mode === 'longBreak') {
        minutes = parseInt(longBreakDurationInput.value);
        seconds = 0;
        originalDuration = minutes * 60;
        updateTimerDisplay();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

// Ajouter un peu de style CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: bottom 0.3s ease;
}
.notification.show {
    bottom: 20px;
}
`;
document.head.appendChild(style);

// Initialiser le timer au chargement
window.addEventListener('load', initTimer);
const toggleModeBtn = document.createElement('button');
toggleModeBtn.className = 'toggle-mode';
toggleModeBtn.textContent = 'Switch Mode';
document.querySelector('.header').appendChild(toggleModeBtn);

// Load user preference from localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});
