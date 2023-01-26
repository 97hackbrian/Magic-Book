var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase=null;
var timeout;
var ide;
var vector=new Array;
var vector2=new Array;

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
        object.createIndex('code','c',{unique:true});
        object.createIndex('nombre','n',{unique:false});
        object.createIndex('cantidad','ca',{unique:false});
        object.createIndex('precio','p',{unique:false});
    }
    dataBase.onsuccess=function(e){

        loadAll();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}



//let auxFF;
let auxFF=0;
function add(){
    var active =dataBase.result;
    var data = active.transaction(["items"],"readwrite");
    var object = data.objectStore("items");
    if(document.getElementById("ingresarCode").value==""||document.getElementById("ingresarcantidad").value==""){
        alert("¡ingrese el código y/o datos para agregar, por favor!");
    }
    else{
        

    var request = object.put({
        c: document.getElementById("ingresarCode").value,
        n: document.getElementById("ingresarname").value,
        ca: document.getElementById("ingresarcantidad").value,
        p: document.getElementById("ingresarprecio").value
        //alert("Guardado exitosamente el Item : \n" + " Código: "+document.getElementById("ingresarCode").value+" \n Nombre: "+document.getElementById("ingresarname").value+" \n Cantidad: "+document.getElementById("ingresarcantidad").value+" \n Precio: "+document.getElementById("ingresarprecio").value);
        //alert("Guardado exitosamente el Item : \n"+" Código: "+document.getElementById("ingresarCode").value+" \n Nombre: "+document.getElementById("ingresarname").value+" \n Precio: "+document.getElementById("ingresarprecio").value);
    });
    alert("Guardado exitosamente el Item : \n" + " Código: "+document.getElementById("ingresarCode").value+" \n Nombre: "+document.getElementById("ingresarname").value+" \n Cantidad: "+document.getElementById("ingresarcantidad").value+" \n Precio: "+document.getElementById("ingresarprecio").value);

    request.onerror = function (e) {			   
        var active= dataBase.result;
        var data= active.transaction(["items"], "readwrite");
        var object= data.objectStore("items");
         
         var dni2=document.getElementById("ingresarCode").value;
         var index= object.index("code");
         var request = index.get(String(dni2));
         
         
         
         request.onsuccess = function(){
          
              /*var result = request.result;
              console.log(result);
              result.name = document.querySelector("#name").value;
              result.surname = document.querySelector("#surname").value;*/
              
              object.openCursor().onsuccess = function (e){
              
               var result= e.target.result;
               
               if(result===null){return }
               
               console.log(result.value +" "+ dni2);
               if ( result.value.c == dni2){
                  console.log("result= "+ result.value.c + " dni2= "+ dni2);	 
                  console.log("actualizando");
                  result.value.ca = document.getElementById("ingresarcantidad").value;
                  //result.value.p = document.getElementById("ingresarprecio").value;
                  
                  var objeto = result.value;
                  result.update(objeto);
                  console.log("objeto actualizado");
                  //loadAll(); //funcion que muestra mis datos en una tabla 
               }//cierre if
                  result.continue();
              } //cierre open cursor
          
          data.oncomplete = function (e) {
      
          //alert('Objeto agregado correctamente');
          
          loadAll();
          
      };
              //console.log(objeto);
               
              
             
         } // cierre requeston success.
         
      }//cierre request on error
      //alert("hola");
      data.oncomplete = function (e) {
         
          loadAll();
          
      };
  }
}




