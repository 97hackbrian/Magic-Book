var indexedDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBaseC=null;

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

        var object = active.createObjectStore("items",Option);
        object.createIndex('diario','d',{unique:false});
        object.createIndex('semanal','s',{unique:false});
        object.createIndex('mensuales','m',{unique:false});
    }
    dataBaseC.onsuccess=function(e){

        loadC();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}

function addC(){
    //	count();
        var active =dataBaseC.result;
        var data = active.transaction(["items"],"readwrite");
        var object = data.objectStore("items")
 
 
        data.oncomplete=function(e){
    //    	loadAll();
            alert("Guardado exitosamente el pago");
            //loadAll();
        }
        var request = object.put({
            day: document.getElementById("ingresarCode").value
        });
        
            
        
        data.onerror=function(e){
            alert("error"+request.error.name+ '\n\n'+request.error.message);
        }
        
    }