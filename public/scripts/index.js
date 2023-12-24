const initApp = () =>{
    const mobileMenu = document.getElementById('mob-menu');
    const cancelMoblieMenu = document.getElementById('mob-menu-cancel');
    const mobileMenuWind = document.getElementById("mob-nav");
    const startQuizz = document.getElementById('start-quizz');
    const start = document.getElementById('start')

    const toggleMenu = () =>{
        mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'none';
        mobileMenuWind.style.display = (mobileMenuWind.style.display === 'none') ? "flex": "flex";
        cancelMoblieMenu.style.display = (cancelMoblieMenu.style.display === 'none') ? 'flex': 'none';
    }

    const cancelMenu = () =>{
        mobileMenu.style.display = (mobileMenu.style.display === 'none') ? 'flex' : 'none';
        mobileMenuWind.style.display = (mobileMenuWind.style.display === 'flex') ? "none": "flex";
        cancelMoblieMenu.style.display = (cancelMoblieMenu.style.display === 'flex') ? 'none':'flex';

    }

    const prepWind = () =>{
        const prepTab = window.open('prepQuizz.html')
    }

    mobileMenu.addEventListener('click', toggleMenu)
    cancelMoblieMenu.addEventListener('click', cancelMenu)
    startQuizz.addEventListener('click', prepWind)
    start.addEventListener('click', prepWind)

}

document.addEventListener('DOMContentLoaded', initApp)
