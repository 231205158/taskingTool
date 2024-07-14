/*id=
    task-list-post 完了済みの課題リスト
        task-text タスク名
        task-limit 期限
        task-time-expect 予想必要時間
        task-time-remain ↑の残り
        task-time-did 経過時間
        task-complete-date 完了日
*/

document.addEventListener('DOMContentLoaded', () => {
    const taskListPre = document.getElementById('task-list-pre');

    var emptyTask = [{text:'------', limit:'', expectTime:0, didTimes:[0], editDates:[]}];
    var preTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;

    document.getElementById('taskregistbutton').addEventListener("click", () => {
        localStorage.setItem('index', JSON.stringify(-1));
        window.location.href = 'edit.html';
    });

    taskListPre.innerHTML = '';
    preTasks.forEach((task, i) => {
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

        taskListPre.appendChild(li);

        li.addEventListener('click', () => {
            localStorage.setItem('index', JSON.stringify(i));
            window.location.href = 'edit.html';
        });
    });
});