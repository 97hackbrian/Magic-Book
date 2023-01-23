var indexedDB2 = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBaseC=null;

function startDBC(){
    dataBaseC = indexedDB.open("Reporte",1);
    //indexedDB.createTable("djs");
    dataBaseC.onupgradeneeded=function(e){
        alert("creado");
        var active =dataBaseC.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };

        var object = active.createObjectStore("items",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    }
    dataBaseC.onsuccess=function(e){

        loadAll();
        //count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}