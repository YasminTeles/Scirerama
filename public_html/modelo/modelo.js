
var mensagem = function(mensagem){
  $("#alerta").hide("slow");
  
  setTimeout(function() {
    $("#alerta").show("slow");
    $("#alerta").empty();
    $("#alerta").append("<p>"+mensagem+"</p>");
}, 1000);
  
};

var retirarMensagem = function(){
    $("#alerta").hide("slow");
};

var extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superClass = superClass.prototype;
    if(superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
};

var Scirerama = {};

/**
 *@class Raiz da consulta Scirerama.
 **/
Scirerama.Raiz = function(){
    this.className = "Raiz"; 
    this._filhos = [];
    this._mae = null;
    
    menu.iniciar(this);
    
//    this._desenho = new Kinetic.Circle({
//        radius: 20,
//        fill: 'gray',
//        stroke: 'black',
//        strokeWidth: 1
//    });
};
Scirerama.Raiz.prototype = {
    layer: new Kinetic.Layer(),
    getLayer: function(){
        return this.layer;
    },
    setMae: function(novaMae){
        this._mae = novaMae;
    },
    getMae: function(){
        return this._mae;
    },
    getDesenho: function(){
        return this._desenho;
    },
    setDesenho: function(desenho){
        this._desenho = desenho;
    },
    getFilhos: function(){
        return this._filhos;  
    },
    getFilhoIndice: function(indice){
        return this._filhos[indice];
    },
    auxiliar: function(pai){
        var alturaPai = 0;
        var alturaFilhos = 0;
        
        if(pai.getFilhos()){
            var distancia = 30;

            for(var i = 0; i < pai.getFilhos().length; i++){
                alturaFilhos += pai.getFilhoIndice(i).auxiliar(pai.getFilhoIndice(i)) + distancia;
            }
            alturaFilhos -= distancia; 
        }
        
        if(pai.getDesenho() !== null){
            alturaPai += pai.getDesenho().getHeight();
        }
      
        return alturaPai < alturaFilhos? alturaFilhos: alturaPai;
    },
    aux:function(){
        var altura = 0;
        var distancia = 30;
        
        if(this.getFilhos() !== null){
            for(var i = 0; i < this.getFilhos().length; i++){
                altura += this.getFilhoIndice(i).auxiliar(this.getFilhoIndice(i)) + distancia;
            }
            altura -= distancia;
        }
        
        return altura;
    },
    _posicionar: function(){
        if(this.getFilhos() !== null && this.getFilhos().length > 0 && this.getDesenho() !== null){
            var tamanhoTotal = this.aux();
            
            var distancia = 30;
            var i = 0;

            if(this.getFilhoIndice(i).className === "Propriedade"){
                distancia = 60;
            }
            
            var posX = this.getDesenho().getX() + (distancia * 5);
            var posY = this.getDesenho().getY() + 
                ((this.getFilhoIndice(i).auxiliar(this.getFilhoIndice(i)) - tamanhoTotal)/2);
        
            this.getFilhoIndice(i).getDesenho().setX(posX);
            this.getFilhoIndice(i).getDesenho().setY(posY);
            
            this._desenharLigacao(this.getFilhoIndice(i));

            var tamanhoNoAnterior = 0;
            var tamanhoNoAtual = 0;
            var distanciaY = 30;
            
            for(i++; i < this.getFilhos().length; i++){
                tamanhoNoAnterior = this.auxiliar(this.getFilhoIndice(i - 1));
                tamanhoNoAtual = this.auxiliar(this.getFilhoIndice(i));
                
                distancia = 30;
                
                if(this.getFilhoIndice(i).className === "Propriedade"){
                    distancia = 60;
                }

                posX = this.getDesenho().getX() + (distancia * 5);

                this.getFilhoIndice(i).getDesenho().setX(posX);
                this.getFilhoIndice(i).getDesenho().setY(distanciaY + 
                    (tamanhoNoAnterior/2) + (tamanhoNoAtual/2)
                    + this.getFilhoIndice(i - 1).getDesenho().getY());

                this._desenharLigacao(this.getFilhoIndice(i));
            }

            for(i = 0; i < this.getFilhos().length; i++){
                this.getFilhoIndice(i)._posicionar();
            }
        }
    },
    posicionarFilhos: function(){   
        this._removerLigacao();
        this._posicionar();
    },
    redesenhar:function(){
        this.getLayer().draw();
    },
    adicionarFilho: function(filho){
        if(this.getFilhos()){
            filho.setMae(this);
            this.getFilhos().push(filho);
//            filho.desenhar();
        }
    },
    removerFilho: function(filho){
        if(this.getFilhos().length > 0){
            var indice = this.getFilhos().indexOf(filho);
            this.getFilhos().splice(indice,1);
        }
    },
    deletar: function(){
        if(this.getFilhos() !== null && this.getFilhos().length > 0){
            //Remover todos os seus filhos:
            var copia = this.getFilhos().slice(0, this.getFilhos().length);
            for(var i = 0; i < copia.length; i++){
                copia[i].deletar();
            }
        }
        
        //Auto remoção:
        this.removerDesenho();
        this.getMae().removerFilho(this);
    },
    interpretar: function(){
        return this._consulta || "";//this.getFilhoIndice(0).interpretar() ||
    },
    desenhar: function(){
        if(this.getDesenho()){
            this.getLayer().add(this.getDesenho());
            this.getLayer().draw(); 
        }
        else throw new Error("Não foi possivel desenhar.");
    },
    removerDesenho: function(){
        this.getMae()._removerLigacao(this);
        this.getDesenho().destroy();
        this.getLayer().draw();
    },
    _removerLigacao: function(){
        var setas = this.getLayer().get(".seta");

        for(var i = 0; i < setas.length; i++){
                setas[i].destroy();
        }
    },
    _desenharLigacao: function(filho){
        var xInicial = this.getDesenho().getX() + this.getDesenho().getWidth();
        var yInicial = this.getDesenho().getY();
        var xFinal = filho.getDesenho().getX();
        var yFinal = filho.getDesenho().getY();
        
        var desloc = 30, auxseta = 4;
        
        var seta = new Kinetic.Line({
            points:[xInicial, yInicial, 
            xInicial + desloc, yInicial, 
            xInicial + desloc, yFinal,
            xFinal, yFinal, 
            xFinal - auxseta, yFinal - auxseta, 
            xFinal - auxseta, yFinal + auxseta, 
            xFinal, yFinal],
            stroke: 'black',
            strokeWidth: 1.5,
            lineCap: 'round',
            lineJoin: 'round',
            width: xFinal - xInicial,
            height: yFinal - yInicial,
            name: "seta"
        });
        
        this.getLayer().add(seta);
        this.getLayer().getStage().draw();
    }
};

