/*id=
    user-icon アイコン
    user-name ユーザー名
    did-time 勉強時間
    did-number 完了数
    remain-time 全課題残り時間
    remain-number 全課題残り数
*/

const loadLocalStorageForProfile = () => {
    const userIcon = document.getElementById('user-icon');
    const userName = document.getElementById('user-name');
    const didTime = document.getElementById('did-time');
    const didNumber = document.getElementById('did-number');
    const remainTimesAmount = document.getElementById('remain-time');
    const remainTasksAmount = document.getElementById('remain-number');

    var preTasks;
    var postTasks;
    var profile;
    var pinned;
    var emptyTask = [{text:'新規タスク', limit:'', expectTime:0, didTimes:[0], editDates:['']}];
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg', name:'仮野 名城'};
    const loadJSON = () => {
        preTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;
        postTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;
        profile = JSON.parse(localStorage.getItem('profile')) || emptyProfile;
        pinned = localStorage.getItem('pinnedTask') || 0;
    };

    loadJSON();
    userIcon.src = profile.icon;
    userName.textContent = profile.name;

    var didAmount = 0;
    preTasks.forEach(task => {
        didAmount += task.didTimes[task.didTimes.length -1];
    })
    didTime.textContent = didAmount;

    didNumber.textContent = postTasks.length;

    var remainTime = 0;
    preTasks.forEach(task => {
        remainTime += task.expectTime - task.didTimes[task.didTimes.length -1];
    });
    remainTimesAmount.textContent = remainTime;

    remainTasksAmount.textContent = preTasks.length;
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorageForProfile();
});

document.addEventListener('dataMade', () => {
    loadLocalStorageForProfile();
});