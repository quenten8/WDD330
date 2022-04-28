    let d = new Date(document.lastModified);
    let date = d.toLocaleString();
    document.querySelector("#modified").innerHTML = date;

    const y = new Date();
    document.querySelector("#year").innerHTML = y.getFullYear();
   