var attempt=4;
function validate(){
    var password=document.getElementById("exampleInputPassword").value;
    if(password=="admin"){
        alert("ingreso correcto del administrador");
        window.open("4Balance.html","fullscreen", 'top=0,left=0,width='+(screen.availWidth)+',height ='+(screen.availHeight)+',fullscreen=yes,toolbar=0 ,location=0,directories=0,status=0,menubar=0,resiz able=0,scrolling=0,scrollbars=0');
        return false;
    }
    else{
        attempt--;
        alert("contraseña incorrecta");
        return false;
    }
}
function empleado(){
    alert("acceso empledo");
    window.open("2Añadir.html","fullscreen", 'top=0,left=0,width='+(screen.availWidth)+',height ='+(screen.availHeight)+',fullscreen=yes,toolbar=0 ,location=0,directories=0,status=0,menubar=0,resiz able=0,scrolling=0,scrollbars=0');
    return false;
}