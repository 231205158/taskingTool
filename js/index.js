/*id=
    user-name ユーザー名
    user-icon アイコン

    task-pinned ピン止めされた課題

    remain-number 全課題残り数

    task-long 一番時間のかかる課題
    task-early 一番締め切りが早い課題
    
        task-text タスク名
        task-limit 期限
        task-time-expect 予想必要時間
        task-time-remain ↑の残り
        task-time-did 経過時間
        task-complete-date 完了日

    task-list-post-near 完了済みの課題最新二つのリスト
*/

document.addEventListener('DOMContentLoaded', () => {
    const userName = document.getElementById('user-name');
    const userIcon = document.getElementById('user-icon');
    const pinnedTask = document.getElementById('task-pinned');
    const remainTasksAmount = document.getElementById('remain-number');
    const longTask = document.getElementById('task-long');
    const earlyTask = document.getElementById('task-early');
    const finished2Tasks = document.getElementById('task-list-post-near');

    // 初期データを設定するなどの処理をここで行う
    var exListPre = [
        {'text':'真夏の夜の課題', 'limit':'2024/5/14 00:00', 'expectTime':114, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'現代の野獣（論文）', 'limit':'2024/4/5 00:00', 'expectTime':45, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'消息不明の男優', 'limit':'2024/8/10 00:00', 'expectTime':81, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ディジ信', 'limit':'2024/6/21 00:00', 'expectTime':100, 'didTimes':[0, 10, 25, 30], 'editDates':['2024/4/1', '2024/5/1', '2024/5/5', '2024/5/25']}];

    var exListPost = [
        {'text':'ダミー', 'limit':'2024/5/14 00:00', 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ヤジュミエール', 'limit':'2024/5/14 00:00', 'didTimes':[0, 19], 'editDates':['2024/4/1', '2024/1/9']}];

    // 特定のタスクを指定された要素に表示する関数
    const displayTaskInElement = (task, constName) => {
        if (constName) {
            constName.innerHTML = ''; // 現在の内容をクリア

            const taskTextElement = document.createElement('div');
            taskTextElement.className = 'task-text';
            taskTextElement.textContent = task.text;
    
            const taskLimitElement = document.createElement('div');
            taskLimitElement.className = 'task-limit';
            taskLimitElement.textContent = task.limit;
    
            const taskExpectTimeElement = document.createElement('div');
            taskExpectTimeElement.className = 'task-time-expect';
            taskExpectTimeElement.textContent = task.expectTime;
            
            const taskRemainTimeElement = document.createElement('div');
            taskRemainTimeElement.className = 'task-time-remain';
            taskRemainTimeElement.textContent = String(task.expectTime - task.didTimes[task.didTimes.length -1]);
    
            const taskDidTimeElement = document.createElement('div');
            taskDidTimeElement.className = 'task-time-did';
            taskDidTimeElement.textContent = String(task.didTimes[task.didTimes.length -1]);
    
            constName.appendChild(taskTextElement);
            constName.appendChild(taskLimitElement);
            constName.appendChild(taskExpectTimeElement);
            constName.appendChild(taskRemainTimeElement);
            constName.appendChild(taskDidTimeElement);
        };
    };

    userIcon.src = 'images/profile-image/sampleIcon.jpg';
    userName.textContent = '田所　浩二';
    
    displayTaskInElement(exListPre[2], pinnedTask);
    
    remainTasksAmount.textContent = '810';

    displayTaskInElement(exListPre[0], longTask);
    displayTaskInElement(exListPre[1], earlyTask);

    finished2Tasks.innerHTML = '';
    exListPost.slice(-2).forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = task.editDates[task.editDates.length -1];
        
        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = String(task.didTimes.reduce((a, b) => a + b, 0));

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        finished2Tasks.appendChild(li);
    });
});
