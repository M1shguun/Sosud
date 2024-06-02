let container1 = 0;
let container2 = 0;
let step = 0;
var firstNumInt = parseInt(firstNum); 
var secondNumInt = parseInt(secondNum); 
var thirdNumInt = parseInt(thirdNum); 

let history = [];

function updateLog(operation) {
    history.push({ step, container1, container2, operation });

    step++;

    const logBody = document.getElementById('logBody');
    const newRow = logBody.insertRow();
    const cellStep = newRow.insertCell(0);
    const cellOperation = newRow.insertCell(1);
    const cellContainer1 = newRow.insertCell(2);
    const cellContainer2 = newRow.insertCell(3);

    cellStep.innerText = step;
    cellOperation.innerText = operation;
    cellContainer1.innerText = container1 + ' л';
    cellContainer2.innerText = container2 + ' л';

    if (container1 === thirdNumInt) {
        var element = document.getElementById('water1');
        element.style.backgroundColor = '#FFFF00';
        newRow.style.backgroundColor = '#FFFF00';
        return;
    }
    if (container2 === thirdNumInt) {
        var element = document.getElementById('water2');
        element.style.backgroundColor = '#FFFF00';
        newRow.style.backgroundColor = '#FFFF00';
        return;
    }
}



document.getElementById('nextBtn').addEventListener('click', function() {
    window.location.reload();
});

function resetLogAndReload() {
    step = 0;
    history = [];
    const logBody = document.getElementById('logBody');
    logBody.innerHTML = '';
    container1 = 0;
    container2 = 0;
    document.getElementById('water1').style.height = '0';
    document.getElementById('water2').style.height = '0';
    updateButtonAvailability();
}

function stepBack() {
    console.log("stepBack called");
    
    if (history.length > 0) {
        console.log("History before pop:", JSON.stringify(history));
        
        history.pop();
        console.log("History after pop:", JSON.stringify(history));
        
        const lastState = history.length > 0 ? history[history.length - 1] : { step: 0, container1: 0, container2: 0 };

        step = lastState.step;
        container1 = lastState.container1;
        container2 = lastState.container2;
        const logBody = document.getElementById('logBody');
        if (logBody && logBody.rows.length > 0) {
            logBody.deleteRow(logBody.rows.length - 1);
        }

        console.log("Updated state:", { step, container1, container2 });

        updateContainerHeights();
        updateButtonAvailability();
    }
}
document.getElementById('stepBackBtn').addEventListener('click', stepBack);

function updateContainerHeights() {
    document.getElementById('water1').style.height = (container1 / firstNumInt) * 100 + '%';
    document.getElementById('water2').style.height = (container2 / secondNumInt) * 100 + '%';
}

window.onload = function() {
    updateButtonAvailability();
    containerHeight();
};

function containerHeight() {
    var heightJug1 = (firstNumInt * 25) + 'px';
    var heightJug2 = (secondNumInt * 25) + 'px';
    
    var jug1Elements = document.getElementsByClassName('jug1');
    var jug2Elements = document.getElementsByClassName('jug2');
    
    for (var i = 0; i < jug1Elements.length; i++) {
        jug1Elements[i].style.height = heightJug1;
    }
    
    for (var j = 0; j < jug2Elements.length; j++) {
        jug2Elements[j].style.height = heightJug2;
    }
}

function updateButtonAvailability() {
    if (container1 === 0 && container2 === 0) {
        document.querySelector('a[onclick="emptyContainer1()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="emptyContainer2()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="fillContainer1()"]').removeAttribute('disabled');
        document.querySelector('a[onclick="fillContainer2()"]').removeAttribute('disabled');
        document.querySelector('a[onclick="pourContainer1To2()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="pourContainer2To1()"]').setAttribute('disabled', true);
    }   else if (container1 === firstNumInt && container2 === secondNumInt) {
        document.querySelector('a[onclick="fillContainer1()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="fillContainer2()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
        document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
        document.querySelector('a[onclick="pourContainer1To2()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="pourContainer2To1()"]').setAttribute('disabled', true);
    } else if (container1 === 0 && container2 !== 0) {
        document.querySelector('a[onclick="emptyContainer1()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="fillContainer1()"]').removeAttribute('disabled');    
        document.querySelector('a[onclick="pourContainer1To2()"]').setAttribute('disabled', true);
        if (container2 !== secondNumInt) {
            document.querySelector('a[onclick="pourContainer2To1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
        }
        else{
            document.querySelector('a[onclick="pourContainer2To1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer2()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
            
        }
        
    } else if (container2 === 0 && container1 !== 0) {
        document.querySelector('a[onclick="emptyContainer2()"]').setAttribute('disabled', true);
        document.querySelector('a[onclick="fillContainer2()"]').removeAttribute('disabled');
        document.querySelector('a[onclick="pourContainer2To1()"]').setAttribute('disabled', true);
        if (container1 !== firstNumInt) {
            document.querySelector('a[onclick="pourContainer1To2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
        }
        else{
            document.querySelector('a[onclick="pourContainer1To2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer1()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
            
        }
        
    } else if (container2 !== 0 && container1 !== 0) {
        if (container1 === firstNumInt){
            document.querySelector('a[onclick="fillContainer1()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="fillContainer2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="pourContainer2To1()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="pourContainer1To2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
        } else if (container2 === secondNumInt){
            document.querySelector('a[onclick="fillContainer2()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="fillContainer1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="pourContainer1To2()"]').setAttribute('disabled', true);
            document.querySelector('a[onclick="pourContainer2To1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
        } else {
            document.querySelector('a[onclick="pourContainer2To1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="pourContainer1To2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="emptyContainer2()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer1()"]').removeAttribute('disabled');
            document.querySelector('a[onclick="fillContainer2()"]').removeAttribute('disabled');
        }
        
    } 
}


function fillContainer1() {
    container1 = firstNumInt;
    updateContainerHeights();
    updateLog('Наповнити ємність 1');
    updateButtonAvailability();
}

function fillContainer2() {
    container2 = secondNumInt;
    updateContainerHeights();
    updateLog('Наповнити ємність 2');
    updateButtonAvailability();
}

function emptyContainer1() {
    container1 = 0;
    updateContainerHeights();
    updateLog('Спустошити ємність 1');
    updateButtonAvailability();
}

function emptyContainer2() {
    container2 = 0;
    updateContainerHeights();
    updateLog('Спустошити ємність 2');
    updateButtonAvailability();
}

function pourContainer2To1() {
    const spaceLeftInContainer1 = firstNumInt - container1;
    const amountToPour = Math.min(container2, spaceLeftInContainer1);
    container2 -= amountToPour;
    container1 += amountToPour;
    updateContainerHeights();
    updateLog('Перелити із 2 -> 1');
    updateButtonAvailability();
}

function pourContainer1To2() {
    const spaceLeftInContainer2 = secondNumInt - container2;
    const amountToPour = Math.min(container1, spaceLeftInContainer2);
    container1 -= amountToPour;
    container2 += amountToPour;
    updateContainerHeights();
    updateLog('Перелити із 1 -> 2');
    updateButtonAvailability();
}


 