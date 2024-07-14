/*id=
    user-icon アイコン
    user-name ユーザー名
    did-time 勉強時間
    did-number 完了数
    remain-time 全課題残り時間
    remain-number 全課題残り数
*/

document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('user-icon');
    const didTime = document.getElementById('did-time');
    const didNumber = document.getElementById('did-number');
    const remainTimesAmount = document.getElementById('remain-time');
    const remainTasksAmount = document.getElementById('remain-number');

    var preTasks;
    var postTasks;
    var profile;
    var pinned;
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg', name:'仮野 名城'};
    preTasks = JSON.parse(localStorage.getItem('preTasks')) || [{expectTime:0, didTimes:[0]}];
    postTasks = JSON.parse(localStorage.getItem('preTasks')) || [];
    profile = JSON.parse(localStorage.getItem('profile')) || emptyProfile;
    pinned = localStorage.getItem('pinnedTask') || 0;

    userIcon.src = profile.icon;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    userIcon.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profile.icon = e.target.result;
                localStorage.setItem('profile', JSON.stringify(profile));
                window.location.href = 'profile.html';
            }
            reader.readAsDataURL(file);
        };
    });

    document.getElementById('user-name').value = profile.name;
    
    document.getElementById('renamebutton').addEventListener("click", () => {
        profile.name = document.getElementById('user-name').value;
        localStorage.setItem('profile', JSON.stringify(profile));
        window.location.href = 'profile.html';
    });

    var didAmount = 0;
    preTasks.forEach(task => {
        didAmount += task.didTimes[task.didTimes.length -1];
    });
    postTasks.forEach(task => {
        didAmount += task.didTimes[task.didTimes.length -1];
    });
    didTime.textContent = didAmount;

    didNumber.textContent = postTasks.length;

    var remainTime = 0;
    preTasks.forEach(task => {
        remainTime += task.expectTime - task.didTimes[task.didTimes.length -1];
    });
    remainTimesAmount.textContent = remainTime;

    if (preTasks.text){
        remainTasksAmount.textContent = preTasks.length;
    }else{
        remainTasksAmount.textContent = 0;
    }
    
    document.getElementById('resetbutton').addEventListener("click", () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
});