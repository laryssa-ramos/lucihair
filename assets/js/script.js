
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

/*------------ CAROUSEL -------------*/

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll(".img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft; 



const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 50;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {

    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);

carousel.addEventListener("mousemove", dragging);


carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

/*------------ ANIMAÇÃO -------------*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
})

sr.reveal('.scroll')
sr.reveal('.scroll-box', {interval: 200})
sr.reveal('.scroll-left', {origin: 'left'})
sr.reveal('.scroll-right', {origin: 'right'})

sr.reveal('.heading', {origin: 'top', distance: '40px', duration: 1500})
sr.reveal('.p', {origin: 'bottom', distance: '30px', delay: 300})
sr.reveal('.information .container', {origin: 'left', distance: '50px', interval: 200})
sr.reveal('.information .map', {origin: 'bottom', distance: '50px', delay: 400})
sr.reveal('.information .image', {origin: 'right', distance: '50px', delay: 500})
sr.reveal('.depositions .box-container .box', {interval: 200, origin: 'bottom', distance: '40px'})
sr.reveal('.jobs a', {origin: 'bottom', delay: 600})
sr.reveal('footer', {origin: 'bottom', distance: '20px', delay: 300})