
(function () {

    const config = {
        colorsHex: [],
        colorsRGB: [],
        colorTransition: .2
    };

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToRgbaString(rgb, a){
        return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
    }

    function createCssColors() {
        var style = getComputedStyle(document.body);
        var newStyleSheet = document.createElement('style');
        newStyleSheet.type = 'text/css';

        var styleText = "";

        for (var i = 0; i <= 15; i++) {
            var color = style.getPropertyValue(`--color-base${i}`);
            color = color.trim().substr(1, color.length - 3);

            config.colorsHex[`base${i}`] = color;
            config.colorsRGB[`base${i}`] = hexToRgb(color);

            styleText += `.bg-base${i}{background:${color};}`;
            styleText += `.color-base${i}{color:${color} !important;}`;
            styleText += `.h-color-base${i}{transition-property: color, background; transition-duration: ${config.colorTransition}s !important;}`;
            styleText += `.h-color-base${i}:hover{color:${color} !important;}`;
            styleText += `.h-bg-base${i}{transition-property: color, background; transition-duration: ${config.colorTransition}s !important;}`;
            styleText += `.h-bg-base${i}:hover{background:${color} !important;}`;
        }
        newStyleSheet.innerHTML = styleText;
        document.getElementsByTagName('head')[0].appendChild(newStyleSheet);
    }


    window.onload = function () {
        createCssColors();
    }
})();