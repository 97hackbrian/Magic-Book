var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase=null;
var timeout;
var ide;
var vector=new Array;

function startDB(){
    dataBase = indexedDB.open("object",1);
    //indexedDB.createTable("djs");
    dataBase.onupgradeneeded=function(e){
        alert("creado");
        var active =dataBase.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };

        var object = active.createObjectStore("items",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    }
    dataBase.onsuccess=function(e){

        loadAll();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}

function add(){
//	count();
    var active =dataBase.result;
    var data = active.transaction(["items"],"readwrite");
    var object = data.objectStore("items")
    if(document.getElementById("ingresarCode").value=="" || document.getElementById("ingresarname").value=="" || document.getElementById("ingresarprecio").value==""){
    alert("¡ingrese todos los campos para añadir por favor!");
    }
    else{
    data.oncomplete=function(e){
//    	loadAll();
        alert("Guardado exitosamente el Item : \n"+" Código: "+document.getElementById("ingresarCode").value+" \n Nombre: "+document.getElementById("ingresarname").value+" \n Precio: "+document.getElementById("ingresarprecio").value);
        loadAll();
    }
    var request = object.put({
        code: document.getElementById("ingresarCode").value,
        nombre: document.getElementById("ingresarname").value,
        precio: document.getElementById("ingresarprecio").value
    });
    
        
    }
    data.onerror=function(e){
        alert("error"+request.error.name+ '\n\n'+request.error.message);
    }
    
}

function remove(){
//count();
		var active = dataBase.result;
                var data = active.transaction(["items"], "readwrite");
                var object = data.objectStore("items");
                
                let dataTask = document.getElementById("eliminado").value;
                if(dataTask=="")
                {
                	alert("¡ingrese todos los campos para eliminar por favor!");
                }
                else{
//                var index = target.getAttribute('id');;
                
//                var index = object.index('code');
                var request = object.delete(+document.getElementById("eliminado").value);
                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };
 
                data.oncomplete = function (e) {
 			document.getElementById("eliminado").value = '';
                        document.getElementById("ingresarCode").value = '';
			document.getElementById("ingresarname").value = '';
			document.getElementById("ingresarprecio").value = '';
 
                    alert('ITEM '+dataTask+" eliminado correctamente");
                    loadAll();
                };

}

}
function count(){
    var active =dataBase.result;
    var data = active.transaction(["items"],"readonly");
    var object = data.objectStore("items")
    var elements=[];

    object.openCursor().onsuccess=function(e){
        var result =e.target.result;
        if(result==null){
            return;
        }
        
        elements.push(result.value);
        result.continue();
    };
    data.oncomplete=function(){
        var outerHMTL='';
        for(var key in elements){
        	ide=elements[key].id+1;
        	console.log(ide);
        }
        
        elements.reverse()
        for(var key in elements){
            outerHMTL+='\n\
            <tr>\n\
            	<td>'+elements[key].id + '</td>\n\
                <td>'+elements[key].code + '</td>\n\
                <td>'+elements[key].nombre + '</td>\n\
                <td>'+elements[key].precio + '</td>\n\
                </tr>';
          
        }
        elements=[];
        document.querySelector("#dataTable2").innerHTML=outerHMTL;       
    }
}


function loadAll(){
	document.getElementById("ingresarCode").value = '';
	document.getElementById("ingresarname").value = '';
	document.getElementById("ingresarprecio").value = '';
    var active =dataBase.result;
    var data = active.transaction(["items"],"readonly");
    var object = data.objectStore("items")
    var elements=[];

    object.openCursor().onsuccess=function(e){
        var result =e.target.result;
        if(result==null){
            return;
        }
        
        elements.push(result.value);
        
//        vector.push(elements);
	vector.push(result.value);
        
        result.continue();
    };
    data.oncomplete=function(){
        var outerHMTL='';
        for(var key in elements){
        //	ide=elements[key].id+2;
        }
        
        elements.reverse()
        for(var key in elements){
            outerHMTL+='\n\
            <tr>\n\
            	<td>'+elements[key].id + '</td>\n\
                <td>'+elements[key].code + '</td>\n\
                <td>'+elements[key].nombre + '</td>\n\
                <td>'+elements[key].precio + '</td>\n\
                </tr>';
          
        }
        elements=[];
        document.querySelector("#dataTable2").innerHTML=outerHMTL;       
    }
}

