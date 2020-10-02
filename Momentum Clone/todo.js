const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {

    // event target 객체를 console에 찍어서 li 하나(parent) 에 접근할 수 있는 요소를 찾아봄.
    const btn = event.target;
    const li = btn.parentNode;

    // delete child node mdn
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // local 저장소에는 string으로밖에 저장이 안 되기 때문에 객체의 값들을 string으로 만들어 준다.
    // 안그러면 Object object 로 저장됨
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

// local storage 에 있는 toDo 배열을 가져와서 뿌려줌.
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        // JSON -> Javascript Object
        const parsedToDos = JSON.parse(loadedToDos);
        // 함수 따로 선언 안하고 바로 파라미터 내부 선언으로 사용 가능.
        parsedToDos.forEach(function(toDo) {
            paintTodo(toDo.text);
        });
    }
    
}

function paintTodo(text) {
    
    const li = document.createElement("li");
    const delBtn  = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: toDos.length + 1
    };

    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value="";
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();