// 언어 관련 상수 정의
const DEFAULT_LANGUAGE = '한국어';
const DEFAULT_LANGUAGE_CODE = 'ko';

// 언어 선택 드롭다운 관련 요소들
const languageSelect = document.querySelector('.language-select');
const languageOptions = document.querySelector('.language-options');
const selectedLanguage = document.querySelector('.selected-language');

// 드롭다운 토글
languageSelect.addEventListener('click', (e) => {
    e.stopPropagation();
    languageOptions.classList.toggle('hidden');
});

// 페이지 클릭시 드롭다운 닫기
document.addEventListener('click', () => {
    languageOptions.classList.add('hidden');
});

// 언어 코드 매핑
const languageCodes = {
    '한국어': 'ko',
    'English': 'en',
    '中文': 'zh-CN',
    'Español': 'es',
    'Français': 'fr',
    'Deutsch': 'de',
    '日本語': 'ja',
    'Русский': 'ru'
};

// 번역 최적화를 위한 설정
const TRANSLATION_CONFIG = {
    batchSize: 30,       // 한 번에 처리할 요소 수
    requestDelay: 20,    // API 요청 간 딜레이
    minTextLength: 2,    // 번역할 최소 텍스트 길이
    maxCacheSize: 1000   // 캐시 최대 크기
};

// 캐시 관리 개선
const translationCache = {
    cache: new Map(),
    add(key, value) {
        if (this.cache.size >= TRANSLATION_CONFIG.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    },
    get(key) {
        return this.cache.get(key);
    },
    has(key) {
        return this.cache.has(key);
    }
};

// 번역할 요소 찾기
function getTranslatableElements() {
    const elements = [];
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const parent = node.parentElement;
                const text = node.textContent.trim();
                if (
                    text && 
                    text.length >= TRANSLATION_CONFIG.minTextLength && 
                    !parent.closest('.language-options') &&
                    !parent.closest('.language-select') &&
                    !parent.closest('script') &&
                    !parent.closest('style') &&
                    !parent.closest('[data-no-translate]') &&
                    !/^\d+$/.test(text)
                ) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        }
    );

    let node;
    while (node = walker.nextNode()) {
        elements.push(node);
    }
    return elements;
}

// 번역 함수
async function translateText(text, targetLang) {
    const cacheKey = `${text}_${targetLang}`;
    
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }

    try {
        if (text.length < TRANSLATION_CONFIG.minTextLength) {
            return text;
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const translatedText = data[0]
            .map(item => item[0])
            .join(' ')
            .trim();

        translationCache.add(cacheKey, translatedText);
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// 페이지 번역
async function translatePage(targetLang) {
    if (targetLang === DEFAULT_LANGUAGE_CODE) return;

    document.body.style.cursor = 'wait';
    
    try {
        const elements = getTranslatableElements();
        const batches = [];
        
        for (let i = 0; i < elements.length; i += TRANSLATION_CONFIG.batchSize) {
            batches.push(elements.slice(i, i + TRANSLATION_CONFIG.batchSize));
        }

        for (const batch of batches) {
            await Promise.all(
                batch.map(async element => {
                    const text = element.textContent.trim();
                    if (text) {
                        const translated = await translateText(text, targetLang);
                        if (translated && translated !== text) {
                            // 원본 텍스트의 앞뒤 공백 유지
                            const originalText = element.textContent;
                            const leadingSpace = originalText.match(/^\s*/)[0];
                            const trailingSpace = originalText.match(/\s*$/)[0];
                            element.textContent = leadingSpace + translated + trailingSpace;
                        }
                    }
                })
            );
            
            await new Promise(resolve => setTimeout(resolve, TRANSLATION_CONFIG.requestDelay));
        }

        // placeholder 번역
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        for (const input of inputs) {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder && !input.closest('[data-no-translate]')) {
                const translatedPlaceholder = await translateText(placeholder, targetLang);
                input.setAttribute('placeholder', translatedPlaceholder);
            }
        }

    } catch (error) {
        console.error('Page translation error:', error);
    } finally {
        document.body.style.cursor = 'default';
    }
}

// 페이지 초기화 함수
function initializePage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    
    if (!savedLanguage) {
        localStorage.setItem('selectedLanguage', DEFAULT_LANGUAGE);
        selectedLanguage.textContent = DEFAULT_LANGUAGE;
        return;
    }
    
    selectedLanguage.textContent = savedLanguage;
    
    if (savedLanguage !== DEFAULT_LANGUAGE) {
        setTimeout(() => {
            const targetLangCode = languageCodes[savedLanguage];
            translatePage(targetLangCode);
        }, 100);
    }
}

// 언어 선택 이벤트
languageOptions.addEventListener('click', async (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedLang = e.target.dataset.lang;
        const targetLangCode = languageCodes[selectedLang];

        localStorage.setItem('selectedLanguage', selectedLang);
        
        if (selectedLang === DEFAULT_LANGUAGE) {
            window.location.reload();
            return;
        }

        selectedLanguage.textContent = selectedLang;
        languageOptions.classList.add('hidden');
        await translatePage(targetLangCode);
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});

// 페이지 로드 완료 후 한번 더 체크
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== DEFAULT_LANGUAGE) {
        const targetLangCode = languageCodes[savedLanguage];
        translatePage(targetLangCode);
    }
});


// 탭 관련 코드
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
});

// 페이지 탭
$(document).ready(function(){
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
});

// 메뉴 토글 컨트롤
const navToggle = document.querySelector('.nav-toggle');
const fullMenu = document.querySelector('.full-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');

// 데스크톱 전체 메뉴 토글
navToggle.addEventListener('click', () => {
    fullMenu.classList.toggle('hidden');
});

// 모바일 메뉴 컨트롤
navToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.stopPropagation();
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// 외부 클릭시 모바일 메뉴 닫기
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});