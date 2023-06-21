export function sendCustumizedData(event) {
    const connectionKeys = ["mechanics", "updateFrequency"];
    
    event.preventDefault();    
    let fields = document.querySelectorAll('form fieldset.field');
    let values = {"fields": {}};

    let inputsTable = document.querySelectorAll('form > details > fieldset > section > div > input:not([disabled])');
    let selectsTable = document.querySelectorAll('form > details > fieldset > section > div > select:not([disabled])');
    let textareaTable = document.querySelectorAll('form > details > fieldset > section > div > textarea:not([disabled])');

    fields.forEach(field => { 
        let id = field.querySelector('input:not([disabled])[name=fieldID]').value;

        let inputs = field.querySelectorAll('input:not([disabled])');
        let selects = field.querySelectorAll('select:not([disabled])');
        let textarea = field.querySelectorAll('select:not([disabled])');

        let fieldVar = {}
        fieldVar = getInputsValues(inputs);
        fieldVar = joinObjects(fieldVar, getInputsValues(selects));
        fieldVar = joinObjects(fieldVar, getInputsValues(textarea));
        values["fields"][id] = fieldVar;
    });
    
    values["table"] = getInputsValues(inputsTable);
    values["table"] = joinObjects(values["table"], getInputsValues(selectsTable));
    values["table"] = joinObjects(values["table"], getInputsValues(textareaTable));

    connectionKeys.forEach((key) => {
        if (values["table"][key]) {
            let obj = {};
            obj[key] = values["table"][key];
            values["connection"] = joinObjects(values["connection"], obj);
            delete values["table"][key];
        }
    });

    var formData = new FormData();
    formData.append('data', JSON.stringify(values));

    const head = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(values), 
    };

    console.log(head)
    fetch('/request', head).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })
}   

function getInputsValues(inputs) {
    let values = {};
    inputs.forEach((input) => {
        let name = input.name;
        let objectToContainTheObject = {};
        let key;
        let object = {
            "ALTERACAO": input.value
        };

        objectToContainTheObject = object;
        key = name;

        values[key] = joinObjects(values[key], objectToContainTheObject);
    });
    
    return values;
}

function joinObjects(BaseObject, objectToJoin) {
    if (undefined == BaseObject || null == BaseObject) {
        BaseObject = objectToJoin;
    } else {
        BaseObject = Object.assign(BaseObject, objectToJoin);
    }

    return BaseObject;
}