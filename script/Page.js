import { ColorProject } from "./ColorProject.js"
import { Windmill } from "./Windmill.js"
import { ColorRegion } from "./ColorRegion.js"
import { ColorSet } from "./ColorSet.js";
import { Color } from "./Color.js";

export class Page {
    static windmill; // Windmill object.

    static init() {
        // text
        Page.title();
        Page.copyright();

        // style
        Page.createWindmill();

        // events
        Page.switchPageButtonEvent();
        Page.scrollButtonEvent();
        Page.resetButtonEvent();
        Page.pickerChangeEvent();
        Page.resultButtonEvent();
        Page.aboutButtonEvent();

        // color region
        ColorRegion.init();
        
        // color picker
        
    }

    /**
     * Set website title.
     */
    static title() {
        document.title = ColorProject.fullProjectName;
        document.querySelector("#title").textContent = ColorProject.projectName;
    }

    /**
     * Set website footer to copyright announcement.
     */
    static copyright() {
        document.querySelector("#footer").innerHTML = ColorProject.copyright;
    }

    /**
     * When about button click event.
     */
    static aboutButtonEvent() {
        const aboutButton = Page.aboutButton;
        aboutButton.addEventListener("click", () => {
            Page.dialogTitle.textContent = `關於 ${ColorProject.fullProjectName}`;
            let content = document.createElement("div");
            
            content.innerHTML = `<h5 style='color: red;'>主旨 :</h5> 
                <p>使用者可透過不同模式的配色設定，調整風車葉片的顏色，並藉由視覺暫留的原理達成顏色混和的效果。</p>\
                <h5 style='color: red;'>協作人員:</h5> 
                <p><b>傳藝-莊O蓉</b>: 提出主題概念。</p>
                <p><b>傳藝-張O玲</b>: 風車圖案設計、顏色校調、簡報製作。</p>
                <p><b>資工-<a href="https://github.com/frank591781">frank591781</a></b>: 提出網頁介面模型。</p>
                <p><b>資工-<a href="https://github.com/shiyuzhi">shiyuzhi</a></b>: 網頁按鈕樣式設計。</p>
                <p><b>資工-<a href="https://github.com/NUTT1101">NUTT1101</a></b>: 網頁撰寫。</p>
                <h5 style='color: red;'>原始碼及技術說明:</h5>
                <p>GitHub: <a href='${ColorProject.githubLink}'>${ColorProject.fullProjectName}</a></p>`;
     
            Page.dialogContent.innerHTML = content.outerHTML;
        });
    }

    /**
     * When result button click event.
     * It will calculate multi color mixing result.
     */
    static resultButtonEvent() {
        const resultButton = Page.resultButton;
        Page.dialogTitle.textContent = "混色結果";
        
        resultButton.addEventListener("click", () => {
            let colors = Page.windmill.getColorSet.colors;
            let content = Page.colorDialogParent();

            for (let i = 0; i < colors.length; i++) {
                let colorCode = colors[i];
                
                if (colorCode.includes("rgb")) {
                    let rgb  = Color.splitRGBString(colorCode);
                    colorCode = Color.rgbToHex(rgb.r, rgb.g, rgb.b);
                }

                content.appendChild(
                    Page.colorDialogContent(`第 ${i+1} 個 : ${colorCode.toUpperCase()} `, colorCode)
                );
            }
            
            let mixingColor = Color.colorMix(colors);
            
            content.appendChild(Page.colorDialogContent(
                `混色結果 : ${mixingColor.toUpperCase()} `, mixingColor)
            );

            Page.dialogContent.innerHTML = content.outerHTML;
        });
    }

    /**
     * Spawn a paraent element to include dialog content. 
     * @returns {HTMLDivElement}
     */
    static colorDialogParent() {
        let content =  document.createElement("div");
        content.style.maxWidth = "max-content";
        content.style.margin = "0 auto 0";
        content.setAttribute("class", "ml-auto");
        return content;
    }
    
    /**
     * Spawn a element to contain {info}.
     * @param {String} info 
     * @param {String} color 
     * @returns {HTMLDivElement} 
     */
    static colorDialogContent(info, color) {
        let parent = document.createElement("div");
        let colorText = document.createElement("a");
        let colorDisplay = document.createElement("a");
        
        colorText.textContent = info;
        colorDisplay.style.background = color;
        colorDisplay.textContent = "-------";
        colorDisplay.style.color = color;

        parent.appendChild(colorText);
        parent.appendChild(colorDisplay);
    
        return parent;
    }

    /**
     * When color picker change event.
     */
    static pickerChangeEvent() {
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

    /**
     * When Switch Page event.
     */
    static switchPageButtonEvent() {
        let buttons =  document.getElementsByClassName("nav-item");
    
        for (let i=0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
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

    /**
     * Get click page amount of color block.
     * @param {number} index 
     * @returns {number}
     */
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

    /**
     * When scroll button click event.
     * Make windmill scroll or stop scroll.
     */
    static scrollButtonEvent() {
        const scrollButton = Page.scrollButton;
        scrollButton.addEventListener("click", function () {
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
    
    /**
     * When reset button click event.
     * Reset windmill and color region and color picker to initialization status.
     */
    static resetButtonEvent() {
        const resetButton = Page.resetButton;
        resetButton.addEventListener("click", function () {
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

    /**
     * Initialize windmill object. 
     */
    static createWindmill() {
        Page.windmill = new Windmill(
            ColorProject.defaultTwoColors,
            false,
        );
        
        Page.globalWindmillUpdate();
    }

    /**
     * Only update windmill blades color.
     */
    static localWindmillUpdate() {
        let blades = document.getElementsByTagName("path");
        
        for (let i=0; i < blades.length; i++) {
            blades[i].style.fill = Page.windmill.blades[i].style.fill;
        }
    }

    /**
     * Update windmill overall.
     */
    static globalWindmillUpdate() {
        let windmill = document.getElementsByClassName("windmill");
        
        Array.from(windmill).forEach(e => {
            e.innerHTML = Page.windmill.getWindmill.innerHTML; 
        });
    }

    /**
     * Get direct windmill element(exclude outer element).
     */
    static get windmillElement() {
        return document.querySelector("#svg37");
    }

    /**
     * According to different device resolution to select color picker. 
     */
     static get colorPicker() {
        return window.screen.width < 1000 ?
         document.querySelectorAll('shop-color-picker')[1] :
         document.querySelectorAll('shop-color-picker')[0] ;
    }

    /**
     * Get multi color region element.
     */
    static get colorRegion() {
        return document.querySelector("#color-region");
    }

    /**
     * Get result button element.
     */
    static get resultButton() {
        return document.querySelector("#result-button");
    }

    /**
     * Get about button element.
     */
    static get aboutButton() {
        return document.querySelector("#about-button");
    }

    /**
     * Get reset button element.
     */
    static get resetButton() {
        return document.querySelector("#reset-button");
    }

    /**
     * Get scroll button element.
     */
    static get scrollButton() {
        return document.querySelector("#scroll-button");
    }

    /**
     * Get dialog content element.
     */
    static get dialogContent() {
        return document.querySelector("#content-result");
    }

    /**
     * Get dialog title element.
     */
    static get dialogTitle() {
        return document.querySelector("#modal-title");
    }
}
