var menuIcon = document.getElementById("menu-icon");

var menuIconClick = false;

menuIcon.addEventListener("click", function () {
    document.getElementById("menu").classList.toggle("active");

    if (menuIconClick == false) {
        document.body.style.overflow = 'hidden';
        menuIconClick = true;
    } else {
        document.body.style.overflow = 'visible';
        menuIconClick = false;
    }


});

var editorButton = document.getElementById("editor-button");
var editorClick = false;

editorButton.addEventListener("click", function () {
    document.getElementById("editor").classList.toggle("active");
    document.getElementById("editor-box").classList.toggle("active");

    if (editorClick == false) {
        document.body.style.overflow = 'hidden';
        editorClick = true;
    } else {
        document.body.style.overflow = 'visible';
        editorClick = false;
    }

});

var editorCloseIcon = document.getElementById("editor-close");

editorCloseIcon.addEventListener("click", function () {
    document.getElementById("editor").classList.remove("active");
    document.getElementById("editor-box").classList.remove("active");

    if (editorClick == false) {
        document.body.style.overflow = 'hidden';
        editorClick = true;
    } else {
        document.body.style.overflow = 'visible';
        editorClick = false;
    }


});