let logindiv=document.getElementById("logindiv");
let registerdiv=document.getElementById("registerdiv");
registerdiv.style.display="none";
let errorp=document.getElementById("errorshow");
let errorpr=document.getElementById("errorshowregister");
function loadregisterdiv(){
    logindiv.style.display="none";
    registerdiv.style.display="flex";
}
function loadlogindiv(){
    logindiv.style.display="flex";
    registerdiv.style.display="none";
}
function validateuser(){
    let number=document.getElementById("numberinput").value;
    let password=document.getElementById("passwordinput").value;
    if(!number || !password){
        errorp.innerText="Fill all fields";
        return;
    }
    errorp.innerText="";
    console.log(number,password);
}
function adduser(){
    let number=document.getElementById("numberinputregister").value;
    let password=document.getElementById("passwordinputregister").value;
    if(!number || !password){
        errorpr.innerText="Fill all fields";
        return;
    }
    errorpr.innerText="";
    console.log(number,password);

}