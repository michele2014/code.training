document.addEventListener('DOMContentLoaded', function () {
    const key = document.body.dataset.key || 'home';
    let link = document.querySelector(`a[data-key="${key}"]`);
    link.classList.add('active');
}, false);

function setActiveLink(selectedLink) {
    var links = document.querySelectorAll('a');
    links.forEach(link => link.classList.remove('active'));
    selectedLink.classList.add('active');
    return false;
}