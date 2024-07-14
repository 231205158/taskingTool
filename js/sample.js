/*id=
    task-list-pre 未完了の課題リスト
    task-list-post 完了済みの課題リスト
    task-list-post-near 完了済みの課題最新二つのリスト

    task-pinned ピン止めされた課題
    task-long 一番時間のかかる課題
    task-early 一番締め切りが早い課題
    
        task-text タスク名
        task-limit 期限
        task-time-expect 予想必要時間
        task-time-remain ↑の残り
        task-time-did 経過時間
        task-complete-date 完了日

    remain-number 全課題残り数

    user-name ユーザー名
    user-icon アイコン
    
*/

const loadLocalStorage = () => {
    const taskListPre = document.getElementById('task-list-pre');
    const taskListPost = document.getElementById('task-list-post');
    const finished2Tasks = document.getElementById('task-list-post-near');
    const userName = document.getElementById('user-name');
    const userIcon = document.getElementById('user-icon');
    const remainTasksAmount = document.getElementById('remain-number');
    const pinnedTask = document.getElementById('task-pinned');
    const longTask = document.getElementById('task-long');
    const earlyTask = document.getElementById('task-early');
    
    var preTasks;
    var postTasks;
    var profile;
    var pinned;
    var emptyTask = [{text:'新規タスク', limit:'', expectTime:0, didTimes:[0], editDates:['']}];
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg', name:'仮野 名城'};
        preTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;
        postTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;
        profile = JSON.parse(localStorage.getItem('profile')) || emptyProfile;
        pinned = localStorage.getItem('pinnedTask') || 0;

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
            taskRemainTimeElement.textContent = task.expectTime - task.didTimes[task.didTimes.length -1];
    
            const taskDidTimeElement = document.createElement('div');
            taskDidTimeElement.className = 'task-time-did';
            taskDidTimeElement.textContent = task.didTimes[task.didTimes.length -1];
    
            constName.appendChild(taskTextElement);
            constName.appendChild(taskLimitElement);
            constName.appendChild(taskExpectTimeElement);
            constName.appendChild(taskRemainTimeElement);
            constName.appendChild(taskDidTimeElement);
        };
    };
    
    preTasks.innerHTML = '';
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
    });

    postTasks.innerHTML = '';
    exListPost.forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = task.editDates[task.editDates.length -1];
        
        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = task.didTimes[task.didTimes.length -1];

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        taskListPost.appendChild(li);
    });
    
    finished2Tasks.innerHTML = '';
    postTasks.slice(-2).forEach(task => {
        const li = document.createElement('li');

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = task.text;

        const taskCompleteDateElement = document.createElement('span');
        taskCompleteDateElement.className = 'task-completeDate';
        taskCompleteDateElement.textContent = task.editDates[task.editDates.length -1];
        
        const taskDidTimeElement = document.createElement('span');
        taskDidTimeElement.className = 'task-time-did';
        taskDidTimeElement.textContent = task.didTimes.reduce((a, b) => a + b, 0);

        li.appendChild(taskTextElement);
        li.appendChild(taskCompleteDateElement);
        li.appendChild(taskDidTimeElement);

        finished2Tasks.appendChild(li);
    });
    
    displayTaskInElement(exListPre[pinned], 'task-pinned', pinnedTask);

    var i = 0;
    var maxTime = {time:0, index:0}; 
    preTasks.forEach(task => {
        if(maxTime < task.expectTime){
            maxTime.time = task.expectTime;
            maxTime.index = i;
        };
        i++;
    });
    displayTaskInElement(exListPre[maxTime.index], 'task-long', longTask);

    var i = 0;
    var earliestDate = {date:new Date(), index:0};
    earliestDate.date.setDate(preTasks[0].limit);
    preTasks.slice(1).forEach(task =>{
        if(earliestDate.date > task.limit){
            earliestDate.date.setDate(task.limit);
            earliestDate.index = i;
        };
        i++;
    });
    displayTaskInElement(exListPre[maxTime.index], 'task-early', earlyTask);

    userIcon.src = profile.icon;
    userName.textContent = profile.name;

    remainTasksAmount.textContent = preTasks.length;
};


document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();
});



const saveDatas = () => {
    localStorage.setItem('preTasks', JSON.stringify(preTasks));
    localStorage.setItem('postTasks', JSON.stringify(postTasks));
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('pinned', JSON.stringify(pinned));

    const event = new CustomEvent('dataSaved');
    document.dispatchEvent(event);
};

saveDatas();

document.addEventListener('dataMade', () => {
    loadLocalStorage();
});