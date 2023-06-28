   function jsx_funcionObjetivo(){
    if(arguments.length<2){
     alert("N\xfamero de parametros incorrecto al crear un objeto de tipo funci\xf3n objetivo.");
     return null;
    }
    if(arguments[0].toLowerCase()!="max"&&arguments[0].toLowerCase()!="min"){
     alert("El primer par\xe1metro de una funci\xf3n objetivo debe ser 'max' o 'min'.");
     return null;
    }
    this.tipo=arguments[0].toLowerCase();
    if(arguments[1] instanceof Array){
     this.funcion=new Array();
     for(var i=0;i<arguments[1].length;i++){
      if(arguments[1][i] instanceof Racional){
       this.funcion[i]=arguments[1][i];
      }
      else if(!isNaN(parseFloat(arguments[1][i]))){
       this.funcion[i]=parseFloat(arguments[1][i]);
      }
      else{
       alert("Par\xe1metro incorrecto al crear una funci\xf3n objetivo, valor no num\xe9rico.");
       return null;
      }
     }
    }
    else if(!isNaN(parseFloat(arguments[1]))){
     this.funcion=new Array();
     for(var i=1;i<arguments.length;i++){
      if(arguments[i] instanceof Racional){
       this.funcion[i-1]=arguments[i];
      }
      else if(!isNaN(parseFloat(arguments[i]))){
       this.funcion[i-1]=new Racional(parseFloat(arguments[i]));
      }
      else{
       alert("Par\xe1metro incorrecto al crear una funci\xf3n objetivo, valor no num\xe9rico.");
       return null;
      }
     }
    }
    else{
     alert("El segundo par\xe1metro de una funci\xf3n objetivo debe ser un array de enteros o un entero.");
     return null;
    }
   }
   
   jsx_funcionObjetivo.prototype.toString=function(){
    return this.toStringHTML();
   }
   
   jsx_funcionObjetivo.prototype.toHTML=function(){
    return this.toStringHTML("html");
   }
   
   jsx_funcionObjetivo.prototype.toStringHTML=function(tipo){
    var res=(this.tipo.toLowerCase()=="max"?"Max":"Min")+" ";
    var primero=true;
    for(var i=0;i<this.funcion.length;i++){
     if(this.funcion[i]!=0){
      res+=(this.funcion[i]>=0?(primero?"":"+"):"");
      res+=(this.funcion[i]==1?"":(this.funcion[i]==-1?"-":this.funcion[i]))+"x";
      res+=(tipo=="html"?"<sub>":"")+(i+1)+(tipo=="html"?"</sub>":"");
      primero=false;
     }
    }
    return res;
   }
   
   jsx_funcionObjetivo.prototype.numVariables=function(){
    return this.funcion.length;
   }
   
   jsx_funcionObjetivo.prototype.getTipo=function(){
    return this.tipo;
   }
   
   jsx_funcionObjetivo.prototype.getFuncion=function(){
    return this.funcion;
   }
  
  
  
  
  
  
  
  function jsx_restriccion(){
   if(arguments.length<3){
    alert("N\xfamero de par\xe1metros incorrecto al crear un objeto de tipo restricci\xf3n.");
    return null;
   }
   this.funcion=new Array();
   if(arguments[0] instanceof Array){
    for(var i=0;i<arguments[0].length;i++){
     if(isNaN(parseFloat(arguments[0][i]))){
      alert("Par\xe1metro incorrecto al crear un objeto de tipo restricci\xf3n.");
      return null;
     }
     if(arguments[0][i] instanceof Racional){
      this.funcion[i]=arguments[0][i];
     }
     else{
      this.funcion[i]=new Racional(parseFloat(arguments[0][i]));
     }
    }
   }
   else{
    for(var i=0;i<arguments.length-2;i++){
     if(isNaN(parseFloat(arguments[i]))){
      alert("Par\xe1metro incorrecto al crear un objeto de tipo restricci\xf3n.");
      return null;
     }
     if(arguments[i] instanceof Racional){
      this.funcion[i]=arguments[i];
     }
     else{
      this.funcion[i]=new Racional(parseFloat(arguments[i]));
     }
    }
   }
   if(arguments[arguments.length-2]!="<="&&arguments[arguments.length-2]!=">="&&arguments[arguments.length-2]!="="){
    alert("Error al crear una restricci\xf3n, el pen\xfaltimo argumento debe ser '<=' o '>='.");
   }
   this.signo=arguments[arguments.length-2];
   if(isNaN(parseFloat(arguments[arguments.length-1]))){
    alert("Error al crear una restricci\xf3n, el \xfaltimo argumento debe ser de tipo num\xe9rico.");
   }
   if(arguments[arguments.length-1] instanceof Racional){
    this.limite=arguments[arguments.length-1];
   }
   else{
    this.limite=new Racional(arguments[arguments.length-1]);
   }
  }
  
  jsx_restriccion.prototype.toString=function(){
   var res=this.funcion[0]+"x1";
   for(var i=1;i<this.funcion.length;i++){
    res+=(this.funcion[i]>=0?"+":"")+this.funcion[i]+"x"+(i+1);
   }
   res+=this.signo;
   res+=this.limite;
   return res;
  }
  
  jsx_restriccion.prototype.toHTML=function(){
   var primero=true;
   var res="";
   for(var i=0;i<this.funcion.length;i++){
    if(this.funcion[i]!=0){
     res+=(this.funcion[i]>=0?(primero?"":"+"):"");
     res+=(this.funcion[i]==1?"":(this.funcion[i]==-1?"-":this.funcion[i]));
     res+="x<sub>"+(i+1)+"</sub>";
     primero=false;
    }
   }
   res+=this.signo=="<="?"&le;":this.signo=="="?"=":"&ge;";
   res+=this.limite;
   return res;
  }
  
  jsx_restriccion.prototype.getSigno=function(){
   return this.signo;
  }
  
  jsx_restriccion.prototype.getLimite=function(){
   return this.limite;
  }
  
  jsx_restriccion.prototype.getFuncion=function(){
   return this.funcion;
  }
  
  
  
  
  
  
  
  function jsx_problema(){
   this.funcionObjetivo=null;
   this.restricciones=new Array();
   this.holgura=new Array();
   this.artificial=new Array();
   this.noartificiales=0;
   this.usamosM=false;
  }
  
  jsx_problema.prototype.procesar=function(){
   this.variablesHolgura();
  }
  
  jsx_problema.prototype.variablesHolgura=function(){
   for(var i=0;i<this.restricciones.length;i++){
    this.holgura[i]=this.restricciones[i].getSigno()=="<="?1:this.restricciones[i].getSigno()==">="?-1:0;
   }
   var n_fo_param=this.funcionObjetivo.getFuncion();
   for(var i=0;i<this.holgura.length;i++){
    if(this.holgura[i]!=0){
     n_fo_param[n_fo_param.length]=0;
    }
   }
   var n_fo=new jsx_funcionObjetivo(this.funcionObjetivo.getTipo(),n_fo_param);
   this.funcionObjetivo=n_fo;
   var n_res=new Array();
   for(var i=0;i<this.restricciones.length;i++){
    var n_res_param=this.restricciones[i].getFuncion();
    for(var j=0;j<this.holgura.length;j++){
     if(this.holgura[i]!=0){
      n_res_param[n_res_param.length]=i==j?this.holgura[j]:0;
     }
    }
    n_res[i]=new jsx_restriccion(n_res_param,"=",this.restricciones[i].getLimite());
   }
   this.restricciones=n_res;
  }
  
  jsx_problema.prototype.dosfases=function(){
   var almenosuna=false;
   this.usamosM=false;
   for(var i=0;i<this.holgura.length;i++){
    this.artificial[i]=this.holgura[i]!=1?1:0;
    almenosuna=this.holgura[i]!=1||almenosuna?true:false;
   }
   if(!almenosuna){
    return false;
   }
   var n_fo_param=new Array();
   for(var i=0;i<this.funcionObjetivo.getFuncion().length;i++){
    n_fo_param[n_fo_param.length]=0;
   }
   for(var i=0;i<this.artificial.length;i++){
    n_fo_param[n_fo_param.length]=this.artificial[i];
   }
   var n_fo=new jsx_funcionObjetivo("min",n_fo_param);
   var n_res=new Array();
   for(var i=0;i<this.restricciones.length;i++){
    var n_res_param=this.restricciones[i].getFuncion();
    for(var j=0;j<this.artificial.length;j++){
     if(i==j){
      n_res_param[n_res_param.length]=this.artificial[j];
     }
     else{
      n_res_param[n_res_param.length]=0;
     }
    }
    n_res[i]=new jsx_restriccion(n_res_param,"=",this.restricciones[i].getLimite());
   }
   var old_fo=this.funcionObjetivo;
   var old_res=this.restricciones;
   this.funcionObjetivo=n_fo;
   this.restricciones=n_res;
   this.noartificiales=old_fo.getFuncion().length;
   var problema2fases=this.clone();
   this.funcionObjetivo=old_fo;
   this.restricciones=old_res;
   this.artificial=new Array();
   this.noartificiales=0;
   return problema2fases;
  }
  
  jsx_problema.prototype.mgrande=function(){
   var m;
   this.usamosM=true;
   if(this.funcionObjetivo.getTipo().toLowerCase()=="min"){
    m=new Racional(3300444491,3);
   }
   else{
    m=new Racional(-3300444491,3);
   }
   var almenosuna=false;
   for(var i=0;i<this.holgura.length;i++){
    this.artificial[i]=this.holgura[i]!=1?1:0;
    almenosuna=this.holgura[i]!=1||almenosuna?true:false;
   }
   if(!almenosuna){
    return false;
   }
   var n_fo_param=new Array();
   for(var i=0;i<this.funcionObjetivo.getFuncion().length;i++){
    n_fo_param[n_fo_param.length]=this.funcionObjetivo.getFuncion()[i];
   }
   for(var i=0;i<this.artificial.length;i++){
    if(this.artificial[i]==1){
     n_fo_param[n_fo_param.length]=m.clone();
    }
    else{
     n_fo_param[n_fo_param.length]=0;
    }
   }
   var n_fo=new jsx_funcionObjetivo(this.funcionObjetivo.getTipo(),n_fo_param);
   var n_res=new Array();
   for(var i=0;i<this.restricciones.length;i++){
    var n_res_param=this.restricciones[i].getFuncion();
    for(var j=0;j<this.artificial.length;j++){
     if(i==j){
      n_res_param[n_res_param.length]=this.artificial[j];
     }
     else{
      n_res_param[n_res_param.length]=0;
     }
    }
    n_res[i]=new jsx_restriccion(n_res_param,"=",this.restricciones[i].getLimite());
   }
   var old_fo=this.funcionObjetivo;
   var old_res=this.restricciones;
   this.funcionObjetivo=n_fo;
   this.restricciones=n_res;
   this.noartificiales=old_fo.getFuncion().length;
   var problema2fases=this.clone();
   this.funcionObjetivo=old_fo;
   this.restricciones=old_res;
   this.artificial=new Array();
   this.noartificiales=0;
   return problema2fases;
  }
  
  jsx_problema.prototype.setFuncionObjetivo=function(){
   if(arguments.length!=1){
    alert("La funci\xf3n setFuncionObjetivo de la clase problemas s\xf3lo recibe un par\xe1metro.");
    return null;
   }
   if(arguments[0] instanceof jsx_funcionObjetivo){
    this.funcionObjetivo=arguments[0];
   }
   else{
    alert("Error al asignar la funci\xf3n objetivo de un problema.");
   }
  }
  
  jsx_problema.prototype.clearRestricciones=function(){
   this.restricciones=new Array();
  }
  
  jsx_problema.prototype.addRestriccion=function(){
   if(arguments.length!=1){
    alert("La funci\xf3n addRestriccion de la clase problemas recibe un s\xf3lo par\xe1metro.");
    return;
   }
   if(arguments[0] instanceof jsx_restriccion){
    this.restricciones[this.restricciones.length]=arguments[0];
   }
   else{
    alert("Error al insertar la restricci\xf3n de un problema.");
   }
  }
  
  jsx_problema.prototype.numVariables=function(){
   if(this.funcionObjetivo==null){
    return 0;
   }
   else{
    return this.funcionObjetivo.numVariables();
   }
  }
  
  jsx_problema.prototype.numRestricciones=function(){
   return this.restricciones.length;
  }
  
  jsx_problema.prototype.getFuncionObjetivo=function(){
   return this.funcionObjetivo;
  }
  
  jsx_problema.prototype.getTipo=function(){
   return this.funcionObjetivo.getTipo();
  }
  
  jsx_problema.prototype.getRestricciones=function(){
   return this.restricciones;
  }
  
  jsx_problema.prototype.getRestriccion=function(){
   if(arguments.length!=1||isNaN(parseInt(arguments[0]))){
    alert("Error el metodo getRestriccion de un problema recibe un s\xf3lo par\xe1metro num\xe9rico.");
    return null;
   }
   if(this.restricciones.length<parseInt(arguments[0])){
    alert("Error, la restricci\xf3n solicitada al problema no existe.");
    return null;
   }
   return this.restricciones[parseInt(arguments[0])];
  }
  
  jsx_problema.prototype.toString=function(){
   var res="";
   res+=this.getFuncionObjetivo().toString();
   for(var i=0;i<this.numRestricciones();i++){
    res+=" "+this.getRestriccion(i).toString();
   }
   return res;
  }
  
  jsx_problema.prototype.toHTML=function(){
   var res="<table>";
   res+="<tr><td>"+this.getFuncionObjetivo().toHTML().split(" ")[0]+"</td>";
   res+="<td>"+this.getFuncionObjetivo().toHTML().split(" ")[1]+"</td></tr>";
   for(var i=0;i<this.numRestricciones();i++){
    res+="<tr><td>"+(i==0?"s.a.":"&nbsp;")+"</td>";
    res+="<td>"+this.getRestriccion(i).toHTML()+"</td></tr>"
   }
   var primeraArt=this.noartificiales;
   var indicey=1;
   for(var i=0;i<this.artificial.length;i++){
    if(this.artificial[i]==1){
     res=replaceAll(res,"x<sub>"+(primeraArt+i+1)+"</sub>","y<sub>"+indicey+"</sub>");
     indicey++;
    }
   }
   res+="</table>";
   res=replaceAll(res,"1100148163.6666667","M");
   return res;
  }
  
  jsx_problema.prototype.clone=function(){
   var nuevoproblema=new jsx_problema();
   var nuevafuncionobjetivo=new jsx_funcionObjetivo(this.funcionObjetivo.getTipo(),this.funcionObjetivo.getFuncion());
   nuevoproblema.setFuncionObjetivo(nuevafuncionobjetivo);
   for(var i=0;i<this.restricciones.length;i++){
    var nuevarestriccion=new jsx_restriccion(this.restricciones[i].getFuncion(),this.restricciones[i].getSigno(),this.restricciones[i].getLimite().clone());
    nuevoproblema.addRestriccion(nuevarestriccion);
   }
   nuevoproblema.holgura=new Array();
   for(i=0;i<this.holgura.length;i++){
    nuevoproblema.holgura[i]=this.holgura[i];
   }
   nuevoproblema.artificial=new Array();
   for(i=0;i<this.artificial.length;i++){
    nuevoproblema.artificial[i]=this.artificial[i];
   }
   nuevoproblema.noartificiales=this.noartificiales;
   nuevoproblema.usamosM=this.usamosM;
   return nuevoproblema;
  }
  
  function replaceAll(text,busca,reemplaza){
   while(text.toString().indexOf(busca)!=-1)
    text=text.toString().replace(busca,reemplaza);
   return text;
  }
  
  
  
  
  
  
  
   function jsx_matriz(){
    if(arguments.length!=1&&arguments.length!=2){
     alert("N\xfamero de par\xe1metros incorrecto al crear un objeto de tipo matriz.");
    }
    if(!(arguments[0] instanceof jsx_problema)){
     alert("El argumento al crear una matriz debe ser un problema (jsx_problema).");
    }
    else{
     this.tipo=arguments[0].getTipo();
     this.variables=arguments[0].numVariables();
     this.restricciones=arguments[0].numRestricciones();
     this.v_costes=new Array(this.variables+1);
     this.v_costes_reducidos=new Array(this.variables+1);
     this.v_solucion=new Array(this.restricciones);
     this.usamosM=arguments[0].usamosM;
     this.matriz=new Array(this.restricciones);
     for(var i=0;i<this.variables;i++){
      this.v_costes[i]=new Racional(arguments[0].getFuncionObjetivo().getFuncion()[i]);
     }
     this.v_costes[this.variables]=new Racional();
     var nvariables=arguments[0].noartificiales!=0?arguments[0].noartificiales:arguments[0].numVariables();
     nvariables-=arguments[0].holgura.length;
     this.numvariables=nvariables;
     this.numvariablesconh=nvariables+arguments[0].holgura.length;
     for(var i=0;i<this.restricciones;i++){
      if(arguments[0].holgura[i]==1){
       this.v_solucion[i]=nvariables+i;
      }
      else{
       this.v_solucion[i]=nvariables+arguments[0].holgura.length+i;
      }
     }
     if(arguments.length==2){
      this.v_solucion=arguments[1];
     }
     for(var i=0;i<this.restricciones;i++){
      this.matriz[i]=new Array(this.variables+1);
      for(var j=0;j<this.variables;j++){
       this.matriz[i][j]=new Racional(arguments[0].getRestriccion(i).getFuncion()[j]);
      }
      this.matriz[i][this.variables]=arguments[0].getRestriccion(i).getLimite();
     }
     this.calcularCostesReducidos();
    }
   }
   
   jsx_matriz.prototype.calcularCostesReducidos=function(){
    for(var i=0;i<this.variables+1;i++){
     var suma=new Racional();
     for(var j=0;j<this.restricciones;j++){
      suma=suma.sumar(this.v_costes[this.v_solucion[j]].clone().multiplicar(this.matriz[j][i]));
     }
     suma=suma.restar(this.variables==i?new Racional():this.v_costes[i]);
     this.v_costes_reducidos[i]=suma;
    }
    if(this.usamosM){
     this.calcularCostesReducidosM();
    }
   }
   
   jsx_matriz.prototype.calcularCostesReducidosM=function(){
    var mpos="1100148163.6666667";
    var mneg="-1100148163.6666667";
    this.v_costes_reducidosM=new Array();
    for(var i=0;i<this.variables+1;i++){
     var sumam=new Racional();
     var suma=new Racional();
     for(var j=0;j<this.restricciones;j++){
      if(this.v_costes[this.v_solucion[j]]==mpos){
       sumam=sumam.sumar(this.matriz[j][i]);
      }
      else if(this.v_costes[this.v_solucion[j]]==mneg){
       sumam=sumam.restar(this.matriz[j][i]);
      }
      else{
       suma=suma.sumar(this.v_costes[this.v_solucion[j]].clone().multiplicar(this.matriz[j][i]));
      }
     }
     if(this.variables!=i){
      if(this.v_costes[i]==mpos){
       sumam=sumam.restar(1);
      }
      else if(this.v_costes[i]==mneg){
       sumam=sumam.sumar(1);
      }
      else{
       suma=suma.restar(this.v_costes[i]);
      }
     }
     var res="";
     if(sumam!=0){
      if(sumam==1){
       res="M";
      }
      else if(sumam==-1){
       res="-M";
      }
      else{
       res=sumam.toString()+"M";
      }
     }
     if(suma>0){
      res+=(sumam!=0?"+":"")+suma.toString();
     }
     else if(suma<0){
      res+=suma.toString();
     }
     if(sumam==0&&suma==0){
      res="0";
     }
     this.v_costes_reducidosM[i]=res;
    }
   }
   
   jsx_matriz.prototype.quienEntra=function(){
    var entra=null;
    var max=0;
    for(var i=0;i<this.variables;i++){
     var vcr=this.v_costes_reducidos[i].clone();
     var act=vcr.multiplicar((this.tipo=='max'?-1:1));
     entra=act>max?i:entra;
     max=act>max?act:max;
    }
    return entra;
   }
   
   jsx_matriz.prototype.quienEntraX=function(){
    var letra;
    var numero;
    if(this.quienEntra()>=this.numvariablesconh){
     letra="y";
     numero=this.quienEntra()+1; //TODO esto no creo que este bien
    }
    else{
     letra="x";
     numero=this.quienEntra()+1;
    }
    return letra+"<sub>"+numero+"</sub>";
   }
   
   jsx_matriz.prototype.quienSale=function(){
    var sale=null;
    var entra=this.quienEntra();
    if(entra!=null){
     var max=Infinity;
     for(var i=0;i<this.restricciones;i++){
      var vcr=this.matriz[i][this.variables].clone();
      var act=vcr.dividir(this.matriz[i][entra]);
      sale=act>0&&act<max?i:sale;
      max=act>0&&act<max?act:max;
     }
    }
    return sale;
   }
   
   jsx_matriz.prototype.quienSaleX=function(){
    var letra;
    var numero;
    if(this.v_solucion[this.quienSale()]>=this.numvariablesconh){
     letra="y";
     numero=1;
     for(var k=this.numvariablesconh;k<this.v_solucion[this.quienSale()];k++){
      if(this.v_costes[k]!=0){
       numero++;
      }
     }
    }
    else{
     letra="x";
     numero=this.v_solucion[this.quienSale()]+1;
    }
    return letra+"<sub>"+numero+"</sub>";
   }
   
   jsx_matriz.prototype.avanzar=function(){
    var entra=this.quienEntra();
    var sale=this.quienSale();
    if(entra==null|sale==null){
     //alert("No se puede avanzar mas.");
     return null;
    }
    this.v_solucion[sale]=entra;
    var div=this.matriz[sale][entra].clone();
    for(var i=0;i<this.variables+1;i++){
     this.matriz[sale][i].dividir(div);
    }
    for(var i=0;i<this.restricciones;i++){
     if(i!=sale){
      var mul=this.matriz[i][entra].clone();
      for(var j=0;j<this.variables+1;j++){
       this.matriz[i][j].restar(this.matriz[sale][j].clone().multiplicar(mul));
      }
     }
    }
    this.calcularCostesReducidos();
    return true;
   }
   
   jsx_matriz.prototype.toString=function(){
    var entra=this.quienEntra();
    var sale=this.quienSale();
    var res="<table class=\"jsx_matriz\">";
    res+="<tr class=\"jsx_matriz_1\"><td>&nbsp;</td><td>&nbsp;</td>";
    for(var i=0;i<this.variables;i++){
     if(i<this.numvariablesconh||this.v_costes[i]!=0){
      res+="<td>"+this.v_costes[i].toString()+"</td>";
     }
    }
    res+="<td>&nbsp;</td></tr>";
    for(var i=0;i<this.restricciones;i++){
     var letra;
     var numero;
     if(this.v_solucion[i]>=this.numvariablesconh){
      letra="y";
      numero=1;
      for(var k=this.numvariablesconh;k<this.v_solucion[i];k++){
       if(this.v_costes[k]!=0){
        numero++;
       }
      }
     }
     else{
      letra="x";
      numero=this.v_solucion[i]+1;
     }
     res+="<tr  class=\"jsx_matriz_1n\"><td>"+letra+"<sub>"+numero+"</sub></td>";
     res+="<td>"+this.v_costes[this.v_solucion[i]].toString()+"</td>";
     for(var j=0;j<this.variables+1;j++){
      if(j<this.numvariablesconh||this.v_costes[j]!=0||j==this.variables){
       if(j==entra && i==sale){
        res+="<td class=\"jsx_matriz_pivote\">"+eval(this.matriz[i][j].toString())+"</td>";
       }
       else{
        res+="<td>"+eval(this.matriz[i][j].toString())+"</td>";
       }
      }
     }
     res+="</tr>";
    }
    res=replaceAll(res,"3300444491/3","M");
    res+="<tr class=\"jsx_matriz_n\"><td>&nbsp;</td><td>&nbsp;</td>";
    for(var i=0;i<this.variables+1;i++){
     if(i<this.numvariablesconh||this.v_costes[i]!=0||i==this.variables){
      if(this.usamosM){
       res+="<td>"+eval(this.v_costes_reducidosM[i].toString())+"</td>";
      }
      else{
       res+="<td>"+eval(this.v_costes_reducidos[i].toString())+"</td>";
      }
     }
    }
    res+="</tr>";    
    res+="</table>";
    res+="<div class=\"jsx_matriz_sol\"><b>Soluci&oacute;n:</b> ";
    for(var i=0;i<this.matriz[0].length-2;i++){
     valor=0;
     for(var j=0;j<this.v_solucion.length;j++){
      if(this.v_solucion[j]==i){
       valor=eval(this.matriz[j][this.matriz[j].length-1]);
      }
     }
     res+="x<sub>"+(i+1)+"</sub>="+Math.round(valor * 100)/100+" ";
    }
    var resultado=0;
    if(this.usamosM){
     resultado=this.v_costes_reducidosM[this.v_costes_reducidosM.length-1].toString();
    }
    else{
     resultado=this.v_costes_reducidos[this.v_costes_reducidos.length-1].toString();
    }
    res+="&nbsp;&nbsp;&nbsp;<b>Resultado:</b> "+Math.round(eval(resultado) * 100)/100;
    res+="</div>";
    return res;
   }
   
   jsx_matriz.prototype.finPrimeraFase=function(){
    //0 todo bien
    //1 artificial en la base con coste igual que 0
    //2 artificial en la base con coste mayor que 0
    var yenlabase=false;
    for(var i=0;i<this.v_solucion.length;i++){
     if(this.v_solucion[i]>=this.numvariablesconh){
      yenlabase=true;
     }
    }
    if(!yenlabase){
     return 0;
    }
    var yenlabasecero=true;
    for(var i=0;i<this.v_solucion.length;i++){
     if(this.v_solucion[i]>=this.numvariablesconh){
      if(this.matriz[i][this.matriz[i].length-1]!=0){
       yenlabasecero=false;
      }
     }
    }
    if(yenlabasecero){
     return 1;
    }
    return 2;
   }
   
   jsx_matriz.prototype.getSegundaFase=function(o_fo){
    var pr=new jsx_problema();
    var nfo=new jsx_funcionObjetivo(o_fo.getTipo(),o_fo.getFuncion());
    pr.setFuncionObjetivo(nfo);
    for(var i=0;i<this.restricciones;i++){
     if(this.v_solucion[i]<this.numvariablesconh){
      var param=new Array();
      for(var j=0;j<this.numvariablesconh;j++){
       param[param.length]=this.matriz[i][j];
      }
      var lim=this.matriz[i][this.matriz[i].length-1];
      pr.addRestriccion(new jsx_restriccion(param,"=",lim));
     }
    }
    var ma02=new jsx_matriz(pr,this.v_solucion);
    return ma02;
   }
   
   jsx_matriz.prototype.esMultiple=function(){
    var numVarBasicas=this.restricciones;
    var numCeros=0;
    var optimo=true;
    for(var i=0;i<this.v_costes_reducidos.length-1;i++){
     if(this.tipo.toLowerCase()=="max"){
      if(this.v_costes_reducidos[i]<0){
       optimo=false;
      }
     }
     else{
      if(this.v_costes_reducidos[i]>0){
       optimo=false;
      }
     }
     if(this.v_costes_reducidos[i]==0){
      numCeros++;
     }
    }
    if(optimo&&numCeros>numVarBasicas){
     return true;
    }
    return false;
   }
   
   jsx_matriz.prototype.finMgrande=function(){
    //todo mirar finPrimeraFase
    return false;
   }