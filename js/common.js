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

const loadLocalStorageForCommon = () => {
    const userIcon = document.getElementById('user-icon-header');
    const remainTimesAmount = document.getElementById('remain-time-footer');
    

    var preTasks;
    var profile;
    var emptyTask = [{expectTime:0, didTimes:[0]}];
    var emptyProfile = {icon:'images/profile-image/sampleIcon.jpg'};
    const loadJSON = () => {
        preTasks = JSON.parse(localStorage.getItem('preTasks')) || emptyTask;
        profile = JSON.parse(localStorage.getItem('profile')) || emptyProfile;
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
    loadLocalStorageForCommon();
});