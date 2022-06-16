import { ColorProject } from "./ColorProject.js"
import { ColorSet } from "./ColorSet.js"
import { Windmill } from "./widgets/Windmill.js"

window.onload = function () {
    init();
}

function init() {
    document.body.style.backgroundColor = ColorProject.backgroundColor;
    
    switchPageButtonEvent();
    scrollButtonEvent();

    spawnWindmill();
}

function switchPageButtonEvent() {
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

function scrollButtonEvent() {
    document.querySelector("#scroll-button").addEventListener("click", function () {
        let windmill =  getWindmillElement();

        if (windmill.getAttribute("class") == undefined || 
                windmill.getAttribute("class") == "scroll-slowdown" || 
                windmill.getAttribute("class") == "") {
            windmill.setAttribute("class", "scrollable");
        } else if (windmill.getAttribute("class") == "scrollable") {
            windmill.setAttribute("class", "scroll-slowdown");
        } else {
            windmill.setAttribute("class", "");
        }

    });
}

function getWindmillElement() {
    return document.querySelector("#svg37");
}

function spawnWindmill() {
    let hello = new Windmill(
        new ColorSet(
            Array.of("#8282F1", "#BEBEE6")
        ),
        false
    );
    
    let windmill =  document.getElementsByClassName("windmill");

    for (let i=0; i < windmill.length; i++) {
        windmill[i].innerHTML = hello.getWindmill().innerHTML;
    }
}