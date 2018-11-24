document.addEventListener('DOMContentLoaded', function () {
    const key = document.body.dataset.key || 'home';
    let link = document.querySelector(`a[data-key="${key}"]`);
    link.classList.add('active');
}, false);

// function loadMenu() {
//     const menuItems = 
//                 `<ul>
//                     <li><a onclick="setActiveLink(this)" href="index.html" class="active">Home</a></li>
//                     <li><a onclick="setActiveLink(this)" href="contact.html">Contact</a></li>
//                     <li><a onclick="setActiveLink(this)" href="about.html">About</a></li>
//                 </ul>`;
//     const menuElement = document.querySelector('.menu');
//     menuElement.innerHTML = menuItems;
// }


function setActiveLink(selectedLink) {
    var links = document.querySelectorAll('a');
    links.forEach(link => link.classList.remove('active'));
    selectedLink.classList.add('active');

    console.log(selectedLink)

    return false;
}