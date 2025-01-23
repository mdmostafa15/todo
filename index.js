let data = [];

if (str = localStorage.getItem("data")) {
    data = JSON.parse(str);
}

// access ul element
const ul = document.getElementsByClassName("list")[0];
const addItemBtn = document.getElementsByClassName("btn")[0];
// modal element access
const modal = document.getElementsByClassName("modal")[0];
const btn = document.getElementsByClassName("group-btn")[0].children;
const title = document.getElementsByName("task-title")[0];
const description = document.getElementsByName("task-description")[0];

const snackbar = document.getElementsByClassName("snackbar")[0];

function shwToast(msg) {
    snackbar.classList.remove("hidden");
    snackbar.textContent = msg;
    setTimeout(()=>{
        snackbar.classList.add("hidden");
    },1500);
}

// add items to list using data
function readItems() {
    let temp;
    if (data.length > 0) {
            temp = data.map((item, index)=>{
            // todo..
            // creating list item and its inner elements
            const li = document.createElement("li");
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const listTitle =  document.createElement("p");
            const listDescription = document.createElement("p");
            const iconEdit = document.createElement("i");
            const iconDelete = document.createElement("i");
                
            // event listener
            iconEdit.addEventListener("click", ()=>{updateItem(item)});
            iconDelete.addEventListener("click", ()=>{deleteItem(item)});
            div1.addEventListener("dblclick", ()=>{isComplete(item, index)});
    
            //adding text contents to p and i elements
            listTitle.textContent = item.title;
            listDescription.textContent = item.description;
            iconEdit.textContent = "border_color";
            iconDelete.textContent = "delete";
    
            // Appanding contents to div and li elements
            // p tags adding to div1
            div1.appendChild(listTitle).setAttribute("class","list-title");
            div1.appendChild(listDescription);
            // i tags adding to div2
            div2.appendChild(iconEdit).setAttribute("class", "material-icons btn-edit");
            div2.appendChild(iconDelete).setAttribute("class", "material-icons btn-delete");
            // div tags adding to li
            li.appendChild(div1);
            li.appendChild(div2);

            if (item.flag) {
                li.classList.add("complete"); 
                iconEdit.style.visibility="hidden";
            }
            
            return li;
        });
                
    }
    else {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const listTitle =  document.createElement("p");
        listTitle.textContent= "there is no item found!!!";
        listTitle.setAttribute("class","list-title");
        div.appendChild(listTitle)
        li.appendChild(div)
        temp = [li];
    
    }

    return temp;
    //done
}

// flag set to data 
function isComplete(itm, i) {
    const temp = itm.flag?false:true;
    data[i]= {
        ...itm,
        flag: temp
    }; 

    localStorage.setItem("data",JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("data"));
   
    ul.replaceChildren(...readItems());
    //done
}

// adding item to list
function createItem() {
    if(title.value != "" && description.value != ""){
        // add task to data 
        data.push({
            id: (data.length>0)?data[data.length - 1].id + 1: 101,
            title: title.value,
            description: description.value,
            flag: false
        })
    }
    
    localStorage.setItem("data",JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("data"));
    
    hideModal();
    ul.replaceChildren(...readItems());
    shwToast("List Item is Inserted!!!");
    //done
}

// updating item of list
let gId=0;
function updateItem(item) {
    gId= item.id;
    title.value = item.title;
    description.value = item.description;

    // update task  :action button
    btn[0].value= "update";
    btn[0].addEventListener("click", update);
    showModal();
    //done
}

// update item
function update() {
    const idx = data.findIndex((itm)=>{
        return itm.id === gId;
    })
    data[idx]= {
        id:gId,
        title: title.value,
        description: description.value,
        flag: false
    };  

    localStorage.setItem("data",JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("data"));
    
    hideModal();
    ul.replaceChildren(...readItems());
    shwToast("List Item is Updated!!!");
    //done
}

// delete item from list
function deleteItem(item) {
    const temp = data.filter((itm)=>{
        return itm.id != item.id;
    });  

    localStorage.setItem("data",JSON.stringify(temp));
    data = JSON.parse(localStorage.getItem("data"));
    
    ul.replaceChildren(...readItems());
    shwToast("List Item is Deleted!!!");
    //done
}

// showing popup with input fields
function showModal(){
    // disply modal
    modal.parentElement.classList.remove("hidden");
    // add task to list :action button
    btn[0].addEventListener("click", createItem);
    // clossing modal :action button
    btn[1].addEventListener("click", hideModal);
    // remove event listener show popup :action button
    addItemBtn.removeEventListener("click", showModal);
    addItemBtn.classList.add("hidden");
    //done
}

//hidding modal
function hideModal() {
    // remove event listener :action button
    btn[0].removeEventListener("click", createItem);
    btn[0].removeEventListener("click", update);
    // remove event listener closs modal :action button
    btn[1].removeEventListener("click", hideModal);

    title.value="";
    description.value="";
    btn[0].value = "add";
    // hidding modal
    modal.parentElement.classList.add("hidden");
    addItemBtn.classList.remove("hidden");
    addItemBtn.addEventListener("click", showModal);  
}

function runTodo() {   
    // show modal with click
    addItemBtn.addEventListener("click", showModal);
    // appending or replace li to ul
    ul.replaceChildren(...readItems());
}


runTodo();