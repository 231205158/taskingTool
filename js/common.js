// ヘッダ展開メニューのスクリプト
window.addEventListener('load', function () {
    var $button = document.querySelector('.toggle-menu-button');
    var $menu = document.querySelector('.header-site-menu');

    $button.addEventListener('click', function () {
        if ($menu.classList.contains('is-show')) {
            $menu.classList.remove('is-show');
        }
        else {
            $menu.classList.add('is-show');
        }
        });
    });
    
    $(function() {
        $(window).scroll(function() {
            $("nav.floating").stop().animate (
                {"top": $(window).scrollTop() + 100}, 500
            );
        });
    });

/*id=
    user-icon-header アイコン

    remain-time 全課題残り時間
*/

const loadLocalStorage = () => {
    const userIcon = document.getElementById('user-icon-header');
    const remainTimesAmount = document.getElementById('remain-time-footer');
    
    var preTasks;
    var postTasks;
    var profile;
    var pinned;
    var emptyTask = [{text:'新規タスク', limit:'', expectTime:0, didTimes:[0], editDates:['']}];
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg', name:'仮野 名城'};
    const loadJSON = () => {
        var isEmpty = false;
        preTasks = JSON.parse(localStorage.getItem('preTasks'));
        if(!(preTasks)){
            preTasks = emptyTask;
            isEmpty = true;
            localStorage.setItem('preTasks', JSON.stringify(preTasks));
        };
        postTasks = JSON.parse(localStorage.getItem('preTasks'));
        if(!(postTasks)){
            postTasks = [emptyTask, emptyTask];
            isEmpty = true;
            localStorage.setItem('postTasks', JSON.stringify(postTasks));
        };
        profile = JSON.parse(localStorage.getItem('profile'));
        if(!(profile)){
            preTasks = emptyProfile;
            isEempty = true;
            localStorage.setItem('profile', JSON.stringify(profile));
        };
        pinned = localStorage.getItem('pinnedTask');
        if(!(pinned)){
            preTasks = emptyTask;
            isEmpty = true;
            localStorage.setItem('pinned', JSON.stringify(pinned));
        };
        if(isEmpty){
            const event = new CustomEvent('dataMade');
            document.dispatchEvent(event);
        }
    };

    loadJSON();

    userIcon.src = profile.icon;

    var remainTime = 0;
    preTasks.forEach(task => {
        remainTime += task.expectTime - task.didTimes[task.didTimes.length -1];
    });
    remainTimesAmount.textContent = remainTime;
};

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();
});

document.addEventListener('datasSaved', () => {
    loadLocalStorage();
});