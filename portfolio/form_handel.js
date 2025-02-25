function validinput()
{
    let name1 = document.forms["contact"]["first-name"].value;
    let name2 = document.forms["contact"]["last-name"].value;
    let email = document.forms["contact"]["email"].value;
    let password = document.forms["contact"]["password"].value;
    let tel = document.forms["contact"]["telephone"].value;
    
    if (name1 == "") {
        alert("First name must be filled out");
        return false;
    }
    if (name2 == "") {
        alert("Last name must be filled out");
        return false;
    }
    if (password == "") {
        alert("Password must be filled out");
        return false;
    }
    if (tel == "") {
        alert("Telephone number must be filled out");
        return false;
    }
    let successMessage = document.createElement("div");
    successMessage.style.color = "green";
    successMessage.style.fontSize = "20px";
    successMessage.style.marginTop = "20px";
    successMessage.innerHTML = "Form submitted successfully!";
    document.body.appendChild(successMessage);
}