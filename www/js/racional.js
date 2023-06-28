/*
 * CLASE RACIONAL
 */

 
/*
 * Tipo: Clase
 * Nombre: Racional
 * Descripcion: La clase racional viene a rellenar el hueco presente en las
 * variables javascript para el tratamiento de numeros fraccionarios.
 * Esta clase permitira trabajar con numeros enteros, decimales exactos, 
 * decimales periodicos puros, decimales periodicos mixtos.
 * Parametros: Variable
 * 
 */
function Racional(){arguments[0]=arguments[0]==undefined?0:arguments[0];
 //Decidiremos que hacer en funcion de la cantidad de argumentos recibidos
 switch(arguments.length){
 
  //Ningun parametro, creamos un racional que valga 0
  case 0:
   this.numerador=0;
   this.denominador=1;
   break;
  
  //Un parametro
  case 1:
   switch(typeof(arguments[0])){
    case "object":
     if(arguments[0] instanceof Racional){
      this.numerador=arguments[0].getNumerador();
      this.denominador=arguments[0].getDenominador();
     }
     else{
      alert("El objeto recibido para crear un racional no es compatible.");
     }
     break;
    case "number":
     var numero=arguments[0];
    case "string":
     if(numero==undefined){
      var numero=parseFloat(arguments[0].replace(',','.'));
     }
     if(!isNaN(numero)){
      if(!(numero-Math.floor(numero))){
       this.numerador=numero;
       this.denominador=1;
      }
      else{
       var numDecimales=numero.toString().split('.')[1].length;
       this.numerador=(numero*Math.pow(10,numDecimales)).toFixed(0);
       this.denominador=Math.pow(10,numDecimales);
      }
      break;
     }
    default:
     alert("Par\xe1metro incorrecto al crear un objeto de tipo racional.");
   }
   break;
  
  //Dos parametros, 
  case 2:
   switch(typeof(arguments[0])){
    case "object":
     if(arguments[0] instanceof Racional){
      var numero1=arguments[0].valueOf();
     }
     else{
      alert("El objeto recibido para crear un racional no es compatible.");
     }
     break;
    case "number":
     var numero1=arguments[0];
     break;
    case "string":
    var numero1=parseFloat(arguments[0].replace(',','.'));
     if(!isNaN(numero1)){ 
      break;
     }
    default:
     alert("Par\xe1metro incorrecto al crear un objeto de tipo racional.");
   }
   if(!isNaN(numero1)&&numero1!=undefined){
    switch(typeof(arguments[1])){
     case "object":
      if(arguments[1] instanceof Racional){
       var numero2=arguments[1].valueOf();
      }
      else{
       alert("El objeto recibido para crear un racional no es compatible.");
      }
      break;
     case "number":
      var numero2=arguments[1];
      break;
     case "string":
     var numero2=parseFloat(arguments[1].replace(',','.'));
      if(!isNaN(numero2)){ 
       break;
      }
     default:
      alert("Par\xe1metro incorrecto al crear un objeto de tipo racional.");
    }
    if(numero2-Math.floor(numero2)){
     alert("El segundo par\xe1metro al crear objetos racionales debe ser un n\xfamero entero.");
    }
    else{
     if(!(numero1-Math.floor(numero1))){
      this.numerador=numero1;
      this.denominador=numero2;
     }
     else{
      if(numero2==0){
       this.numerador=parseInt(numero1.toString().replace('.',''))-parseInt(numero1.toString().split('.')[0]);
       this.denominador="";
       for(var i=0;i<parseInt(numero1.toString().split('.')[1].length);i++){
        this.denominador+="9";
       }
       this.denominador=parseInt(this.denominador);
      }
      else{
       var aux=parseInt(numero1.toString().split('.')[0]);
       for(var i=0;i<numero2;i++){
        aux=aux*10+parseInt(numero1.toString().split('.')[1].charAt(i));
       }
       this.numerador=parseInt(numero1.toString().replace('.',''))-aux;
       this.denominador="";
       for(var i=numero2;i<parseInt(numero1.toString().split('.')[1].length);i++){
        this.denominador+="9";
       }
       for(var i=0;i<numero2;i++){
        this.denominador+="0";
       }
       this.denominador=parseInt(this.denominador);
      }
     }
    }
   }
   break;
  
  //Tres o mas parametros, alertamos de un error
  default:
   alert("N\xfamero de par\xe1metros incorrecto al crear un objeto de tipo racional.");
 }
 
 
 
 /*
  * METODOS DE INSTANCIA
  */



 //Intentamos simplificar el racional
 if(this.numerador!=undefined){
  this.simplificar();
 }
}

/*
 * Tipo: Metodo de instancia
 * Nombre: clone (Racional)
 * Descripcion: Devuelve un objeto de tipo Racional igual a la instancia desde 
 * el que ha sido invocado
 * Parametros: Ninguno
 */
Racional.prototype.clone=function(){
 return new Racional(this.numerador,this.denominador);
}

/*
 * Tipo: Metodo de instancia
 * Nombre: toString (Racional)
 * Descripcion: Devuelve una cadena donde se muestra la fraccion asociada al 
 * racional actual salvo que el resultado sea entero, en cuyo caso se devolvera 
 * un numero entero y no una fraccion
 * Parametros: Ninguno
 */