function loadAll2(){

    dataBase = indexedDB.open("object",1);
    //indexedDB.createTable("djs");
    dataBase.onupgradeneeded=function(e){
        alert("creado");
        var active =dataBase.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };

        var object = active.createObjectStore("items",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    }
    dataBase.onsuccess=function(e){


  console.log("Base de datos correctamente leida")

    }



    var active =dataBase.result;
    var data = active.transaction(["items"],"readonly");
    var object = data.objectStore("items")
    var elements=[];

    object.openCursor().onsuccess=function(e){
        var result =e.target.result;
        if(result==null){
            return;
        }
        
        elements.push(result.value);
        result.continue();
    };
    data.oncomplete=function(){
        var outerHMTL='';
        for(var key in elements){
        //	ide=elements[key].id+2;
        }
        
        elements.reverse()
        for(var key in elements){
            outerHMTL+='\n\
            <tr>\n\
            	<td>'+elements[key].id + '</td>\n\
                <td>'+elements[key].code + '</td>\n\
                <td>'+elements[key].nombre + '</td>\n\
                <td>'+elements[key].precio + '</td>\n\
                </tr>';
          
        }
        elements=[];
        document.querySelector("#dataTable2").innerHTML=outerHMTL;       
    }
}


function add2(){
//	count();
suma=0;
    var active =dataBase.result;
    var data = active.transaction(["items2"],"readwrite");
    var object = data.objectStore("items2")
    if(document.getElementById("ScanCode").value==""){
    alert("¡Escanear el código o escribirlo por favor!");
    }
    else{
    data.oncomplete=function(e){
//    	loadAll();
        //alert("Guardado exitosamente el C : \n"+" Código: "+document.getElementById("ingresarCode").value+" \n Nombre: "+document.getElementById("ingresarname").value+" \n Precio: "+document.getElementById("ingresarprecio").value);
        console.log("guardado"+document.getElementById("ScanCode").value);
        loadVenta();
    }
    var request = object.put({
        code: document.getElementById("ScanCode").value
    });
    
        
    }
    data.onerror=function(e){
        alert("error code DB"+request.error.name+ '\n\n'+request.error.message);
    }
    
}


function vec1(){
    var active = dataBase2.result;
    var data = active.transaction(["items"],"readonly");
    var object = data.objectStore("items")
    var elementsx=[];
object.openCursor().onsuccess=function(e){
        var result2 =e.target.result;
        if(result2==null){
            return;
        }
        
        elementsx.push(result2.value);
        vector.push(result2.value);
        result2.continue();
    };
    data.oncomplete=function(){
        for(var key in elementsx){
       // console.log("nombre: "+elementsx[key].code);
        }
        }
        
/*        
        for(var key in vector){
        console.log("nombre: "+vector[key].nombre);
        }*/
}


var suma;

