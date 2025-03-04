document.addEventListener('DOMContentLoaded', function() {
    // 언어 선택 관련
    const languageSelect = document.querySelector('.language-select');
    const languageOptions = document.querySelector('.language-options');
    const selectedLanguageSpan = document.querySelector('.selected-language');
  
    languageSelect?.addEventListener('click', function() {
        languageOptions.classList.toggle('hidden');
    });
  
    languageOptions?.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            selectedLanguageSpan.textContent = e.target.getAttribute('data-lang');
            languageOptions.classList.add('hidden');
        }
    });
  
    // 메뉴 링크 정보
    const menuLinks = {
        '광고공간': '/advertisement',
        '건강': '/health',
        '고등부': '/highschool', 
        '고튜브': '/movie',
        '긍정을생각하다': '#',
        '논문보기': '#',
        '뉴스': '#',
        '동아리': '/club',
        '물품교환시장': '/exchange',
        '소통공간': '/communication',
        '선생님공간': '/teachers',
        '스트레스': '#',
        '아이월마트': '/market',
        '인류평화를말하다': '#',
        '지식공간': '/knowledge',
        '취미.여행.오락공간': '/hobby', 
        '학생공간': '/students',
        '학부모공간': '/parents',
        '효도': '#',
        '웹툰공간': '/webtoon',
        'KPOP': '/kpop',
        '나도위인': '/personality',
      };
  
    // 초성 추출 함수
    function getInitialConsonant(str) {
        const consonants = {
            'ㄱ': /^[가-깋]/,
            'ㄴ': /^[나-닣]/,
            'ㄷ': /^[다-딯]/,
            'ㄹ': /^[라-맇]/,
            'ㅁ': /^[마-밓]/,
            'ㅂ': /^[바-빟]/,
            'ㅅ': /^[사-싷]/,
            'ㅇ': /^[아-잏]/,
            'ㅈ': /^[자-짛]/,
            'ㅊ': /^[차-칳]/,
            'ㅋ': /^[카-킿]/,
            'ㅌ': /^[타-팋]/,
            'ㅍ': /^[파-핗]/,
            'ㅎ': /^[하-힣]/
        };
  
        if (/^[a-zA-Z]/.test(str)) {
            return 'ABC';
        }
  
        for (let consonant in consonants) {
            if (consonants[consonant].test(str)) {
                return consonant;
            }
        }
        return str.charAt(0);
    }
  
    // 가나다순 뷰 생성
    function generateAlphabeticalView() {
        const sorted = [...Object.keys(menuLinks)].sort((a, b) => a.localeCompare(b, 'ko'));
        const groups = {};
        
        sorted.forEach(item => {
            const consonant = getInitialConsonant(item);
            if (!groups[consonant]) groups[consonant] = [];
            groups[consonant].push(item);
        });
  
        const container = document.createElement('div');
        container.className = 'container';
  
        const orderedConsonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ABC'];
  
        orderedConsonants.forEach(consonant => {
            if (groups[consonant]?.length > 0) {
                const section = document.createElement('div');
                section.className = 'section';
                section.innerHTML = `
                    <h2 class="section-title">${consonant}</h2>
                    <div class="menu-grid">
                        ${groups[consonant].map(item => 
                            `<a href="${menuLinks[item]}" class="menu-item">${item}</a>`
                        ).join('')}
                    </div>
                `;
                container.appendChild(section);
            }
        });
  
        const alphabeticalView = document.getElementById('alphabetical-view');
        if (alphabeticalView) {
            alphabeticalView.innerHTML = '';
            alphabeticalView.appendChild(container);
        }
    }
  
    // 버튼 클릭 이벤트
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            document.querySelectorAll('.button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
            document.getElementById(`${view}-view`).classList.add('active');
  
            if (view === 'alphabetical') {
                generateAlphabeticalView();
            }
        });
    });
  
    // 모바일 메뉴 관련
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
  
    navToggle?.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });
  
    mobileMenuClose?.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });
  });