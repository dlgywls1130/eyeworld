// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 비밀번호 표시/숨기기 토글 기능
    const togglePassword = (inputId, toggleId) => {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleId);
  
        toggle.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // 아이콘 토글
            this.src = type === 'password' ? '/static/common/assets/icon/visibility.svg' : '/static/common/assets/icon/visibility_off.svg';
        });
    };
  
    // 비밀번호 토글 적용
    togglePassword('password', 'togglePassword');
    togglePassword('passwordConfirm', 'togglePasswordConfirm');
  
    // 휴대전화 입력 처리
    const setupPhoneInput = (inputId, nextInputId, prevInputId) => {
        const input = document.getElementById(inputId);
        
        // 숫자만 입력 가능하도록 처리
        input.addEventListener('input', function(e) {
            // 숫자만 허용
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // maxlength에 도달하면 다음 입력으로 자동 이동
            if (this.value.length >= this.maxLength && nextInputId) {
                document.getElementById(nextInputId).focus();
            }
        });
  
        // 백스페이스 처리
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && prevInputId) {
                e.preventDefault();
                const prevInput = document.getElementById(prevInputId);
                prevInput.focus();
                prevInput.value = prevInput.value.slice(0, -1);
            }
        });
    };
  
    // 각 전화번호 입력 필드 설정
    setupPhoneInput('phone1', 'phone2', null);
    setupPhoneInput('phone2', 'phone3', 'phone1');
    setupPhoneInput('phone3', null, 'phone2');
  
    // 이메일 도메인 선택 처리
    const emailSelect = document.getElementById('emailSelect');
    const emailDomain = document.getElementById('emailDomain');
    const emailId = document.getElementById('emailId');
    const hiddenEmail = document.getElementById('email');
  
    // 도메인 선택 이벤트
    emailSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        if (selectedValue === '') {
            // 직접 입력 선택 시
            emailDomain.value = '';
            emailDomain.readOnly = false;
            emailDomain.focus();
        } else {
            // 도메인 선택 시
            emailDomain.value = selectedValue;
            emailDomain.readOnly = true;
        }
        updateHiddenEmail();
    });
  
    // 이메일 값 업데이트
    const updateHiddenEmail = () => {
        const id = emailId.value.trim();
        const domain = emailDomain.value.trim();
        hiddenEmail.value = id && domain ? `${id}@${domain}` : '';
    };
  
    // 이메일 입력 필드 변경 감지
    emailId.addEventListener('input', updateHiddenEmail);
    emailDomain.addEventListener('input', updateHiddenEmail);
  
    // 프로필 이미지 처리
    const profilePreview = document.querySelector('.profile-preview');
    const profileInput = document.getElementById('profileImage');
    const previewImage = document.getElementById('previewImage');
  
    profilePreview.addEventListener('click', () => {
        profileInput.click();
    });
  
    profileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
  
        // 파일 크기 검증 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            this.value = '';
            return;
        }
  
        // 파일 형식 검증
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('JPG, JPEG, PNG, GIF 파일만 업로드 가능합니다.');
            this.value = '';
            return;
        }
  
        // 이미지 프리뷰
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.width = '100%';
            previewImage.style.height = '100%';
            previewImage.style.objectFit = 'cover';
            profilePreview.querySelector('span').style.display = 'none';
        };
        reader.readAsDataURL(file);
    });
  
    // 폼 제출 처리
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 필수 입력 필드들
        const requiredFields = [
            { id: 'name', label: '성명' },
            { id: 'userId', label: '아이디' },
            { id: 'password', label: '비밀번호' },
            { id: 'passwordConfirm', label: '비밀번호 확인' },
            { id: 'nickname', label: '닉네임' },
            { id: 'emailId', label: '이메일' },
            { id: 'emailDomain', label: '이메일 도메인' }
        ];
  
        // 필수 필드 검증
        for (const field of requiredFields) {
            const input = document.getElementById(field.id);
            const value = input.value.trim();
  
            if (!value) {
                alert(`${field.label}을(를) 입력해주세요.`);
                input.focus();
                return;
            }
        }
  
        // 휴대전화 검증
        const phone1 = document.getElementById('phone1').value;
        const phone2 = document.getElementById('phone2').value;
        const phone3 = document.getElementById('phone3').value;
        
        if (!phone1 || !phone2 || !phone3) {
            alert('휴대전화 번호를 모두 입력해주세요.');
            if (!phone1) document.getElementById('phone1').focus();
            else if (!phone2) document.getElementById('phone2').focus();
            else document.getElementById('phone3').focus();
            return;
        }
  
        // 비밀번호 일치 검증
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        
        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            document.getElementById('passwordConfirm').focus();
            return;
        }
  
        // 비밀번호 복잡성 검증
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
            document.getElementById('password').focus();
            return;
        }
  
        // 이메일 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const fullEmail = `${emailId.value.trim()}@${emailDomain.value.trim()}`;
        if (!emailRegex.test(fullEmail)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            emailId.focus();
            return;
        }
  
        // SNS URL 형식 검증
        const urlFields = ['facebook', 'instagram', 'tiktok', 'blog', 'cafe'];
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  
        for (const fieldId of urlFields) {
            const input = document.getElementById(fieldId);
            const value = input.value.trim();
            
            if (value && !urlRegex.test(value)) {
                alert(`올바른 ${fieldId} URL을 입력해주세요.`);
                input.focus();
                return;
            }
        }
  
        // 모든 검증을 통과하면 폼 제출
        console.log('폼 검증 완료, 제출 진행');
        // 여기에 실제 폼 제출 로직 추가
        // form.submit();
        
        // 테스트를 위해 성공 메시지 표시
        alert('회원가입이 완료되었습니다!');
    });
  });