function loadVenta(){

vec1();
    var aux1;
    var aux2;
    var aux3;
    suma=0;

    var active =dataBase.result;
    var data = active.transaction(["items2"],"readonly");
    var object = data.objectStore("items2")
    var elements2=[];

    object.openCursor().onsuccess=function(e){
        var result =e.target.result;
        if(result==null){
            return;
        }
        
        elements2.push(result.value);
        result.continue();
    };
    data.oncomplete=function(){
    
    for(var key in vector){
        //console.log("nombre: "+vector[key].nombre);
        
        }
    
        var outerHMTL='';
        var out2='';
        for(var key in elements2){
        //	ide=elements[key].id+2;
        
        }
        
        var auxf=0;
        
        //elements.reverse()
        for(var key in elements2){
            auxf=0;
        for(var ind in vector){
        	if(elements2[key].code == vector[ind].code){

            
                auxf++;
        	aux1=ind;
        	console.log("-<" +vector[aux1].nombre);
        	aux2=vector[aux1].nombre;
        	aux3=vector[aux1].precio;

            if (aux2==undefined||aux3==undefined){
                aux2="nombre no registrado";
                aux3="precio no registrado";
                }
            if(auxf<=1){


            suma=parseInt(suma)+parseInt(aux3);
            outerHMTL+='\n\
            <div class="form-row">\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Precio</strong><br></label><strong class="form-control" id="PrecioMostrar">\n\
            '+aux3+'</strong>\n\
            </div>\n\
            </div>\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Nombre</strong><br></label><strong class="form-control" id="NombreMostrar">\n\
            '+aux2+'</strong>\n\
            </div>\n\
            </div>\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Código</strong><br></label><strong class="form-control" id="CódigoMostrar">\n\
            '+elements2[key].code+'</strong>\n\
            </div>\n\
            </div>\n\
            </div>';
        	}
            //break;

        }

        /*
            else{
                auxf++;
                if(auxf<=1){
                aux2=undefined;
                aux3=undefined;
                if (aux2==undefined||aux3==undefined){
                    aux2="nombre no registrado";
                    aux3="precio no registrado";
                    }

                    suma=parseInt(suma)+parseInt(aux3);
                    outerHMTL+='\n\
                    <div class="form-row">\n\
                    <div class="col">\n\
                    <div class="form-group"><label for="username"><strong>Precio</strong><br></label><strong class="form-control" id="PrecioMostrar">\n\
                    '+aux3+'</strong>\n\
                    </div>\n\
                    </div>\n\
                    <div class="col">\n\
                    <div class="form-group"><label for="username"><strong>Nombre</strong><br></label><strong class="form-control" id="NombreMostrar">\n\
                    '+aux2+'</strong>\n\
                    </div>\n\
                    </div>\n\
                    <div class="col">\n\
                    <div class="form-group"><label for="username"><strong>Código</strong><br></label><strong class="form-control" id="CódigoMostrar">\n\
                    '+elements2[key].code+'</strong>\n\
                    </div>\n\
                    </div>\n\
                    </div>';
                    
            }
        }
        */
        	//console.log(vector[ind].code);        	
        	
        }
        
        if(auxf==0)
        {
            aux2="Item no registrado";
            aux3="Item no registrado";
            outerHMTL+='\n\
            <div class="form-row">\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Precio</strong><br></label><strong class="form-control" id="PrecioMostrar">\n\
            '+aux3+'</strong>\n\
            </div>\n\
            </div>\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Nombre</strong><br></label><strong class="form-control" id="NombreMostrar">\n\
            '+aux2+'</strong>\n\
            </div>\n\
            </div>\n\
            <div class="col">\n\
            <div class="form-group"><label for="username"><strong>Código</strong><br></label><strong class="form-control" id="CódigoMostrar">\n\
            '+elements2[key].code+'</strong>\n\
            </div>\n\
            </div>\n\
            </div>';

        }
        
                	
          
        }
        out2+='Bs.'+suma;
        elements2=[];
        document.querySelector("#ventas").innerHTML=outerHMTL;
        document.querySelector("#total").innerHTML=out2;
    }

}



function Vender(){
    alert("Vendido! "+suma+"Bs.");
suma=0;
var req = indexedDB.deleteDatabase("object2");

location.reload();
startDB2();
loadVenta();


req.onsuccess = function () {
    console.log("Deleted database successfully");
};
req.onerror = function () {
    console.log("Couldn't delete database");
};

}


let dataBase2;
function startDB2(){
    dataBase2 = indexedDB.open("object",1);
	//console.log(<?php echo $variable1; ?>);
    dataBase = indexedDB.open("object2",1);
    //indexedDB.createTable("djs");
    dataBase.onupgradeneeded=function(e){
        //alert("Vendido! "+suma+"Bs.");
        var active =dataBase.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };

        var object = active.createObjectStore("items2",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    }
    dataBase.onsuccess=function(e){

        loadVenta();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 20);
    }

}


