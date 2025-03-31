let text, parser, xmlDoc;
text = `  
<books>
    <book price="29.99" currency="dollars">
        <title>Java Programming</title>
        <author>Author 1</author>
    </book> 
    <book price="20.99" currency="dollars">
        <title>C++ Programming</title>
        <author>Author 2</author>
    </book> 
    <book price="30.00" currency="dollars">
        <title>Python Programming</title>
        <author>Author 3</author>
    </book> 
</books>`;

parser = new DOMParser();
xmlDoc = parser.parseFromString(text, "text/xml");

function displayBooks() {
    let books = xmlDoc.getElementsByTagName("book");
    let table = "<table border='1'><tr><th>Title</th><th>Author</th><th>Price</th><th>Currency</th></tr>";

    for (let i = 0; i < books.length; i++) {
        let title = books[i].getElementsByTagName("title")[0].textContent;
        let author = books[i].getElementsByTagName("author")[0].textContent;
        let price = books[i].getAttribute("price");
        let currency = books[i].getAttribute("currency"); 

        table += `<tr>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>${price}</td>
                    <td>${currency}</td>
                  </tr>`;
    }
    table += "</table>";

    document.getElementById("demo").innerHTML = table;
}

function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;

    if (title === "" || author === "" || price === "") {
        alert("error!");
        return;
    }

    let newBook = xmlDoc.createElement("book");
    newBook.setAttribute("price", price);
    newBook.setAttribute("currency", "dollars");

    let newTitle = xmlDoc.createElement("title");
    newTitle.textContent = title;

    let newAuthor = xmlDoc.createElement("author");
    newAuthor.textContent = author;

    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);

    xmlDoc.getElementsByTagName("books")[0].appendChild(newBook);

    displayBooks();
    document.getElementById("bookForm").reset();
}

displayBooks();
