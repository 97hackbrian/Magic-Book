var attempt=4;
function validate(){
    var password=document.getElementById("exampleInputPassword").value;
    if(password=="admin"){
        alert("ingreso correcto");
        window.location="4Balance.html";
    }
    else{
        attempt--;
        alert("contraseña incorrecta");
    }
}
function empleado(){
    alert("acceso empledo");
}