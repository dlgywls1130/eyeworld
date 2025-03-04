document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-health");
    const contents = document.querySelectorAll(".content-health");
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // 모든 탭에서 active 클래스 제거
        tabs.forEach((t) => t.classList.remove("active"));
        // 클릭된 탭에 active 클래스 추가
        tab.classList.add("active");
  
        // 모든 콘텐츠 숨기기
        contents.forEach((content) => content.classList.remove("active"));
  
        // 클릭된 탭에 해당하는 콘텐츠 표시
        const tabName = tab.getAttribute("data-tab-health");
        const activeContent = document.getElementById(`${tabName}-content`);
        if (activeContent) {
          activeContent.classList.add("active");
        }
      });
    });
  });


