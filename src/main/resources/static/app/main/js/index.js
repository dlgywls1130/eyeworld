
// 날씨 위젯


const API_KEY = '00cccdc7efd6eb466420d15644df435f';
const CITY = 'Seoul';

// 날씨 아이콘 이미지 경로 정의
const weatherIcons = {
    clear: '/static/common/assets/images/weather_sun.png',
    rain: '/static/common/assets/images/weather_run.png',
    rain_storm: '/static/common/assets/images/Rain_storm.png',
    thunderstorm: '/static/common/assets/images/thunderstorm.png',
    clouds: '/static/common/assets/images/weather_cloud.png',
    snow: '/static/common/assets/images/weather_snow.png',
    partly_cloudy: '/static/common/assets/images/partly_cloudy-sun.png'
};

// 날짜 포맷팅 함수
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('ko-KR', options);
}

// 날씨 데이터 가져오기
async function getWeatherData() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('날씨 데이터:', data);
        updateWeather(data);
    } catch (error) {
        console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
        document.querySelector('.weather-description').textContent = 
            '날씨 데이터를 불러오는데 실패했습니다';
    }
}

// 날씨 정보 업데이트
function updateWeather(data) {
    try {
        // 위치
        document.querySelector('.location').textContent = data.name;
        
        // 날짜
        document.querySelector('.date').textContent = formatDate(new Date());
        
        // 온도
        document.querySelector('.current-temp').textContent = 
            `${Math.round(data.main.temp)}°`;
        
        // 날씨 설명
        document.querySelector('.weather-description').textContent = 
            data.weather[0].description;
        
        // 최고/최저 온도
        document.querySelector('.temp-range').textContent = 
            `Max.: ${Math.round(data.main.temp_max)}° Min.: ${Math.round(data.main.temp_min)}°`;
        
        // 습도
        document.querySelector('.humidity').textContent = 
            `${data.main.humidity}%`;
        
        // 풍속
        document.querySelector('.wind-speed').textContent = 
            `${Math.round(data.wind.speed * 3.6)} km/h`;
        
        // 날씨 아이콘 업데이트
        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherId = data.weather[0].id;
        let iconPath;

        // 날씨 상태에 따른 아이콘 선택
        if (weatherId >= 200 && weatherId < 300) {
            iconPath = weatherIcons.thunderstorm;
        } else if (weatherId >= 300 && weatherId < 500) {
            iconPath = weatherIcons.rain;
        } else if (weatherId >= 500 && weatherId < 600) {
            iconPath = weatherId >= 502 ? weatherIcons.rain_storm : weatherIcons.rain;
        } else if (weatherId >= 600 && weatherId < 700) {
            iconPath = weatherIcons.snow;
        } else if (weatherId >= 801 && weatherId <= 802) {
            iconPath = weatherIcons.partly_cloudy;
        } else if (weatherId >= 803 && weatherId <= 804) {
            iconPath = weatherIcons.clouds;
        } else if (weatherId === 800) {
            iconPath = weatherIcons.clear;
        } else {
            iconPath = weatherIcons.clear; // 기본값
        }

        // 아이콘 이미지 삽입
        document.querySelector('.weather-icon').innerHTML = 
            `<img src="${iconPath}" alt="날씨 아이콘">`;

        // 강수 확률 (precipitation) - OpenWeatherMap API에서 직접 제공하지 않으므로 
        // 구름량(cloudiness)을 대신 표시
        document.querySelector('.precipitation').textContent = 
            `${data.clouds.all}%`;

        console.log('업데이트 완료');
    } catch (error) {
        console.error('데이터 업데이트 중 오류:', error);
    }
}

// 페이지 로드시 날씨 데이터 가져오기
document.addEventListener('DOMContentLoaded', getWeatherData);

// 주기적으로 날씨 업데이트 (5분마다)
setInterval(getWeatherData, 300000);


//  캘린더

class Calendar {
    constructor(container) {
        this.container = container;
        this.date = new Date();
        this.selectedDate = new Date();
        
        this.monthYearElement = container.querySelector('.month-year');
        this.calendarGrid = container.querySelector('.calendar-grid');
        
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        this.container.querySelector('.prev-month').addEventListener('click', () => {
            this.date.setMonth(this.date.getMonth() - 1);
            this.render();
        });

        this.container.querySelector('.next-month').addEventListener('click', () => {
            this.date.setMonth(this.date.getMonth() + 1);
            this.render();
        });
    }

    formatMonthYear(date) {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }

    createWeekdayHeader() {
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        weekdays.forEach(weekday => {
            const div = document.createElement('div');
            div.className = 'weekday';
            div.textContent = weekday;
            this.calendarGrid.appendChild(div);
        });
    }

    render() {
        // Update month and year
        this.monthYearElement.textContent = this.formatMonthYear(this.date);

        // Clear previous calendar
        this.calendarGrid.innerHTML = '';

        // Add weekday header
        this.createWeekdayHeader();

        const year = this.date.getFullYear();
        const month = this.date.getMonth();

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Get previous month's days to display
        const firstDayIndex = firstDay.getDay();
        const prevLastDay = new Date(year, month, 0).getDate();

        // Get total days in current month
        const lastDate = lastDay.getDate();

        // Create calendar grid
        let currentDay = 1;
        let nextMonthDay = 1;

        // Previous month's days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const div = document.createElement('div');
            div.className = 'day other-month';
            div.textContent = prevLastDay - i;
            this.calendarGrid.appendChild(div);
        }

