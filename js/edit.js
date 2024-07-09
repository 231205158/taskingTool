/*id=
    task-edit 編集する課題
    
        task-text タスク名
        task-time-did 経過時間
        task-time-expect 予想必要時間
        task-limit 期限
*/

const loadLocalStorage = () => {
    var index = 0;
    var editTask = JSON.parse(localStorage.getItem('preTasks'))[index] || [{text:'新規タスク', limit:'', expectTime:0, didTimes:[0], editDates:['']}];

    document.getElementById('task-text').value = editTask.text;
    document.getElementById('task-time-did').value = editTask.didTimes[exListPre.didTimes.length -1];
    document.getElementById('task-time-expect').value = editTask.expectTime;
    document.getElementById('task-limit').value = editTask.limit;
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();
});
