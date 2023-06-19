export function sendCustumizedData(event) {
    event.preventDefault();
    let forms = event.srcElement;
    let inputs = forms.querySelectorAll('input:not([disabled])');
    let selects = forms.querySelectorAll('select:not([disabled])');
    let values = {};

    inputs.forEach(input => {
        
        //values = Object.assign(values, {});
    });
}   