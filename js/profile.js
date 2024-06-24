/*id=
    user-name ユーザー名
    user-icon アイコン
    did-time 勉強時間
    did-number 完了数
    remain-time 全課題残り時間
    remain-number 全課題残り数
*/

document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('user-icon');
    const userName = document.getElementById('user-name');
    const didTime = document.getElementById('did-time');
    const didNumber = document.getElementById('did-number');
    const remainTimesAmount = document.getElementById('remain-time');
    const remainTasksAmount = document.getElementById('remain-number');

    userIcon.src = 'sampleIcon.jpg';
    userName.textContent = '田所　浩二';
    didTime.textContent ='5';
    didNumber.textContent = '3';
    remainTimesAmount.textContent = '4545';
    remainTasksAmount.textContent = '810';
});
