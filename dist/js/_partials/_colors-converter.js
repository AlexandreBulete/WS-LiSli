export function cc(val) {
    hexToRgb(val);

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // console.log(result);
        // console.log('rgb(' + parseInt(result[1], 16) +', '+ parseInt(result[2], 16) +', '+ parseInt(result[3], 16) + ')');
        return 'rgb(' + parseInt(result[1], 16) +', '+ parseInt(result[2], 16) +', '+ parseInt(result[3], 16) + ')';
        // return result ? {
        //     r: parseInt(result[1], 16),
        //     g: parseInt(result[2], 16),
        //     b: parseInt(result[3], 16)
        // } : null;
    }
}