import { ColorProject } from "./ColorProject.js"
import { Windmill } from "./Windmill.js"
import { ColorRegion } from "./ColorRegion.js"
import { ColorSet } from "./ColorSet.js";

export class Page {
    static windmill;

    static init() {
        // text
        Page.title();

        // style
        Page.setBackGroundColor();
        Page.createWindmill();

        // events
        Page.switchPageButtonEvent();
        Page.scrollButtonEvent();
        Page.resetButtonEvent();
        Page.addPickerChangeEvent();

        // color region
        ColorRegion.init();
        
        // color picker
        
    }

    static title() {
        document.title = ColorProject.projectName;
        document.querySelector("#title").textContent = ColorProject.projectName;
    }

    static get colorPicker() {
        return window.screen.width < 1000 ?
         document.querySelectorAll('dino-color-picker')[1] :
         document.querySelectorAll('dino-color-picker')[0] ;
    } 

    static get colorRegion() {
        return document.querySelector("#color-region");
    }

    static addPickerChangeEvent() {
        const picker = Page.colorPicker;
        picker.addEventListener('change', () => {
            ColorRegion.setBlockColor(ColorRegion.geClickedtBlock, picker.value);

            let region = Page.colorRegion;

            Page.windmill.setColors = new ColorSet(
                Array.from(region.children).map(e => {
                    return e.style.backgroundColor;
                })
            );
            
            Page.localWindmillUpdate();
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

    static resetButtonEvent() {
        document.querySelector("#reset-button").addEventListener("click", function () {
            switch (ColorRegion.currentPage) {
                case 2:
                    Page.windmill.setColors = ColorProject.defaultTwoColors;
                    break;
                case 4:
                    Page.windmill.setColors = ColorProject.defaultFourColors;
                    break;
                case 8:
                    Page.windmill.setColors = ColorProject.defaultEightColors;
                    break;
            }

            ColorRegion.update(ColorRegion.currentPage);
        });
    }

    static createWindmill() {
        Page.windmill = new Windmill(
            ColorProject.defaultTwoColors,
            false,
        );
        
        this.globalWindmillUpdate();
    }

    static get windmillElement() {
        return document.querySelector("#svg37");
    }

    static localWindmillUpdate() {
        let blades = document.getElementsByTagName("path");
        
        for (let i=0; i < blades.length; i++) {
            blades[i].style.fill = Page.windmill.blades[i].style.fill;
        }
    }

    static globalWindmillUpdate() {
        let windmill = document.getElementsByClassName("windmill");
        
        Array.from(windmill).forEach(e => {
            e.innerHTML = Page.windmill.getWindmill.innerHTML; 
        });
    }
}