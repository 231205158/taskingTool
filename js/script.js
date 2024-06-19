document.addEventListener('DOMContentLoaded', () => {
    const taskListPre = document.getElementById('task-list-pre');
    const taskListPost = document.getElementById('task-list-post');
    const finished2Tasks = document.getElementById('task-finished-near');

    // 初期データを設定するなどの処理をここで行う
    var exListPre = [
        {'text':'真夏の夜の課題', 'limit':'2024/5/14 00:00', 'ExpectTime':114, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'現代の野獣（論文）', 'limit':'2024/4/5 00:00', 'ExpectTime':45, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'消息不明の男優', 'limit':'2024/8/10 00:00', 'ExpectTime':81, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ディジ信', 'limit':'2024/6/21 00:00', 'ExpectTime':100, 'didTimes':[0, 10, 25, 30], 'editDates':['2024/4/1', '2024/5/1', '2024/5/5', '2024/5/25']}];

    var exListPost = [
        {'text':'ダミー', 'limit':'2024/5/14 00:00', 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ヤジュミエール', 'limit':'2024/5/14 00:00', 'didTimes':[0], 'editDates':['2024/4/1']}];

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
        taskExpectTimeElement.className = 'task-expectTime';
        taskExpectTimeElement.textContent = task.ExpectTime;
        
        const taskRemainTimeElement = document.createElement('span');
        taskRemainTimeElement.className = 'task-remainTime';
        taskRemainTimeElement.textContent = String(task.ExpectTime - task.didTimes[task.didTimes.length]);

        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-remainTime';
        taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length]);

        li.appendChild(taskTextElement);
        li.appendChild(taskLimitElement);
        li.appendChild(taskExpectTimeElement);
        li.appendChild(taskRemainTimeElement);
        li.appendChild(taskDidTimeElement);

        taskListPre.appendChild(li);
    });

    taskListPost.innerHTML = '';
    exListPost.forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = task.editDates[task.editDates.length];
        
        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-didTime';
        taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length]);

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        taskListPost.appendChild(li);
    });

    
    finished2Tasks.innerHTML = '';
    exListPost.forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = task.editDates[task.editDates.length];
        
        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-didTime';
        taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length]);

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        finished2Tasks.appendChild(li);
    });

    displayTaskInElement(exListPre[2], 'task-pinned');
    displayTaskInElement(exListPre[0], 'task-long');
    displayTaskInElement(exListPre[1], 'task-early');

    // 特定のタスクを指定された要素に表示する関数
    const displayTaskInElement = (task, elementId) => {
        const taskElement = document.getElementById(elementId);
        if (taskElement) {
            taskElement.innerHTML = ''; // 現在の内容をクリア

            const taskTextElement = document.createElement('div');
            taskTextElement.className = 'task-text';
            taskTextElement.textContent = task.text;
    
            const taskLimitElement = document.createElement('div');
            taskLimitElement.className = 'task-limit';
            taskLimitElement.textContent = task.limit;
    
            const taskExpectTimeElement = document.createElement('div');
            taskExpectTimeElement.className = 'task-expectTime';
            taskExpectTimeElement.textContent = task.ExpectTime;
            
            const taskRemainTimeElement = document.createElement('div');
            taskRemainTimeElement.className = 'task-remainTime';
            taskRemainTimeElement.textContent = String(task.ExpectTime - task.didTimes[task.didTimes.length]);
    
            const taskDidTimeElement = document.createElement('div');
            taskDidTimeElement.className = 'task-remainTime';
            taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length]);
    
            taskElement.appendChild(taskTextElement);
            taskElement.appendChild(taskLimitElement);
            taskElement.appendChild(taskExpectTimeElement);
            taskElement.appendChild(taskRemainTimeElement);
            taskElement.appendChild(taskDidTimeElement);
        }
    }; 
});
