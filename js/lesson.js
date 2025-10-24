// PHONE CHECKER
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener('click', () => {
  if (reqExp.test(phoneInput.value)) {
    phoneSpan.innerHTML = 'Этот номер существует';
    phoneSpan.style.color = 'green';
  } else {
    phoneSpan.innerHTML = 'Этот номер не существует';
    phoneSpan.style.color = 'red';
  }
});

// TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents = document.querySelector('.tab_content_items');

let currentIndex = 0;
let intervalId;

function hideTabs() {
  tabsContentCards.forEach(card => {
    card.classList.remove('show', 'prev');
    card.style.opacity = '0';
    card.style.transform = 'translateX(100%)';
  });
  tabsItems.forEach(item => {
    item.classList.remove('tab_content_item_active');
  });
}

function showTab(index, direction = 'right') {
  hideTabs();
  tabsContentCards[index].classList.add('show');
  tabsContentCards[index].style.opacity = '1';
  tabsContentCards[index].style.transform = 'translateX(0)';
  tabsItems[index].classList.add('tab_content_item_active');

  if (direction === 'right' && currentIndex !== index) {
    const prevIndex = currentIndex;
    tabsContentCards[prevIndex].classList.add('prev');
    tabsContentCards[prevIndex].style.transform = 'translateX(-100%)';
  } else if (direction === 'left' && currentIndex !== index) {
    const prevIndex = currentIndex;
    tabsContentCards[prevIndex].style.transform = 'translateX(100%)';
  }
}

function startAutoSlider() {
  intervalId = setInterval(() => {
    const nextIndex = (currentIndex + 1) % tabsItems.length;
    showTab(nextIndex, 'right');
    currentIndex = nextIndex;
  }, 3000);
}

hideTabs();
showTab(currentIndex);
startAutoSlider();

tabsItemsParents.onclick = (event) => {
  clearInterval(intervalId);
  if (event.target.classList.contains('tab_content_item')) {
    tabsItems.forEach((tab, i) => {
      if (event.target === tab) {
        const direction = i > currentIndex ? 'right' : 'left';
        showTab(i, direction);
        currentIndex = i;
        startAutoSlider();
      }
    });
  }
};