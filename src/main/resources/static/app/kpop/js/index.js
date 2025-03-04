

// Sort dropdown functionality
const sortDropdowns = document.querySelectorAll('.sort-dropdown');
sortDropdowns.forEach(dropdown => {
    const dropdownButton = dropdown.querySelector('.dropdown-button');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    });

    dropdownContent.querySelectorAll('button').forEach(option => {
        option.addEventListener('click', () => {
            dropdownButton.textContent = option.textContent;
            dropdownContent.classList.remove('show');
        });
    });
});

// More options dropdown functionality
document.querySelectorAll('.action-button.more').forEach(moreButton => {
    const trigger = moreButton.querySelector('.more-trigger');
    const options = moreButton.querySelector('.more-options');
    
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // 다른 열린 드롭다운 닫기
        document.querySelectorAll('.more-options.show').forEach(dropdown => {
            if (dropdown !== options) {
                dropdown.classList.remove('show');
            }
        });
        options.classList.toggle('show');
    });
});

// Heart button functionality
document.querySelectorAll('.action-button.heart').forEach(button => {
    button.addEventListener('click', () => {
        const img = button.querySelector('img');
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            button.classList.remove('active');
            img.src = '../../common/assets/images/ic_heart.png';
        } else {
            button.classList.add('active');
            img.src = '../../common/assets/images/ic_heart_active.png';
        }
    });
});

// Download button functionality (if needed)
document.querySelectorAll('.action-button.download').forEach(button => {
    button.addEventListener('click', () => {
        // 다운로드 로직 구현
        console.log('Download clicked');
    });
});

// Player button functionality
document.querySelectorAll('.player').forEach(button => {
    button.addEventListener('click', () => {
        const img = button.querySelector('img');
        const isPlaying = button.classList.contains('playing');
        
        if (isPlaying) {
            button.classList.remove('playing');
            img.src = '../../common/assets/images/ic_play.png';
        } else {
            button.classList.add('playing');
            img.src = '../../common/assets/images/ic_pause.png';
        }
    });
});

// 외부 클릭시 모든 드롭다운 닫기
document.addEventListener('click', (e) => {
    // Sort 드롭다운과 More 옵션 드롭다운이 아닌 영역 클릭시
    if (!e.target.closest('.sort-dropdown') && !e.target.closest('.action-button.more')) {
        // 모든 드롭다운 닫기
        document.querySelectorAll('.dropdown-content.show, .more-options.show').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// 드롭다운 내부 클릭시 이벤트 전파 중단
document.querySelectorAll('.dropdown-content, .more-options').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});


const itemsPerPage = 8;
let currentPage = 1;

const videoList = document.querySelector('.video__list');
const viewMoreBtn = document.querySelector('.view-more button');
const allItems = videoList.querySelectorAll('.video__item');

function showItems() {
 const startIndex = 0;
 const endIndex = currentPage * itemsPerPage;
 
 allItems.forEach((item, index) => {
   if (index < endIndex) {
     item.style.display = 'block';
   } else {
     item.style.display = 'none'; 
   }
 });

 if (endIndex >= allItems.length) {
   viewMoreBtn.disabled = true;
   viewMoreBtn.style.opacity = '0.7';
 }
}

showItems();

viewMoreBtn.addEventListener('click', () => {
 currentPage++;
 showItems();
});