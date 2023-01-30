let miCanvas=document.getElementById("Gsemana").getContext("2d");

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
});