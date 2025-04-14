$(document).ready(function(){
    // 기존 탭 기능
    $('.common_box').each(function() {
        const $tabContainer = $(this);
        
        $tabContainer.find('ul.tabs li').click(function(){
            const tab_id = $(this).attr('data-tab');
            
            $tabContainer.find('ul.tabs li').removeClass('current');
            $tabContainer.find('.tab-content').removeClass('current');
            
            $(this).addClass('current');
            $tabContainer.find("#"+tab_id).addClass('current');
        });
        
        // 내부 탭 기능
        $tabContainer.find('ul.inner_tabs li').click(function(){
            const inner_tab_id = $(this).attr('data-inner-tab');
            const $currentTabContent = $(this).closest('.tab-content');
            
            $currentTabContent.find('ul.inner_tabs li').removeClass('current');
            $currentTabContent.find('.inner-tab-content').removeClass('current');
            
            $(this).addClass('current');
            $currentTabContent.find("#"+inner_tab_id).addClass('current');
        });
        
        // 초기 상태 설정
        const $firstTab = $tabContainer.find('ul.tabs li:first-child');
        const firstTabId = $firstTab.attr('data-tab');
        
        $firstTab.addClass('current');
        $tabContainer.find("#"+firstTabId).addClass('current');
        
        // 내부 탭 초기 상태 설정
        $tabContainer.find('.tab-content').each(function(){
            const $firstInnerTab = $(this).find('ul.inner_tabs li:first-child');
            const firstInnerTabId = $firstInnerTab.attr('data-inner-tab');
            
            $firstInnerTab.addClass('current');
            $(this).find("#"+firstInnerTabId).addClass('current');
        });
    });

    // 페이지 탭
    $('.page_tab').each(function() {
        const $tabContainer = $(this);
        
        $tabContainer.find('ul.tabs li').click(function(){
            const tab_id = $(this).attr('data-tab');
            
            $tabContainer.find('ul.tabs li').removeClass('current');
            $tabContainer.find('.tab-content').removeClass('current');
            
            $(this).addClass('current');
            $tabContainer.find("#"+tab_id).addClass('current');
        });
        
        // 초기 상태 설정
        const $firstTab = $tabContainer.find('ul.tabs li:first-child');
        const firstTabId = $firstTab.attr('data-tab');
        
        $firstTab.addClass('current');
        $tabContainer.find("#"+firstTabId).addClass('current');
    });

    // 언어 드롭다운 기능
    $('.language-select').click(function(e) {
        e.stopPropagation();
        $('.language-options').toggleClass('hidden');
    });

    $('.language-options a').click(function(e) {
        e.preventDefault();
        const lang = $(this).data('lang');
        const langText = $(this).text();
        $('.selected-language').text(langText);
        $('.language-options').addClass('hidden');
        // 여기에 언어 변경 로직 추가
    });

    $(document).click(function() {
        $('.language-options').addClass('hidden');
    });

    // 메뉴 토글 컨트롤
    const navToggle = document.querySelector('.nav-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    const fullMenu = document.querySelector('.full-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');

    // 데스크톱/모바일 분기 처리
    navToggle.addEventListener('click', (e) => {
        // 모바일 환경
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            // 모바일에서는 메뉴 아이콘 애니메이션 적용 안함
        } 
        // 데스크톱 환경
        else {
            fullMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('open');
        }
    });

    // 모바일 메뉴 닫기 버튼
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 외부 클릭시 모두 닫기
    document.addEventListener('click', (e) => {
        // 데스크톱에서 외부 클릭시 메뉴 닫기
        if (!fullMenu.classList.contains('hidden') && 
            !fullMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            fullMenu.classList.add('hidden');
            menuIcon.classList.remove('open');
        }
        
        // 모바일에서 외부 클릭시 메뉴 닫기
        if (window.innerWidth <= 768 && 
            mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 로그아웃 기능
    $('.logout').click(function() {
        // 로그아웃 처리 로직
        location.href = '/logout';
    });

    // 반응형 처리
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // 모바일 전환 시 메뉴 초기화
            menuIcon.classList.remove('open');
            fullMenu.classList.add('hidden');
        }
    });
});