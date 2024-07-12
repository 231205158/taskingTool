/*id=
    task-edit 編集する課題
    
        task-text タスク名
        task-time-did 経過時間
        task-time-expect 予想必要時間
        task-limit 期限
*/

const loadLocalStorageForEdit = () => {
    
    localStorage.getItem('preTasks')
    var index = JSON.parse(localStorage.getItem('editIndex')) || -1;
    var preTasks = JSON.parse(localStorage.getItem('preTasks')) || [];
    var editTask = preTasks[index] || {text:'タスク名', limit:'', expectTime:0, didTimes:[0], editDates:[]};

    document.getElementById('task-text').value = editTask.text;
    document.getElementById('task-time-did').value = editTask.didTimes[editTask.didTimes.length -1];
    document.getElementById('task-time-expect').value = editTask.expectTime;
    document.getElementById('task-limit').value = editTask.limit;
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorageForEdit();

    document.getElementById('registbutton').addEventListener("click", () => {
        var taskPre = JSON.parse(localStorage.getItem('preTasks')) || [];
        var taskElements = {text:'', limit:'', expectTime:0, didTimes:[0], editDates:[]};
        var index = JSON.parse(localStorage.getItem('editIndex')) || -1;

        taskElements.text = document.getElementById('task-text').value;
        taskElements.limit = document.getElementById('task-limit').value;
        taskElements.expectTime = parseInt(document.getElementById('task-time-expect').value, 10);
        taskElements.didTimes.push(parseInt(document.getElementById('task-time-did').value, 10));
    
        var today = new Date();
        var dayStr = today.getFullYear() + '/' + String(today.getMonth() + 1) + '/' + String(today.getDate());
        taskElements.editDates.push(dayStr);
        if(index !== -1){
            taskPre.splice(index, 1);
        };
        if (taskElements.didTimes[taskElements.didTimes.length - 1] < taskElements.expectTime){
            taskPre.push(taskElements);
            localStorage.setItem('preTasks', JSON.stringify(taskPre));
            window.location.href = 'taskprefinish.html';
        }else{
            var taskPost = JSON.parse(localStorage.getItem('ppstTasks')) || [];
            taskPost.push(taskElements);
            localStorage.setItem('ppstTasks', JSON.stringify(taskPost));
            window.location.href = 'taskfinish.html';
        };
    });
});
