// app.js

// ---- Constants / Keys ----
const STORAGE_KEY = 'todo-app-items-v1';
const FILTER_KEY = 'todo-app-filter-v1';

// ---- State ----
let todos = [];
let currentFilter = loadFilter() || 'all';

// ---- Elements ----
const form = document.getElementById('todo-form');
const input = document.getElementById('new-todo');
const listEl = document.getElementById('todo-list');
const remainingEl = document.getElementById('remaining-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');
const template = document.getElementById('todo-item-template');
const exportBtn = document.getElementById('export-json');
const importBtn = document.getElementById('import-json');
const importFileInput = document.getElementById('import-file');

// ---- Initialization ----
init();

function init() {
  todos = loadTodos();
  render();
  attachEvents();
}

// ---- Persistence Helpers ----
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // Validate shape
    return parsed.filter(isValidTodo);
  } catch (e) {
    console.warn('Failed to parse todos from storage', e);
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos', e);
  }
}

function loadFilter() {
  try {
    return localStorage.getItem(FILTER_KEY);
  } catch {
    return null;
  }
}

function saveFilter(filter) {
  try {
    localStorage.setItem(FILTER_KEY, filter);
  } catch {}
}

// ---- Model / Utility ----
function isValidTodo(obj) {
  return obj && typeof obj.id === 'string' && typeof obj.text === 'string' && typeof obj.completed === 'boolean';
}

function createTodo(text) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(16).slice(2),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}

function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter((t) => !t.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((t) => t.completed);
  }

  return todos;
}

// ---- Rendering ----
function render() {
  // Clear list
  listEl.innerHTML = '';

  const shownTodos = getFilteredTodos();

  if (shownTodos.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match this filter.';
    empty.style.padding = '1rem .5rem';
    empty.style.color = '#666';
    listEl.appendChild(empty);
  } else {
    for (const todo of shownTodos) {
      listEl.appendChild(renderTodoItem(todo));
    }
  }

  const activeCount = todos.filter((t) => !t.completed).length;
  remainingEl.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  updateFilterButtonStates();
}

function renderTodoItem(todo) {
  const fragment = template.content.cloneNode(true);
  const li = fragment.querySelector('li');
  const checkbox = fragment.querySelector('.toggle');
  const label = fragment.querySelector('.todo-text');
  const editBtn = fragment.querySelector('.edit-btn');
  const deleteBtn = fragment.querySelector('.delete-btn');

  li.dataset.id = todo.id;

  if (todo.completed) {
    li.classList.add('completed');
  }

  checkbox.checked = todo.completed;
  label.textContent = todo.text;

  // Toggle
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
  });

  // Delete
  deleteBtn.addEventListener('click', () => {
    removeTodo(todo.id);
  });

  // Edit
  editBtn.addEventListener('click', () => {
    startEdit(label, todo.id);
  });

  // Inline double-click edit
  label.addEventListener('dblclick', () => startEdit(label, todo.id));

  return li;
}

function startEdit(labelEl, id) {
  if (labelEl.classList.contains('editing')) {
    return;
  }

  labelEl.classList.add('editing');
  const original = labelEl.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = original;
  input.style.width = '100%';
  input.style.background = '#101010';
  input.style.color = 'var(--text)';
  input.style.border = '1px solid var(--border)';
  input.style.padding = '.35rem .45rem';
  input.style.borderRadius = '6px';

  labelEl.replaceWith(input);
  input.focus();
  input.select();

  const cancelEdit = () => {
    input.replaceWith(labelEl);
    labelEl.classList.remove('editing');
  };

  const commitEdit = () => {
    const newValue = input.value.trim();
    if (newValue && newValue !== original) {
      updateTodo(id, { text: newValue });
    }
    cancelEdit();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      commitEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  });

  input.addEventListener('blur', commitEdit);
}

// ---- Actions ----
function addTodo(text) {
  if (!text.trim()) {
    return;
  }
  todos.push(createTodo(text));
  saveTodos();
  render();
}

function toggleTodo(id) {
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) {
    return;
  }
  todos[idx].completed = !todos[idx].completed;
  saveTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function updateTodo(id, props) {
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) {
    return;
  }
  todos[idx] = { ...todos[idx], ...props };
  saveTodos();
  render();
}

function clearCompleted() {
  const before = todos.length;
  todos = todos.filter((t) => !t.completed);
  if (todos.length !== before) {
    saveTodos();
    render();
  }
}

function setFilter(filter) {
  currentFilter = filter;
  saveFilter(filter);
  render();
}

// ---- UI Events ----
function attachEvents() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
    input.focus();
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFilter(btn.dataset.filter);
    });
  });

  exportBtn.addEventListener('click', exportTodos);
  importBtn.addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', importTodosFromFile);
}

function updateFilterButtonStates() {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

// ---- Import / Export ----
function exportTodos() {
  const payload = JSON.stringify({ version: 1, todos }, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = 'todos-export.json';
  a.href = url;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importTodosFromFile(e) {
  const file = e.target.files[0];

  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const data = JSON.parse(evt.target.result);
      if (!data || !Array.isArray(data.todos)) {
        alert('Invalid file format');
        return;
      }
      const imported = data.todos.filter(isValidTodo);
      // Merge: skip duplicate IDs
      const existingIds = new Set(todos.map((t) => t.id));
      const newOnes = imported.filter((t) => !existingIds.has(t.id));
      todos = [...todos, ...newOnes];
      saveTodos();
      render();
      alert(`Imported ${newOnes.length} new todos.`);
    } catch (err) {
      alert('Failed to parse JSON file.');
    } finally {
      importFileInput.value = '';
    }
  };
  reader.readAsText(file);
}

// ---- Debug Helpers (optional, can remove) ----
window.__todos = () => todos;
window.__resetTodos = () => {
  todos = [];
  saveTodos();
  render();
};
