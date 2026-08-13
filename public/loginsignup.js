let logindiv=document.getElementById("logindiv");
let registerdiv=document.getElementById("registerdiv");
let admindiv=document.getElementById("admindiv");
registerdiv.style.display="none";
let errorp=document.getElementById("errorshow");
let errorpr=document.getElementById("errorshowregister");
let erroradmin=document.getElementById("errorshowadmin");
clear()
loaddiv("logindiv","numberinput");
function clear(){
    errorp.innerText="";
    erroradmin.innerText="";
    errorpr.innerText="";
}
function loaddiv(divname,firstinput){
    clear();
    logindiv.style.display="none";
    admindiv.style.display="none";
    registerdiv.style.display="none";
    document.getElementById(divname).style.display="flex";
    document.getElementById(firstinput).focus();
}
function nextfield(event,nextfield){
    if(event.key=="Enter"){
        document.getElementById(nextfield).focus();
    }
}
function btnenter(event,btnid){
    if(event.key=="Enter"){
        document.getElementById(btnid).click();
    }
}
async function validateadmin(){
    let adminid=document.getElementById("idinputadmin").value;
    let adminpassword=document.getElementById("passwordinputadmin").value;
    if(!adminid || !adminpassword){
        erroradmin.innerText="Fill all fields";
        return;
    }
    let details={"adminid":adminid,"password":adminpassword};
    document.getElementById("idinputadmin").value="";
    document.getElementById("passwordinputadmin").value="";
    erroradmin.innerText="";
    let validate=await fetch("../checkadmin/admin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(details)
    });
    let data= await validate.json();
    if(data.access){
        erroradmin.innerText="Admin verified";
        window.location.href="adminpage.html";
        return;
    }
    else{
        erroradmin.innerText=data.text;
    }
}
async function validateuser(){
    let usernumber=document.getElementById("numberinput").value;
    let userpassword=document.getElementById("passwordinput").value;
    if(!usernumber || !userpassword){
        errorp.innerText="Fill all fields";
        return;
    }
    let details={"number":usernumber,"password":userpassword};
    document.getElementById("numberinput").value="";
    document.getElementById("passwordinput").value="";
    errorp.innerText="";
    let validate=await fetch("../userdata/checkuserdata",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(details)
    });
    let data=await validate.json();
    if(data.access){
        errorp.innerText="Loading....";
        window.location.href="page.html";
        return;
    }
    else{
        errorp.innerText=data.text;
    }
}
async function adduser(){
    let usernumber=document.getElementById("numberinputregister").value;
    let userpassword=document.getElementById("passwordinputregister").value;
    if(!usernumber || !userpassword){
        errorpr.innerText="Fill all fields";
        return;
    }
    let details={"number":usernumber,"password":userpassword};
    document.getElementById("numberinputregister").value="";
    document.getElementById("passwordinputregister").value="";
    errorpr.innerText="";
    let datares= await fetch("../userdata/adduser",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(details)
    });
    let response= await datares.json();
    console.log(response);
    if(response.status==0){
        if(response.error=="ER_DUP_ENTRY"){
            errorpr.innerText="User already exist";
        }
        return;
    }
    errorpr.innerText="user added";
}