Racional.prototype.toString=function(){
 //Se trata de un numero no entero (4/2 es entero y su denominador es distinto
 //de 1, pero como nuestros racionales siempre se simplifican pasariamos a tener
 //el racional 2/1 cuyo denominador si es 1)
 if(this.denominador!=1){
  //Para evitar salidas del tipo 1/-2, que representaremos como -1/2, comprobamos
  // si el denominador es mayor que cero, en cuyo caso no nos preocuparemos
  if(this.denominador>0){
   return this.numerador+"/"+this.denominador;
  }
  //Si el denominador es negativo y el numerador positivo les cambiamos el signo 
  //a ambos, estariamos en el caso x/-y y pasamos a -x/y
  else if(this.numerador>0){
   return this.numerador*-1+"/"+this.denominador*-1;
  }
  //En este ultimo caso tanto el denominador como el numerador son negativos, los
  //pasamos a positivos, estariamos en el caso -x/-y que mostramos como x/y
  else{
   return this.numerador+"/"+this.denominador*-1;
  }
 }
 //Si es entero devolvemos solo el numerador
 else{
  return this.numerador;
 }
}

/*
 * Tipo: Metodo de instancia
 * Nombre: valueOf (Racional)
 * Descripcion: Equipara la clase Racional al resto de clases numericas de 
 * javascript. La funcion devuelve el numero de tipo float asociado al racional
 * Parametros: Ninguno
 */
