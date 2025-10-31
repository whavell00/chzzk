// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const wrapper = document.getElementById('wrapper');
    const liveList = document.getElementById('live-list');
    const navItems = document.querySelectorAll('.nav-item');
    const linkItems = document.querySelectorAll('.link-item');
    
    const mainVideo = document.getElementById('main-player'); 
    const volumeToggleBtn = document.getElementById('volume-toggle-btn');
    const volumeIcon = volumeToggleBtn ? volumeToggleBtn.querySelector('i') : null;

    const headerNavLinks = document.querySelectorAll('.main-nav .nav-text');
    
    const SIDEBAR_STATE_KEY = 'chzzkSidebarState';

    // 0. 페이지 로드 시 저장된 사이드바 상태를 확인하고 적용
    function loadSidebarState() {
        const savedState = localStorage.getItem(SIDEBAR_STATE_KEY) || 'collapsed';
        wrapper.classList.remove('expanded', 'collapsed');
        wrapper.classList.add(savedState);
    }
    
    // 1. 사이드바 토글 기능
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            wrapper.classList.toggle('expanded');
            wrapper.classList.toggle('collapsed');
            
            if (wrapper.classList.contains('expanded')) {
                localStorage.setItem(SIDEBAR_STATE_KEY, 'expanded');
            } else {
                localStorage.setItem(SIDEBAR_STATE_KEY, 'collapsed');
            }
        });
    }

    loadSidebarState();
    
    // 1.1. 메인 메뉴 항목 활성화/비활성화 기능
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            linkItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 1.2. 링크 항목 활성화/비활성화 기능
    linkItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // e.preventDefault(); 
            linkItems.forEach(i => i.classList.remove('active'));
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 헤더 메뉴 활성화 로직
    function setActiveHeaderNav() {
        // 현재 페이지 파일 이름 가져오기 (예: index.html, enter.html)
        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; 
        
        // '게임' 버튼은 index.html 또는 루트(/)에서만 기본 활성화
        const isIndexPage = (currentPath === 'index.html' || currentPath === ''); 

        headerNavLinks.forEach(link => {
            link.classList.remove('active'); 
            
            const linkHref = link.getAttribute('href').split('/').pop();
            const linkDataPage = link.getAttribute('data-page');

            const isCurrentLink = (currentPath === linkHref);

            // '게임' 버튼은 index.html에서만 활성화 (다른 페이지에서는 비활성화)
            if (isIndexPage && linkDataPage === 'index') {
                link.classList.add('active');
                return;
            }

            // 그 외 현재 경로와 일치하는 경우 활성화
            if (isCurrentLink) {
                link.classList.add('active');
            }
        });
    }

    // 페이지 로드 시 헤더 메뉴 활성화 상태 설정
    setActiveHeaderNav();
    
    // 2. 대형 영상 클릭 시 재생/일시정지 및 반복 기능
    if (mainVideo) {
        mainVideo.addEventListener('click', () => {
            if (mainVideo.paused) {
                mainVideo.play();
                console.log('Video Play');
            } else {
                mainVideo.pause();
                console.log('Video Pause');
            }
        });

        mainVideo.addEventListener('ended', () => {
            mainVideo.currentTime = 0; 
            mainVideo.play(); 
            console.log('Video Ended. Restarting playback.');
        });
    }

    // 3. 스피커 버튼 클릭 시 음소거/음소거 해제 및 아이콘 토글 기능
    if (volumeToggleBtn && mainVideo && volumeIcon) {
        volumeToggleBtn.addEventListener('click', () => {
            mainVideo.muted = !mainVideo.muted;

            if (mainVideo.muted) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
                console.log('Video Muted');
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
                console.log('Video Unmuted');
            }
        });
    }
    
    // 4. 외부 스트리밍 데이터 연동 (API 호출 시뮬레이션)
    function fetchAndRenderLiveStreams() {
        console.log('외부 스트리밍 API에서 방송 정보를 가져오는 중...');
        
        const dummyData = [
            { title: "오늘의 게임 방송", streamer: "스트리머A", viewers: 1500 },
            { title: "야방! 여행 브이로그", streamer: "스트리머B", viewers: 800 },
            { title: "신작 게임 리뷰", streamer: "스트리머C", viewers: 2200 },
            { title: "ASMR 수면 방송", streamer: "스트리머D", viewers: 1200 },
            { title: "요리 라이브", streamer: "스트리머E", viewers: 950 }
        ];

        if (liveList) {
            liveList.innerHTML = ''; 
            dummyData.forEach(stream => {
                const card = document.createElement('div');
                card.className = 'live-card';
                card.innerHTML = `
                    <div class="stream-info">
                        <p class="card-title">${stream.title}</p>
                        <p class="card-streamer">${stream.streamer}</p>
                        <p class="card-viewers">시청자: ${stream.viewers.toLocaleString()}</p>
                    </div>
                `;
                liveList.appendChild(card);
            });
        }
    }
    
    // 5. 페이지 로드 시 라이브 스트림 데이터 렌더링 (index.html에서만 실행)
    const currentPathCheck = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPathCheck === 'index.html' || currentPathCheck === '') {
        fetchAndRenderLiveStreams();
    }


    // 6. 로그인 버튼 클릭 이벤트
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('로그인 모달 또는 페이지로 이동하는 기능을 구현해야 합니다.');
        });
    }
    
    
    // -------------------------------------
    // 7. <<<< 롤링 배너 로직 추가 >>>>
    // -------------------------------------
    const banner = document.querySelector('.rolling-banner');

    if (banner) {
        // 원본 아이템 개수 (총 15개)
        const uniqueItemsCount = 15; 
        // 한 번에 넘길 카드 1개의 너비 (100% / 8개 보이기) = 12.5%
        const movePercentage = 100 / 8; 
        let currentIndex = 0; // 현재 이동한 아이템의 인덱스 (0 to 14)
        
        // 3초마다 배너를 왼쪽으로 스크롤
        setInterval(() => {
            currentIndex++;
            
            // 1개 아이템의 너비만큼 왼쪽으로 이동 (12.5% * currentIndex)
            banner.style.transform = `translateX(-${currentIndex * movePercentage}%)`;

            // 마지막 실제 아이템(인덱스 14)을 지나 복제된 첫 아이템(인덱스 15)에 도착했을 때
            if (currentIndex >= uniqueItemsCount) { 
                // 부드럽게 이동한 후 (0.5초) 트랜지션을 즉시 제거하고 첫 위치로 복귀 (순간 이동)
                setTimeout(() => {
                    banner.style.transition = 'none'; // 트랜지션 끄기
                    currentIndex = 0;
                    banner.style.transform = `translateX(0)`;
                    
                    // 다음 루프를 위해 트랜지션을 다시 켜기
                    setTimeout(() => {
                        banner.style.transition = 'transform 0.5s ease-in-out';
                    }, 50); 
                }, 500); // CSS transition 시간(0.5s)과 동일하게 설정
            }
        }, 3000); // 3초마다 실행
    }

});