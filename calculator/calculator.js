//build page
(function buildPage() {
    document.getElementById('output').innerHTML = `
    <form>
        <input id="equation">
        <button id="equals">=</button>
        <button id="save">Save</button>
    </form>
    <div id="buttonGrid">
        <button id="clear">Clear</button>
        <button id="delete">Delete</button>
        <button id="squareRt">sqrt()</button>
        <button id="square">^</button>
        <button class="number" id="7">7</button>
        <button class="number" id="8">8</button>
        <button class="number" id="9">9</button>
        <button id="divide">/</button>
        <button class="number" id="4">4</button>
        <button class="number" id="5">5</button>
        <button class="number" id="6">6</button>
        <button id="times">*</button>
        <button class="number" id="1">1</button>
        <button class="number" id="2">2</button>
        <button class="number" id="3">3</button>
        <button id="minus">-</button>
        <button id="paranth">()</button>
        <button class="number" id="0">0</button>
        <button id="dot">.</button>
        <button id="plus">+</button>
    </div>
    <div id="bookmarks">Bookmarks
        <div id="list">
        </div>
    </div>`
    buttons()
    printBookmarks()
})()

function printBookmarks() {
//get bookmarks from local storage
    if(JSON.parse(localStorage.getItem("bookmarks")) == undefined) {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
//add bookmark to array and local storage
    document.getElementById('save').addEventListener('click', ()=>{
            let bookmark = {value:equation.value}
            bookmarks.push(bookmark)
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    })
//print bookmarks from array
    bookmarks.forEach(bookmark => {
        let bookmarkDiv = document.createElement('div')
        let name = document.createElement('div')
        let load = document.createElement('button')
        let remove = document.createElement('button')

        name.innerHTML = bookmark.value
        load.innerHTML = '↵'
        remove.innerHTML = '&#10006'
//use bookmark
        load.addEventListener('click', ()=>{
            equation.value = event.target.parentElement.lastChild.innerHTML
        })
//delete bookmark
        remove.addEventListener('click', ()=> {
            //remove bookmark from page
            event.target.parentElement.remove()
            //remove bookmark from array
            let index = bookmarks.indexOf(bookmarks[event.target.parentElement.getAttribute('data-id')]);
            bookmarks.splice(index, 1);
            //save new array to local storage
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        })
//append bookmarks
        bookmarkDiv.appendChild(load)
        bookmarkDiv.appendChild(remove)
        bookmarkDiv.appendChild(name)
        document.getElementById('list').appendChild(bookmarkDiv)
    })
}

function buttons() {
//get equation input field
    let buttons = document.getElementById('buttonGrid').getElementsByTagName('button')
    let equation = document.getElementById('equation')
//add event listeners for calculator buttons
    for(i=0;i<buttons.length;i++){
        let button = buttons[i]

        button.addEventListener('click', () => {
            //get button value
            let value = event.target.innerHTML
            //clear button
            if(value == 'Clear'){
                equation.value = ''
            }
            //delete button
            else if(value =='Delete'){
                equation.value = equation.value.slice(0, -1)
            }
            //every other button
            else {
                //get cursor location
                let strPos = equation.selectionStart;
                let front = (equation.value).substring(0, strPos);
                let back = (equation.value).substring(strPos, equation.value.length);
                //add text where cursor is
                equation.value = front + value + back;
                strPos = strPos + value.length;
                //save cursor for next character
                equation.selectionStart = strPos;
                equation.selectionEnd = strPos;
                equation.focus();
            }
            //equals button
            document.getElementById('equals').addEventListener('click', ()=>{
                event.preventDefault();
                calculate(equation)
            })
        })
    }
}
function calculate(equation) {
//create data to send
    let data = {expr: equation.value, precision: 10}
//send equation for answer
    fetch(`https://api.mathjs.org/v4/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
//print answer
        document.getElementById('equation').value = data.result
    })
}
