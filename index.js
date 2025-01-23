let data = [];
async function getData(todos, obj) {
    const x = await fetch(`https://jsonplaceholder.typicode.com/${todos}`, obj);
    const y = await x.json();
    console.log(y);
    
    runTodo(y); 
}

// access ul element
const ul = document.getElementsByClassName("list")[0];
const addItemBtn = document.getElementsByClassName("btn")[0];
// modal element access
const modal = document.getElementsByClassName("modal")[0];
const btn = document.getElementsByClassName("group-btn")[0].children;
const title = document.getElementsByName("task-title")[0];

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
            // const listDescription = document.createElement("p");
            const iconEdit = document.createElement("i");
            const iconDelete = document.createElement("i");
                
            // event listener
            iconEdit.addEventListener("click", ()=>{updateItem(item, index)});
            iconDelete.addEventListener("click", ()=>{deleteItem(item)});
            div1.addEventListener("dblclick", ()=>{isComplete(item, index)});
    
            //adding text contents to p and i elements
            listTitle.textContent = item.title;
            // listDescription.textContent = item.description;
            iconEdit.textContent = "border_color";
            iconDelete.textContent = "delete";
    
            // Appanding contents to div and li elements
            // p tags adding to div1
            div1.appendChild(listTitle).setAttribute("class","list-title");
            // div1.appendChild(listDescription);
            // i tags adding to div2
            div2.appendChild(iconEdit).setAttribute("class", "material-icons btn-edit");
            div2.appendChild(iconDelete).setAttribute("class", "material-icons btn-delete");
            // div tags adding to li
            li.appendChild(div1);
            li.appendChild(div2);

            if (item.completed) {
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
    const temp = itm.completed?false:true;
    data[i]= {
        ...itm,
        completed: temp
    }; 
    runTodo(data);
    //done
}

// adding item to list
async function createItem() {
    if(title.value != ""){
        // add task to data 
        try {
        const x = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title.value,
                    completed: false,
                })
            })
            data.push(await x.json());
            hideModal();
            runTodo(data);
        } catch (error) {
            console.log(error);
        }        
    }
    shwToast("List Item is Inserted!!!");
    //done
}

// updating item of list
let gId=0, gIdx=0;
function updateItem(item, i) {
    gId = item.id;
    gIdx= i;
    title.value = item.title;
    // update task  :action button
    btn[0].value= "update";
    btn[0].addEventListener("click", update);
    showModal();
    btn[0].removeEventListener("click", createItem);
    //done
}

// update item
async function update() {
    try {
        const x = await fetch(`https://jsonplaceholder.typicode.com/todos/${gId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                
                title: title.value,
                completed: false,
            })
        });
        // update in local
        data[gIdx]= await x.json();
        hideModal();
        runTodo(data);  
    } catch (error) {
        console.log(error);
    }              

    shwToast("List Item is Updated!!!");
    //done
}

// delete item from list
async function deleteItem(item) {
    try {
        const x = await fetch(`https://jsonplaceholder.typicode.com/todos/${item.id}`, {
            method: 'DELETE'
        });

        hideModal();
        const temp = data.filter((itm)=>{
            return itm.id != item.id;
        });  
        runTodo(temp);
    } catch (error) {
        console.log(error);
    }  
    
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
    btn[0].value = "add";
    // hidding modal
    modal.parentElement.classList.add("hidden");
    addItemBtn.classList.remove("hidden");
    addItemBtn.addEventListener("click", showModal);  
}

function runTodo(apiData) {   
    // show modal with click
    addItemBtn.addEventListener("click", showModal);
    data = apiData;
    // appending or replace li to ul
    ul.replaceChildren(...readItems());
}


try {
    getData("todos");
} catch (error) {
    console.log(error);
    
}