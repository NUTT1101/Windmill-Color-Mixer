import { Page } from "./Page.js";

window.onload = function () {
    Page.init();   
}

window.onresize = function () {
    Page.pickerChangeEvent();
} 