function agregar() {
                var active = dataBase.result;
                var data = active.transaction(["people"], "readwrite");
                var object = data.objectStore("people");
					
					
					
                var request = object.put({
                    dni: document.querySelector("#dni").value,
                    name: document.querySelector("#name").value,
                    surname: document.querySelector("#surname").value
                });

                request.onerror = function (e) {
                   
				   
				  var active= dataBase.result;
				  var data= active.transaction(["people"], "readwrite");
				  var object= data.objectStore("people");
				   
				   var dni2=document.querySelector("#dni").value;
				   var index= object.index("by_dni");
				   var request = index.get(String(dni2));
				   
				   
				   
				   request.onsuccess = function(){
					
						/*var result = request.result;
						console.log(result);
						result.name = document.querySelector("#name").value;
						result.surname = document.querySelector("#surname").value;*/
						
						object.openCursor().onsuccess = function (e){
						
						 var result= e.target.result;
						 
						 if(result===null){return }
						 
						 console.log(result.value +" "+ dni2);
						 if ( result.value.dni == dni2){
							console.log("result= "+ result.value.dni + " dni2= "+ dni2);	 
							console.log("actualizando");
							result.value.name = document.querySelector("#name").value;
							result.value.surname = document.querySelector("#surname").value;
							
							var objeto = result.value;
							result.update(objeto);
							console.log("objeto actualizado");
							//loadAll(); //funcion que muestra mis datos en una tabla 
						 }//cierre if
							result.continue();
						} //cierre open cursor
					
					data.oncomplete = function (e) {
                    document.querySelector("#dni").value = '';
                    document.querySelector("#name").value = '';
                    document.querySelector("#surname").value = '';
                    //alert('Objeto agregado correctamente');
					
					loadAll();
					
                };
						//console.log(objeto);
						 
						
					   
				   } // cierre requeston success.
				   
                }//cierre request on error
				//alert("hola");
                data.oncomplete = function (e) {
                    document.querySelector("#dni").value = '';
                    document.querySelector("#name").value = '';
                    document.querySelector("#surname").value = '';
                    alert('Objeto agregado correctamente');
					
					loadAll();
					
                };
                
            }


