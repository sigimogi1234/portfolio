// 헤더영역, 스크롤탑 버튼
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const scrollBtn = document.getElementById('scrollTopBtn');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // ▼ 헤더 처리
    if (currentScroll > lastScrollTop) {
      // 아래로 스크롤
      header.style.transform = 'translateY(-100%)';

      // ↑ TOP 버튼 보이기
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      // 위로 스크롤
      header.style.transform = 'translateY(0)';
      header.classList.add('scrolled');

      // ↑ TOP 버튼 숨기기
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
      scrollBtn.style.transform = 'translateY(20px)';
    }

    // 최상단일 경우
    if (currentScroll === 0) {
      header.classList.remove('scrolled');

      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
      scrollBtn.style.transform = 'translateY(20px)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // 버튼 클릭 시 최상단 이동
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});








// 언어설정 및 gnb
document.addEventListener('DOMContentLoaded', () => {
  // localStorage에서 저장된 언어와 섹션 가져오기 (없으면 기본값 설정)
  let currentSection = localStorage.getItem('section') || 'Artworks';
  let currentLang = localStorage.getItem('lang') || 'Ko';

  const gnbItems = document.querySelectorAll('.gnb li');
  const langButtons = document.querySelectorAll('.lang p');

  // 언어별 콘텐츠 wrapper
  const koreanDiv = document.querySelector('.korean');
  const englishDiv = document.querySelector('.english');

  // 선택 화면 요소
  const chooseWrap = document.querySelector('.chooseWrap');
  const artworkChoose = document.querySelector('.artworkChoose');
  const aboutMeChoose = document.querySelector('.aboutMeChoose');

  // === gnb li on/off 및 언어 숨김 제어 함수 ===
  function updateGnbActiveState() {
    const langWrap = document.querySelector('.gnbWrap .lang');

    if (chooseWrap && chooseWrap.classList.contains('on')) {
      gnbItems.forEach(item => item.classList.remove('on'));
      if (langWrap) langWrap.classList.add('hide'); // 언어 숨기기
    } else {
      gnbItems.forEach(item => {
        let itemText = item.textContent.trim();
        if (itemText === 'Profile') itemText = 'About Me';

        if (itemText === currentSection) {
          item.classList.add('on');
        } else {
          item.classList.remove('on');
        }
      });
      if (langWrap) langWrap.classList.remove('hide'); // 언어 보이기
    }
  }

  // === 초기 선택화면 처리 ===
  if (chooseWrap) {
    // 선택 화면이 보이는 동안 스크롤 막기
    document.body.classList.add('lockScroll');

    artworkChoose.addEventListener('click', () => {
      chooseWrap.classList.remove('on');
      document.body.classList.remove('lockScroll');

      currentSection = 'Artworks';
      localStorage.setItem('section', currentSection);

      updateVisibleSection();
      updateGnbActiveState();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    aboutMeChoose.addEventListener('click', () => {
      chooseWrap.classList.remove('on');
      document.body.classList.remove('lockScroll');

      currentSection = 'About Me';
      localStorage.setItem('section', currentSection);

      updateVisibleSection();
      updateGnbActiveState();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 초기 메뉴, 언어 버튼에 on 클래스 적용 ===
  updateGnbActiveState();

  langButtons.forEach(btn => {
    if (btn.textContent.trim() === currentLang) {
      btn.classList.add('on');
    } else {
      btn.classList.remove('on');
    }
  });

  // === 메뉴 클릭 시 섹션 변경 ===
  gnbItems.forEach(item => {
    item.addEventListener('click', () => {
      gnbItems.forEach(i => i.classList.remove('on'));
      item.classList.add('on');

      let selectedText = item.textContent.trim();
      if (selectedText === 'Profile') selectedText = 'About Me';
      currentSection = selectedText;
      localStorage.setItem('section', currentSection);

      if (chooseWrap && chooseWrap.classList.contains('on')) {
        chooseWrap.classList.remove('on');
        document.body.classList.remove('lockScroll');
      }

      updateVisibleSection();
      updateGnbActiveState();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // === 언어 버튼 클릭 시 언어 변경 ===
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(l => l.classList.remove('on'));
      btn.classList.add('on');

      currentLang = btn.textContent.trim();
      localStorage.setItem('lang', currentLang);

      if (currentLang === 'Ko') {
        koreanDiv.classList.add('on');
        englishDiv.classList.remove('on');
      } else {
        englishDiv.classList.add('on');
        koreanDiv.classList.remove('on');
      }

      updateVisibleSection();
    });
  });

  // === 섹션 표시 함수 ===
  function updateVisibleSection() {
    const langWrapper = currentLang === 'Ko' ? koreanDiv : englishDiv;

    const artwork = langWrapper.querySelector('.artworks');
    const aboutMe = langWrapper.querySelector('.aboutMe');

    if (currentSection === 'Artworks') {
      artwork.classList.add('on');
      aboutMe.classList.remove('on');
    } else {
      aboutMe.classList.add('on');
      artwork.classList.remove('on');
    }
  }

  // === 언어 설정 초기화 ===
  if (currentLang === 'Ko') {
    koreanDiv.classList.add('on');
    englishDiv.classList.remove('on');
  } else {
    englishDiv.classList.add('on');
    koreanDiv.classList.remove('on');
  }

  // === 섹션 표시 초기화 ===
  updateVisibleSection();
});












// 섹션 열고 닫기
document.querySelectorAll('.secBox').forEach((box) => {
  box.addEventListener('click', (e) => {
    // 모달 버튼을 누른 경우는 섹션 접기/펼치기 무시
    if (e.target.closest('.busanBtn, .nocteBtn, .jejuBtn, .megaBtn')) return;

    // section 내부 클릭은 무시 (예: secFigWrap 등)
    if (e.target.closest('section')) return;

    const wrap = box.querySelector('.secTitleWrap');
    if (!wrap) return;

    const section = wrap.nextElementSibling;
    const isOpen = wrap.classList.contains('on');

    if (isOpen) {
      section.style.height = section.scrollHeight + 'px';
      requestAnimationFrame(() => {
        section.style.height = '0px';
        section.style.overflow = 'hidden'; // 접힐 때는 overflow 숨김
      });
      wrap.classList.remove('on');
    } else {
      section.style.height = section.scrollHeight + 'px';
      section.style.overflow = 'hidden'; // transition 중에는 hidden
      wrap.classList.add('on');

      const afterTransition = () => {
        section.style.height = 'auto';
        section.style.overflow = 'visible'; // ✅ 펼친 후 overflow visible로 변경
        section.removeEventListener('transitionend', afterTransition);
      };
      section.addEventListener('transitionend', afterTransition);
    }
  });
});










// 시각디자인 모달
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('imgModalSrc');

const imageMap = {
  busanBtn: "img/modal_busantower.jpg",
  nocteBtn: "img/modal_nocte.jpg",
  jejuBtn: "img/modal_jejufolk.jpg",
  megaBtn: "img/modal_megabox.jpg",
};

// 스크롤바 너비 계산 함수
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

Object.keys(imageMap).forEach(className => {
  document.querySelectorAll(`.${className}`).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      modalImg.src = imageMap[className];
      modal.style.display = "flex";

      // ✅ 스크롤 막기 + 흔들림 방지
      const scrollBarWidth = getScrollbarWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollBarWidth + 'px';
    });
  });
});

modal.addEventListener('click', () => {
  modal.style.display = "none";
  modalImg.src = "";

  // ✅ 스크롤 다시 허용 + 보정 제거
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
});