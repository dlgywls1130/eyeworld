$(document).ready(function() {
    console.log("Language switcher initialized");
    
    // 페이지 로드 시 쿠키 초기화 (새로고침 시 원래 언어로 돌아가기)
    if (!sessionStorage.getItem('languageSelected')) {
        // 구글 번역 쿠키 삭제
        deleteCookie('googtrans');
    }
    
    // 언어 옵션 드롭다운 표시/숨김 기능
    $('.language-select').click(function(e) {
        e.stopPropagation();
        $('.language-options').toggleClass('hidden');
    });

    // 다른 곳 클릭시 드롭다운 닫기
    $(document).click(function() {
        $('.language-options').addClass('hidden');
    });

    // 언어 선택 처리 - Google Translate API 연동
    $('.language-options a').click(function(e) {
        e.preventDefault();
        
        const langCode = $(this).data('lang');
        const langText = $(this).text();
        
        console.log("Selected language:", langText, "code:", langCode);
        
        // 언어 선택했음을 세션에 저장 (새로고침 해도 유지)
        sessionStorage.setItem('languageSelected', 'true');
        
        // 드롭다운에 표시된 언어 업데이트
        $('.selected-language').text(langText);
        
        // Google Translate API 호출
        changeLanguage(langCode);
    });
    
    // Google Translate API를 사용하여 언어 변경
    function changeLanguage(langCode) {
        // 페이지 전체 새로고침 대신 번역 적용
        if (langCode === 'ko') {
            // 한국어(기본 언어)로 변경 시 번역 초기화
            deleteCookie('googtrans');
            location.reload();
        } else {
            // 다른 언어로 변경
            const selectElement = document.querySelector('.goog-te-combo');
            if (selectElement) {
                selectElement.value = langCode;
                selectElement.dispatchEvent(new Event('change'));
            } else {
                // 쿠키 설정
                document.cookie = `googtrans=/auto/${langCode}; path=/`;
                location.reload();
            }
        }
    }
    
    // 쿠키 삭제 함수
    function deleteCookie(name) {
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + '=; path=/; domain=' + location.hostname + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + '=; path=/; domain=.' + location.hostname + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
    // 초기 언어 표시 설정
    function setInitialLanguageDisplay() {
        const googtrans = getCookie('googtrans');
        if (googtrans) {
            const langCode = googtrans.split('/').pop();
            $('.language-options a').each(function() {
                if ($(this).data('lang') === langCode) {
                    $('.selected-language').text($(this).text());
                }
            });
        }
    }
    
    // 쿠키 읽기 함수
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
        return null;
    }
    
    // 초기 설정 실행
    setInitialLanguageDisplay();
});