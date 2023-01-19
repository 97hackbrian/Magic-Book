var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase=null;
let timeout;
let ide;
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
