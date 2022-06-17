import { ColorProject } from "./ColorProject.js"
import { Windmill } from "./Windmill.js"
import { ColorRegion } from "./ColorRegion.js"
import { ColorSet } from "./ColorSet.js";

export class Page {
    static windmill;

    static init() {
        Page.setBackGroundColor();
        Page.switchPageButtonEvent();
        Page.scrollButtonEvent();
        Page.createWindmill();

        ColorRegion.init();
        
        Page.addPickerChangeEvent()
    }

    static get colorPicker() {
        return document.querySelector('dino-color-picker');
    } 

    static get colorRegion() {
        return document.querySelector("#color-region");
    }

    static addPickerChangeEvent() {
        const picker = Page.colorPicker;
        picker.addEventListener('change', () => {
            ColorRegion.setBlockColor(ColorRegion.geClickedtBlock, picker.value);

            let region = Page.colorRegion;
            let colors = [];

            Array.from(region.children).forEach(e => {
                colors.push(e.style.backgroundColor);
            });

            Page.windmill.setColors = new ColorSet(colors);
            
            Page.updateWindmill();
        });
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

                    let region = Page.getWhichRegion(i);
                    ColorRegion.update(region);
                }
            });
        }
    }

    static getWhichRegion(index) {
        switch (index) {
            case 0:
                return 2;
            case 1:
                return 4;
            case 2:
                return 8;
            default:
                return 2;
        }
    }

    static scrollButtonEvent() {
        document.querySelector("#scroll-button").addEventListener("click", function () {
            let windmill = Page.windmillElement;
    
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

    static createWindmill() {
        Page.windmill = new Windmill(
            ColorProject.defaulTwoColors,
            false,
        );
        
        this.updateWindmill();
    }

    static get windmillElement() {
        return document.querySelector("#svg37");
    }

    static updateWindmill() {
        let windmill = document.getElementsByClassName("windmill");
    
        for (let i=0; i < windmill.length; i++) {
            windmill[i].innerHTML = Page.windmill.getWindmill.innerHTML;
        }
    }
}