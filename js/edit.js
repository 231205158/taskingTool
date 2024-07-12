/*id=
    task-edit 編集する課題
    
        task-text タスク名
        task-time-did 経過時間
        task-time-expect 予想必要時間
        task-limit 期限
*/

const loadLocalStorage = () => {
    var index = JSON.parse(localStorage.getItem('editIndex')) || -1;
    var editTask;
    editTask = (JSON.parse(localStorage.getItem('preTasks'))[index] ||
        [{text:'タスク名', limit:'yyyy/mm/dd', expectTime:0, didTimes:[0], editDates:['']}]);

    document.getElementById('task-text').value = editTask.text;
    document.getElementById('task-time-did').value = editTask.didTimes[exListPre.didTimes.length -1];
    document.getElementById('task-time-expect').value = editTask.expectTime;
    document.getElementById('task-limit').value = editTask.limit;
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();

    document.getElementById('registbutton').addEventListener("click", () => {
        var taskList = JSON.parse(localStorage.getItem('preTasks')) || [];
        var taskElements = {text:'', limit:'', expectTime:0, didTimes:[0], editDates:['']};
        var index = JSON.parse(localStorage.getItem('editIndex')) || -1;
        taskElements.text = document.getElementById('task-text').value;
        taskElements.limit = document.getElementById('task-limit').value;
        taskElements.expectTime = document.getElementById('task-time-expect').value;
        taskElements.didTimes.push(document.getElementById('task-time-did').value);
    
        var today = new Date();
        var dayStr = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate()
        taskElements.editDates.push(dayStr);
        if(index != -1){
            taskList.splice(index, 1)
        }
        taskList.push(taskElements)
        localStorage.setItem('preTasks', JSON.stringify(taskList));
        window.location.href = 'taskprefinish.html';
    });
});
