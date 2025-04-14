// 문서가 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 1. 전체 웹툰 탭 기능 (인기순/업데이트순/조회순/별점순)
    const sortTabInputs = document.querySelectorAll('.sort-tab-input[name="sort-tab"]');
    const sortContents = document.querySelectorAll('.sort-content');
    
    sortTabInputs.forEach(input => {
      input.addEventListener('change', function() {
        // 모든 콘텐츠 숨기기
        sortContents.forEach(content => {
          content.style.display = 'none';
        });
        
        // 선택된 탭에 해당하는 콘텐츠 표시
        const selectedTabId = this.id;
        let contentId;
        
        switch(selectedTabId) {
          case 'tab-popular':
            contentId = 'content-popular';
            break;
          case 'tab-update':
            contentId = 'content-update';
            break;
          case 'tab-view':
            contentId = 'content-view';
            break;
          case 'tab-rating':
            contentId = 'content-rating';
            break;
        }
        
        if(contentId) {
          document.getElementById(contentId).style.display = 'block';
        }
      });
    });
    
    // 2. 성별 탭 기능 (전체/여성/남성)
    const genderTabInputs = document.querySelectorAll('.sort-tab-input[name="gender-tab"]');
    const genderContents = document.querySelectorAll('.gender-content');
    
    genderTabInputs.forEach(input => {
      input.addEventListener('change', function() {
        // 모든 콘텐츠 숨기기
        genderContents.forEach(content => {
          content.style.display = 'none';
        });
        
        // 선택된 탭에 해당하는 콘텐츠 표시
        const selectedTabId = this.id;
        let contentId;
        
        switch(selectedTabId) {
          case 'gender-tab-all':
            contentId = 'gender-content-all';
            break;
          case 'gender-tab-female':
            contentId = 'gender-content-female';
            break;
          case 'gender-tab-male':
            contentId = 'gender-content-male';
            break;
        }
        
        if(contentId) {
          document.getElementById(contentId).style.display = 'block';
        }
      });
    });
  });