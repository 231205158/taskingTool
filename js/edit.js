/*id=
    task-edit 編集する課題
    
        task-text タスク名
        task-time-did 経過時間
        task-time-expect 予想必要時間
        task-limit 期限
*/

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('preTasks')
    var index = JSON.parse(localStorage.getItem('index')) ?? -1;
    var preTasks = JSON.parse(localStorage.getItem('preTasks')) || [];
    var editTask = preTasks[index] || {text:'タスク名', limit:'', expectTime:0, didTimes:[0], editDates:[]};

    document.getElementById('task-text').value = editTask.text;
    document.getElementById('task-time-did').value = editTask.didTimes[editTask.didTimes.length -1];
    document.getElementById('task-time-expect').value = editTask.expectTime;
    document.getElementById('task-limit').value = editTask.limit;

    const setTask = (isPin) =>{
        var taskElements = {text:document.getElementById('task-text').value,
            limit:document.getElementById('task-limit').value,
            expectTime:parseInt(document.getElementById('task-time-expect').value, 10),
            didTimes:[],
            editDates:[]
        };

        if (index >= 0){
            taskElements.didTimes = editTask.didTimes;
            taskElements.editDates = editTask.editDates;
        }
        var isChange = ((index >= 0)&&((taskElements !== editTask)||
            (taskElements.didTimes[taskElements.didTimes.length -1] !== parseInt(document.getElementById('task-time-did').value, 10)))||
            ((index === -1)&&(taskElements.text !== 'タスク名')&&(taskElements.limit !== '')&&(taskElements.expectTime !== 0)));

        if (isChange){
            taskElements.didTimes.push(parseInt(document.getElementById('task-time-did').value, 10));
            var today = new Date();
            var dayStr = today.getFullYear() + '/' + String(today.getMonth() + 1) + '/' + String(today.getDate());
            taskElements.editDates.push(dayStr);
            if(index !== -1){
                preTasks.splice(index, 1);
            };

            var pinIndex = JSON.parse(localStorage.getItem('pinnedTask')) ?? -1;
            if (taskElements.didTimes[taskElements.didTimes.length - 1] < taskElements.expectTime){
                preTasks.push(taskElements);
                localStorage.setItem('preTasks', JSON.stringify(preTasks));
                if((isPin)){
                    localStorage.setItem('pinnedTask', JSON.stringify(preTasks.length -1));
                }else{
                    if ((pinIndex > index)&&(index !== -1)){
                        localStorage.setItem('pinnedTask', JSON.stringify(pinIndex -1));
                    };
                    if (pinIndex == index){
                        localStorage.setItem('pinnedTask', JSON.stringify(preTasks.length -1));
                    };
                };
                window.location.href = 'taskprefinish.html';
            }else{
                var postTasks = JSON.parse(localStorage.getItem('postTasks')) || [];
                postTasks.push(taskElements);
                localStorage.setItem('postTasks', JSON.stringify(postTasks));
                localStorage.setItem('preTasks', JSON.stringify(preTasks));
                if (pinIndex > index){
                    localStorage.setItem('pinnedTask', JSON.stringify(pinIndex -1));
                };
                if (pinIndex == index){
                    if (pinIndex != 0){
                        localStorage.setItem('pinnedTask', JSON.stringify(preTasks.length -1));
                    }
                };
                if (preTasks.length == 0){
                    localStorage.removeItem('preTasks');
                }
                if(index == 0){
                    localStorage.removeItem('pinnedTasks');
                }
                localStorage.removeItem('pinnedTask');
                window.location.href = 'taskfinish.html';
            };
        };
    };

    document.getElementById('registbutton').addEventListener("click", () => {
        setTask(false);
    });
    
    document.getElementById('pinbutton').addEventListener("click", () => {
        setTask(true);
    });
});
