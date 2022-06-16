window.onload = function () {
    init();
}

function init() {
    let buttons =  document.getElementsByClassName("nav-item");

    for (let i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (!buttons[i].firstChild.classList.contains("active")) {
                buttons[i].firstChild.classList.add("active");
                for (let j=0; j < buttons.length; j++) {
                    if (i != j) {
                        if (buttons[j].firstChild.classList.contains("active")) { 
                            buttons[j].firstChild.classList.remove("active");
                        }
                    }
                 }
            }
        });
    }
}