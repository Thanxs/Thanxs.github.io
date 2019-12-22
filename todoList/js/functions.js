'use strict';

const fillInTodoList = (data) => {
    $(data).each((_, item) => {
        createTodoListItem(item.id, item.name, item.priority);
    });
    setEventListener();    
};

const createTodoListItem = (taskId, taskName, priorityClass) => {
    $('.todo__list').append(`<li class="todo__item d-flex">
                                    <div class="todo__item-name ${priorityClass}" data-id="${taskId}">${taskName}</div>
                                    <div class="btn-block">
                                        <button type="button" class="btn btn-outline-danger btn-sm float-right btn-delete" data-id="${taskId}" data-toggle="modal" data-target="#exampleModal">
                                            <i class="fa fa-trash-o"></i>
                                        </button>
                                        <button type="button" class="btn btn-outline-success btn-sm float-right btn-edit" data-id="${taskId}" data-toggle="modal" data-target="#exampleModal">     
                                            &#9998;
                                        </button>                         
                                    </div>                        
                                </li>`);
     
};

const setEventListener = () => {    
    $('.btn-save').click(handleClickOnBtnSave);        
    $('.btn-priority').click(handleClickOnBtnPriority);
    $('.btn-status').click(handleClickOnBtnStatus);
    $('.btn-delete').click(handleClickOnBtnDelete);
    $('.btn-edit').click(handleClickOnBtnEdit);
    $('.btn-add').click(handleClickOnBtnAdd);
    $('.btn-add-confirm').click(handleClickOnBtnConfirmAdding);
};

const refreshInfo = (...selectors) => {
    $(selectors).each((_, selector) => {
        if ($(selector)) {
            $(selector).remove();
        }
    });    
};