        // Current month's days
        const today = new Date();
        while (currentDay <= lastDate) {
            const div = document.createElement('div');
            div.className = 'day';
            
            if (currentDay === today.getDate() && 
                this.date.getMonth() === today.getMonth() && 
                this.date.getFullYear() === today.getFullYear()) {
                div.classList.add('today');
            }
            
            div.textContent = currentDay;
            this.calendarGrid.appendChild(div);
            currentDay++;
        }

        // Next month's days
        const remainingDays = 42 - (firstDayIndex + lastDate);
        for (let i = 0; i < remainingDays; i++) {
            const div = document.createElement('div');
            div.className = 'day other-month';
            div.textContent = nextMonthDay;
            this.calendarGrid.appendChild(div);
            nextMonthDay++;
        }
    }
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.calendar-widget');
    new Calendar(calendarContainer);
});



document.addEventListener('DOMContentLoaded', function() {
        // 연예 스와이퍼 초기화
        const cultureSwiper = new Swiper('.cultureSwiper', {
            effect: 'slide',
            initialSlide: 0,
            allowSlideNext: true,
            allowSlidePrev: true,
            
            pagination: {
                el: '#news-tab-1 .swiper-navigation .swiper-pagination',
                type: 'custom',
                renderCustom: function(swiper, current, total) {
                    return `<span>문화</span> 더보기 ${current}/${total}`;
                }
            },
     
            navigation: {
                nextEl: '#news-tab-1 .swiper-navigation .swiper-next',
                prevEl: '#news-tab-1 .swiper-navigation .swiper-prev',
            },
        });


    // 연예 스와이퍼 초기화
    const entertainmentsSwiper = new Swiper('.entertainmentsSwiper', {
        effect: 'slide',
        initialSlide: 0,
        allowSlideNext: true,
        allowSlidePrev: true,
        
        pagination: {
            el: '#news-tab-2 .swiper-navigation .swiper-pagination',
            type: 'custom',
            renderCustom: function(swiper, current, total) {
                return `<span>연예</span> 더보기 ${current}/${total}`;
            }
        },
 
        navigation: {
            nextEl: '#news-tab-2 .swiper-navigation .swiper-next',
            prevEl: '#news-tab-2 .swiper-navigation .swiper-prev',
        },
    });
 
    // 스포츠
    const sportsSwiper = new Swiper('.sportsSwiper', {
        effect: 'slide',
        initialSlide: 0,
        allowSlideNext: true,
        allowSlidePrev: true,
        
        pagination: {
            el: '#news-tab-4 .swiper-navigation .swiper-pagination',
            type: 'custom',
            renderCustom: function(swiper, current, total) {
                return `<span>스포츠</span> 더보기 ${current}/${total}`;
            }
        },
    
        navigation: {
            nextEl: '#news-tab-4 .swiper-navigation .swiper-next',
            prevEl: '#news-tab-4 .swiper-navigation .swiper-prev',
        },
    });
 
 
    // 정치 탭 티커 기능
    function initTicker(activeSlide) {
        const items = activeSlide.querySelectorAll('.ticker-item');
        let currentIndex = 0;
        
        // 초기화: 모든 아이템 숨기기
        items.forEach(item => {
            item.style.transform = 'translateY(30px)';
            item.style.opacity = '0';
        });
        
        // 첫 번째 아이템 보이기
        if(items[0]) {
            items[0].style.transform = 'translateY(0)';
            items[0].style.opacity = '1';
        }
        
        function showNextItem() {
            // 현재 아이템 위로 이동
            items[currentIndex].style.transform = 'translateY(-30px)';
            items[currentIndex].style.opacity = '0';
 
            // 다음 인덱스 계산 (순환)
            currentIndex = (currentIndex + 1) % items.length;
 
            // 다음 아이템 표시
            items[currentIndex].style.transform = 'translateY(0)';
            items[currentIndex].style.opacity = '1';
 
            // 그 다음 아이템 준비
            const nextIndex = (currentIndex + 1) % items.length;
            setTimeout(() => {
                items[nextIndex].style.transform = 'translateY(30px)';
                items[nextIndex].style.opacity = '0';
            }, 500);
        }
 
        const interval = setInterval(showNextItem, 3000);
        return interval;
    }
 
    let currentInterval = null;
 
    // 정치 스와이퍼 초기화
    const politicsSwiper = new Swiper('.politicsNewsSwiper', {
        effect: 'slide',
        initialSlide: 0,
        allowSlideNext: true,
        allowSlidePrev: true,
        
        pagination: {
            el: '#news-tab-3 .swiper-navigation .swiper-pagination',
            type: 'custom',
            renderCustom: function(swiper, current, total) {
                return `<span>정치</span> 더보기 ${current}/${total}`;
            }
        },
    
        navigation: {
            nextEl: '#news-tab-3 .swiper-navigation .swiper-next',
            prevEl: '#news-tab-3 .swiper-navigation .swiper-prev',
        },
        
        on: {
            slideChange: function () {
                if(currentInterval) {
                    clearInterval(currentInterval);
                }
                const activeSlide = this.slides[this.activeIndex];
                if(activeSlide) {
                    currentInterval = initTicker(activeSlide);
                }
            },
        },
    });
 
    // 수동으로 첫 슬라이드의 티커 시작
    const firstSlide = document.querySelector('.politicsNewsSwiper .swiper-slide');
    if(firstSlide) {
        currentInterval = initTicker(firstSlide);
    }
 });