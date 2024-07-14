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
    
    var emptyTask = {text:'------', limit:'------', expectTime:0, didTimes:[0], editDates:['------']};
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg', name:'仮野 名城'};
    var preTasks = JSON.parse(localStorage.getItem('preTasks'))||[emptyTask];
    var postTasks = JSON.parse(localStorage.getItem('postTasks')) || [];
    while(postTasks.length < 2){
        postTasks.push(emptyTask);
    };
    var profile = JSON.parse(localStorage.getItem('profile')) || emptyProfile;
    var pinned = JSON.parse(localStorage.getItem('pinnedTask')) ?? (preTasks.length - 1);
    localStorage.setItem('pinnedTask', JSON.stringify(pinned));

    // 特定のタスクを指定された要素に表示する関数
    const displayTaskInElement = (taskList, constName, index) => {
        if (constName) {
            var task = taskList[index];
            constName.innerHTML = ''; // 現在の内容をクリア

            const taskTextElement = document.createElement('div');
            taskTextElement.className = 'task-text';
            taskTextElement.textContent = 'タスク名:' + task.text;
    
            const taskLimitElement = document.createElement('div');
            taskLimitElement.className = 'task-limit';
            taskLimitElement.textContent = '提出締切日:' + task.limit;
    
            const taskExpectTimeElement = document.createElement('div');
            taskExpectTimeElement.className = 'task-time-expect';
            taskExpectTimeElement.textContent = '必要時間' + task.expectTime + '分';
            
            const taskRemainTimeElement = document.createElement('div');
            taskRemainTimeElement.className = 'task-time-remain';
            taskRemainTimeElement.textContent = '完了まで' + (task.expectTime - task.didTimes[task.didTimes.length -1]) + '分';
    
            const taskDidTimeElement = document.createElement('div');
            taskDidTimeElement.className = 'task-time-did';
            taskDidTimeElement.textContent = '経過時間' + task.didTimes[task.didTimes.length -1] + '分';
    
            constName.appendChild(taskTextElement);
            constName.appendChild(taskLimitElement);
            constName.appendChild(taskExpectTimeElement);
            constName.appendChild(taskRemainTimeElement);
            constName.appendChild(taskDidTimeElement);
            
            constName.addEventListener('click', () => {
                localStorage.setItem('index', JSON.stringify(index));
                window.location.href = 'edit.html';
            });
        };
    };
    
    userIcon.src = profile.icon;
    userName.textContent = profile.name;
    
    displayTaskInElement(preTasks, pinnedTask, pinned);

    if (preTasks[0].text !== '------'){
        remainTasksAmount.textContent = preTasks.length;
    }else {
        remainTasksAmount.textContent = 0;
    }

    var i = 0;
    var maxTime = {time:0, index:0}; 
    preTasks.forEach((task, i) => {
        if(maxTime.time < task.expectTime){
            maxTime.time = task.expectTime;
            maxTime.index = i;
        };
    });
    displayTaskInElement(preTasks, longTask, maxTime.index);

    var earliestDate = {date:new Date(), index:0};
    if (preTasks[0].limit !== '------'){
        earliestDate.date = new Date(preTasks[0].limit)
        preTasks.forEach((task, index) =>{
            const taskDate = new Date(task.limit);
            if(earliestDate.date > taskDate){
                earliestDate.date = taskDate;
                earliestDate.index = index;
            }
        });
    }
    displayTaskInElement(preTasks, earlyTask, earliestDate.index);

    finished2Tasks.innerHTML = '';
    postTasks.slice(-2).forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = '名' + task.text;
        if(task.limit == '------'){
            taskTextElement.textContent = '';
        }

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = '終' + task.editDates[task.editDates.length -1];
        if(task.limit == '------'){
            taskCompleteDateElement.textContent = '';
        }

        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = '経過' + task.didTimes.reduce((a, b) => a + b, 0);
        if(task.limit == '------'){
            taskDidTimeElement.textContent = '';
        }

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        finished2Tasks.appendChild(li);
    });
});