/**
 *@class Representa o elemento E em Scirerama.
 *@param contexto em que o elemento é utilizado, ou seja, 
 *antes ou depois do elemento Sujeito.
 **/
Scirerama.E = function(contexto){
    Scirerama.E.superClass.constructor.call(this);
    var circ = new Kinetic.Circle({
        radius:20,
        fill:'#FEFF95',
        stroke:'black',
        strokeWidth:1,
        name: "circulo"
    });
    
    var texto = new Kinetic.Text({
        text: "e",
        fontSize: 20,
        fontFamily: 'Century Gothic',
        fill: 'black',
        align: 'center'
    });
    
    texto.setY(- texto.getHeight()/2);
    texto.setX(- texto.getWidth()/2);
   
    var grupo = new Kinetic.Group({
        x: 50,
        //draggable:true,
        y: this.layer.getStage().getHeight()/2,
        height: circ.getHeight() > texto.getHeight()? circ.getHeight(): texto.getHeight(),
        width: circ.getWidth() > texto.getWidth()? circ.getWidth() : texto.getWidth()
    });
    
    grupo.setOffset({
        x: -20
    });
      
    grupo.add(circ);
    grupo.add(texto);
    
    var that = this;
    
    grupo.on('click', function(evt) {
        menu.E(that);
      });
      
    this._desenho = grupo;
    
    if(contexto === "Tronco" || contexto === "Ramo"){
        this._contexto = contexto;
        this.className = "E" + contexto;
    }
    else throw new Error("Contexto desconhecido.");
    mensagem("Incluir pelo menos dois filhos para validar a consulta.");
};
extend(Scirerama.E,Scirerama.Raiz);
Scirerama.E.prototype.adicionarFilho = function(filho){
    if(this._contexto === "Tronco"){
        if(filho.className === "OUTronco" || filho.className === "Sujeito"){
            Scirerama.E.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
    }
    else if(this._contexto === "Ramo"){
        if(filho.className === "OURamo" || filho.className === "Propriedade"){
            Scirerama.E.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
    }
    else throw new Error("Inclusão de filho não realizada.");
    
    if(this.getFilhos().length < 2){
        mensagem("Número de filhos insuficiente.");
    }
    else{
        retirarMensagem();
    }
};
Scirerama.E.prototype.interpretar = function(){
    var resp = "";
    for(var i = 0; i < this.getFilhos().length; i++){
        resp += this._filhos[i].interpretar();
    }
    return resp;
};
Scirerama.E.prototype.desenhar = function(){
    if(this.getFilhos()){
        if(this._contexto === "Tronco"){
            for(var i = 0; i < this.getFilhos().length; i++){
                this._desenharLigacao(this._filhos[i]);
                this._filhos[i].redesenhar();
            }
        }
        if(this._contexto === "Ramo"){
            for(var j = 0; j < this.getFilhos().length; j++){
                if(this._filhos[j].className === "OURamo"){
                    this._desenharLigacao(this._filhos[j]);
                } 
                this._filhos[j].redesenhar();
            }
        }
    }
    Scirerama.E.superClass.desenhar.call(this);
};

/**
 *@class Representa o elemento OU em Scirerama.
 *@param contexto em que o elemento é utilizado, ou seja, 
 *antes ou depois do elemento Sujeito.
 **/
Scirerama.OU = function(contexto){
    Scirerama.OU.superClass.constructor.call(this);
    
    var circ = new Kinetic.Circle({
        radius: 20,
        fill:'#FFCEFF',
        stroke:'black',
        strokeWidth:1
    });
    
    var texto = new Kinetic.Text({
        text: "ou",
        fontSize: 20,
        fontFamily: 'Century Gothic',
        fill: 'black',
        align: 'center'
    });
    
    texto.setY(- texto.getHeight()/2);
    texto.setX(- texto.getWidth()/2);
    
    var grupo = new Kinetic.Group({
        x: 50,
        y: this.layer.getStage().getHeight()/2,
        height: circ.getHeight() > texto.getHeight()? circ.getHeight(): texto.getHeight(),
        width: circ.getWidth() > texto.getWidth()? circ.getWidth() : texto.getWidth()
    });
    
    grupo.setOffset({
        x: -20
    });
    
    var that = this;
    
    grupo.on('click', function(evt) {
        menu.OU(that);
    });
      
    grupo.add(circ);
    grupo.add(texto);
    
    this._desenho = grupo;
    
    if(contexto === "Tronco" || contexto === "Ramo"){
        this._contexto = contexto;
        this.className = "OU" + contexto;
    }
    else throw new Error("Contexto desconhecido.");
    mensagem("Incluir pelo menos dois filhos para validar a consulta.");
};
extend(Scirerama.OU,Scirerama.Raiz);
Scirerama.OU.prototype.adicionarFilho = function(filho){
    if(this._contexto === "Tronco"){
        if(filho.className === "ETronco" || filho.className === "Sujeito"){
            Scirerama.OU.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
    }
    else if(this._contexto === "Ramo"){
        if(filho.className === "ERamo" || filho.className === "Propriedade"){
            Scirerama.OU.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
    }
    else throw new Error("Inclusão de filho não realizada.");
    
    //Exibe mensagem de alerta:
    if(this.getFilhos().length < 2){
        mensagem("Número de filhos insuficiente.");
    }
    else{
        retirarMensagem();
    }
};
Scirerama.OU.prototype.interpretar = function(){
    var resp = "<q>";
    for(var i = 0; i < (this.getFilhos().length - 1); i++){
        resp += this._filhos[i].interpretar();
        resp += "OR";
    }
    resp += this._filhos[i].interpretar();
    resp += "</q>";
    return resp;
};
Scirerama.OU.prototype.desenhar = function(){
    if(this.getFilhos()){
        if(this._contexto === "Tronco"){
            for(var i = 0; i < this.getFilhos().length; i++){
                this._desenharLigacao(this._filhos[i]);
                this._filhos[i].redesenhar();
            }
        }
        if(this._contexto === "Ramo"){
            for(var j = 0; j < this.getFilhos().length; j++){
                if(this._filhos[j].className === "OURamo"){
                    this._desenharLigacao(this._filhos[j]);
                } 
                this._filhos[j].redesenhar();
            }
        }
    }
    Scirerama.OU.superClass.desenhar.call(this);
};

/**@class Representa o elemento Sujeito em Scirerama.
 *@param tipo 
 *@param rotulo
 **/
Scirerama.Sujeito = function(tipo, rotulo){
    Scirerama.Sujeito.superClass.constructor.call(this);
    this.className = "Sujeito";
    this._tipo = tipo;
    this._rotulo = rotulo;
    
    var grupo = new Kinetic.Group({
        x: 50,
        y: this.layer.getStage().getHeight()/2,
        name: 'objetc',
        height: rotulo.getDesenho().getHeight() + tipo.getDesenho().getHeight(),
        width: rotulo.getDesenho().getWidth() > tipo.getDesenho().getWidth()? rotulo.getDesenho().getWidth() : tipo.getDesenho().getWidth()
    });
    
    rotulo.getDesenho().setX((tipo.getDesenho().getWidth() - rotulo.getDesenho().getWidth())/2);
    rotulo.getDesenho().setY(tipo.getDesenho().getHeight() + 5);

    grupo.setOffset({
        y: (rotulo.getDesenho().getHeight() + 
            tipo.getDesenho().getHeight() + 5)/2
    });
  
    grupo.add(rotulo.getDesenho());
    grupo.add(tipo.getDesenho());
    
    var that = this;
    grupo.on("click", function(){
        menu.sujeito(that);
    });
    
    this._desenho = grupo;
    
};
extend(Scirerama.Sujeito,Scirerama.Raiz);
Scirerama.Sujeito.prototype.adicionarFilho = function(filho){
    if(this.getFilhos().length === 0){
        if(filho.className === "ERamo" || filho.className === "OURamo"){
            Scirerama.Sujeito.superClass.adicionarFilho.call(this,filho);
        }
        else if(filho.className === "Propriedade"){
            Scirerama.Sujeito.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
    }
    else if(this.getFilhos().length > 0){
        var temERamo = false;
        var temOURamo = false;
        var temPropriedade = false;
        var propriedade = null;
        
        for(var i = 0; i < this.getFilhos().length; i++){
            if(this.getFilhoIndice(i).className === "ERamo"){
                temERamo = true;
            }
            else if(this.getFilhoIndice(i).className === "OURamo"){
                temOURamo = true;
            }
            else if(this.getFilhoIndice(i).className === "Propriedade"){
                temPropriedade = true;
                propriedade = this.getFilhoIndice(i);
            }
        }
        
        if(!temERamo && filho.className === "ERamo"){
            Scirerama.Sujeito.superClass.adicionarFilho.call(this,filho);
        }
        else if(!temOURamo && filho.className === "OURamo"){
            Scirerama.Sujeito.superClass.adicionarFilho.call(this,filho);
        }
        else throw new Error("Inclusão de filho não permitida.");
        
        if(temPropriedade){
            this.removerFilho(propriedade);
            filho.adicionarFilho(propriedade);
        }
    }
};
Scirerama.Sujeito.prototype.interpretar = function(){
    var resp = "";
    if(this._rotulo.isANY() && this._tipo.especificacao === "category" && this.getFilhos().length > 0){
        resp += "";
    }
    else if(this._tipo.especificacao === "page"){
        resp += "[[" + this._rotulo.interpretar().replace(/,/g,'||') + "]]";
    }
    else{
        resp += "[[" + this._tipo.interpretar() + ":" + this._rotulo.interpretar() + "]]";
    }
    
    for(var i = 0; i < this.getFilhos().length; i++){
        resp += this.getFilhoIndice(i).interpretar();
    }    
    return resp;
};
Scirerama.Sujeito.prototype.desenhar = function(){
    for(var i = 0; i < this.getFilhos().length; i++){
        if(this.getFilhoIndice(i).className !== "Propriedade"){
            this._desenharLigacao(this.getFilhoIndice(i));
        }

        this.getFilhoIndice(i).desenhar();
    }
    
    Scirerama.Sujeito.superClass.desenhar.call(this);
};
Scirerama.Sujeito.prototype.setTipo = function(tipo){
    this._tipo.aleterarTipo(tipo);
};
Scirerama.Sujeito.prototype.setRotulo = function(rotulo){
    this._rotulo.alterarRotulo(rotulo);
};

/**@class Representa o elemento Propriedade em Scirerama.
 *@param valor 
 *@param object
 **/
Scirerama.Propriedade = function(valor, object){
    Scirerama.Propriedade.superClass.constructor.call(this);
    this.className = "Propriedade";
    this._valor = valor;
    this._filhos = null;
    
    if(object.className === "Rotulo" || object.className === "Sujeito"){
        this._object = object;
    }
    else throw new Error("Object não permitido.");
    
    var desloc = 50, auxseta = 4, distancia = 15;
    
    if(this._object.className === "Sujeito"){
        distancia += 10;
    }
    
    this._valor.getDesenho().setX(this._object.getDesenho().getX()
        - this._valor.getDesenho().getWidth() - (desloc/2));
    this._valor.getDesenho().setY(this._object.getDesenho().getY() - distancia);
    
    var that = this;
    if(this._object.className === "Rotulo"){
        this._object.getDesenho().setY(0);
        this._object.getDesenho().setX(0);
    
        var grupo = new Kinetic.Group({
            x: 400,
            y: 150,
            height: this._object.getDesenho().getHeight(),
            width: (auxseta * 3) + this._object.getDesenho().getWidth() 
                + this._valor.getDesenho().getWidth()
        });
    
        grupo.setOffset({
            y: this._object.getDesenho().getHeight()/2
        });
        
        grupo.add(this._valor.getDesenho());
        grupo.add(this._object.getDesenho());
        
        grupo.on("click", function(){
            menu.propriedade(that);
        });
        
        this._desenho = grupo;
    }
    if(this._object.className === "Sujeito"){
        this.adicionarFilho(this._object);
        this._valor.getDesenho().on("click", function(){
           menu.propriedade(that); 
        });    
        
        this._desenho = this._object.getDesenho();
    }
};
extend(Scirerama.Propriedade,Scirerama.Raiz);
Scirerama.Propriedade.prototype.interpretar = function(){
    var resp = "[[" + this._valor.interpretar() + "::";
    
    if(this._object.className === "Rotulo"){
        resp += this._object.interpretar();
    }
    if(this._object.className === "Sujeito"){
        resp += "<q>" + this._object.interpretar() + "</q>";
    }
    
    resp += "]]";
    
    return resp;
};  
Scirerama.Propriedade.prototype.desenhar = function(){
    if(this._object.className === "Rotulo"){
        Scirerama.Propriedade.superClass.desenhar.call(this);
    }
    if(this._object.className === "Sujeito"){
        var desloc = 50;
        
        this._valor.getDesenho().setX(this._object.getDesenho().getX()
        - this._valor.getDesenho().getWidth() - (desloc/2));
        this._valor.getDesenho().setY(this._object.getDesenho().getY() - 25);
       
        this._valor.desenhar();
        this._object.desenhar(); 
    }
};
Scirerama.Propriedade.prototype.setObjectRotulo = function(texto){
    if(this._object.className === "Rotulo"){
        this._object.alterarRotulo(texto);
    }
};
Scirerama.Propriedade.prototype.setObjectSujeito = function(sujeito){
    if(sujeito.className === "Sujeito"){
        var posX = this.getDesenho().getX();
        var posY = this.getDesenho().getY();
        
        this._object.getDesenho().destroy();
        this._object = sujeito;

        var desloc = 50;

        this._object.getDesenho().setY(posY);
        this._object.getDesenho().setX(posX);

        this._valor.getDesenho().setX(this._object.getDesenho().getX()
            - this._valor.getDesenho().getWidth() - (desloc/2));
        this._valor.getDesenho().setY(this._object.getDesenho().getY() - 25);
        
        var that = this;
        this._valor.getDesenho().on("click", function(){
           menu.propriedade(that); 
        });    
        
        this._desenho = this._object.getDesenho();
    }
};
Scirerama.Propriedade.prototype.setValor = function(texto){
    this._valor.alterarValor(texto);
};
Scirerama.Propriedade.prototype._posicionar = function(){
    Scirerama.Propriedade.superClass._posicionar.call(this);
    
    if(this._object.className === "Sujeito"){
        this._object._posicionar();
        this.redesenhar();
    }
};

/**
 *@class Representa o elemento valor em Scireram.
 *@param texto
 **/
Scirerama.Valor = function(texto){
    Scirerama.Valor.superClass.constructor.call(this);
    this.className = "Valor";
    this._filhos = null;
    
    if(texto === "ANY" || texto === "+"){
        throw new Error("Uso de palavra reservada.");
    } else{
        this._consulta = texto;
    }
    
    var valor = new Kinetic.Text({
        text: this._consulta,
        fontSize: 15,
        fontFamily: 'Century Gothic',
        fill: 'black',
        name: 'valor'
    });
    
    this._desenho = valor;
};
extend(Scirerama.Valor,Scirerama.Raiz);
Scirerama.Valor.prototype.alterarValor = function(texto){
    if(texto === "ANY" || texto === "+"){
        throw new Error("Uso de palavra reservada.");
    } else{
        this._consulta = texto;
    }
    this.getDesenho().setText(texto);
};

/**
 *@class Representa o elemento rotulo em Scirerama.
 *@param texto
 **/
Scirerama.Rotulo = function(texto){
    Scirerama.Rotulo.superClass.constructor.call(this);
    this.className = "Rotulo";
    this._filhos = null;
    
    if(texto === "ANY"){
        this._any = true;
        this._consulta = "%2B";
    }
    else{
        this._consulta = texto;
        this._any = false;
    }
    
    var rotulo = new Kinetic.Text({
        text: " " + texto,
        fontSize: 15,
        fontFamily: 'Century Gothic',
        fill: 'black',
        name: 'objetc'
    });
    
    this._desenho = rotulo;
};
extend(Scirerama.Rotulo,Scirerama.Raiz);
Scirerama.Rotulo.prototype.alterarRotulo = function(texto){
    if(texto === "ANY"){
        this._any = true;
        this._consulta = "%2B";
    }
    else{
        this._consulta = texto;
        this._any = false;
    }
    this.getDesenho().setText(" " + texto);
    
};
Scirerama.Rotulo.prototype.isANY = function(){
    return this._any;
}; 

/**
 *@class Representa o elemento tipo em Scirerama.
 *@param tipo
 **/
Scirerama.Tipo = function(tipo){
    Scirerama.Tipo.superClass.constructor.call(this);
    this.className = "Tipo";
    this._filhos = null;
    
    var aux = tipo;
    tipo = tipo.toLowerCase();
    
    if(tipo === "category" || tipo === "user" || tipo === "help"){
        this._consulta = aux;
    }
    else if(tipo === "page"){
        this._consulta = "";
    }
    else throw new Error("Tipo desconhecido.");
    
    this.especificacao = tipo.toLowerCase();
    
    var that = this;
    var images = new Image();
    images.onload = function(){
        that._desenho = new Kinetic.Image({
            image: images,
            x: 0,
            y: 0,
            width: 40,
            height: 40
        });
    };
    
    if(this.especificacao === "category"){
        images.src = "imagens/folder.png"; 
    }
    else if(this.especificacao === "page"){
        images.src = "imagens/pages.png";
    }
    else if(this.especificacao === "user"){
        images.src = "imagens/user.png";
    }
    else if(this.especificacao === "help"){
        images.src = "imagens/help.png";
    }
    else throw new Error("Desenho não pode ser carregado.");
    
    alert("Carregando imagem...");

};
extend(Scirerama.Tipo,Scirerama.Raiz);
Scirerama.Tipo.prototype.aleterarTipo = function(especificacao){
    especificacao = especificacao.toLowerCase();
    
    if(especificacao === "category"){
        this.getDesenho().getImage().src = "imagens/folder.png"; 
        this._consulta = "Category";
    }
    else if(especificacao === "page"){
        this.getDesenho().getImage().src = "imagens/pages.png";
        this._consulta = "";
    }
    else if(especificacao === "user"){
        this.getDesenho().getImage().src = "imagens/user.png";
        this._consulta = "user";
    }
    else if(especificacao === "help"){
        this.getDesenho().getImage().src = "imagens/help.png";
        this._consulta = "help";
    }
    else throw new Error("Desenho não pode ser carregado.");
    
    this.especificacao = especificacao;
    
    alert("Carregando imagem...");
};