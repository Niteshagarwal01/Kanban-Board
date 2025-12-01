// DOM Elements
const taskInput = document.getElementById('taskInput');
const columnSelect = document.getElementById('columnSelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const editModal = document.getElementById('editModal');
const editTaskInput = document.getElementById('editTaskInput');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// State
let tasks = [];
let editingTaskId = null;
let taskIdCounter = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  renderAllTasks();
  setupDragAndDrop();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  clearAllBtn.addEventListener('click', clearAllTasks);
  saveEditBtn.addEventListener('click', saveEdit);
  cancelEditBtn.addEventListener('click', closeModal);
  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) closeModal();
  });
}

// Add Task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    shakeElement(taskInput);
    return;
  }

  const task = {
    id: `task-${taskIdCounter++}`,
    text: text,
    status: columnSelect.value
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  updateCounts();
  taskInput.value = '';
  taskInput.focus();
}

// Render Task
function renderTask(task) {
  const container = document.getElementById(`${task.status}-cards`);
  const card = createCardElement(task);
  container.appendChild(card);
}

// Create Card Element
function createCardElement(task) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = task.id;
  card.draggable = true;
  card.innerHTML = `
    <span class="card-text">${escapeHtml(task.text)}</span>
    <div class="card-actions">
      <button class="edit-btn" title="Edit"><i class="ri-pencil-line"></i></button>
      <button class="delete-btn" title="Delete"><i class="ri-delete-bin-line"></i></button>
    </div>
  `;

  // Card event listeners
  card.querySelector('.edit-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openEditModal(task.id);
  });

  card.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  // Drag events
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);

  return card;
}

// Render All Tasks
function renderAllTasks() {
  // Clear all containers
  document.getElementById('todo-cards').innerHTML = '';
  document.getElementById('progress-cards').innerHTML = '';
  document.getElementById('done-cards').innerHTML = '';

  // Render each task
  tasks.forEach(task => renderTask(task));
  updateCounts();
}

// Update Task Counts
function updateCounts() {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const progressCount = tasks.filter(t => t.status === 'progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  document.getElementById('todo-count').textContent = todoCount;
  document.getElementById('progress-count').textContent = progressCount;
  document.getElementById('done-count').textContent = doneCount;
}

// Delete Task
function deleteTask(id) {
  const card = document.getElementById(id);
  card.style.transform = 'scale(0)';
  card.style.opacity = '0';
  
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    card.remove();
    updateCounts();
  }, 200);
}

// Edit Task
function openEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    editingTaskId = id;
    editTaskInput.value = task.text;
    editModal.classList.add('active');
    editTaskInput.focus();
  }
}

function saveEdit() {
  const newText = editTaskInput.value.trim();
  if (!newText) {
    shakeElement(editTaskInput);
    return;
  }

  const task = tasks.find(t => t.id === editingTaskId);
  if (task) {
    task.text = newText;
    saveTasks();
    
    const card = document.getElementById(editingTaskId);
    card.querySelector('.card-text').textContent = newText;
  }

  closeModal();
}

function closeModal() {
  editModal.classList.remove('active');
  editingTaskId = null;
  editTaskInput.value = '';
}

// Clear All Tasks
function clearAllTasks() {
  if (tasks.length === 0) return;
  
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    saveTasks();
    renderAllTasks();
  }
}

// Drag and Drop
function setupDragAndDrop() {
  const lists = document.querySelectorAll('.list');
  
  lists.forEach(list => {
    const container = list.querySelector('.cards-container');
    container.addEventListener('dragover', dragOver);
    container.addEventListener('dragenter', dragEnter);
    container.addEventListener('dragleave', dragLeave);
    container.addEventListener('drop', dragDrop);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.id);
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
  document.querySelectorAll('.list').forEach(list => {
    list.classList.remove('over');
  });
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.closest('.list').classList.add('over');
}

function dragLeave(e) {
  // Only remove if leaving the container entirely
  if (!this.contains(e.relatedTarget)) {
    this.closest('.list').classList.remove('over');
  }
}

function dragDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(id);
  const list = this.closest('.list');
  const newStatus = list.dataset.status;
  
  // Update task status
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = newStatus;
    saveTasks();
  }
  
  // Move card to new container
  this.appendChild(card);
  list.classList.remove('over');
  updateCounts();
}

// Local Storage
function saveTasks() {
  localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  localStorage.setItem('kanbanTaskCounter', taskIdCounter);
}

function loadTasks() {
  const saved = localStorage.getItem('kanbanTasks');
  const savedCounter = localStorage.getItem('kanbanTaskCounter');
  
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    // Default tasks
    tasks = [
      { id: 'task-1', text: 'Design homepage mockup', status: 'todo' },
      { id: 'task-2', text: 'Review pull requests', status: 'todo' },
      { id: 'task-3', text: 'Implement user authentication', status: 'progress' },
      { id: 'task-4', text: 'Setup project repository', status: 'done' }
    ];
    taskIdCounter = 5;
    saveTasks();
    return;
  }
  
  taskIdCounter = savedCounter ? parseInt(savedCounter) : tasks.length + 1;
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function shakeElement(element) {
  element.style.animation = 'none';
  element.offsetHeight; // Trigger reflow
  element.style.animation = 'shake 0.5s ease';
  setTimeout(() => {
    element.style.animation = '';
  }, 500);
}

// Add shake animation via JS (in case CSS doesn't have it)
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);
