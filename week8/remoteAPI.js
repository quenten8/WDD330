/*Get HTML output*/
const outputDiv = document.getElementById('output');

/*Get API URL*/
let url = "https://swapi.dev/api/people";

/*Add page number*/
let page = 1;

/*Display first page*/
get(url)

/*Fetches data with given URL*/
function get(url) {
    fetch(url)
    .then( response => response.json())
    .then( data => {
        display(data)
    })
}

/*Displays page from data*/
function display(data, url) {

    /*Adds page number display*/
    let pageNum = document.createElement('h2')
    pageNum.innerHTML = `Page ${page}`
    outputDiv.appendChild(pageNum)

    /*Creates each person with event listener*/
    for(i = 0; i < data.results.length; i++) {
        let person = document.createElement("div")
        person.setAttribute('class', 'person')
        let details = document.createElement("div")

        /*Simple view*/
        person.innerHTML = `
        <h2>${data.results[i].name}</h2>`
        
        /*Detailed view*/
        details.innerHTML = `
        <hr>
        <p>Birth Year:${data.results[i].birth_year}</p>
        <p>Gender: ${data.results[i].gender}</p>
        <p>Height: ${data.results[i].height}</p>
        <p>Weight: ${data.results[i].mass}</p>
        <p>Skin Color: ${data.results[i].skin_color}</p>
        <p>Eye Color: ${data.results[i].eye_color}</p>`

        /*Adds data-id to each person for event listener*/
        person.setAttribute('data-id',data.results.indexOf(data.results[i]))

        /*Append each person to page*/
        outputDiv.appendChild(person)

        let open = 'no'

        /*Show details when not clicked*/
        person.querySelector('h2').addEventListener('click', ()=>{

            /*Open if closed*/
            if(open == 'no') {
                person.appendChild(details)
                open = 'yes'
            /*Closed if open*/
            } else {
                person.removeChild(person.lastChild)
                open = 'no'
            }
        })
        
    }
    /*Append page button navigation*/
    pages(data)
}

/*Creates page buttons*/
function pages(data, url) {
    /*Creates section for buttons*/
    let buttons = document.createElement('section')
    buttons.setAttribute('id','buttons')

    /*Check if previous page exists, else create previous button*/
    if(data.previous != null) {
        let prevButton = document.createElement('button')
        prevButton.innerHTML = "Previous"
        buttons.appendChild(prevButton)

        prevButton.addEventListener('click', () => {
            /*Remove last page*/
            resetpage()
            /*Change page display*/
            page--
            /*Set new page url*/
            url = data.previous
            /*Get data and build new page*/
            get(url)
        })
    }

    /*Create page number buttons*/
    for(i = 1; i < Math.ceil((data.count + 10) / 10); i++) {
        (function (i) {
        let button = document.createElement('button')
        button.innerHTML = (i)
        button.addEventListener('click', () => {
            
            resetpage()
            page = i
            url = `https://swapi.dev/api/people/?page=${[i]}`
            get(url)
        })
        buttons.appendChild(button)
        }(i))
    }

    if(data.next != null) {
        let nextButton = document.createElement('button')
        nextButton.innerHTML = "Next"
        buttons.appendChild(nextButton)

        nextButton.addEventListener('click', () => {
            resetpage()
            page++
            url = data.next
            get(url)
        })
    }
    outputDiv.appendChild(buttons)
}

/*Remove all child elements from old page*/
function resetpage() {
    while (outputDiv.firstChild) {
        outputDiv.removeChild(outputDiv.firstChild);
    }
}