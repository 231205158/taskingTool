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
    remain-time 全課題残り時間

    user-icon-header アイコン
    
*/

document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('user-icon-header');
    const remainTimesAmount = document.getElementById('remain-time-footer');
    
    userIcon.src = 'sampleIcon.jpg';
    remainTimesAmount.textContent = '4545';
});