function remove(){
//count();
		        var active = dataBase.result;
                var data = active.transaction(["items"], "readwrite");
                var object = data.objectStore("items");
                
                let dataTask =document.getElementById("ingresarCode").value;
                if(dataTask=="")
                {
                	alert("¡ingrese el código para eliminar por favor!");
                }
                else{
//                var index = target.getAttribute('id');;
                
                var index = object.index('code');
                var request = index.get(document.getElementById("ingresarCode").value);
                
                request.onsuccess = function () {
                    var result = request.result;
                    object.delete(result.id);
                };

                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };
 
                data.oncomplete = function (e) {
 			//document.getElementById("eliminado").value = '';
                        document.getElementById("ingresarCode").value = '';
			document.getElementById("ingresarname").value = '';
            document.getElementById("ingresarcantidad").value = '';
			document.getElementById("ingresarprecio").value = '';
 
                    alert('ITEM con el código: '+dataTask+"\n"+" Nombre: "+request.result.n+"     eliminado correctamente.");
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
    document.getElementById("ingresarcantidad").value = '';
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
            	<td class="text-center">'+elements[key].id + '</td>\n\
                <td>'+elements[key].c + '</td>\n\
                <td>'+elements[key].n + '</td>\n\
                <td class="text-center">'+elements[key].ca + '</td>\n\
                <td class="text-center">'+elements[key].p + '</td>\n\
                <td class="text-center">'+elements[key].p*elements[key].ca + '</td>\n\
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

    var dataBaseV12 = indexedDB.open("object",1);
    
    
    if(document.getElementById("ScanCode").value==""){
    alert("¡Escanear el código o escribirlo por favor!");
    }
    else{
    data.oncomplete=function(e){

        console.log("guardado"+document.getElementById("ScanCode").value);
        var dataBaseV12 = indexedDB.open("object",1);
        dataBaseV12.onsuccess = function(event) {
            console.log("aqui 2.0");
            var active2 =event.target.result;
            var data2 = active2.transaction(["items"],"readwrite");
            var object2 = data2.objectStore("items")

            var dni2=document.getElementById("ScanCode").value;
            var index= object2.index("code");
            var request = index.get(String(dni2));

            request.onsuccess = function(){
                object2.openCursor().onsuccess = function (e){
                
                 var result= e.target.result;
                 
                 if(result===null){return }
                 
                 console.log(result.value +" "+ dni2);
                 if ( result.value.c == dni2){
                    console.log("result= "+ result.value.c + " code= "+ dni2);	 
                    console.log("actualizando la cantidad -1");
                    result.value.ca = result.value.ca-1;
                    //result.value.p = document.getElementById("ingresarprecio").value;
                    
                    var objeto = result.value;
                    result.update(objeto);
                    console.log("objeto actualizado");
                    //loadAll(); //funcion que muestra mis datos en una tabla 
                 }//cierre if
                    result.continue();
                } //cierre open cursor
            
           } 
        }
        //document.getElementById("ScanCode").value = '';
        loadVenta();
    }
    var request = object.put({
        c: document.getElementById("ScanCode").value
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
    document.getElementById("ScanCode").focus();
vec1();
    var aux1;
    var aux2;
    var aux3;
    suma=0;

    var active =dataBase.result;
    var data = active.transaction(["items2"],"readonly");
    var object = data.objectStore("items2")
    var elements2=[];
    //vector=[];////////////////
    //vector2=[];
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
        	if(elements2[key].c == vector[ind].c){
                auxf++;
        	aux1=ind;
        	console.log("-<" +vector[aux1].n);
        	aux2=vector[aux1].n;
        	aux3=vector[aux1].p;
            vector2[key]=vector[aux1].c;
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
            '+elements2[key].c+'</strong>\n\
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
            '+elements2[key].c+'</strong>\n\
            </div>\n\
            </div>\n\
            </div>';

        }   	
        }
        out2+='Bs.'+suma;
        elements2=[];
        document.querySelector("#ventas").innerHTML=outerHMTL;
        document.querySelector("#total").innerHTML=out2;
        document.getElementById("ScanCode").value = '';
    }
}


var activexxx=null;
function Vender(){
    //startDBC();
    //dataBaseCx = indexedDB.open("Reporte",1);
    addC(suma);
    console.log("suma es   "+suma);
    vec1();
    console.log("vec1");
    console.log(vector);
    console.log("vec2");
    console.log(vector2);
        alert("Vendido! "+suma+"Bs.");
        suma=0;
        var req = indexedDB.deleteDatabase("object2");
        document.getElementById("ScanCode").value = '';
        location.reload();
        //startDB2();
        //loadVenta();
}
    
    





let dataBase2;
function startDB2(){
    //startDBC();
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


var indexedDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBaseC=null;
var dataBaseCx=null;
var activex=null;
function startDBC(){
    dataBaseC = indexedDB2.open("Reporte",1);
    //indexedDB.createTable("djs");
    dataBaseC.onupgradeneeded=function(e){
        alert("creado");
        var active =dataBaseC.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };
       // activex=dataBaseC.result;
        var object = active.createObjectStore("items",Option);
        object.createIndex('diario','d',{unique:false});
        object.createIndex('semanal','s',{unique:false});
        object.createIndex('mensuales','m',{unique:false});
    }
    dataBaseC.onsuccess=function(e){
        loadAllC();
        //loadC();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}

function addC(sumaX){
    //	count();
       // var dataBaseCx2 = indexedDB2.open("Reporte",1);
        
       dataBaseC = indexedDB2.open("Reporte",1);
       //indexedDB.createTable("djs");
       dataBaseC.onupgradeneeded=function(e){
           alert("creado");
           var active =dataBaseC.result;
           var Option ={
               keyPath:'id',
               autoIncrement: true
           };
           //activex=dataBaseC.result;
           var object = active.createObjectStore("items",Option);
           object.createIndex('diario','d',{unique:false});
           object.createIndex('semanal','s',{unique:false});
           object.createIndex('mensuales','m',{unique:false});
       }
       dataBaseC.onsuccess=function(e){
           //loadAllC();
           //loadC();
           //count();
           //dataBaseC = indexedDB2.open("Reporte",1);
        var active =dataBaseC.result;
        var data = active.transaction(["items"],"readwrite");
        var object = data.objectStore("items")
 
 
        data.oncomplete=function(e){
    //    	loadAll();
            console.log("Guardado exitosamente el pago  "+sumaX);
            //loadAll();
        }
        var request = object.put({
            day: sumaX
        });
        
            
        
        data.onerror=function(e){
            alert("error"+request.error.name+ '\n\n'+request.error.message);
        }
        
    }
    }
    

    
    function loadAllC(){
        var dataBasexx=dataBaseC;
        //var dataBaseC2 = indexedDB2.open("Reporte",1);
        var dataBasexx=indexedDB2.open("Reporte",1);

        var active =dataBaseC.result;
        var data = active.transaction(["items"],"readonly");
        var object = data.objectStore("items")
        var elements=[];
        var dia=0;
    
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
                dia=parseInt(elements[key].day)+parseInt(dia);

            }
            console.log(dia);
            
            
            
                outerHMTL+=dia+" Bs.";
              
            
            elements=[];
            document.querySelector("#diar").innerHTML=outerHMTL;       
        }
    }



    const inputxx=document.getElementById("ScanCode");

    if (inputxx) {

    inputxx.addEventListener('keyup',(e)=>{
        if(e.keyCode===13){
            add2();
        }
    }
    );
}

const inputxx2=document.getElementById("buscar");

if (inputxx2) {

inputxx2.addEventListener('keyup',(e)=>{
    if(e.keyCode===13){
        buscador();
    }
}
);
}




function buscador(){
    console.log("buscado");
    window.find(document.getElementById("buscar").value);
}