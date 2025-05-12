// Kanban board columns
const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

// Initial tasks (for demo/testing)
let tasks = [
  { id: 1, title: "Sample Task 1", column: "todo" },
  { id: 2, title: "Sample Task 2", column: "inprogress" },
];

// Utility to generate unique IDs
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Render the Kanban board
function renderBoard() {
  const board = document.createElement("div");
  board.className = "kanban-board";
  board.style.display = "flex";
  board.style.gap = "16px";

  columns.forEach((col) => {
    const colDiv = document.createElement("div");
    colDiv.className = "kanban-column";
    colDiv.style.flex = "1";
    colDiv.style.background = "#f4f4f4";
    colDiv.style.padding = "12px";
    colDiv.style.borderRadius = "8px";
    colDiv.style.minWidth = "220px";

    const colTitle = document.createElement("h2");
    colTitle.textContent = col.title;
    colDiv.appendChild(colTitle);

    // Task list
    const taskList = document.createElement("div");
    taskList.className = "task-list";
    // Drag-and-drop events for columns
    taskList.addEventListener("dragover", (e) => {
      e.preventDefault();
      taskList.classList.add("drag-over");
    });
    taskList.addEventListener("dragleave", () => {
      taskList.classList.remove("drag-over");
    });
    taskList.addEventListener("drop", (e) => {
      e.preventDefault();
      taskList.classList.remove("drag-over");
      const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.column !== col.id) {
        task.column = col.id;
        saveTasks();
        rerender();
      }
    });
    tasks
      .filter((t) => t.column === col.id)
      .forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "kanban-task";
        taskDiv.draggable = true;
        taskDiv.style.background = "#fff";
        taskDiv.style.margin = "8px 0";
        taskDiv.style.padding = "8px";
        taskDiv.style.borderRadius = "4px";
        taskDiv.style.position = "relative";

        // Drag-and-drop events
        taskDiv.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", task.id);
          setTimeout(() => {
            taskDiv.classList.add("dragging");
          }, 0);
        });
        taskDiv.addEventListener("dragend", () => {
          taskDiv.classList.remove("dragging");
        });

        // Task title span (for inline editing)
        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;
        titleSpan.className = "task-title";
        titleSpan.style.cursor = "pointer";
        titleSpan.onclick = () => {
          // Replace span with input for editing
          const input = document.createElement("input");
          input.type = "text";
          input.value = task.title;
          input.className = "edit-title-input";
          input.style.width = "80%";
          input.style.fontSize = "inherit";
          input.style.padding = "2px 4px";
          input.style.marginRight = "4px";
          // Replace span with input
          taskDiv.replaceChild(input, titleSpan);
          input.focus();
          // Save on blur or Enter
          function saveEdit() {
            const newTitle = input.value.trim();
            if (newTitle && newTitle !== task.title) {
              task.title = sanitize(newTitle);
              saveTasks();
            }
            rerender();
          }
          input.addEventListener("blur", saveEdit);
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              input.blur();
            } else if (e.key === "Escape") {
              rerender();
            }
          });
        };
        taskDiv.appendChild(titleSpan);

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.style.position = "absolute";
        delBtn.style.top = "4px";
        delBtn.style.right = "4px";
        delBtn.style.background = "transparent";
        delBtn.style.border = "none";
        delBtn.style.cursor = "pointer";
        delBtn.onclick = () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveTasks();
          rerender();
        };
        taskDiv.appendChild(delBtn);

        taskList.appendChild(taskDiv);
      });
    colDiv.appendChild(taskList);

    // Add task form
    const addForm = document.createElement("form");
    addForm.onsubmit = (e) => {
      e.preventDefault();
      const input = addForm.querySelector("input");
      const value = input.value.trim();
      if (value) {
        tasks.push({ id: generateId(), title: value, column: col.id });
        saveTasks();
        rerender();
        input.value = "";
      }
    };
    const addInput = document.createElement("input");
    addInput.type = "text";
    addInput.placeholder = "Add task...";
    addInput.required = true;
    addForm.appendChild(addInput);
    const addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.textContent = "+";
    addForm.appendChild(addBtn);
    colDiv.appendChild(addForm);

    board.appendChild(colDiv);
  });

  document.body.innerHTML = "";
  document.body.appendChild(board);
}

function rerender() {
  renderBoard();
}

function saveTasks() {
  localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("kanban_tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
}

// Initial load
loadTasks();
renderBoard();

// Add a simple sanitizer to prevent XSS
function sanitize(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}
