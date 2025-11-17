const modal = document.querySelector('.modal');
const btnGet = document.getElementById('btn-get');
const modalClose = document.querySelector('.modal_close');

btnGet.addEventListener('click', () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
});

modalClose.addEventListener('click', () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }
});