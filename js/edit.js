/*id=
    task-edit 編集する課題
    
        task-text タスク名
        task-limit 期限
        task-time-expect 予想必要時間
        task-time-remain ↑の残り
        task-time-did 経過時間
        task-complete-date 完了日
*/

document.addEventListener('DOMContentLoaded', () => {
    const editTask = document.getElementById('task-edit');
    
    // 初期データを設定するなどの処理をここで行う
    var exListPre = [
        {'text':'真夏の夜の課題', 'limit':'2024/5/14 00:00', 'expectTime':114, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'現代の野獣（論文）', 'limit':'2024/4/5 00:00', 'expectTime':45, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'消息不明の男優', 'limit':'2024/8/10 00:00', 'expectTime':81, 'didTimes':[0], 'editDates':['2024/4/1']},
        {'text':'ディジ信', 'limit':'2024/6/21 00:00', 'expectTime':100, 'didTimes':[0, 10, 25, 30], 'editDates':['2024/4/1', '2024/5/1', '2024/5/5', '2024/5/25']}];

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
    
    displayTaskInElement(exListPre[1], editTask);
});
