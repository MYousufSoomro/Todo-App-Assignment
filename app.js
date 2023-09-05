//TODO APPLICATION
var inp = document.getElementById("inp");
var ul = document.getElementById("items");
var delAllBtn = document.getElementById("delAllBtn");

inp.focus();
var todoList = [];

function addTodo() {
  if (inp.value.trim() == "" || inp.value == undefined || inp.value == null) {
    return;
  } else {
    todoList.push(inp.value);
    inp.value = "";
    render();
  }
}

function render() {
  ul.innerHTML = "";

  if (todoList.length !== 0) {
    delAllBtn.style.display = "block";
  } else {
    delAllBtn.style.display = "none";
  }

  for (var i = 0; i < todoList.length; i++) {
    ul.innerHTML += `
    <li id="todoItem${i}" class="list-group-item d-flex justify-content-between align-items-center">
            ${todoList[i]}
            <span>
              <button class="btn btn-outline-warning btn-sm m-1" onclick="todoEdit(${i})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-outline-danger btn-sm m-1" onclick="todoDelete(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </span>
          </li>
    `;
  }
  inp.focus();
}

function todoDelete(i) {
  todoList.splice(i, 1);
  render();
}

function deleteAllTodos() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      todoList = [];
      render();
      Swal.fire("Deleted!", "Your todos has been deleted.", "success");
    }
  });
}

inp.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    addTodo();
  }
});

function todoEdit(i) {
  var todo = todoList[i];
  todoDelete(i);
  inp.value = todo;
  inp.focus();
}
