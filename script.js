const input = document.getElementById('todo-input');
const addbtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const dueDateInput = document.getElementById('due-date');
const filterBtns = document.querySelectorAll('.filter-btn');

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodosNode(todo, index) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
        render();
    });

    // Text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Double click to edit
    textSpan.addEventListener("dblclick", () => {
        const newtext = prompt("Edit todo", todo.text);
        if (newtext !== null) {
            todo.text = newtext.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Due date badge
    if (todo.dueDate) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = '📅 ' + todo.dueDate;
        dateSpan.className = 'due-date-badge';
        li.appendChild(dateSpan);
    }

    // Delete button
    const delbtn = document.createElement('button');
    delbtn.textContent = "🗑";
    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
}

function render() {
    list.innerHTML = '';

    // Filter logic
    const filtered = todos.filter((todo, index) => {
        todo._index = index; // original index store karo delete ke liye
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filtered.forEach((todo) => {
        const node = createTodosNode(todo, todo._index);
        list.appendChild(node);
    });
}

function addtodo() {
    const text = input.value.trim();
    if (!text) { return; }

    todos.push({
        text,
        completed: false,
        dueDate: dueDateInput.value || null
    });

    input.value = '';
    dueDateInput.value = '';
    render();
    saveTodos();
}

// Filter buttons click
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// Enter key support
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addtodo();
});

addbtn.addEventListener("click", addtodo);
render();