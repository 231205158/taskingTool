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
    
    // 初期データを設定するなどの処理をここで行う
    var exListPre = [
        {'text':'真夏の夜の課題', 'limit':'2024/5/14 00:00', 'expectTime':114, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'現代の野獣（論文）', 'limit':'2024/4/5 00:00', 'expectTime':45, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'消息不明の男優', 'limit':'2024/8/10 00:00', 'expectTime':81, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ディジ信', 'limit':'2024/6/21 00:00', 'expectTime':100, 'didTimes':[0, 10, 25, 30], 'editDates':['2024/4/1', '2024/5/1', '2024/5/5', '2024/5/25']}];

    taskListPre.innerHTML = '';
    exListPre.forEach(task => {
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
        taskRemainTimeElement.textContent = String(task.expectTime - task.didTimes[task.didTimes.length -1]);

        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length -1]);

        li.appendChild(taskTextElement);
        li.appendChild(taskLimitElement);
        li.appendChild(taskExpectTimeElement);
        li.appendChild(taskRemainTimeElement);
        li.appendChild(taskDidTimeElement);

        taskListPre.appendChild(li);
    });
});
