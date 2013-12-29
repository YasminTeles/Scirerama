/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function(){
    var stage = new Kinetic.Stage({
        container: 'container',
        width:870,
        height:530,
        draggable: true
    });
    
//    var layer = new Kinetic.Layer();
//    stage.add(layer);
//    layer.draw();
////    
//    var circulo = new Kinetic.Circle({
////        x: 30,
////        y: 30,
//        radius: 20,
//        fill: 'red',
//        stroke: 'black',
//        strokeWidth: 1
//        
//    });
//    
//    var texto = new Kinetic.Text({
//        text: "e",
//        fontSize: 20,
//        fontFamily: 'Century Gothic',
//        fill: 'black',
//        align: 'center'
//    });
//    
//    texto.setY(- texto.getHeight()/2);
//    texto.setX(- texto.getWidth()/2);
//    
//     var grupo = new Kinetic.Group({
//        x: 50,
//        //draggable:true,
//        y: 100,
//        height: circulo.getHeight() > texto.getHeight()? circulo.getHeight(): texto.getHeight(),
//        width: circulo.getWidth() > texto.getWidth()? circulo.getWidth() : texto.getWidth()
//    });
//    
//    grupo.add(circulo);
//    grupo.add(texto);
//    layer.add(grupo);
//    
//    layer.draw();
//    console.log("Circulo\t"+"height: "+grupo.getHeight()+" width: "+grupo.getWidth());
//    
    
    
    
    
    
    
//     var rect = new Kinetic.Rect({
//        x: 239,
//        y: 75,
//        width: 100,
//        height: 50,
//        fill: 'green',
//        stroke: 'black',
//        strokeWidth: 4
//      });
//      
//      var circulo2 = new Kinetic.Circle({
//        x: 40,
//        y: 40,
//        radius: 70,
//        fill: 'blue',
//        stroke: 'black',
//        strokeWidth: 4
//        
//    });
//      layer.add(circulo2);
//      layer.draw();
//      console.log("retangulo desenhado..");
      
//      var grupo = new Kinetic.Group();
//      grupo.add(circulo);
//      grupo.add(rect);
//      grupo.on('click', function(){
//          circulo2.destroy();
//          grupo.destroy();
//          layer.draw();
//      });
//      
//      layer.add(grupo);
//      layer.draw();
      
//    circulo.destroy();
//    layer.draw();
//    console.log("circulo removido...");
    
    var inicio = new Scirerama.Raiz();
//    menu.iniciar(inicio);
//    inicio.setLayer(layer);
    stage.add(inicio.getLayer());
//    stage.draw();
    
//    var e = new Scirerama.OU("Tronco");
//    e.desenhar
//    var filho2 = new Scirerama.E("Tronco");
//    var filho3 = new Scirerama.OU("Tronco");
//    
//    menu.iniciar(inicio);
//    menu._adicionarE(inicio);
//    menu._adicionarOU(inicio.getFilhoIndice(0));
//    menu._remover(inicio.getFilhoIndice(0));
//    
//   inicio.adicionarFilho(e); 
//   e.adicionarFilho(filho1);
//   e.adicionarFilho(filho3);
//   e.posicionarFilhos();
//   
//   e.desenhar();
//   console.log("elementos desenhados...");
//   
//   menu.setRaiz(inicio);
//   menu._remover(e);
//    console.log(inicio.getLayer().getChildren());
//   e.deletar();
//   console.log("elementos deletados...");
   
////   
//   var teste = {
//        a: function(){
//            e.deletar();
//            e.posicionarFilhos();
//        }
//   };
//   teste.a();
//   console.log("elemento removido..."); 
   
   
//    var tipo = new Scirerama.Tipo("Category");
//    var valor = new Scirerama.Valor("Ator");
//    var sujeito = new Scirerama.Sujeito(tipo, valor);
////    
//    var tipo2 = new Scirerama.Tipo("Page");
//    var valor2 = new Scirerama.Valor("Ator");
//    var sujeito2 = new Scirerama.Sujeito(tipo2, valor2);
//    
//    var rotulo = new Scirerama.Rotulo(" Italia");
//    var valor3 = new Scirerama.Valor("Nasceu em");
//    var propriedade = new Scirerama.Propriedade(valor3, rotulo);
//    var e = new Scirerama.E("Ramo");
  
//    var rotulo1 = new Scirerama.Rotulo(" Brasil");
//    var valor4 = new Scirerama.Valor("Nasceu em");
//    var propriedade1 = new Scirerama.Propriedade(valor4, rotulo1);
//    
//    inicio.adicionarFilho(sujeito);
//    sujeito.adicionarFilho(e);
//    e.adicionarFilho(propriedade);
//    e.adicionarFilho(propriedade1);
////    propriedade.adicionarFilho(sujeito2);
//    propriedade.posicionarFilhos();
//    
//    sujeito2.adicionarFilho(e);
//    sujeito.posicionarFilhos();
//    sujeito.desenhar();
//    console.log("sujeito\t width:"+ sujeito.getDesenho().getWidth()+ " height: "+sujeito.getDesenho().getHeight());
//    console.log("propriedade\t width:"+ propriedade.getDesenho().getWidth()+ " height: "+propriedade.getDesenho().getHeight());
////    
//    propriedade.setObjectSujeito(sujeito2);
//    sujeito.posicionarFilhos();
//    sujeito.redesenhar();
    
//    e.adicionarFilho(sujeito);
//    e.adicionarFilho(sujeito2);

//    e.adicionarFilho(filho1);
//    e.adicionarFilho(filho3);
//    e.adicionarFilho(filho2);

//    filho3.adicionarFilho(filho2);
//    propriedade.desenhar();
//    tipo.desenhar();
//    
//    sujeito.desenhar();
//    e.removerFilho(filho3);
//    propriedade.desenhar();
//    inicio.adicionarFilho(sujeito);
//    sujeito.adicionarFilho(e);
    
//    sujeito.desenhar();
//    sujeito.posicionarFilhos();
//    sujeito.desenhar();
//    
//    sujeito.adicionarFilho(propriedade);
//    sujeito.posicionarFilhos();
//    sujeito.desenhar();
    
//    e.posicionarFilhos();
//    inicio.posicionarFilhos();
//    e.desenhar();

//    e.deletar();
//    e.posicionarFilhos();
    
//    filho2.getDesenho().remove();

//    filho2.deletar();
//    e.posicionarFilhos();
    
//    alert("layer: "+e.getLayer().getChildren());
//    e.getLayer().draw();
//    e.desenhar();
//    e.getLayer().clear();
//    e.desenhar();
//    alert(e.getFilhos());
//    inicio.removerFilho(e);
//    e.deletar();
//    alert(e.getFilhos());
//    inicio.getLayer().draw();

    stage.draw();
};