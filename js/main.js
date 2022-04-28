const link = [
    {week: "2",
    label: "Looping a triangle",
    url: "week2/looping_a_triangle.html"},
    {week: "2",
    label: "Fizzbuzz",
    url: "week2/fizzbuzz.html"},    {week: "2",
    label: "Chessboard",
    url: "week2/chessboard.html"}
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