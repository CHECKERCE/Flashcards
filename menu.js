sideMenu = document.getElementById('sideMenu');
menuButton = document.getElementById('menuButton');

let menuOpen = false;

function toggleMenu() {
    if (menuOpen) {
        sideMenu.style.left = "-200px";
        menuOpen = false;
    } else {
        sideMenu.style.left = "0px";
        menuOpen = true;
    }
}