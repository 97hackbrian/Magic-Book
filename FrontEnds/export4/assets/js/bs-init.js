var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

$(document).ready(function(){

	$('[data-bss-chart]').each(function(index, elem) {
		this.chart = new Chart($(elem), $(elem).data('bss-chart'));
	});

});





var dataDB=null;
function createDate(){
    dataDB = indexedDB.open("date",1);
    //indexedDB.createTable("djs");
    dataDB.onupgradeneeded=function(e){
        alert("creado");
        var active =dataDB.result;
        var Option ={
            keyPath:'id',
            autoIncrement: true
        };

        var object = active.createObjectStore("fecha",Option);
        object.createIndex('dia','d',{unique:false});
        object.createIndex('semana','s',{unique:false});
        object.createIndex('mes','m',{unique:false});
        object.createIndex('año','a',{unique:false});
		object.createIndex('ventadiaria','vd',{unique:false});
    }
    dataDB.onsuccess=function(e){

		///////////////<------------
        
		addFecha();
		CompareDate();
		//count();
        
setTimeout(() => {
  console.log("Base de datos correctamente leida")
}, 2000);
    }

}

function LoadDate(){
	var dataBasexx=dataBaseC;
        //var dataBaseC2 = indexedDB2.open("Reporte",1);
        var dataBasexx=indexedDB2.open("Reporte",1);

        var active =dataBaseC.result;
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
		//var outerHMTL='';
		for(var key in elements){
		//	ide=elements[key].id+2;
			dia=parseInt(elements[key].day)+parseInt(dia);

		}
		
		
		
		var activeD =dataDB.result;
        var dataD = activeD.transaction(["fecha"],"readwrite");
        var objectD = dataD.objectStore("fecha")
 
 
        dataD.oncomplete=function(e){
    //    	loadAll();
            //console.log("Guardado exitosamente el pago  "+sumaX);
            //loadAll();
			console.log("guardar: "+dia);
        }
        var request = objectD.put({
            vd: dia
        });
			
		  
		
		elements=[];
		      
	}
}

function addFecha(){
	var dataDB2 = indexedDB.open("date",1);
	dataDB2.onsuccess=function(e)
	{
	var activeD =dataDB2.result;
        var dataD = activeD.transaction(["fecha"],"readwrite");
        var objectD = dataD.objectStore("fecha")
	//f=new Date();
		var dia=f.getDate().toString();
		var mes=f.getMonth()+1;
		mes=mes.toString();
		
        dataD.oncomplete=function(e){
    //    	loadAll();
            //console.log("Guardado exitosamente el pago  "+sumaX);
            //loadAll();
			console.log("actual: "+dia);
        }
        var request = objectD.put({
            d: dia,
			m: mes
        });
}
}
var f=null;

function updateDate(){
	f=new Date();
}
function CompareDate(){




	


	var active =dataDB.result;
	var data = active.transaction(["fecha"],"readonly");
	var object = data.objectStore("fecha")
	var elements=[];
	var dia=0;
	var mesv=0;

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
		//var outerHMTL='';
		for(var key in elements){
		//	ide=elements[key].id+2;
			if(key==0)
			{
				dia=parseInt(elements[key].d);
			mesv=parseInt(elements[key].m);
			}
			else{
			dia=parseInt(elements[key-1].d);
			mesv=parseInt(elements[key-1].m);
			}
		}
		var diav=f.getDate().toString();
		var mes=f.getMonth()+1;
		mes=mes.toString();

		//ifFVF
		console.log("dia leido: "+dia);
		console.log("mes leido: "+mesv);
		console.log("dia actual: "+diav);
		console.log("mes actual: "+mes);
			
		if(diav==dia && mes==mesv){
			console.log("dia coincide");
			//LoadDate();
			addFecha();
			
		}
		else{
			console.log("dia NO coincide");
			LoadDate();
			addFecha();
			indexedDB.deleteDatabase("Reporte");
		}
		
		elements=[];
		      
	}
	
}