const openModal = (...args) => {
    const [dataId, taskTitle, task, taskPriority, taskStatus, buttonClass, buttonText] = args;
    refreshInfo('.modal');
    $('#wrapper').append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"                                  aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${taskTitle}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                    <form>
                                        <div class="form-group">                        
                                            <input type="text" class="form-control input-edit" placeholder="type to add task" value="${task}">
                                        </div>
                                    </form>                                
                                    </div>
                                    <div class="priority">
                                        <h4 class="priority__title">Choose task priority</h4>
                                        <div class="todo-level-important">
                                            <button type="button" class="btn btn-secondary btn-priority">low</button>
                                            <button type="button" class="btn btn-info btn-priority">minor</button>
                                            <button type="button" class="btn btn-success btn-priority">major</button>
                                            <button type="button" class="btn btn-danger btn-priority">high</button>
                                            <div class="priority__choice">Priority: <strong>${taskPriority}</strong></div>
                                        </div>
                                    </div>
                                    <div class="status">
                                        <h4 class="status__title">Choose status</h4>
                                        <div class="todo-status">                                            
                                            <button type="button" class="btn btn-outline-info btn-status">Open</button>
                                            <button type="button" class="btn btn-outline-primary btn-status">In Progress</button>
                                            <button type="button" class="btn btn-outline-success btn-status">Done</button>
                                            <div class="status__choice">Status: <strong>${taskStatus}</strong></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-info ${buttonClass}" data-id="${dataId}" data-dismiss="modal">${buttonText}</button>
                                    </div>
                                </div>
                            </div>
                    </div>`);    
};

const OpenModalForDeleteConfirmation = (id) => {
    refreshInfo('.modal');
    $('#wrapper').append(`
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this task?</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>                                
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-danger btn-delete-confirm" data-dismiss="modal" data-id="${id}">Delete</button>
                                    </div>
                                </div>
                                </div>
                            </div>
    `);
    $('.btn-delete-confirm').click(handleClickOnBtnDeleteConfirm);
};

const generateIdOfNewTask = (todoTasks) => {
    return Math.max(...todoTasks.map(({id}) => id + 1));    
};

const getTaskIndex = (data, id) => {
    return data.findIndex((item) => {
        return item.id === id;
    });
};

const handleClickOnBtnDelete = (event) => {
    const dataId = parseInt($(event.target).closest('.btn-block').prev().attr('data-id'));    
    OpenModalForDeleteConfirmation(dataId);    
};

const handleClickOnBtnDeleteConfirm = (event) => {
    const dataId = parseInt($(event.target).attr('data-id'));
    const idx = getTaskIndex(todoData, dataId);

    todoData.splice(idx, 1);

    refreshInfo(`.todo__item [data-id="${dataId}"]`);    

    localStorage.setItem('todoList', JSON.stringify(todoData));
};

const handleClickOnBtnEdit = (event) => {    
    const dataId = parseInt($(event.target).attr('data-id'));
    const todoTask = $(event.target).closest('.btn-block').prev().text();
    const idx = getTaskIndex(todoData, dataId);    

    const taskPriority = todoData[idx].priority;
    const taskStatus = todoData[idx].status;
    openModal(dataId, todoTask, todoTask, taskPriority, taskStatus, 'btn-save', 'Save changes');
    setEventListener();    
};

const handleClickOnBtnSave = (event) => {
    const dataId = parseInt($(event.target).attr('data-id'));

    const idx = getTaskIndex(todoData, dataId);

    let editedValue = $('.input-edit').val();
    const editedPriority = $(event.target).attr('data-priority') || todoData[idx].priority;
    const editedStatus = $(event.target).attr('data-status') || todoData[idx].status;

    if (!editedValue) {
        editedValue = 'New Task';
    }
    
    todoData[idx].name = editedValue;
    todoData[idx].priority = editedPriority;
    todoData[idx].status = editedStatus;
    
    const todoTasks = $('.todo__item-name');
    $(todoTasks[idx]).text(editedValue)
    .removeAttr('class')
    .addClass('todo__item-name')
    .addClass(editedPriority);    
    
    localStorage.setItem('todoList', JSON.stringify(todoData));    
};

const handleClickOnBtnAdd = () => {    
    openModal('', 'New task', '', '', '', 'btn-add-confirm', 'Add new task');
    setEventListener();
};

const handleClickOnBtnConfirmAdding = (event) => {
    const dataPriority = $(event.target).attr('data-priority');
    const dataStatus = $(event.target).attr('data-status');
    addNewTask(todoData, dataPriority, dataStatus);
    $('.btn-delete').click(handleClickOnBtnDelete);    
    $('.btn-edit').click(handleClickOnBtnEdit);

    localStorage.setItem('todoList', JSON.stringify(todoData));    
}

const addNewTask = (todoData, priority, status) => {
    let idOfNewTask = generateIdOfNewTask(todoData);
    if (idOfNewTask === -Infinity) {
        idOfNewTask = 1;
    }
    let newTaskValue = $('.input-edit').val();

    if (!newTaskValue) {
        newTaskValue = 'New Task';
    }

    todoData.push({
        name: newTaskValue,
        priority: priority ? priority : 'low',
        status: status ? status: 'Open',
        id: idOfNewTask
    });
    
    const newTask = todoData[todoData.length - 1];

    createTodoListItem(newTask.id, newTask.name, newTask.priority);
}

const handleClickOnBtnPriority = (event) => {
    $('.priority__choice').html(`Priority: <strong>${$(event.target).text()}</strong>`);
    $('.btn-add-confirm').attr('data-priority', $(event.target).text());
    $('.btn-save').attr('data-priority', $(event.target).text());       
}

const handleClickOnBtnStatus = (event) => {
    $('.status__choice').html(`Status: <strong>${$(event.target).text()}</strong>`);
    $('.btn-add-confirm').attr('data-status', $(event.target).text());
    $('.btn-save').attr('data-status', $(event.target).text());
};

const filterTodoListByStatus = (todoData, status) => {
    return todoData.filter(item => {
        return item.status === status;
    });
};

const toggleStatus = (currentStatus) => {
    $('.btn-group-status').children().each((_, item) => {
        $(item).removeClass('btn-light').addClass('btn-dark');
    });
    $(currentStatus).removeClass('btn-dark').addClass('btn-light');
};

const handleClickOnBtnShowAll = (event) => {
    refreshInfo('.todo__item');
    fillInTodoList(todoData);
    toggleStatus(event.target);   
};

const handleClickOnBtnShowOpen = (event) => {    
    const todoDataOpenStatus = filterTodoListByStatus(todoData, 'Open');
    refreshInfo('.todo__item');
    fillInTodoList(todoDataOpenStatus);
    toggleStatus(event.target);       
 };

 const handleClickOnBtnShowInProgress = (event) => {    
    const todoDataInProgressStatus = filterTodoListByStatus(todoData, 'In Progress');
    refreshInfo('.todo__item');
    fillInTodoList(todoDataInProgressStatus);
    toggleStatus(event.target);   
 };

 const handleClickOnBtnShowDone = (event) => {    
    const todoDataDoneStatus = filterTodoListByStatus(todoData, 'Done');
    refreshInfo('.todo__item');
    fillInTodoList(todoDataDoneStatus);
    toggleStatus(event.target);    
 };

 const checkLocalStorage = () => {
    if (localStorage.getItem('todoList') !== null) {
        todoData = JSON.parse(localStorage.getItem('todoList'));
        fillInTodoList(todoData);
    } else {
        fillInTodoList(todoData);
    }
};

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                todoData = xhr.response;
                checkLocalStorage();
                resolve();
            }
        }
        xhr.send();
    });
}
