
/*------------ MENU MOBILE -------------*/

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    
}

/*------------ REMOVER MENU MOBILE -------------*/
const navLink = document.querySelectorAll('.link')
function linkAction() {
    const navMenu = document.getElementById('nav')
    /*Quando um link ou o botão close for clicado a class show-menu será removido*/
    navMenu.classList.remove('active')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
