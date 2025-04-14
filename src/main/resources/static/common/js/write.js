/**
 * 게시판 작성 페이지 자바스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    // 에디터 초기화
    initEditor();
    
    // 이벤트 핸들러 등록
    setupEventHandlers();
});

/**
 * TinyMCE 에디터 초기화
 */
function initEditor() {
    tinymce.init({
        selector: '#editor',
        height: 400,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic underline strikethrough | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'link image | removeformat',
        content_style: `
            body { 
                font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; 
                font-size: 14px; 
                line-height: 1.6; 
                padding: 10px; 
            }
        `,
        file_picker_types: 'image',
        /* 이미지 업로드 기능 - 실제 서버 연동 시 사용
        images_upload_url: '/api/upload/image',
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/api/upload/image');
            
            xhr.onload = function() {
                var json;
                
                if (xhr.status !== 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }
                
                json = JSON.parse(xhr.responseText);
                
                if (!json || typeof json.location !== 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }
                
                success(json.location);
            };
            
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            
            xhr.send(formData);
        },
        */
    });
}

/**
 * 이벤트 핸들러 등록
 */
function setupEventHandlers() {
    // 비밀글 체크박스 이벤트
    const privateCheckbox = document.getElementById('isPrivate');
    if (privateCheckbox) {
        privateCheckbox.addEventListener('change', function() {
            const passwordBox = document.getElementById('passwordBox');
            if (this.checked) {
                passwordBox.classList.remove('hidden');
            } else {
                passwordBox.classList.add('hidden');
                document.getElementById('password').value = '';
            }
        });
    }

    // 파일 업로드 이벤트
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            const selectedFiles = document.getElementById('selectedFiles');
            selectedFiles.innerHTML = '';
            
            if (this.files.length > 0) {
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    const fileSize = (file.size / 1024).toFixed(1) + ' KB';
                    
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    
                    const fileName = document.createElement('span');
                    fileName.className = 'file-name';
                    fileName.textContent = file.name + ' (' + fileSize + ')';
                    
                    fileItem.appendChild(fileName);
                    selectedFiles.appendChild(fileItem);
                }
            }
        });
    }

    // 이미지 업로드 미리보기
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', function() {
            // 실제 구현에서는 이미지 미리보기 표시 가능
            if (this.files.length > 0) {
                console.log('이미지 선택됨:', this.files[0].name);
            }
        });
    }

    // 폼 제출 이벤트
    const boardForm = document.getElementById('boardWriteForm');
    if (boardForm) {
        boardForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 필수 필드 검증
            const category = document.getElementById('category').value;
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const content = tinymce.get('editor').getContent();
            
            if (!category) {
                alert('카테고리를 선택해주세요.');
                document.getElementById('category').focus();
                return;
            }
            
            if (!title) {
                alert('제목을 입력해주세요.');
                document.getElementById('title').focus();
                return;
            }
            
            if (!author) {
                alert('작성자를 입력해주세요.');
                document.getElementById('author').focus();
                return;
            }
            
            if (!content || content === '<p><br data-mce-bogus="1"></p>') {
                alert('내용을 입력해주세요.');
                tinymce.get('editor').focus();
                return;
            }
            
            const isPrivate = document.getElementById('isPrivate').checked;
            if (isPrivate) {
                const password = document.getElementById('password').value.trim();
                if (!password) {
                    alert('비밀글 비밀번호를 입력해주세요.');
                    document.getElementById('password').focus();
                    return;
                }
            }
            
            // 폼 데이터 생성
            const formData = new FormData(this);
            formData.append('content', content);
            
            // 데이터 전송 (주석 처리 - 실제 구현 시 활성화)
            /*
            fetch('/api/board/write', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('게시글이 등록되었습니다.');
                    window.location.href = '/board/list';
                } else {
                    alert('게시글 등록에 실패했습니다: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('게시글 등록 중 오류가 발생했습니다.');
            });
            */
            
            // 테스트용 코드
            console.log('폼 데이터:', {
                category: category,
                title: title,
                author: author,
                content: content,
                isPrivate: isPrivate,
                password: isPrivate ? document.getElementById('password').value : ''
            });
            
            alert('게시글이 등록되었습니다.');
            // 실제 구현 시 아래 코드 활성화
            // window.location.href = '/board/list';
        });
    }

    // 취소 버튼 이벤트
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('작성 중인 내용이 모두 사라집니다. 취소하시겠습니까?')) {
                history.back();
            }
        });
    }

    // 목록 버튼 이벤트
    const listBtn = document.getElementById('listBtn');
    if (listBtn) {
        listBtn.addEventListener('click', function() {
            if (confirm('작성 중인 내용이 저장되지 않습니다. 목록으로 이동하시겠습니까?')) {
                window.location.href = '/board/list';
            }
        });
    }
}