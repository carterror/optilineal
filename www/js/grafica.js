   function FuncionObjetivo(){
    if(arguments.length==3){
     this.obj=arguments[0];
     this.x=arguments[1];
     this.y=arguments[2];
    }
    else{
     alert("FuncionObjetivo (Error): numero de parametros incorrectos al invocar al constructor.");
    }
   }
   FuncionObjetivo.prototype.resolver=function(v1,v2){
    return eval(this.x*v1+this.y*v2);
   }
   FuncionObjetivo.prototype.toString=function(){
    return this.obj+": "+this.x+"X"+(this.y<0?this.y:"+"+this.y)+"Y";
   }






   function Restriccion(){
    this.x=0;
    this.y=0;
    this.signo="<=";
    this.limite=0;
    this.mostrable=true;
    if(arguments.length==0){
    }
    else if(arguments.length==4||arguments.length==5){
     this.x=parseFloat(arguments[0]);
     this.y=parseFloat(arguments[1]);
     this.signo=arguments[2];
     this.limite=parseFloat (arguments[3]);
     this.mostrable=true;
     if(arguments.length==5){
      this.mostrable=arguments[4];
     }
    }
    else{
     alert("Restriccion (Error): numero de parametros incorrectos al invocar al constructor.");
    }
   }
   Restriccion.prototype.isMostrable=function(){
    return this.mostrable;
   }
   Restriccion.prototype.corteX=function(){
    return this.limite/this.x;
   }
   Restriccion.prototype.corteY=function(){
    return this.limite/this.y;
   }
   Restriccion.prototype.getX=function(vy){
    return (this.limite-(this.y*vy))/this.x;
   }
   Restriccion.prototype.getY=function(vx){
    return (this.limite-(this.x*vx))/this.y;
   }
   Restriccion.prototype.corteGrafica=function(gra){
    var px=[0,0];
    var py=[0,0];
    var p=[0,0];
    var i=0;
    if(this.getY(gra.x1)>=gra.y1&&this.getY(gra.x1)<=gra.y2){
     px[i]=gra.x1;
     py[i]=this.getY(gra.x1);
     p[i]=1;
     i++;
    }
    if(this.getY(gra.x2)>=gra.y1&&this.getY(gra.x2)<=gra.y2){
     px[i]=gra.x2;
     py[i]=this.getY(gra.x2);
     p[i]=2;
     i++;
    }
    if(this.getX(gra.y1)>=gra.x1&&this.getX(gra.y1)<=gra.x2){
     px[i]=this.getX(gra.y1);
     py[i]=gra.y1;
     p[i]=3;
     i++;
    }
    if(this.getX(gra.y2)>=gra.x1&&this.getX(gra.y2)<=gra.x2){
     px[i]=this.getX(gra.y2);
     py[i]=gra.y2;
     p[i]=4;
     i++;
    }
    var puntos=[{"x":px[0],"y":py[0]},{"x":px[1],"y":py[1]}];
    if(p[1]==1){
     if(eval((this.x*gra.x1+this.y*(py[1]-1))+this.signo+this.limite)){
      puntos.push({"x":gra.x1,"y":gra.y1});
      if(p[0]==2||p[0]==4){
       puntos.push({"x":gra.x2,"y":gra.y1});
      }
      if(p[0]==4){
       puntos.push({"x":gra.x2,"y":gra.y2});
      }
     }
     else{
      puntos.push({"x":gra.x1,"y":gra.y2});
      if(p[0]==2||p[0]==3){
       puntos.push({"x":gra.x2,"y":gra.y2});
      }
      if(p[0]==3){
       puntos.push({"x":gra.x2,"y":gra.y1});
      }
     }
    }
    else if(p[1]==2){
     if(eval((this.x*gra.x2+this.y*(py[1]+1))+this.signo+this.limite)){
      puntos.push({"x":gra.x2,"y":gra.y2});
      if(p[0]==1||p[0]==3){
       puntos.push({"x":gra.x1,"y":gra.y2});
      }
      if(p[0]==3){
       puntos.push({"x":gra.x1,"y":gra.y1});
      }
     }
     else{
      puntos.push({"x":gra.x2,"y":gra.y1});
      if(p[0]==1||p[0]==4){
       puntos.push({"x":gra.x1,"y":gra.y1});
      }
      if(p[0]==4){
       puntos.push({"x":gra.x1,"y":gra.y2});
      }
     }
    }
    else if(p[1]==3){
     if(eval((this.x*(px[1]+1)+this.y*gra.y1)+this.signo+this.limite)){
      puntos.push({"x":gra.x2,"y":gra.y1});
      if(p[0]==4||p[0]==1){
       puntos.push({"x":gra.x2,"y":gra.y2});
      }
      if(p[0]==1){
       puntos.push({"x":gra.x1,"y":gra.y2});
      }
     }
     else{
      puntos.push({"x":gra.x1,"y":gra.y1});
      if(p[0]==4||p[0]==2){
       puntos.push({"x":gra.x1,"y":gra.y2});
      }
      if(p[0]==2){
       puntos.push({"x":gra.x2,"y":gra.y2});
      }
     }
    }
    else if(p[1]==4){
     if(eval((this.x*(px[1]-1)+this.y*gra.y2)+this.signo+this.limite)){
      puntos.push({"x":gra.x1,"y":gra.y2});
      if(p[0]==3||p[0]==2){
       puntos.push({"x":gra.x1,"y":gra.y1});
      }
      if(p[0]==2){
       puntos.push({"x":gra.x2,"y":gra.y1});
      }
     }
     else{
      puntos.push({"x":gra.x2,"y":gra.y2});
      if(p[0]==3||p[0]==1){
       puntos.push({"x":gra.x2,"y":gra.y1});
      }
      if(p[0]==1){
       puntos.push({"x":gra.x1,"y":gra.y1});
      }
     }
    }
    return puntos;
   }
   Restriccion.prototype.cumple=function(nx,ny){
    return eval(this.x*nx+this.y*ny+this.signo+this.limite);
   }
   Restriccion.prototype.corteRestriccion=function(res){
    var pendiente1=(this.x*-1)/this.y;
    var pendiente2=(res.x*-1)/res.y;
    if(pendiente1!=pendiente2){
     var cx=Racional.dividir(Racional.restar(new Racional(res.limite,res.y),new Racional(this.limite,this.y)),Racional.restar(new Racional((this.x*-1),this.y),new Racional((res.x*-1),res.y)));
     var cy=Racional.dividir(Racional.restar(new Racional(this.limite),Racional.multiplicar(new Racional(this.x),cx)),new Racional(this.y));
     return {"x":cx,"y":cy};
    }
    return null;
   }
   Restriccion.prototype.toString=function(){
    return this.x+"x"+(this.y<0?this.y:"+"+this.y)+"y"+this.signo+this.limite;
   }













   //Constructor, solo puede recibir un parametro, el identificador del lienzo.
   function Grafica(){
     
    // Parametros de la grafica
    this.margen=0.1;
    this.muescas=100;
    this.avancemuescas=10;
    this.horizontales=true;
    this.verticales=true;
    this.color1="#000000"; // Negro
    this.color2="#909090"; // Gris oscuro
    this.color3="#d0d0d0"; // Gris claro
    this.color4="rgba(25,150,250,0.2)"; // Azul transparente
    this.color5="#ff0000"; // Rojo
    this.color6="#40C000"; // Verde
    this.precisionx=0;
    this.precisiony=0;
    this.x1=0;
    this.x2=10;
    this.y1=0;
    this.y2=100;
    this.lienzo=null;
    this.restricciones=new Array();
    this.aumentar=true;
    this.aumento=0.1;
    this.marcarRestric=true;
    this.funcionObjetivo=null;
    this.ajustarEnteros=true;
    this.ajustarCortes=true;
    this.usarRacionales=false;
    
    // Parametros no seteables
    this.c2d=null;
    this.ancho=0;
    this.alto=0;
    this.muescasx=0;
    this.muescasy=0;
    this.historialAumento=new Array();
    this.cumpleRestricciones=false;
    this.puntosEspeciales=new Array();
    
    if(arguments.length==0){
    }
    else if(arguments.length==1){
     this.lienzo=document.getElementById(arguments[0]);
     if(this.lienzo==null){
      alert("Grafica (Error): el elemento canvas indicado no existe o no se ha cargado aun.");
     }
     else{
      this.procesarParametros();
      this.configurarCanvas();
     }
    }
    else{
     alert("Grafica (Error): numero de parametros incorrectos al invocar al constructor.");
    }
       
   }
   
   
   //Metodos de clase
   Grafica.get2dContext=function(lienzo){
    if(lienzo&&lienzo.getContext){
     var c2d=lienzo.getContext("2d");
     if(c2d){
      return c2d;
     }
    }
    return false;
   }
   
   
   //Metodos de instancia
   Grafica.prototype.setLienzo=function(n_lienzo){
    var nuevo=document.getElementById(n_lienzo);
    if(nuevo!=null){
     this.lienzo=nuevo;
     this.procesarParametros();
     this.configurarCanvas();
    }
    else{
     alert("Grafica (Error): el elemento canvas indicado no existe o no se ha cargado aun.");
    }
   }
   Grafica.prototype.setFuncionObjetivo=function(n_fo){
    this.funcionObjetivo=n_fo;
    this.redibujarContenido();
   }
   Grafica.prototype.setAumentar=function(n_aumentar){
    this.aumentar=n_aumentar;
   }
   Grafica.prototype.setFijarEnteros=function(n_fijar){
    this.ajustarEnteros=n_fijar;
   }
   Grafica.prototype.setFijarCortes=function(n_fijar){
    this.ajustarCortes=n_fijar;
   }
   Grafica.prototype.setUsarRacionales=function(n_rac){
    this.usarRacionales=n_rac;
   }
   Grafica.prototype.setMarcarRest=function(n_marcar){
    this.marcarRestric=n_marcar;
   }
   Grafica.prototype.setX1=function(n_x1){
    this.x1=parseFloat(n_x1);
   }
   Grafica.prototype.setX2=function(n_x2){
    this.x2=parseFloat(n_x2);
   }
   Grafica.prototype.setX=function(n_x1,n_x2){
    this.setX1(n_x1);
    this.setX2(n_x2);
   }
   Grafica.prototype.setY1=function(n_y1){
    this.y1=parseFloat(n_y1);
   }
   Grafica.prototype.setY2=function(n_y2){
    this.y2=parseFloat(n_y2);
   }
   Grafica.prototype.setY=function(n_y1,n_y2){
    this.setY1(n_y1);
    this.setY2(n_y2);
   }
   Grafica.prototype.setXY=function(n_x1,n_x2,n_y1,n_y2){
    this.setX1(n_x1);
    this.setX2(n_x2);
    this.setY1(n_y1);
    this.setY2(n_y2);
   }
   Grafica.prototype.setPrecisionX=function(n_px){
    this.precisionx=parseInt(n_px);
   }
   Grafica.prototype.setPrecisionY=function(n_py){
    this.precisiony=parseInt(n_py);
   }
   Grafica.prototype.setPrecision=function(n_px,n_py){
    this.setPrecisionX(n_px);
    this.setPrecisionY(n_py);
   }
   Grafica.prototype.setLineasH=function(n_h){
    this.horizontales=n_h;
   }
   Grafica.prototype.setLineasV=function(n_v){
    this.verticales=n_v;
   }
   Grafica.prototype.setLineas=function(n_h,n_v){
    this.setLineasH(n_h);
    this.setLineasV(n_v);
   }
   Grafica.prototype.setMuescas=function(n_muescas){
    this.muescas=parseInt(n_muescas);
   }
   Grafica.prototype.setAvanceMuescas=function(n_avance){
    this.avancemuescas=parseInt(n_avance);
   }
   Grafica.prototype.setMargen=function(n_margen){
    this.margen=parseFloat(n_margen);
   }
   Grafica.prototype.set=function(){
    //Recibimos: [n_lienzo,n_margen,]n_x1,n_x2,n_y1,n_y2,n_muescas,n_avance,n_h,n_v,n_px,n_py
    if(arguments.length==12||arguments.length==10){
     var i=0;
     if(arguments.length==12){
      this.setLienzo(arguments[i++]);
      this.setMargen(arguments[i++]);
     }
     this.setXY(arguments[i++],arguments[i++],arguments[i++],arguments[i++]);
     this.setMuescas(arguments[i++]);
     this.setAvanceMuescas(arguments[i++]);
     this.setLineas(arguments[i++],arguments[i++]);
     this.setPrecision(arguments[i++],arguments[i++]);
    }
    else{
     alert("Grafica (Error): numero de parametros incorrecto al invocar el metodo set.");
    }
    if(this.lienzo){
     this.procesarParametros();
     this.configurarCanvas();
    }
   }
   Grafica.prototype.toString=function(){
    var ret="Grafica:";
    ret+="\n Lienzo: "+this.lienzo.id;
    ret+="\n Eje X: "+this.x1+" a "+this.x2+" (Con "+this.precisionx+" decimales)";
    ret+="\n Eje Y: "+this.y1+" a "+this.y2+" (Con "+this.precisiony+" decimales)";
    ret+="\n Marcas: "+this.muescas+" (Numeradas 1 de cada "+this.avancemuescas+")";
    ret+="\n Lineas horizontales: "+this.horizontales;
    ret+="\n Lineas verticales: "+this.verticales;
    return ret;
   }
   Grafica.prototype.configurarCanvas=function(){
    if(this.c2d){
     this.c2d.strokeStyle=this.color1;
     this.c2d.lineWidth=1;
     this.c2d.lineCap="round";
     this.c2d.textAlign="center";
     this.c2d.font='400 12px Unknown Font, sans-serif';
    }
   }
   Grafica.prototype.procesarParametros=function(){
    this.c2d=Grafica.get2dContext(this.lienzo);
    this.ancho=this.c2d.canvas.width;
    this.alto=this.c2d.canvas.height;
    this.muescasx=this.ancho<=this.alto?this.muescas:this.ancho*this.muescas/this.alto;
    this.muescasy=this.alto<=this.ancho?this.muescas:this.alto*this.muescas/this.ancho;
   }
   Grafica.prototype.addRestriccion=function(res){
    this.restricciones.push(res);
    this.calcularPuntosEspeciales();
    this.redibujarContenido();
   }
   Grafica.prototype.delRestriccion=function(res){
    //TODO este metodo deberia hacerse con slice
    var nrest=new Array();
    var eliminada=false;
    for(var r in this.restricciones){
     if(eliminada||this.restricciones[r].toString()!=res){
      nrest.push(this.restricciones[r]);
     }
     else{
      eliminada=true;
     }
    }
    this.restricciones=nrest;
    this.calcularPuntosEspeciales();
    this.redibujarContenido();
   }
   Grafica.prototype.calcularPuntosEspeciales=function(){
    this.puntosEspeciales=new Array();
    for(var i=0;i<this.restricciones.length;i++){
     if(this.restricciones[i].isMostrable()){
      for(var j=0;j<this.restricciones.length;j++){
       if(this.restricciones[j].isMostrable()&&i!=j){
        var pe=this.restricciones[i].corteRestriccion(this.restricciones[j]);
        if(pe!=null){
         this.puntosEspeciales.push(pe);
        }
       }
      }
     }
    }
   }
   Grafica.prototype.clearRestricciones=function(){
    this.restricciones=new Array();
    this.redibujarContenido();
   }
   Grafica.prototype.getPunto=function(x,y){
    var posy=this.alto-this.alto*this.margen-(y-this.y1)*(this.alto-this.alto*this.margen*2)/(this.y2-this.y1);
    var posx=this.ancho*this.margen+(x-this.x1)*(this.ancho-this.ancho*this.margen*2)/(this.x2-this.x1);
    return {x:posx,y:posy};
   }
   Grafica.prototype.limpiar=function(){
    this.c2d.clearRect(0,0,this.ancho-1,this.alto-1);
   }
   Grafica.prototype.dibujarLineas=function(){
    if(this.horizontales){
     this.c2d.strokeStyle=this.color3;
     for(var i=0;i<this.muescasy;i++){
      this.c2d.beginPath();
      this.c2d.moveTo(this.ancho*this.margen+0.5,this.alto*this.margen+i*(this.alto-this.alto*this.margen*2)/this.muescasy+0.5);
      this.c2d.lineTo(this.ancho-this.ancho*this.margen+0.5,this.alto*this.margen+i*(this.alto-this.alto*this.margen*2)/this.muescasy+0.5);
      if(!(i%this.avancemuescas)){
       this.c2d.strokeStyle=this.color2;
       this.c2d.stroke();
       this.c2d.strokeStyle=this.color3;
      }
      else{
       this.c2d.stroke();
      }
     }
     this.c2d.strokeStyle=this.color1;
    }
    if(this.verticales){
     this.c2d.strokeStyle=this.color3;
     for(var i=1;i<=this.muescasx;i++){
      this.c2d.beginPath();
      this.c2d.moveTo(this.ancho*this.margen+i*(this.ancho-this.ancho*this.margen*2)/this.muescasx+0.5,this.alto*this.margen+0.5);
      this.c2d.lineTo(this.ancho*this.margen+i*(this.ancho-this.ancho*this.margen*2)/this.muescasx+0.5,this.alto-this.alto*this.margen+0.5);
      if(!(i%this.avancemuescas)){
       this.c2d.strokeStyle=this.color2;
       this.c2d.stroke();
       this.c2d.strokeStyle=this.color3;
      }
      else{
       this.c2d.stroke();
      }
     }
     this.c2d.strokeStyle=this.color1;
    }
   }
   Grafica.prototype.dibujarEjes=function(){
    this.c2d.beginPath();
    this.c2d.moveTo(this.ancho*this.margen+0.5,this.alto-this.alto*this.margen+0.5);
    this.c2d.lineTo(this.ancho-this.ancho*this.margen+0.5,this.alto-this.alto*this.margen+0.5);
    this.c2d.stroke();
    this.c2d.beginPath();
    this.c2d.moveTo(this.ancho*this.margen+0.5,this.alto*this.margen+0.5);
    this.c2d.lineTo(this.ancho*this.margen+0.5,this.alto-this.alto*this.margen+0.5);
    this.c2d.stroke();
   }
   Grafica.prototype.dibujarMuescas=function(){
    for(var i=0;i<=this.muescasx;i+=this.avancemuescas){
     this.c2d.beginPath();
     this.c2d.moveTo(this.ancho*this.margen+i*(this.ancho-this.ancho*this.margen*2)/this.muescasx+0.5,this.alto-this.alto*this.margen+0.5);
     this.c2d.lineTo(this.ancho*this.margen+i*(this.ancho-this.ancho*this.margen*2)/this.muescasx+0.5,this.alto-this.alto*(this.margen*0.85)+0.5);
     this.c2d.stroke();
    }
    for(var i=0;i<=this.muescasy;i+=this.avancemuescas){
     this.c2d.beginPath();
     this.c2d.moveTo(this.ancho*this.margen+0.5,this.alto*this.margen+i*(this.alto-this.alto*this.margen*2)/this.muescasy+0.5);
     this.c2d.lineTo(this.ancho*(this.margen*0.85)+0.5,this.alto*this.margen+i*(this.alto-this.alto*this.margen*2)/this.muescasy+0.5);
     this.c2d.stroke();
    }
   }
   Grafica.prototype.dibujarReferencias=function(){
    this.c2d.fillStyle=this.color1;
    this.c2d.textBaseline="alphabetic";
    for(var i=0;i<=this.muescasx;i+=this.avancemuescas){
     this.c2d.fillText(parseFloat(this.x1+(this.x2-this.x1)/this.muescasx*i).toFixed(this.precisionx),this.ancho*this.margen+i*(this.ancho-this.ancho*this.margen*2)/this.muescasx,this.alto-this.alto*(this.margen*0.5));
    }
    this.c2d.textBaseline="middle";
    for(var i=0;i<=this.muescasy;i+=this.avancemuescas){
     this.c2d.fillText(parseFloat(this.y1+(this.y2-this.y1)/this.muescasy*(this.muescasy-i)).toFixed(this.precisiony),this.ancho*(this.margen*0.5),this.alto*this.margen+i*(this.alto-this.alto*this.margen*2)/this.muescasy);
    }
   }
   Grafica.prototype.dibujarRestricciones=function(){
    for(var r in this.restricciones){
     var puntos=this.restricciones[r].corteGrafica(this);
     this.c2d.beginPath();
     var p1=this.getPunto(puntos[0].x,puntos[0].y);
     this.c2d.moveTo(p1.x+0.5,p1.y+0.5);
     var p2=this.getPunto(puntos[1].x,puntos[1].y);
     this.c2d.lineTo(p2.x+0.5,p2.y+0.5);
     this.c2d.stroke();
    }
   }
   Grafica.prototype.dibujarRestriccionesAreas=function(){
    this.c2d.fillStyle=this.color4;
    for(var r in this.restricciones){
     if(this.restricciones[r].isMostrable()){
      var puntos=this.restricciones[r].corteGrafica(this);
      this.c2d.beginPath();
      var p=this.getPunto(puntos[0].x,puntos[0].y);
      this.c2d.moveTo(p.x+0.5,p.y+0.5);
      for(var i=1;i<puntos.length;i++){
       p=this.getPunto(puntos[i].x,puntos[i].y);
       this.c2d.lineTo(p.x+0.5,p.y+0.5);
      }
      this.c2d.fill();
     }
    }
   }
   Grafica.prototype.dibujar00=function(){
    if(this.x1!=0&&this.x1<=0&&this.x2>=0){
     var p1=this.getPunto(0,this.y1);
     var p2=this.getPunto(0,this.y2);
     this.c2d.strokeStyle=this.color1;
     this.c2d.moveTo(p1.x+0.5,p1.y+0.5);
     this.c2d.lineTo(p2.x+0.5,p2.y+0.5);
     this.c2d.stroke();
    }
    if(this.y1!=0&&this.y1<=0&&this.y2>=0){
     var p1=this.getPunto(this.x1,0);
     var p2=this.getPunto(this.x2,0);
     this.c2d.strokeStyle=this.color1;
     this.c2d.moveTo(p1.x+0.5,p1.y+0.5);
     this.c2d.lineTo(p2.x+0.5,p2.y+0.5);
     this.c2d.stroke();
    }
   }
   Grafica.prototype.dibujar=function(){
    this.limpiar();
    this.dibujarLineas();
    this.dibujarEjes();
    this.dibujar00();
    this.dibujarMuescas();
    this.dibujarReferencias();
    this.dibujarRestriccionesAreas();
    this.dibujarRestricciones();
    this.dibujarRegionFactible();
    this.dibujarFuncionObjetivo();
   }
   Grafica.prototype.coor2gra=function(x,y){
    var posx=(x*(this.x2-this.x1)/(this.ancho-this.ancho*this.margen*2)+this.x1).toFixed(this.precisionx+2);
    var posy=(y*(this.y2-this.y1)/(this.alto-this.alto*this.margen*2)+this.y1).toFixed(this.precisiony+2);
    return {"x":posx,"y":posy};
   }
   Grafica.prototype.dibujarRegionFactible=function(){
    return;
    this.calcularPuntosEspeciales();
    var puntos=new Array();
    for(var i=0;i<this.puntosEspeciales.length;i++){
     puntos[puntos.length]=this.puntosEspeciales[i];
    }
    for(var i=0;i<this.restricciones.length;i++){
     var corta=this.restricciones[i].corteGrafica(this);
     for(var j=0;j<corta.length;j++){
      puntos[puntos.length]=corta[j];
     }
    }
    var puntosFactibles=new Array();
    for(var i=0;i<puntos.length;i++){
     var cumpleTodas=true;
     for(var j=0;j<this.restricciones.length;j++){
      if(!this.restricciones[j].cumple(puntos[i].x,puntos[i].y)){
       cumpleTodas=false;
      }
     }
     if(cumpleTodas){
      if(puntos[i].x>=this.x1&&puntos[i].x<=this.x2&&puntos[i].y>=this.y1&&puntos[i].y<=this.y2){
       puntosFactibles[puntosFactibles.length]=puntos[i];
      }
     }
    }
    var puntosFactibles2=new Array();
    for(var i=0;i<puntosFactibles.length;i++){
     var esta=false;
     for(var j=0;j<puntosFactibles2.length;j++){
      if(puntosFactibles[i].x==puntosFactibles2[j].x&&puntosFactibles[i].y==puntosFactibles2[j].y){
       esta=true;
      }
     }
     if(!esta){
      puntosFactibles2[puntosFactibles2.length]=puntosFactibles[i];
     }
    }
    if(puntosFactibles2.length>0){
     var punticos=new Array();
     var puntoInicial=0;
     var usados=new Array();
     for(var i=0;i<puntosFactibles2.length;i++){
      usados[i]=false;
     }
     for(var i=1;i<puntosFactibles2.length;i++){
      if(puntosFactibles2[i].x<=puntosFactibles2[puntoInicial].x){
       if(puntosFactibles2[i].y<=puntosFactibles2[puntoInicial].y){
        puntoInicial=i;
       }
      }
     }
     punticos[0]=puntosFactibles2[puntoInicial];
     usados[0]=true;
     do{
      var izquierda=Infinity;
      var candidato=-1;
      for(var i=0;i<puntosFactibles2.length;i++){
       if(!usados[i]){
        if(puntosFactibles2[i].x<izquierda){
         if(puntosFactibles2[i].y>punticos[punticos.length-1].y){
          candidato=i;
          izquierda=puntosFactibles2[i].x;
         }
        }
        else if(puntosFactibles2[i].x==izquierda){
         if(puntosFactibles2[i].y>punticos[punticos.length-1].y){
          if(candidato==-1){
           candidato=i;
           izquierda=puntosFactibles2[i].x;
          }
          else{
           if(puntosFactibles2[i].y<puntosFactibles2[candidato].y){
            candidato=i;
            izquierda=puntosFactibles2[i].x;
           }
          }
         }
        }
       }
      }
      if(candidato!=-1){
       punticos[punticos.length]=puntosFactibles2[candidato];
       usados[candidato]=true;
      }
     }while(candidato!=-1);
     do{
      var arriba=-Infinity;
      var candidato=-1;
      for(var i=0;i<puntosFactibles2.length;i++){
       if(!usados[i]){
        if(puntosFactibles2[i].y>arriba){
         if(puntosFactibles2[i].x>punticos[punticos.length-1].x){
          candidato=i;
          arriba=puntosFactibles2[i].y;
         }
        }
        else if(puntosFactibles2[i].y==arriba){
         if(puntosFactibles2[i].x>punticos[punticos.length-1].x){
          if(candidato==-1){
           candidato=i;
           arriba=puntosFactibles2[i].y;
          }
          else{
           if(puntosFactibles2[i].x<puntosFactibles2[candidato].x){
            candidato=i;
            arriba=puntosFactibles2[i].y;
           }
          }
         }
        }
       }
      }
      if(candidato!=-1){
       punticos[punticos.length]=puntosFactibles2[candidato];
       usados[candidato]=true;
      }
     }while(candidato!=-1);
     do{
      var derecha=-Infinity;
      var candidato=-1;
      for(var i=0;i<puntosFactibles2.length;i++){
       if(!usados[i]){
        if(puntosFactibles2[i].x>derecha){
         if(puntosFactibles2[i].y<punticos[punticos.length-1].y){
          candidato=i;
          derecha=puntosFactibles2[i].x;
         }
        }
        else if(puntosFactibles2[i].x==derecha){
         if(puntosFactibles2[i].y<punticos[punticos.length-1].y){
          if(candidato==-1){
           candidato=i;
           derecha=puntosFactibles2[i].x;
          }
          else{
           if(puntosFactibles2[i].y>puntosFactibles2[candidato].y){
            candidato=i;
            derecha=puntosFactibles2[i].x;
           }
          }
         }
        }
       }
      }
      if(candidato!=-1){
       punticos[punticos.length]=puntosFactibles2[candidato];
       usados[candidato]=true;
      }
     }while(candidato!=-1);
     do{
      var abajo=Infinity;
      var candidato=-1;
      for(var i=0;i<puntosFactibles2.length;i++){
       if(!usados[i]){
        if(puntosFactibles2[i].y<abajo){
         if(puntosFactibles2[i].x<punticos[punticos.length-1].x){
          candidato=i;
          abajo=puntosFactibles2[i].y;
         }
        }
        else if(puntosFactibles2[i].y==abajo){
         if(puntosFactibles2[i].x<punticos[punticos.length-1].x){
          if(candidato==-1){
           candidato=i;
           abajo=puntosFactibles2[i].y;
          }
          else{
           if(puntosFactibles2[i].x>puntosFactibles2[candidato].x){
            candidato=i;
            abajo=puntosFactibles2[i].y;
           }
          }
         }
        }
       }
      }
      if(candidato!=-1){
       punticos[punticos.length]=puntosFactibles2[candidato];
       usados[candidato]=true;
      }
     }while(candidato!=-1);
     this.c2d.fillStyle="rgba(5,175,0,0.7)";
     this.c2d.beginPath();
     var p=this.getPunto(punticos[0].x,punticos[0].y);
     this.c2d.moveTo(p.x+0.5,p.y+0.5);
     for(var i=1;i<punticos.length;i++){
      p=this.getPunto(punticos[i].x,punticos[i].y);
      this.c2d.lineTo(p.x+0.5,p.y+0.5);
     }
     this.c2d.fill();
    }
   }
   Grafica.prototype.dibujarDatos=function(event){
    var elemento=document.getElementById(this.lienzo.id);
    var posx=0;
    var posy=0;
    if(event.layerX||event.layerX==0){
     posx=event.layerX-elemento.offsetLeft;
     posy=event.layerY-elemento.offsetTop;
    }else if(event.offsetX||event.offsetX==0){
     posx=event.offsetX;
     posy=event.offsetY;
    }
    if(posy>=this.alto*this.margen&&posy<=this.alto-this.alto*this.margen&&posx>=this.ancho*this.margen&&posx<=this.ancho-this.ancho*this.margen){
     this.c2d.clearRect(this.ancho*this.margen,0,this.ancho-this.ancho*this.margen*2+1,this.alto*this.margen-1);
     this.c2d.fillStyle=this.color1;
     this.c2d.textBaseline="bottom";
     this.c2d.textAlign="end";
     var posx2=posx-this.ancho*this.margen;
     var posy2=this.alto-this.alto*this.margen-posy;
     var punto=this.coor2gra(posx2,posy2);
     var dibujarCirc=false;
     var dibujarCircPunto={"x":0,"y":0};
     if(this.ajustarEnteros||this.ajustarCortes){
      this.c2d.beginPath();
      var p=this.getPunto(Math.round(punto.x),Math.round(punto.y));
      var radio=(this.ancho-this.ancho*this.margen*2)*0.02;
      this.c2d.arc(posx,posy,radio,0,Math.PI+(Math.PI*2)/2,true);
      if(this.ajustarEnteros){
       if(this.c2d.isPointInPath(p.x,p.y)){
        dibujarCirc=true;
        dibujarCircPunto={"x":Math.round(punto.x),"y":Math.round(punto.y)};
       }
      }
      if(this.ajustarCortes){
       for(var i=0;!dibujarCirc&&i<this.puntosEspeciales.length;i++){
        var pe=this.getPunto(this.puntosEspeciales[i].x,this.puntosEspeciales[i].y);
        if(this.c2d.isPointInPath(pe.x,pe.y)){
         dibujarCirc=true;
         dibujarCircPunto={"x":this.puntosEspeciales[i].x,"y":this.puntosEspeciales[i].y};
        }
       }
      }
     }
     var fo="";
     if(this.funcionObjetivo!=null){
      var res=this.funcionObjetivo.resolver(punto.x,punto.y).toFixed(Math.max(this.precisionx,this.precisiony)+2);
      if(dibujarCirc){
       res=this.funcionObjetivo.resolver(dibujarCircPunto.x,dibujarCircPunto.y).toFixed(Math.max(this.precisionx,this.precisiony)+2);
      }
      if(this.usarRacionales){
       var rr=new Racional(res);
       if(dibujarCirc){
        var rx=new Racional(this.funcionObjetivo.x);
        var ry=new Racional(this.funcionObjetivo.y);
        rx.multiplicar(dibujarCircPunto.x);
        ry.multiplicar(dibujarCircPunto.y);
        rx.sumar(ry);
        rr=rx;
       }
       fo="  Resultado = "+rr.toString();
      }
      else{
       fo="  Resultado = "+res;
      }
     }
     if(this.restricciones.length>0&&this.marcarRestric&&this.cumpleRestricciones){
      this.c2d.fillStyle=this.color6;
     }
     if(dibujarCirc){
      this.c2d.fillText("("+dibujarCircPunto.x.toString()+", "+dibujarCircPunto.y.toString()+")"+fo,this.ancho-this.ancho*this.margen,this.alto*this.margen*0.95);
     }
     else{
      if(this.usarRacionales){
       var r1=new Racional(punto.x);
       var r2=new Racional(punto.y);
       this.c2d.fillText("("+r1.toString()+", "+r2.toString()+")"+fo,this.ancho-this.ancho*this.margen,this.alto*this.margen*0.95);
      }
      else{
       this.c2d.fillText("("+punto.x+", "+punto.y+")"+fo,this.ancho-this.ancho*this.margen,this.alto*this.margen*0.95);
      }
     }
     this.c2d.fillStyle=this.color1;
     if(this.aumentar){
      this.dibujarAumento(posx,posy);
     }
     else{
      this.redibujarContenido();
     }
     if(this.marcarRestric){
      if(dibujarCirc){
       var p=this.getPunto(dibujarCircPunto.x,dibujarCircPunto.y);
       this.marcarRestricciones(dibujarCircPunto.x,dibujarCircPunto.y);
      }
      else{
       this.marcarRestricciones(punto.x,punto.y);
      }
     }
     if(dibujarCirc){
      this.dibujarCirculo(dibujarCircPunto);
     }
    }
    else{
     this.limpiarDatos();
    }
   }
   Grafica.prototype.dibujarCirculo=function(punto){
    this.c2d.beginPath();
    var p=this.getPunto(punto.x,punto.y);
    var radio=(this.ancho-this.ancho*this.margen*2)*0.02;
    var antihorario=false;
    var anguloinicio=0;
    var angulofin=Math.PI+(Math.PI*2)/2;
    if(Math.round(punto.y)==this.y1){
     antihorario=true;
     angulofin=Math.PI;
    }
    else if(Math.round(punto.y)==this.y2){
     angulofin=Math.PI;
    }
    if(Math.round(punto.x)==this.x1){
     antihorario=true;
     anguloinicio=Math.PI/2;
     angulofin=Math.PI*3/2;
    }
    else if(Math.round(punto.x)==this.x2){
     anguloinicio=Math.PI/2;
     angulofin=Math.PI*3/2;
    }
    if(Math.round(punto.y)==this.y1&&Math.round(punto.x)==this.x1){
     antihorario=false;
     anguloinicio=Math.PI*3/2;
     angulofin=Math.PI*2;
    }
    else if(Math.round(punto.y)==this.y1&&Math.round(punto.x)==this.x2){
     antihorario=false;
     anguloinicio=Math.PI;
     angulofin=Math.PI*3/2;
    }
    else if(Math.round(punto.y)==this.y2&&Math.round(punto.x)==this.x1){
     antihorario=false;
     anguloinicio=Math.PI*2;
     angulofin=Math.PI/2;
    }
    else if(Math.round(punto.y)==this.y2&&Math.round(punto.x)==this.x2){
     antihorario=false;
     anguloinicio=Math.PI/2;
     angulofin=Math.PI;
    }
    this.c2d.arc(p.x+0.5,p.y+0.5,radio,anguloinicio,angulofin,antihorario);
    this.c2d.stroke();
   }
   Grafica.prototype.limpiarDatos=function(){
    this.c2d.clearRect(this.ancho*this.margen,0,this.ancho-this.ancho*this.margen*2+1,this.alto*this.margen-1);
    this.redibujarContenido();
   }
   Grafica.prototype.redibujarContenido=function(){
    this.c2d.clearRect(this.ancho*this.margen,this.alto*this.margen-1,this.ancho-this.ancho*this.margen*2+2,this.alto-this.alto*this.margen*2+2);
    this.dibujarLineas();
    this.dibujarEjes();
    this.dibujar00();
    this.dibujarRestriccionesAreas();
    this.dibujarRestricciones();
    this.dibujarRegionFactible();
    this.dibujarFuncionObjetivo();
   }
   Grafica.prototype.dibujarAumento=function(x,y){
    var aumentox=(this.ancho-this.ancho*this.margen*2)*this.aumento/2;
    var aumentoy=(this.alto-this.alto*this.margen*2)*this.aumento/2;
    y=y<=this.alto*this.margen+aumentoy?y=this.alto*this.margen+aumentoy:y;
    y=y>=this.alto-this.alto*this.margen-aumentoy?y=this.alto-this.alto*this.margen-aumentoy:y;
    x=x<=this.ancho*this.margen+aumentox?this.ancho*this.margen+aumentox:x;
    x=x>=this.ancho-this.ancho*this.margen-aumentox?this.ancho-this.ancho*this.margen-aumentox:x;
    this.redibujarContenido();
    var lonx=aumentox*0.25;
    var lony=aumentoy*0.25;
    with(this.c2d){
     beginPath();
     moveTo(x+aumentox-lonx+0.5,y-aumentoy+0.5);
     lineTo(x+aumentox+0.5,y-aumentoy+0.5);
     lineTo(x+aumentox+0.5,y-aumentoy+lony+0.5);
     moveTo(x+aumentox+0.5,y+aumentoy-lony+0.5);
     lineTo(x+aumentox+0.5,y+aumentoy+0.5);
     lineTo(x+aumentox-lonx+0.5,y+aumentoy+0.5);
     moveTo(x-aumentox+lonx+0.5,y+aumentoy+0.5);
     lineTo(x-aumentox+0.5,y+aumentoy+0.5);
     lineTo(x-aumentox+0.5,y+aumentoy-lony+0.5);
     moveTo(x-aumentox+0.5,y-aumentoy+lony+0.5);
     lineTo(x-aumentox+0.5,y-aumentoy+0.5);
     lineTo(x-aumentox+lonx+0.5,y-aumentoy+0.5);
     stroke();
    }
   }
   Grafica.prototype.eventoClick=function(event){
    var elemento=document.getElementById(this.lienzo.id);
    var posx=0;
    var posy=0;
    if(event.layerX||event.layerX==0){
     posx=event.layerX-elemento.offsetLeft;
     posy=event.layerY-elemento.offsetTop;
    }else if(event.offsetX||event.offsetX==0){
     posx=event.offsetX;
     posy=event.offsetY;
    }
    if(this.aumentar){
     if(posy>=this.alto*this.margen&&posy<=this.alto-this.alto*this.margen&&posx>=this.ancho*this.margen&&posx<=this.ancho-this.ancho*this.margen){
      this.aumentarGrafica(posx,posy);
     }
    }
   }
   Grafica.prototype.aumentarGrafica=function(x,y){
    var aumentox=(this.ancho-this.ancho*this.margen*2)*this.aumento/2;
    var aumentoy=(this.alto-this.alto*this.margen*2)*this.aumento/2;
    y=y<=this.alto*this.margen+aumentoy?y=this.alto*this.margen+aumentoy:y;
    y=y>=this.alto-this.alto*this.margen-aumentoy?y=this.alto-this.alto*this.margen-aumentoy:y;
    x=x<=this.ancho*this.margen+aumentox?this.ancho*this.margen+aumentox:x;
    x=x>=this.ancho-this.ancho*this.margen-aumentox?this.ancho-this.ancho*this.margen-aumentox:x;
    x=x-this.ancho*this.margen;
    y=this.alto-this.alto*this.margen-y;
    var p1=this.coor2gra(x-aumentox,y-aumentoy);
    var p2=this.coor2gra(x+aumentox,y+aumentoy);
    this.historialAumento.push({"x1":this.x1,"x2":this.x2,"y1":this.y1,"y2":this.y2});
    this.setXY(p1.x,p2.x,p1.y,p2.y);
    this.setPrecision(this.precisionx+2,this.precisiony+2);
    this.procesarParametros();
    this.configurarCanvas();
    this.dibujar();
   }
   Grafica.prototype.deshacerAumento=function(){
    var hist=this.historialAumento.pop();
    if(hist){
     this.setXY(hist.x1,hist.x2,hist.y1,hist.y2);
     this.setPrecision(this.precisionx-2,this.precisiony-2);
     this.procesarParametros();
     this.configurarCanvas();
     this.dibujar();
    }
   }
   Grafica.prototype.marcarRestricciones=function(posx,posy){
    var cumpleTodas=true;
    for(var r in this.restricciones){
     if(this.restricciones[r].cumple(posx,posy)){
      var puntos=this.restricciones[r].corteGrafica(this);
      this.c2d.strokeStyle=this.color5;
      this.c2d.beginPath();
      var p1=this.getPunto(puntos[0].x,puntos[0].y);
      var p2=this.getPunto(puntos[1].x,puntos[1].y);
      this.c2d.moveTo(p1.x+0.5,p1.y+0.5);
      this.c2d.lineTo(p2.x+0.5,p2.y+0.5);
      this.c2d.stroke();
      this.c2d.strokeStyle=this.color1;
     }
     else{
      cumpleTodas=false;
     }
    }
    this.cumpleRestricciones=cumpleTodas;
   }
   Grafica.prototype.dibujarFuncionObjetivo=function(){
    if(this.funcionObjetivo!=null){
     if((0>=this.x1&&0<=this.x2)&&(0>=this.y1&&0<=this.y2)){
      if((this.funcionObjetivo.x>=this.x1&&this.funcionObjetivo.x<=this.x2)&&(this.funcionObjetivo.y>=this.y1&&this.funcionObjetivo.y<=this.y2)){
       var p0=this.getPunto(0,0);
       var p1=this.getPunto(this.funcionObjetivo.x,this.funcionObjetivo.y);
       with(this.c2d){
        strokeStyle=this.color5;
        beginPath();
        moveTo(p0.x+0.5,p0.y+0.5);
        lineTo(p1.x+0.5,p1.y+0.5);
        stroke();
        strokeStyle=this.color1;
       }
      }
     }
    }
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   var g00;
   
   function faux1(event){
    g00.dibujarDatos(event);
   }
   
   function ejecutarConfiguracion(){
    var x1=document.getElementById("x1").value;
    var x2=document.getElementById("x2").value;
    var y1=document.getElementById("y1").value;
    var y2=document.getElementById("y2").value;
    var marcas=document.getElementById("marcas").value;
    var avance=document.getElementById("avance").value;
    var precx=document.getElementById("precisionx").value;
    var precy=document.getElementById("precisiony").value;
    var horizontales=document.getElementById("horizontales").checked;
    var verticales=document.getElementById("verticales").checked;
    g00.set(x1,x2,y1,y2,marcas,avance,horizontales,verticales,precx,precy);
    g00.dibujar();
   }
   
   function ejecutarConfiguracion2(){
    var lienzo=document.getElementById("lienzo");
    var ancho=document.getElementById("ancho").value;
    var alto=document.getElementById("alto").value;
    lienzo.width=ancho;
    lienzo.height=alto;
    ejecutarConfiguracion();
   }
   
   function nuevaFuncionObjetivo(){
    if(arguments.length==0){
     nuevaFuncionObjetivoSinParam();
    }
    else{
     nuevaFuncionObjetivoConParam(arguments[0],arguments[1],arguments[2],arguments[3]);
    }
   }
   
   function nuevaFuncionObjetivoSinParam(){
    var nfox=document.getElementById("fo_x").value;
    var nfoy=document.getElementById("fo_y").value;
    var nfoop=document.getElementById("fo_op").value;
    var nfoobj=document.getElementById("fo_obj").value;
    var nfo=new FuncionObjetivo(nfoobj,nfox,eval(nfoop+nfoy));
    g00.setFuncionObjetivo(nfo);
   }
   
   function nuevaFuncionObjetivoConParam(v1,v2,v3,v4){
    var nfox=document.getElementById("fo_x");
    var nfoy=document.getElementById("fo_y");
    var nfoop=document.getElementById("fo_op");
    var nfoobj=document.getElementById("fo_obj");
    nfoobj.value=v1;
    nfox.value=v2;
    nfoop.value=v3;
    nfoy.value=v4;
    nuevaFuncionObjetivo();
   }
   
   function nuevaRestriccion(){
    if(arguments.length==0){
     nuevaRestriccionSinParam();
    }
    else{
     nuevaRestriccionConParam(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
    }
   }
   
   function nuevaRestriccionSinParam(){
    var nrestx=document.getElementById("nrest_x").value;
    var nresty=document.getElementById("nrest_y").value;
    var nrestop=document.getElementById("nrest_op").value;
    var nrestsigno=document.getElementById("nrest_signo").value;
    var nrestlimite=document.getElementById("nrest_limite").value;
    var nrestmostrable=document.getElementById("nrest_mostrable").checked;
    var nrest=new Restriccion(nrestx,eval(nrestop+nresty),nrestsigno,nrestlimite,nrestmostrable);
    var restricciones=document.getElementById("restricciones");
    var restdiv=document.createElement("div");
    var resttxt=document.createTextNode(" "+nrest.toString());
    var restbot=document.createElement("input");
    restbot.type="button";
    restbot.value="-";
    restbot.onclick=function(){eliminarRestriccion(nrest.toString(),this);};
    restdiv.appendChild(restbot);
    restdiv.appendChild(resttxt);
    restricciones.appendChild(restdiv);
    g00.addRestriccion(nrest);
   }
   
   function nuevaRestriccionConParam(v1,v2,v3,v4,v5,v6){
    var nrestx=document.getElementById("nrest_x");
    var nresty=document.getElementById("nrest_y");
    var nrestop=document.getElementById("nrest_op");
    var nrestsigno=document.getElementById("nrest_signo");
    var nrestlimite=document.getElementById("nrest_limite");
    var nrestmostrable=document.getElementById("nrest_mostrable");
    nrestx.value=v1;
    nresty.value=v2;
    nrestop.value=v3;
    nrestsigno.value=v4;
    nrestlimite.value=v5;
    nrestmostrable.checked=v6;
    nuevaRestriccion();
   }
   
   function eliminarRestriccion(res,obj){
    obj.parentNode.parentNode.removeChild(obj.parentNode);
    g00.delRestriccion(res);
   }
   
   function mostrarOcultar(act){
    var sh=act.parentNode.childNodes[3];
    sh.style.display=sh.style.display=="block"?"none":"block";
   }
   
   function ejemplos(ej){
    switch(ej){
     case "Ningun ejemplo":
      ej00();
      break;
     case "Ejemplo 1":
      ej01();
      break;
     case "Ejemplo 2":
      ej02();
      break;
     case "Ejemplo 3":
      ej03();
      break;
     case "Ejemplo 4":
      ej04();
      break;
    }
   }
   
   function ej00(){
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.clearRestricciones();
    g00.setFuncionObjetivo(null);
    var restricciones=document.getElementById("restricciones");
    restricciones.innerHTML="";
   }
   function ej01(){
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.clearRestricciones();
    var restricciones=document.getElementById("restricciones");
    restricciones.innerHTML="";
    nuevaFuncionObjetivo("max",2,"+",1);
    nuevaRestriccion(2,3,"+","<=",18,true);
    nuevaRestriccion(3,1,"+","<=",12,true);
    nuevaRestriccion(0,1,"+",">=",0,false);
    nuevaRestriccion(1,0,"+",">=",0,false);
   }
   function ej02(){
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.clearRestricciones();
    var restricciones=document.getElementById("restricciones");
    restricciones.innerHTML="";
    nuevaFuncionObjetivo("max",2,"+",3);
    nuevaRestriccion(-1,1,"+","<=",2,true);
    nuevaRestriccion(0,1,"+","<=",5,true);
   }
   function ej03(){
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.clearRestricciones();
    var restricciones=document.getElementById("restricciones");
    restricciones.innerHTML="";
    nuevaFuncionObjetivo("max",1,"+",1);
    nuevaRestriccion(1,1,"+","<=",4,true);
    nuevaRestriccion(-1,1,"+","<=",1,true);
   }
   function ej04(){
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.clearRestricciones();
    var restricciones=document.getElementById("restricciones");
    restricciones.innerHTML="";
    nuevaFuncionObjetivo("max",2,"+",3);
    nuevaRestriccion(-1,2,"+",">=",5,true);
    nuevaRestriccion(1,5,"-",">=",3,true);
   }