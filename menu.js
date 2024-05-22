sideMenu = document.getElementById('sideMenu');
menuButton = document.getElementById('menuButton');

let menuOpen = false;

closeMenu();

function closeMenu() {
    sideMenu.style.left = "-200px";
    menuOpen = false;
}

function openMenu() {
    sideMenu.style.left = "0px";
    menuOpen = true;
}

function toggleMenu() {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}