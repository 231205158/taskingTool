/*id=
    task-list-post 完了済みの課題リスト
        task-text タスク名
        task-limit 期限
        task-time-expect 予想必要時間
        task-time-remain ↑の残り
        task-time-did 経過時間
        task-complete-date 完了日
*/

const loadLocalStorageForTaskListFin = () => {
    const taskListPost = document.getElementById('task-list-post');

    var postTasks;
    var emptyTask = [{text:'------', limit:'', expectTime:0, didTimes:[0], editDates:['']}];
    const loadJSON = () => {
        postTasks = JSON.parse(localStorage.getItem('postTasks')) || emptyTask;
    };

    loadJSON();
    
    taskListPost.innerHTML = '';
    postTasks.forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskLimitElement = document.createElement('span');
        taskLimitElement.className = 'task-limit';
        taskLimitElement.textContent = task.limit;

        const taskExpectTimeElement = document.createElement('span');
        taskExpectTimeElement.className = 'task-time-expect';
        taskExpectTimeElement.textContent = task.expectTime;
        
        const taskRemainTimeElement = document.createElement('span');
        taskRemainTimeElement.className = 'task-time-remain';
        taskRemainTimeElement.textContent = task.expectTime - task.didTimes[task.didTimes.length -1];

        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = task.didTimes[task.didTimes.length -1];

        li.appendChild(taskTextElement);
        li.appendChild(taskLimitElement);
        li.appendChild(taskExpectTimeElement);
        li.appendChild(taskRemainTimeElement);
        li.appendChild(taskDidTimeElement);

        taskListPost.appendChild(li);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorageForTaskListFin();
});