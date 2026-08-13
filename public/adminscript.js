window.addEventListener("load",async ()=>{
    let calluserdata= await fetch("/userdata/getalluser",{
        method:"GET"
    });
    let userdata= await calluserdata.json();
    let table=document.getElementById("admintableuser");
    
    for(let tuple of userdata){
        let row=document.createElement("tr");
        let mobile=document.createElement("td");
        let name=document.createElement("td");
        let password=document.createElement("td");
        mobile.innerText=tuple.mobile;
        name.innerText=tuple.name;
        password.innerText=tuple.user_password;
        row.appendChild(mobile);
        row.appendChild(name);
        row.appendChild(password);
        table.appendChild(row);
    }
});