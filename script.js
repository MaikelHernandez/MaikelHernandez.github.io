

const addBtn = document.getElementById('enviar-btn');
const cancelBtn = document.getElementById('cancelar-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('.record-container');
const deleteBtn = document.getElementById('borrar-btn');
const editBtn = document.getElementById('editar-btn');
const paragraph = document.getElementById("edit");
const edit_button = document.getElementById("editar-btn");
const end_button = document.getElementById("end-editing");
/************************************************ */
const name = document.getElementById('nombre');
const address = document.getElementById('direccion');
const number = document.getElementById('numero-del-contacto');

let ContactArray = [];
let id = 0;


function Contact(id, name, address, number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;
}

document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('contacts') == null){
        ContactArray = [];
    } else {
        ContactArray = JSON.parse(localStorage.getItem('contacts'));
        lastID(ContactArray);
    }
    displayRecord();
});

function displayRecord(){
    ContactArray.forEach(function(singleContact){
        addToList(singleContact);
    });
}

function lastID(ContactArray){
    if(ContactArray.length > 0){
        id = ContactArray[ContactArray.length - 1].id;
    } else {
        id = 0;
    }
}


addBtn.addEventListener('click', function(){
    if(checkInputFields([name, address, number])){
        setMessage("Contacto Agregado!");
        id++;
        const contact = new Contact(id, name.value, address.value, number.value);
        ContactArray.push(contact);
        
        localStorage.setItem('contacts', JSON.stringify(ContactArray));
        clearInputFields();

        addToList(contact);
    } else {
        setMessage("error", "campos de entrada vacios o numero telefonico no valido!");
    }
    
});


    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML = `
        <div class = "record-el">
            <span id = "labelling">ID del Contacto: </span>
            <span id = "contact-id-content">${item.id}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Nombre: </span>
            <span id = "name-content">${item.name}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Direccion: </span>
            <span id = "address-content">${item.address}</span>
        </div>

        <div class = "record-el">
            <span id = "labelling">Numero Telefonico: </span>
            <span id = "contact-num-content">${item.number}</span>
        </div>

        <button type = "button" id = "delete-btn">
            <span>
                <i class = "fas fa-trash"></i>
            </span> borrar
        </button>

        <button type="submit" id="editar-btn">
           <span>
             <i class = "fas fa-Fixed"></i>
           </span> editar 
        </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }


recordContainer.addEventListener('click', function(event){

    if(event.target.id === 'delete-btn'){
      
        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList = ContactArray.filter(function(record){
            return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
        });
        ContactArray = tempContactList;
     
        localStorage.setItem('contacts', JSON.stringify(ContactArray));
    }
});


resetBtn.addEventListener('click', function(){
    ContactArray = [];
    localStorage.setItem('contacts', JSON.stringify(ContactArray));
    location.reload();
})

function setMessage(status, message){
    let messageBox = document.querySelector('.message');
    if(status == "error"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('error');
        removeMessage(status, messageBox);
    }
    if(status == "success"){
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('success');
        removeMessage(status, messageBox);
    }
}

edit_button.addEventListener("click", function() {
    paragraph.contentEditable = true;
  } );
  
  end_button.addEventListener("click", function() {
    paragraph.contentEditable = false;
  } )


cancelBtn.addEventListener('click', function(){
    clearInputFields();
});

function clearInputFields(){
    name.value = "";
    address.value = "";
    number.value = "";
}



function removeMessage(status, messageBox){
    setTimeout(function(){
        messageBox.classList.remove(`${status}`);
    }, 2000);
}


function checkInputFields(inputArr){
    for(let i = 0; i < inputArr.length; i++){
        if(inputArr[i].value === ""){
            return false;
        }
    }
    if(!phoneNumCheck(inputArr[2].value)){
        return false;
    }
    return true;
}


function phoneNumCheck(inputtxt){
    let phoneNo = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneNo)){
        return true;
    } else {
        return false;
    }
}

