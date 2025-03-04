document.addEventListener('DOMContentLoaded', function() {
    // 드롭다운 요소 선택
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // 현재 페이지 URL을 확인하여 버튼 텍스트 업데이트
    const currentPath = window.location.pathname;
    const isSecondPage = currentPath.includes('knowledge2');
    const dropdownText = isSecondPage ? '지식공간2' : '지식공간1';
    
    // 드롭다운 버튼의 텍스트 업데이트
    dropdownBtn.innerHTML = dropdownText + ' <span class="arrow-down">▼</span>';
    
    // 드롭다운 버튼 클릭 이벤트
    dropdownBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 이벤트 방지
        e.stopPropagation(); // 이벤트 전파 중단
        dropdown.classList.toggle('active');
        console.log('드롭다운 버튼 클릭됨:', dropdown.classList.contains('active'));
    });
    
    // 문서 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        console.log('문서 클릭됨');
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Escape 키 누를 때 드롭다운 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });
    
    // 디버깅용 코드
    console.log('드롭다운 초기화 완료');
    console.log('드롭다운 버튼:', dropdownBtn);
    console.log('드롭다운 컨텐츠:', dropdownContent);
});