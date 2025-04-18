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

document.addEventListener('DOMContentLoaded', function() {
    // 동영상 링크 복사 기능
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const videoLink = document.getElementById('video-link');

    if (copyLinkBtn && videoLink) {
        copyLinkBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(videoLink.href)
                .then(() => {
                    // 복사 성공 알림 표시
                    const notification = document.createElement('div');
                    notification.classList.add('copy-notification');
                    notification.textContent = '링크가 복사되었습니다.';
                    document.body.appendChild(notification);

                    // 2초 후 알림 제거
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                })
                .catch(err => {
                    console.error('링크 복사 실패:', err);
                    alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
                });
        });
    }

    // 파일 업로드 처리
    const videoUploadInput = document.getElementById('video-upload');
    const thumbnailUploadInput = document.getElementById('thumbnail-upload');
    
    // 동영상 파일 업로드 처리
    if (videoUploadInput) {
        const uploadArea = videoUploadInput.closest('.upload-area');
        
        // 드래그 앤 드롭 기능
        if (uploadArea) {
            // 드래그 이벤트 처리
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.remove('dragover');
                
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    videoUploadInput.files = e.dataTransfer.files;
                    handleVideoFile(e.dataTransfer.files[0], uploadArea);
                }
            });
        }
        
        // 파일 선택 처리
        videoUploadInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleVideoFile(this.files[0], uploadArea);
            }
        });
    }
    
    // 썸네일 파일 업로드 처리
    if (thumbnailUploadInput) {
        thumbnailUploadInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const thumbnailBox = this.closest('.thumbnail-box');
                handleThumbnailFile(this.files[0], thumbnailBox);
            }
        });
    }
    
    // 체크박스 상호 배타성 처리
    const publicCheckbox = document.getElementById('public-video');
    const privateCheckbox = document.getElementById('private-video');
    
    if (publicCheckbox && privateCheckbox) {
        publicCheckbox.addEventListener('change', function() {
            if (this.checked) {
                privateCheckbox.checked = false;
            }
        });
        
        privateCheckbox.addEventListener('change', function() {
            if (this.checked) {
                publicCheckbox.checked = false;
            }
        });
    }
});

// 동영상 파일 처리 함수
function handleVideoFile(file, uploadArea) {
    // 파일 타입 검증
    if (!file.type.startsWith('video/')) {
        alert('동영상 파일만 업로드 가능합니다.');
        return;
    }
    
    // 파일 크기 제한 (예: 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
        alert('파일 크기는 500MB 이하여야 합니다.');
        return;
    }
    
    // 파일 정보 표시
    const fileName = file.name;
    const fileSize = formatFileSize(file.size);
    
    // 업로드 상태 표시
    let statusDisplay = uploadArea.querySelector('.upload-status');
    if (!statusDisplay) {
        statusDisplay = document.createElement('div');
        statusDisplay.classList.add('upload-status');
        uploadArea.appendChild(statusDisplay);
    }
    
    // 파일명 표시
    let fileNameDisplay = uploadArea.querySelector('.uploaded-file-name');
    if (!fileNameDisplay) {
        fileNameDisplay = document.createElement('div');
        fileNameDisplay.classList.add('uploaded-file-name');
        uploadArea.appendChild(fileNameDisplay);
    }
    
    fileNameDisplay.textContent = `${fileName} (${fileSize})`;
    
    // 업로드 상태 변경
    statusDisplay.textContent = '업로드 준비 완료';
    statusDisplay.classList.add('upload-ready');
    
    // 여기에 실제 업로드 로직 추가 (AJAX 요청 등)
    // 이 예제에서는 실제 업로드는 구현하지 않고 UI만 업데이트
    
    // 업로드 영역 스타일 변경
    uploadArea.classList.add('file-selected');
    
    // 업로드 아이콘 숨기기
    const uploadIcon = uploadArea.querySelector('.upload-icon-large');
    if (uploadIcon) {
        uploadIcon.style.display = 'none';
    }
    
    // 미리보기 생성 (동영상인 경우)
    createVideoPreview(file, uploadArea);
}

// 썸네일 파일 처리 함수
function handleThumbnailFile(file, thumbnailBox) {
    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
    }
    
    // 파일 크기 제한 (예: 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
    }
    
    // 썸네일 박스 스타일 변경
    thumbnailBox.classList.add('thumbnail-uploaded');
    
    // 기존 아이콘 숨기기
    const icon = thumbnailBox.querySelector('.icon');
    if (icon) {
        icon.style.display = 'none';
    }
    
    // 텍스트 숨기기
    const text = thumbnailBox.querySelector('.option-name');
    if (text) {
        text.style.display = 'none';
    }
    
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = function(e) {
        // 미리보기 이미지 추가
        let preview = thumbnailBox.querySelector('.thumbnail-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.classList.add('thumbnail-preview');
            thumbnailBox.insertBefore(preview, thumbnailBox.firstChild);
        }
        
        preview.style.backgroundImage = `url(${e.target.result})`;
    };
    
    reader.readAsDataURL(file);
    
    // 여기에 실제 썸네일 업로드 로직 추가 (AJAX 요청 등)
}

// 동영상 미리보기 생성 함수
function createVideoPreview(file, container) {
    // 기존 미리보기 제거
    const existingPreview = container.querySelector('.video-preview-container');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    // 미리보기 컨테이너 생성
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('video-preview-container');
    
    // 비디오 요소 생성
    const video = document.createElement('video');
    video.classList.add('video-preview');
    video.controls = true;
    video.style.width = '100%';
    video.style.maxHeight = '200px';
    
    // 비디오 소스 설정
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    
    // 비디오 로드 이벤트
    video.addEventListener('loadedmetadata', function() {
        // 비디오 정보 표시 (필요한 경우)
        const duration = formatDuration(video.duration);
        let infoDisplay = container.querySelector('.video-info');
        if (!infoDisplay) {
            infoDisplay = document.createElement('div');
            infoDisplay.classList.add('video-info');
            previewContainer.appendChild(infoDisplay);
        }
        
        infoDisplay.textContent = `재생 시간: ${duration}`;
    });
    
    // 컨테이너에 추가
    previewContainer.appendChild(video);
    container.appendChild(previewContainer);
}

// 파일 크기 포맷 함수
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 재생 시간 포맷 함수
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}