// detail.js 파일
console.log('detail.js 로드됨');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 이벤트 발생');
    
    // 더보기 버튼 기능
    const showMoreBtn = document.querySelector('.show-more-btn');
    const descriptionContent = document.querySelector('.description-content');
    
    console.log('showMoreBtn:', showMoreBtn);
    console.log('descriptionContent:', descriptionContent);
    
    if (showMoreBtn && descriptionContent) {
        console.log('버튼과 콘텐츠 요소를 찾았습니다');
        
        // 기존 이벤트 리스너 제거 (충돌 방지)
        showMoreBtn.removeEventListener('click', toggleDescription);
        
        // 새로운 이벤트 리스너 추가
        showMoreBtn.addEventListener('click', toggleDescription);
        
        function toggleDescription() {
            console.log('버튼 클릭됨');
            descriptionContent.classList.toggle('collapsed');
            
            if (descriptionContent.classList.contains('collapsed')) {
                showMoreBtn.textContent = '상세정보 더보기';
            } else {
                showMoreBtn.textContent = '상세정보 접기';
            }
        }
    } else {
        console.error('더보기 버튼 또는 콘텐츠 요소를 찾을 수 없습니다');
    }
    
    // 수량 조절 기능
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity-input');
    const totalPriceElement = document.querySelector('.total-price-value');
    
    if (minusBtn && plusBtn && quantityInput && totalPriceElement) {
        console.log('수량 조절 요소를 찾았습니다');
        
        // 초기 가격 파싱
        let basePrice = 39800; // 기본값
        
        if (document.querySelector('.price')) {
            const priceText = document.querySelector('.price').textContent;
            const priceNumber = priceText.replace(/[^0-9]/g, '');
            if (priceNumber) {
                basePrice = parseInt(priceNumber);
                console.log('기본 가격:', basePrice);
            }
        }
        
        function updateTotalPrice() {
            const quantity = parseInt(quantityInput.value);
            const total = basePrice * quantity;
            totalPriceElement.textContent = total.toLocaleString() + '원';
            console.log('총 가격 업데이트:', total);
        }
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
                updateTotalPrice();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
            updateTotalPrice();
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(quantityInput.value);
            if (value < 1 || isNaN(value)) {
                quantityInput.value = 1;
            }
            updateTotalPrice();
        });
    } else {
        console.error('수량 조절 요소를 찾을 수 없습니다');
    }
});