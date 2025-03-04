// 비밀번호 토글 기능
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = this.previousElementSibling;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle visibility icon
    this.src = type === 'password' ? '/static/common/assets/icon/visibility.svg' : '/static/common/assets/icon/visibility_off.svg';
  });
  
  // 폼 제출 처리
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        userId: formData.get('userId'),
        password: formData.get('password')
    };
    
    // 여기에 로그인 API 호출 로직 추가
    console.log('Form submitted:', data);
  }