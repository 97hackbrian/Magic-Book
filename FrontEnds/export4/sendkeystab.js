var inputs = document.getElementsByTagName('input');

window.onload = function(){
    //console.log("tad  ");
    // Se ciclan todos los inputs 
    for (i = 0; i<inputs.length; i++){
        
        if(i == 0){
            inputs[i].focus();
        } 
        
        // para agregarles la función a detonar
        inputs[i].addEventListener("keypress", send_key_tab);             
    }
    
    // Se liga la función al avento click del botón el evento click
    document.getElementsByTagName('button')[0].addEventListener("click", aceptar);
        
}

function send_key_tab(e){
    
    // Se carga el valor del código de la tecla presionada
    var keycode = e.keyCode;

    if(keycode == '13'){
        
        // Se prviente la acción predeterminada SOLO al dar ENTER
        e.preventDefault();    
        
        
        // Se itera por todos los inputs existentes
        for (x= 0; x < inputs.length; x++){
            
        
            // Se valida cual de ellos es el actual 
            if(inputs[x].id == e.target.id){
                
                // Se carga el siguiente
                var nextInput = inputs[x + 1];
            }                        
        }

        // Si se encontró un siguiente INPUT
        if (nextInput) {
            
            // Se posiciona en dicho objeto
            nextInput.focus();
            
            // Se selecciona el contenido del objeto en el que se acaba de posicionar
            nextInput.select();
            
        }else{
            
            //Se ejecuta el código relacionado al boton o se manda dar clic al botón o comando del formulario
            document.getElementsByTagName('button')[0].focus();
            
            //Se ejecuta el código relacionado al boton o se manda dar clic al botón o comando del formulario
            document.getElementsByTagName('button')[0].click();
        }
    }        
}

function aceptar(e){
    e.preventDefault();
    console.log('entró al aceptar');
}