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

        ColorRegion.currentStatus = index;
        ColorRegion.clickedBlock = 0;
        Page.updateWindmill();
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
            ColorRegion.setBlockAttribute(colorBlock, i);
            ColorRegion.addBlockEvent(colorBlock, color[i], i);
            ColorRegion.setBlockColor(colorBlock, color[i]);
            region.appendChild(colorBlock);    
        }           
    }

    /**
     * 
     * @param {Element} colorBlock 
     * @param {String} color 
     */
    static setBlockColor(colorBlock, color) {
        colorBlock.style = `background: ${color}`;
    }

    /**
     * 
     * @param {Element} colorBlock 
     * @param {String} color 
     * @param {Integer} tag 
     */
    static addBlockEvent(colorBlock, color, tag) {
        colorBlock.addEventListener("click", function () {
            ColorRegion.clickedBlock = tag;
            Page.colorPicker.value = color; 
        });
    }


    /**
     * 
     * @param {Element} colorBlock 
     * @param {Integer} tag 
     */
    static setBlockAttribute(colorBlock, tag) {
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
                return ColorProject.defaulTwoColors;
            case 4:
                return ColorProject.defaulFourColors;
            case 8:
                return ColorProject.defaulEightColors;
        }                
        return ColorProject.defaulTwoColors;
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