Racional.prototype.valueOf=function(){
 return this.numerador/this.denominador;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: getNumerador (Racional)
 * Descripcion: Devuelve el numerador del racional
 * Parametros: Ninguno
 */
Racional.prototype.getNumerador=function(){
 return this.numerador;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: getDenominador (Racional)
 * Descripcion: Devuelve el denominador del racional.
 * Parametros: Ninguno
 */
Racional.prototype.getDenominador=function(){
 return this.denominador;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: simplificar (Racional)
 * Descripcion: Simplifica el racional todo lo posible, se basa principalmente 
 * en el metodo de clase mcd (Maximo Comun Divisor) que se vera posteriormente
 * Parametros: Ninguno
 */
Racional.prototype.simplificar=function(){
 var mcdAct=Racional.mcd(this.numerador,this.denominador);
 do{
  //Dividimos el numerador y el denominador entre su maximo comun divisor
  this.numerador/=mcdAct;
  this.denominador/=mcdAct;
  mcdAct=Racional.mcd(this.numerador,this.denominador);
 }while(mcdAct!=1);
 //Lo repetimos mientras el maximo comun divisor de numerador y denominador sea
 //distinto de 1, en cuyo momento nuestra fraccion no podra simplificarse mas
}

/*
 * Tipo: Metodo de instancia
 * Nombre: sumar (Racional)
 * Descripcion: Suma a la instancia actual el numero recibido como parametro. Es
 * importante recordar que, aunque tambien devuelve el racional resultado de 
 * efectuar dicha suma, esta se almacenara en la instancia actual
 * Parametros: Uno - n1, de tipo racional o numerico
 */
Racional.prototype.sumar=function(n1){
 //Si el parametro recibido es un racional
 if(typeof(n1)=="object"&&n1 instanceof Racional){
  var n_numerador=this.numerador*n1.getDenominador()+n1.getNumerador()*this.denominador;
  var n_denominador=this.denominador*n1.getDenominador();
  this.numerador=n_numerador;
  this.denominador=n_denominador;
  this.simplificar();
 }
 //Si el parametro recibido es un numero
 else if(typeof(n1)=="number"){
  var n_numerador=this.numerador+n1*this.denominador;
  this.numerador=n_numerador;
  this.simplificar();
 }
 //Si el parametro recibido no es ni un racional ni un numero
 else{
  alert("No se puede sumar el parametro especificado al racional.");
 }
 return this;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: restar (Racional)
 * Descripcion: Resta a la instancia actual el numero recibido como parametro. 
 * Es importante recordar que, aunque tambien devuelve el racional resultado de 
 * efectuar dicha resta, esta se almacenara en la instancia actual
 * Parametros: Uno - n1, de tipo racional o numerico
 */
Racional.prototype.restar=function(n1){
 //Si el parametro recibido es un racional
 if(typeof(n1)=="object"&&n1 instanceof Racional){
  var n_numerador=this.numerador*n1.getDenominador()-n1.getNumerador()*this.denominador;
  var n_denominador=this.denominador*n1.getDenominador();
  this.numerador=n_numerador;
  this.denominador=n_denominador;
  this.simplificar();
 }
 //Si el parametro recibido es un numero
 else if(typeof(n1)=="number"){
  var n_numerador=this.numerador-n1*this.denominador;
  this.numerador=n_numerador;
  this.simplificar();
 }
 //Si el parametro recibido no es ni un racional ni un numero
 else{
  alert("No se puede restar el par\xe1metro especificado al racional.");
 }
 return this;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: multiplicar (Racional)
 * Descripcion: Mutiplica a la instancia actual el numero recibido como 
 * parametro. Es importante recordar que, aunque tambien devuelve el racional 
 * resultado de efectuar dicha multiplicacion, esta se almacenara en la 
 * instancia actual
 * Parametros: Uno - n1, de tipo racional o numerico
 */
Racional.prototype.multiplicar=function(n1){
 //Si el parametro recibido es un racional
 if(typeof(n1)=="object"&&n1 instanceof Racional){
  this.numerador*=n1.getNumerador();
  this.denominador*=n1.getDenominador();
  this.simplificar();
 }
 //Si el parametro recibido es un numero
 else if(typeof(n1)=="number"){
  this.numerador*=n1;
  this.simplificar();
 }
 //Si el parametro recibido no es ni un racional ni un numero
 else{
  alert("No se puede multiplicar el par\xe1metro especificado al racional.");
 }
 return this;
}

/*
 * Tipo: Metodo de instancia
 * Nombre: dividir (Racional)
 * Descripcion: Divide a la instancia actual el numero recibido como parametro. 
 * Es importante recordar que, aunque tambien devuelve el racional resultado de 
 * efectuar dicha division, esta se almacenara en la instancia actual
 * Parametros: Uno - n1, de tipo racional o numerico
 */
Racional.prototype.dividir=function(n1){
 //Si el parametro recibido es un racional
 if(typeof(n1)=="object"&&n1 instanceof Racional){
  this.numerador*=n1.getDenominador();
  this.denominador*=n1.getNumerador();
  this.simplificar();
 }
 //Si el parametro recibido es un numero
 else if(typeof(n1)=="number"){
  this.denominador*=n1;
  this.simplificar();
 }
 //Si el parametro recibido no es ni un racional ni un numero
 else{
  alert("No se puede dividir el par\xe1metro especificado al racional.");
 }
 return this;
}



/*
 * METODOS DE CLASE
 */
 
 
 
/*
 * Tipo: Metodo de clase
 * Nombre: sumar (Racional)
 * Descripcion: Este metodo se invoca desde la clase racional y devuelve el 
 * racional resultante de sumar los dos racionales recibidos como parametro
 * Parametros: Dos - r1 y r2, de tipo racional
 */
Racional.sumar=function(r1,r2){
 if(r1 instanceof Racional && r2 instanceof Racional){
  var num=r1.getNumerador()*r2.getDenominador()+r1.getDenominador()*r2.getNumerador();
  var den=r1.getDenominador()*r2.getDenominador();
  return new Racional(num,den);
 }
 else{
  alert("No se pueden sumar dos par\xe1metros no racionales.");
 }
}

/*
 * Tipo: Metodo de clase
 * Nombre: restar (Racional)
 * Descripcion: Este metodo se invoca desde la clase racional y devuelve el 
 * racional resultante de restar los dos racionales recibidos como parametro
 * Parametros: Dos - r1 y r2, de tipo racional
 */
Racional.restar=function(r1,r2){
 if(r1 instanceof Racional && r2 instanceof Racional){
  var num=r1.getNumerador()*r2.getDenominador()-r1.getDenominador()*r2.getNumerador();
  var den=r1.getDenominador()*r2.getDenominador();
  return new Racional(num,den);
 }
 else{
  alert("No se pueden restar dos par\xe1metros no racionales.");
 }
}

/*
 * Tipo: Metodo de clase
 * Nombre: multiplicar (Racional)
 * Descripcion: Este metodo se invoca desde la clase racional y devuelve el 
 * racional resultante de multiplicar los dos racionales recibidos como 
 * parametro
 * Parametros: Dos - r1 y r2, de tipo racional
 */
Racional.multiplicar=function(r1,r2){
 if(r1 instanceof Racional && r2 instanceof Racional){
  var num=r1.getNumerador()*r2.getNumerador();
  var den=r1.getDenominador()*r2.getDenominador();
  return new Racional(num,den);
 }
 else{
  alert("No se pueden multiplicar dos par\xe1metros no racionales.");
 }
}

/*
 * Tipo: Metodo de clase
 * Nombre: dividir (Racional)
 * Descripcion: Este metodo se invoca desde la clase racional y devuelve el 
 * racional resultante de dividir los dos racionales recibidos como parametro
 * Parametros: Dos - r1 y r2, de tipo racional
 */
Racional.dividir=function(r1,r2){
 if(r1 instanceof Racional && r2 instanceof Racional){
  var num=r1.getNumerador()*r2.getDenominador();
  var den=r1.getDenominador()*r2.getNumerador();
  return new Racional(num,den);
 }
 else{
  alert("No se pueden dividir dos par\xe1metros no racionales.");
 }
}

/*
 * Tipo: Metodo de clase
 * Nombre: mcd (Racional)
 * Descripcion: Este metodo se invoca desde la clase racional y devuelve el 
 * maximo comun divisor de dos racionales dados. No trabaja de forma recursiva, 
 * lo hace iterativamente
 * Parametros: Dos - a y b de tipo numerico
 */
Racional.mcd=function(a,b){
 var t;
 while(b!=0){
  t=b;
  b=a%b;
  a=t;
 }
 return a;
}