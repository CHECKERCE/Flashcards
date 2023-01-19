sideMenu = document.getElementById('sideMenu');
menuButton = document.getElementById('menuButton');

let menuOpen = false;

function toggleMenu() {
    if (menuOpen) {
        sideMenu.style.width = "0px";
        menuOpen = false;
    } else {
        sideMenu.style.width = "15%";
        menuOpen = true;
    }
}