import { ColorProject } from "./ColorProject.js";
import { ColorSet } from "./ColorSet.js";
import { Page } from "./Page.js"

export class ColorRegion {

    static currentPage;
    static clickedBlock;

    static init() {
        ColorRegion.currentPage = 2;
        ColorRegion.clickedBlock = 0;
        this.update(2);
    }
    
    /**
     * 
     * @param {Integer} index 
     */
    static update(index) {
        switch (index) {
            case 2:
                this.spawnColorRegion(index);
                break;
            case 4:
                this.spawnColorRegion(index);
                break;
            case 8:
                this.spawnColorRegion(index);
                break;
            default:
                this.spawnColorRegion(2);
                break;
        };

        ColorRegion.currentPage = index;
        ColorRegion.clickedBlock = 0;
        Page.globalWindmillUpdate();
        Page.colorPicker.value = ColorRegion.getDefaultColors(index).colors[0];         
    }

    /**
     * 
     * @param {Integer} index 
     */
    static spawnColorRegion(index) {
        let region = this.getColorRegion();
        region.innerHTML = ""; // clear the blocks

        if (Page.windmill.getColorSet.colors.length != index) {
            Page.windmill.setColors= this.getDefaultColors(index);
        }

        let color = Page.windmill.getColorSet.colors;

        for (let i=0; i < index; i++) {
            let colorBlock = document.createElement("a");
            ColorRegion.setBlockAttribute(colorBlock , i);
            ColorRegion.addBlockEvent(colorBlock, i);
            ColorRegion.setBlockColor(colorBlock, color[i]);
            region.appendChild(colorBlock);    
        }           
    }

    /**
     * 
     * @param {HTMLAnchorElement } colorBlock 
     * @param {String} color 
     */
    static setBlockColor(colorBlock, color) {
        colorBlock.style.background = color;
    }

    /**
     * 
     * @param {Element} colorBlock 
     * @param {String} color 
     * @param {Integer} tag 
     */
    static addBlockEvent(colorBlock, tag) {
        colorBlock.addEventListener("click", function () {
            if (window.screen.width < 1000) {
                colorBlock.setAttribute("data-toggle", "modal");
                colorBlock.setAttribute("data-target", "#color-picker-modal");
            } else {
                colorBlock.setAttribute("data-toggle", "");
                colorBlock.setAttribute("data-target", "");
            }

            ColorRegion.clickedBlock = tag;
            Page.colorPicker.value = Page.windmill.getColorSet.colors[tag];
        });
    }


    /**
     * 
     * @param {Element} colorBlock 
     * @param {Integer} tag 
     */
    static setBlockAttribute(colorBlock , tag) {
        colorBlock.setAttribute("class", "col");
        colorBlock.setAttribute("id", `block-${tag}`);
        colorBlock.setAttribute("href", "#");
    }

    /**
     * 
     * @param {Integer} index 
     * @returns {ColorSet}
     */
    static getDefaultColors(index) {
        switch (index) {
            case 2:
                return ColorProject.defaultTwoColors;
            case 4:
                return ColorProject.defaultFourColors;
            case 8:
                return ColorProject.defaultEightColors;
        }                
        return ColorProject.defaultTwoColors;
    }
    
    /**
     * 
     * @returns {Element}
     */
    static getColorRegion() {
        return document.querySelector("#color-region");
    }
    
    static get geClickedtBlock() {
        return document.querySelector(`#block-${ColorRegion.clickedBlock}`);
    }
}