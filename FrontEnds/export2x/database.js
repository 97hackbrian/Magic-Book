var indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase=null;
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

        active.createObjectStore("items",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    };
    dataBase.onsuccess=function(e){
        alert("database loaded");
    }

}

function add(){
    var active =dataBase.result;
    var data = active.transaction(["items"],"readwrite");
    var object = data.objectStore("items")
    object.put({
        code: document.getElementById("dataTable_filter").value;
    });
}

function remove(){

}