import { ColorProject } from "./ColorProject.js"
import { Windmill } from "./Windmill.js"
import { ColorRegion } from "./ColorRegion.js"

export class Page {
    static windmill;

    static init() {
        Page.setBackGroundColor();
        
        Page.switchPageButtonEvent();
        Page.scrollButtonEvent();
        
        Page.spawnWindmill();

        ColorRegion.init();
        this.windmill.getWindmill;
    }

    static setBackGroundColor() {
        document.body.style.backgroundColor = ColorProject.backgroundColor;
    }

    static switchPageButtonEvent() {
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
    
                    let reg;
                    switch (i) {
                        case 0:
                            reg = 2
                            break;
                        case 1:
                            reg = 4;
                            break;
                        case 2:
                            reg = 8;
                            break;
                        default:
                            reg = 2;
                            break;
                    }
    
                    ColorRegion.update(reg);
                }
            });
        }
    }

    static scrollButtonEvent() {
        document.querySelector("#scroll-button").addEventListener("click", function () {
            let windmill = Page.getWindmillElement();
    
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

    static spawnWindmill() {
        Page.windmill = new Windmill(
            ColorProject.defaulTwoColors,
            false
        );
        
        this.updateWindmill();
    }

    static getWindmillElement() {
        return document.querySelector("#svg37");
    }

    static updateWindmill() {
        let windmill = document.getElementsByClassName("windmill");
    
        for (let i=0; i < windmill.length; i++) {
            windmill[i].innerHTML = Page.windmill.getWindmill.innerHTML;
        }
    }
}