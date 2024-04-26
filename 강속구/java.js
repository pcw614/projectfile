// 캔버스 설정
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// 플레이어 객체
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    speed: 5
};

// 적 객체
const enemy = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 30,
    speed: 3
};

// 플레이어 이동 함수
function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (player.y - player.speed > 0) player.y -= player.speed;
            break;
        case 'ArrowDown':
            if (player.y + player.size + player.speed < canvas.height) player.y += player.speed;
            break;
        case 'ArrowLeft':
            if (player.x - player.speed > 0) player.x -= player.speed;
            break;
        case 'ArrowRight':
            if (player.x + player.size + player.speed < canvas.width) player.x += player.speed;
            break;
    }
}

// 캔버스 업데이트 함수
function update() {
    // 배경 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 플레이어 그리기
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // 적 그리기
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // 적 이동
    if (enemy.x < player.x) enemy.x += enemy.speed;
    if (enemy.x > player.x) enemy.x -= enemy.speed;
    if (enemy.y < player.y) enemy.y += enemy.speed;
    if (enemy.y > player.y) enemy.y -= enemy.speed;

    // 충돌 감지
    if (
        player.x < enemy.x + enemy.size &&
        player.x + player.size > enemy.x &&
        player.y < enemy.y + enemy.size &&
        player.y + player.size > enemy.y
    ) {
        alert('Game Over!');
        window.location.reload();
    }

    // 재귀 호출
    requestAnimationFrame(update);
}

// 이벤트 리스너 등록
document.addEventListener('keydown', movePlayer);

// 게임 시작
update();
