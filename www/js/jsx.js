  
  /* TODO
   !!! cuando se modifiquen las variables hay que modificar las restriciones ya introducidas �
  */
  
  
   $(function(){
    $("#theme").themeswitcher();
    $("#simplex_tabs").tabs();
    $("#jsx_fo_tipo_max").button({icons:{primary:'ui-icon-circle-arrow-n'}});
    $("#jsx_fo_tipo_min").button({icons:{primary:'ui-icon-circle-arrow-s'}});
    $("#jsx_fo_tipo").buttonset().change(function(){jsx_actualizar();});
    $("#jsx_fo_numvar_s").slider({
     range: "min",
     value: 2,
     min: 1,
     max: 10,
     slide: function(event,ui){
      $("#jsx_fo_numvar_n").val(ui.value);
      jsx_cambiar_numvar(ui.value);
     }
    });
    $("#metodoartificial").buttonset().change(function(){jsx_actualizarProblema();});
    $("#jsx_fo_numvar_n").val($("#jsx_fo_numvar_s").slider("value"));
    jsx_cambiar_numvar($("#jsx_fo_numvar_s").slider("value"));
    $("#jsx_res_fo_signo_opt").buttonset();
    $("#jsx_res_fo_boton").button({icons:{primary:'ui-icon-circle-plus'}});
    $("#jsx_res_fo_boton").click(function(){jsx_nuevarestriccion();});
    $("#jsx_res_act").selectable();
    $($("#jsx_pro_botones").children()[0])
     .button({icons:{primary:'ui-icon-disk'}})
     .click(function(){jsx_nuevoProblema();});
    $($("#jsx_pro_botones").children()[1])
     .button({icons:{primary:'ui-icon-wrench'}})
     .click(function(){jsx_resolver();});
    $("#jsx_solucion_pasos").accordion({collapsible:false});
    
    //
    //Lienzo
    //Margen
    //Inicio del eje x
    //Fin del eje x
    //Inicio del eje y
    //Fin del eje y
    //Numero de marcas del eje corto (tamaño del lienzo)
    //Cada cuantas marcas numeramos
    //Dibujar las lineas horizontales
    //Dibujar las lineas verticales
    //Numero de decimales del eje x
    //Numero de decimales del eje y
    //Formula para dibujar
    //Cada cuanto se muestrea la formula
    g00=new Grafica();
    g00.set("lienzo",0.1,0,10,0,10,100,10,true,true,0,0);
    g00.dibujar();
    var l=document.getElementById("lienzo");
    l.addEventListener('mousemove',faux1,false);
   });
   
   var jsx_pr;
   var jsx_arrayRestricciones=new Array();
   var jsx_arrayRestriccionesActivas=new Array();
   
   function jsx_nuevoProblema(){
    //$("#jsx_fo_tipo_min").removeAttr("checked");
    //$("#jsx_fo_tipo_max").attr("checked","checked");
    //TODO esto no es asi :( mirar en la documentacion de jquery
    jsx_pr=new jsx_problema();
    jsx_arrayRestricciones=new Array();
    jsx_arrayRestriccionesActivas=new Array();
    $("#jsx_res_act").html("");
    jsx_actualizar();
   }
   
   function jsx_resolver(){
    var antiguo=jsx_pr.clone();
    antiguo.procesar();
    var antiguocopia;
    var tieneartificiales=false;
    var fase=0;
    if($("#dosfases").attr("checked")){
     antiguocopia=antiguo.clone().dosfases();
     fase=1;
    }
    else{
     antiguocopia=antiguo.clone().mgrande();
    }
    if(antiguocopia!=false){
     tieneartificiales=true;
     antiguo=antiguocopia;
    }
    else{
     fase=0;
    }
    var ma01=new jsx_matriz(antiguo);
    var cont=$("#jsx_solucion_pasos");
    cont.html("");
    cont.accordion('destroy');
    jsx_resolver_matriz(ma01,0,tieneartificiales,fase);
    if(tieneartificiales){
     if($("#dosfases").attr("checked")){
      if(ma01.finPrimeraFase()!=2){
       var temp=jsx_pr.clone();
       temp.procesar();
       fase=2;
       var ma02=ma01.getSegundaFase(temp.getFuncionObjetivo());
       jsx_resolver_matriz(ma02,0,false,fase);
      }
     }
     else{
      
     }
    }
    cont.accordion({collapsible:false});
   }
   
   function jsx_resolver_matriz(ma,it,es,fa){
    console.log(ma.matriz);
    var ma01=ma
    ma.matriz.map((x) => {
      x.map((i) => {
        console.log(i.numerador);
      })
    });
    var cont=$("#jsx_solucion_pasos");
    var iteracion=it;
    var tieneartificiales=es;
    var tituloCadOld="Matriz inicial";
    if(fa==1){
     tituloCadOld="Matriz primera fase";
    }
    else if(fa==2){
     tituloCadOld="Matriz segunda fase";
    }
    var finmsg="";
    do{
     if(ma01.quienEntra()!=null&&ma01.quienSale()!=null){
      var entra=ma01.quienEntraX();
      var sale=ma01.quienSaleX();
      var tituloCad="Iteraci&oacute;n "+((iteracion++)+1)+": entra "+entra+" y sale "+sale;
     }
     else{
      var tituloCad="";
      if(!tieneartificiales){
       tituloCad="Iteraci&oacute;n "+(iteracion++)+": no hay m&aacute;s iteraciones";
       if(ma01.quienEntra()!=null&&ma01.esMultiple()==false){
        finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La soluci&oacute;n es ilimitada, la variable "+ma01.quienEntraX()+" debe entrar a la base pero ninguna puede salir.";
       }
       if(ma01.esMultiple()==true){
        finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La soluci&oacute;n es m&uacute;ltiple, nos encontramos en un punto &oacute;ptimo y hay variables no b&aacute;sicas con coste reducido igual a 0.";
       }
      }
      else{
       if($("#dosfases").attr("checked")){
        tituloCad="Iteraci&oacute;n "+(iteracion++)+": fin de la primera fase";
        var comotermino=ma01.finPrimeraFase();
        if(comotermino==0){
         finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Se han expulsado todas las variables artificiales de la base.";
        }
        else if(comotermino==1){
         finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Las variables artificiales que no se han expulsado de la base valen 0, son linealmente dependientes.";
        }
        else if(comotermino==2){
         finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Existe una variable artificial en la base extrictamente mayor que 0, el problema es infactible.";
        }
       }
       else{
        tituloCad="Iteraci&oacute;n "+(iteracion++)+": no hay m&aacute;s iteraciones";
        if(ma01.finMgrande()==true){
         finmsg="<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Las variables artificiales que no se han expulsado de la base valen 0, son linealmente dependientes.";
        }
       }
      }
     }
     var titulo=$("<h3></h3>");
     var enlace=$("<a></a>").attr("href","#").html(tituloCadOld);
     tituloCadOld=tituloCad;
     titulo.append(enlace);
    //  console.log(ma01.toString()+finmsg);
     var contenido=$("<div></div>").html(ma01.toString()+finmsg);
     cont.append(titulo);
     cont.append(contenido);
    }while(ma01.avanzar());
   }
   
   function jsx_actualizar(){
    var maxmin=$("#jsx_fo_tipo_max").attr("checked")?"max":"min";
    var foDatos=new Array();
    var fo=$("#jsx_fo_fo_cont").children();
    for(var i=0;i<fo.length;i++){
     var signo=$($($(fo[i]).children()[0]).children()[0]).attr("checked")?"+":"-";
     var dato=$($(fo[i]).children()[1]).attr("value");
     foDatos[foDatos.length]=dato==""?0:signo+""+dato;
    }
    var fo01=new jsx_funcionObjetivo(maxmin,foDatos);
    
    jsx_pr=new jsx_problema();
    jsx_pr.setFuncionObjetivo(fo01);
    for(var i=0;i<jsx_arrayRestricciones.length;i++){
     if(jsx_arrayRestriccionesActivas[i]==true){
      jsx_pr.addRestriccion(jsx_arrayRestricciones[i]);
     }
    }
    
    jsx_actualizarProblema();
   }
   
   function jsx_actualizarProblema(){
    var antiguo=jsx_pr.clone();
    antiguo.procesar();
    var cont=$("#jsx_pro_p1");
    cont.html("");
    if(jQuery.trim(antiguo.toString()).length>3){
     cont.html(antiguo.toHTML());
    }
    var problemaArt;
    if($("#dosfases").attr("checked")){
     problemaArt=antiguo.clone().dosfases();
    }
    else{
     problemaArt=antiguo.clone().mgrande();
    }
    if(problemaArt===false){
     problemaArt=antiguo.clone();
     $("#jsx_segundo1").css("visibility","hidden");
     $("#jsx_segundo2").css("visibility","hidden");
    }
    else{
     $("#jsx_segundo1").css("visibility","visible");
     $("#jsx_segundo2").css("visibility","visible");
    }
    var cont2=$("#jsx_pro_p2");
    cont2.html("");
    if(jQuery.trim(problemaArt.toString()).length>3){
     cont2.html(problemaArt.toHTML());
    }
   }
   
   function jsx_nuevarestriccion(){
    var cadena="";
    var equis=new Array();
    var restricciones=$("#jsx_res_fo_cont").children();
    var distintocero=false;
    for(var i=0;i<restricciones.length;i++){
     var res=$(restricciones[i]).children();
     var signo=$($(res[0]).children()[0]).attr("checked")?"+":"-";
     var valor=$(res[1]).attr("value");
     valor=isNaN(parseFloat(valor))?0:valor;
     equis[equis.length]=parseFloat(signo+""+eval(valor));
     if(parseFloat(valor)!=0){
      distintocero=true;
      cadena+=signo+""+valor+"X<sub>"+(i+1)+"</sub>";
     }
    }
    if(!distintocero){
     return;
    }
    var desigualdad=$("#jsx_res_fo_signo_opt_lt").attr("checked")?"<=":false;
    desigualdad=!desigualdad?$("#jsx_res_fo_signo_opt_eq").attr("checked")?"=":false:desigualdad;
    desigualdad=!desigualdad?">=":desigualdad;
    var limite=$("#jsx_res_fo_limite").attr("value");
    limite=isNaN(parseFloat(limite))?0:limite;
    var nombre=$("#jsx_res_fo_nom").attr("value");
    cadena+=(desigualdad=="<="?"&le;":desigualdad=="="?"=":"&ge;")+""+limite;
    if(cadena[0]=="+"){
     cadena=cadena.substring(1);
    }
    
    //TODO ahora habria que limpiar los parametros de la ultima restriccion tsk
    
    var el=$("<li></li>").addClass("p-2 m-3");
    el.html("<input type=\"button\" value=\"X\" class=\"jsx_xrest ui-corner-left\" onclick=\"jsx_eliminarrestriccion('"+jsx_arrayRestricciones.length+"');\" />");
    if(nombre!=""){
     el.html(el.html()+nombre);
    }
    else{
     el.html(el.html()+cadena);
    }
    $("#jsx_res_act").append(el);
    
    
    var re01=new jsx_restriccion(equis,desigualdad,limite);
    jsx_arrayRestricciones[jsx_arrayRestricciones.length]=re01;
    jsx_arrayRestriccionesActivas[jsx_arrayRestriccionesActivas.length]=true;
    jsx_actualizar();
   }
   
   function jsx_eliminarrestriccion(el){
    jsx_arrayRestriccionesActivas[el]=false;
    jsx_actualizar();
    var rest=document.getElementById("jsx_res_act");
    var pos=0;
    var res=new Array();
    for(var i=0;i<el;i++){
     if(jsx_arrayRestriccionesActivas[i]==true){
      pos++;
     }
    }
    for(var i=0;i<rest.childNodes.length;i++){
     if(i!=pos){
      var el=$("<li></li>").addClass("p-2 m-3").html(rest.childNodes[i].innerHTML);
      res[res.length]=el;
     }
    }
    $("#jsx_res_act").html("");
    for(var i=0;i<res.length;i++){
     $("#jsx_res_act").append(res[i]);
    }
   }
   
   function jsx_cambiar_numvar(numvar){
    var fo=$("#jsx_fo_fo_cont");
    var res=$("#jsx_res_fo_cont");
    if(fo.children().size()<numvar){
     for(var i=fo.children().size();i<numvar;i++){
      fo.append(jsx_fores_line('fo',i));
      res.append(jsx_fores_line('res',i));
     }
    }
    else{
     var focopia=fo.clone(true);
     var rescopia=res.clone(true);
     fo.html("");
     res.html("");
     for(var i=0;i<numvar;i++){
      fo.append($(focopia.children()[i]).clone(true));
      res.append($(rescopia.children()[i]).clone(true));
     }
    }
    jsx_actualizar();
   }
   
   function jsx_fores_line(fores,i){
    var cont=$("#jsx_fo_fo_root").clone(true);
    cont.id="jsx_"+fores+"_fo_"+i;
    cont.css("display","block");
    cont.html(cont.html()+"<sub>"+(i+1)+"</sub>");
    var b=$(cont.children()[0]);
    var b1=$(b.children()[0]);
    var l1=$(b.children()[1]);
    var b2=$(b.children()[2]);
    var l2=$(b.children()[3]);
    b1.attr("name","jsx_"+fores+"_"+i);
    b1.attr("id","jsx_"+fores+"_"+i+"_pos");
    l1.attr("for","jsx_"+fores+"_"+i+"_pos");
    b2.attr("name","jsx_"+fores+"_"+i);
    b2.attr("id","jsx_"+fores+"_"+i+"_neg");
    l2.attr("for","jsx_"+fores+"_"+i+"_neg");
    b1.button({icons:{primary:'ui-icon-plus'},text:false});
    b2.button({icons:{primary:'ui-icon-minus'},text:false});
    b.buttonset();
    if(fores=="fo"){
     b.change(function(){jsx_actualizar();});
     $(cont.children()[1]).change(function(){jsx_actualizar();});
    }
    return cont;
   }
   
   function jsx_ejemplo(){
    var ej=$("#jsx_pro_ejemplos").attr("value");
    if(ej=="ej0"){
     var fo01=new jsx_funcionObjetivo('max',1,1);
     var re01=new jsx_restriccion(1,1,'<=',4);
     var re02=new jsx_restriccion(-1,1,'<=',1);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
    }
    else if(ej=="ej1"){
     var fo01=new jsx_funcionObjetivo('max',2,1);
     var re01=new jsx_restriccion(2,3,'<=',18);
     var re02=new jsx_restriccion(3,1,'<=',12);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
    }
    else if(ej=="ej2"){
     var fo01=new jsx_funcionObjetivo('max',2,3);
     var re01=new jsx_restriccion(-1,1,'<=',2);
     var re02=new jsx_restriccion(0,1,'<=',5);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
    }
    else if(ej=="ej3"){
     var fo01=new jsx_funcionObjetivo('max',3,2);
     var re01=new jsx_restriccion(1,1,'>=',5);
     var re02=new jsx_restriccion(-3,4,'<=',12);
     var re03=new jsx_restriccion(0,1,'<=',5);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
     jsx_pr.addRestriccion(re03);
    }
    else if(ej=="ej4"){
     var fo01=new jsx_funcionObjetivo('min',1,-2);
     var re01=new jsx_restriccion(1,1,'>=',2);
     var re02=new jsx_restriccion(-1,1,'>=',1);
     var re03=new jsx_restriccion(0,1,'<=',3);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
     jsx_pr.addRestriccion(re03);
    }
    else if(ej=="ej5"){
     var fo01=new jsx_funcionObjetivo('min',-3,4);
     var re01=new jsx_restriccion(1,1,'<=',4);
     var re02=new jsx_restriccion(2,3,'>=',18);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
    }
    else if(ej=="ej6"){
     var fo01=new jsx_funcionObjetivo('min',-1,2,-3);
     var re01=new jsx_restriccion(1,1,1,'=',6);
     var re02=new jsx_restriccion(-1,1,2,'=',4);
     var re03=new jsx_restriccion(0,2,3,'=',10);
     jsx_pr=new jsx_problema();
     jsx_pr.setFuncionObjetivo(fo01);
     jsx_pr.addRestriccion(re01);
     jsx_pr.addRestriccion(re02);
     jsx_pr.addRestriccion(re03);
    }
    if(ej!="null"){
     jsx_actualizarProblema();
    }
   }