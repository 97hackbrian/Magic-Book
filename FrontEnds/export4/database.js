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

        var object = active.createObjectStore("items",Option);
        object.createIndex('code','dni',{unique:false});
        object.createIndex('nombre','name',{unique:false});
        object.createIndex('precio','dni',{unique:false});
    }
    dataBase.onsuccess=function(e){
        alert("database loaded");
        loadAll();
    }

}

function add(){
    var active =dataBase.result;
    var data = active.transaction(["items"],"readwrite");
    var object = data.objectStore("items")
    if(document.getElementById("ingresarCode").value=="" || document.getElementById("ingresarname").value=="" || document.getElementById("ingresarprecio").value==""){
    alert("¡ingrese todos los campos por favor!");
    }
    else{
    var request = object.put({
        code: document.getElementById("ingresarCode").value,
        nombre: document.getElementById("ingresarname").value,
        precio: document.getElementById("ingresarprecio").value
    });
    }
    request.onerror=function(e){
        alert(request.error.name+ '\n\n'+request.error.message);
    }
    data.oncomplete=function(e){
        alert("guardado exitosamente "+document.getElementById("ingresarCode").value+"  "+document.getElementById("ingresarname").value+"  "+document.getElementById("ingresarprecio").value);
        loadAll();
    }
}

function remove(){

}

function loadAll(){
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
            outerHMTL+='\n\
            <tr>\n\
                <td>'+elements[key].code + '</td>\n\
                <td>'+elements[key].nombre + '</td>\n\
                <td>'+elements[key].precio + '</td>\n\
                </tr>';
        }
        elements=[];
        document.querySelector("#dataTable2").innerHTML=outerHMTL;       
    }
}
