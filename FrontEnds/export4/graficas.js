var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//let miCanvas=document.getElementById("Gsemana").getContext("2d");
var vectorX2=new Array;

function Lervec(){
var dataBaseC=indexedDB2.open("date",1);

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
		
		vectorX2.push(result.value);
		
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

    }
}
/*
var chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
        datasets:[
            {
                label:"Ganancias diarias en la semana",  
                fill  :true,  
                data  :[0,25000,5000,15000,10000,20000,15000],
                backgroundColor  :  "rgb(105, 198, 220)",
                borderColor  :  "rgb(1, 1, 1, 1)"
            }
        ]
    }
});*/