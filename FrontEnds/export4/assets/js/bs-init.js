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
        alert("Base de datos del balance creado!");
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
		loadAllComplete();
		//loadAllhist();
		//count();
        auxFFF=false;
setTimeout(() => {
  console.log("Base de datos correctamente leida");
  chart.update();
  //location.reload();
  updateAll();
}, 500);

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
			dia=parseInt(elements[key].d)+parseInt(dia);

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
			//location.reload();
			
		}
		else{
			console.log("dia NO coincide");
			LoadDate();
			addFecha();
			indexedDB.deleteDatabase("Reporte");
			//location.reload();
		}
		
		elements=[];
		      
	}
	
}


function loadAllComplete(){
	
	var dataDB2 = indexedDB.open("date",1);
	dataDB2.onsuccess=function(e)
	{
	var active =dataDB2.result;
	var data = active.transaction(["fecha"],"readonly");
	var object = data.objectStore("fecha")
	var elements=new Array;
	var dia=0;

	object.openCursor().onsuccess=function(e){
		var result =e.target.result;
		if(result==null){
			return;
		}
		
		elements.push(result.value);
		
//        vector.push(elements);
	///vector.push(result.value);
		
		result.continue();
	};
	data.oncomplete=function(){
		
		var outerHMTL='';
		var outerHMTL2='';
		for(var key in elements){
		//	ide=elements[key].id+2;
		console.log(elements[key].vd+" <--");
			if(elements[key].vd!=undefined){
			dia=parseInt(elements[key].vd)+parseInt(dia);
			}

		}
		dia=dia+ parseInt(document.querySelector("#diar").innerHTML)
		console.log("todito "+dia);
		console.log(elements);
		
			
			outerHMTL+=dia+" Bs..";
		  
		
		
		document.querySelector("#todito").innerHTML=outerHMTL;       
		var auxx=0;
		for(var key in elements){
			if(elements[key].vd!=undefined){

				vectorito1[auxx]=elements[key-1].d+"/"+elements[key-1].m;
				vectorito2[auxx]=elements[key-1].m;
				vectorito3[auxx]=elements[key].vd;
				auxx++;
            outerHMTL2+='\n\
            <tr>\n\
            	<td class="text-center">'+elements[key-1].d + '</td>\n\
                <td>'+elements[key-1].m + '</td>\n\
                <td>'+elements[key].vd + '</td>\n\
                </tr>';
			}
        }
		document.querySelector("#dataTable2x").innerHTML=outerHMTL2;
		elements=[];
	}
}

}
var vectorito1=[];
var vectorito2=[];
var vectorito3=[];

function loadAllhist(){
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

if(document.getElementById("Gsemana")){
	//chart.update();
	/*
	if(vectorito1.length>=5){
		vectorito1=[];
		vectorito2=[];
		vectorito3=[];
	}*/
let miCanvas=document.getElementById("Gsemana").getContext("2d");
var chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:vectorito1,
        datasets:[
            {
                label:"Ganancias diarias en el mes",  
                fill  :true,  
                data  :vectorito3,
                backgroundColor  :  "rgb(105, 198, 220)",
                borderColor  :  "rgb(1, 1, 1, 1)"
            }
        ]
    }
	});
	//chart.update();
}
///////////////////
var auxFFF=false;
function updateAll(){
	chart.update();
	if(auxFFF=false){
	for( var x=0; x<=10;x++){
		location.reload();
		//alert(x);
	}
	auxFFF=true;
}
}
///////////////////