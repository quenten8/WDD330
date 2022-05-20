const link = [
    {week: "2",
    label: "Looping a triangle",
    url: "week2/looping_a_triangle.html"},
    {week: "2",
    label: "Fizzbuzz",
    url: "week2/fizzbuzz.html"},    
    {week: "2",
    label: "Chessboard",
    url: "week2/chessboard.html"},    
    {week: "3",
    label: "Building a table",
    url: "week3/building_a_table.html"},    
    {week: "3",
    label: "Balloon",
    url: "week3/balloon.html"},
    {week: "4",
    label: "Vector",
    url: "week4/vector.html"},
    {week: "4",
    label: "Groups",
    url: "week4/groups.html"},
    {week: "4",
    label: "Tic Tac Toe",
    url: "week4/tictac.html"},
    {week: "5",
    label: "Events",
    url: "week5/events.html"}
            ]
const list = document.querySelector('#list');

link.forEach(element => {

    let assignment = document.createElement('li');
    let url = document.createElement('a');

    url.textContent = `Week ${element.week}, ${element.label} `;
    url.setAttribute('href', element.url);
  
    assignment.appendChild(url);

    list.appendChild(assignment);
});