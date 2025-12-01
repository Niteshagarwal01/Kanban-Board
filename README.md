# Kanban Board — Project Guide (Small Build #10)
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/02f4dbc6-6291-430a-afb9-dfffcbeb68dd" />


A modern, responsive Kanban board application with drag-and-drop functionality for task management. Organize your workflow by moving tasks between "To Do", "In Progress", and "Done" columns. Built with vanilla JavaScript, it features local storage persistence, CRUD operations, and a clean, mobile-friendly UI.

## 🚀 Features

* **Drag and Drop:** Move tasks between columns using HTML5 Drag and Drop API.
* **Add Tasks:** Create new tasks and assign them to any column instantly.
* **Edit Tasks:** Modify existing tasks with a sleek modal interface.
* **Delete Tasks:** Remove tasks with smooth animation feedback.
* **Task Counts:** Real-time count display for each column.
* **Local Storage:** Your tasks persist even after closing the browser.
* **Responsive Design:** Works on mobile, tablet, and desktop.
* **Accessible UI:** Keyboard and screen reader friendly.
* **No Dependencies:** Pure HTML, CSS, and JavaScript.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3
* **Logic:** Vanilla JavaScript (ES6+)
* **Styling:** CSS Custom Properties, clean green/white theme
* **Icons:** Remix Icons 4.0

## 📂 File Structure

* `index.html` — Main HTML structure and UI
* `style.css` — Modern styling with green/white theme and responsive layout
* `script.js` — Drag-and-drop logic, CRUD operations, and local storage

## ⚙️ How It Works

The app lets users create tasks and organize them across three columns: To Do, In Progress, and Done. Tasks can be dragged between columns to update their status. All changes are automatically saved to local storage.

```javascript
// Example: Add a new task
const task = {
  id: 'task-1',
  text: 'Design homepage mockup',
  status: 'todo'
};
tasks.push(task);
saveTasks();
```

## 📝 Usage Examples

**Adding a Task:**
```javascript
const task = {
  id: `task-${taskIdCounter++}`,
  text: 'New task description',
  status: 'progress'
};
tasks.push(task);
renderTask(task);
```

**Updating Task Status on Drop:**
```javascript
function dragDrop(e) {
  const id = e.dataTransfer.getData('text/plain');
  const task = tasks.find(t => t.id === id);
  task.status = newStatus;
  saveTasks();
}
```

**Saving to Local Storage:**
```javascript
localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
```

## 💻 Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Niteshagarwal01/basic-projects.git
   cd basic-projects/03-drag-and-drop
   ```
2. Open `index.html` in your browser.
3. **No installation required.**

## 🔧 Customization

* **Default Tasks:** Change initial tasks in `loadTasks()` in `script.js`.
* **Color Scheme:** Edit CSS variables in `:root` in `style.css`:
  ```css
  :root {
    --primary: #16a34a;
    --primary-light: #22c55e;
    --primary-dark: #15803d;
    --primary-bg: #f0fdf4;
    --white: #ffffff;
  }
  ```
* **Column Names:** Update headers in `index.html` and data attributes.

## 🎨 UI/UX Features

* **Clean Green/White Theme:** Professional, modern color palette
* **Hover Animations:** Cards reveal action buttons on hover
* **Smooth Transitions:** Drag effects and delete animations
* **Accessible Controls:** Large buttons, clear labels
* **Responsive Layout:** CSS Grid adapts to all screen sizes

## ⚡ Key Functions

| Function | Purpose |
|----------|---------|
| `addTask()` | Creates a new task and adds to board |
| `renderTask()` | Renders a task card to the DOM |
| `deleteTask()` | Removes a task with animation |
| `openEditModal()` | Opens modal to edit task text |
| `dragStart()` | Initiates drag operation |
| `dragDrop()` | Handles drop and updates task status |
| `saveTasks()` | Persists tasks to local storage |
| `loadTasks()` | Loads tasks from local storage |

## 📊 Data Structure

Tasks are stored as an array of objects:

```javascript
[
  { id: 'task-1', text: 'Design homepage', status: 'todo' },
  { id: 'task-2', text: 'Review PRs', status: 'progress' },
  { id: 'task-3', text: 'Setup repo', status: 'done' }
]
```

## 📱 Responsive Design

The app is fully responsive:

* **Desktop:** Three-column grid layout
* **Tablet:** Single column, max-width container
* **Mobile:** Stacked layout, touch-friendly

```css
@media (max-width: 1024px) {
  .board {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
}
```

---

*Contributions welcome — feel free to open issues or PRs to improve features, accessibility, or UI!*
