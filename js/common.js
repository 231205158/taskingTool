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