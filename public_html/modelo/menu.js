/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var menu ={
    contexto: "Tronco",
    _raiz: null,
    _inicio: null,
    setRaiz: function(novaRaiz){
        this._raiz = novaRaiz;
    },
    getRaiz: function(){
        return this._raiz;
    },
    _adicionarOU: function(pai){
        var filho = new Scirerama.OU(menu.contexto);
        pai.adicionarFilho(filho);
        filho.desenhar();
        
        if(pai.className !== "Raiz"){
            this.getRaiz().posicionarFilhos();
            pai.redesenhar();
            
            if(pai.className === "ETronco" || pai.className === "ERamo"){
                menu.E(pai);
            }
            if(pai.className === "Sujeito"){
                menu.sujeito(pai);
            }
        }
        else{
            filho.redesenhar();
            menu.setRaiz(filho);
            menu.OU(filho);
        }   
    },
    
    _adicionarE: function(pai){
        var filho = new Scirerama.E(this.contexto);
        try{
            pai.adicionarFilho(filho);
            filho.desenhar();
        }
        catch(err){
            console.log("erro:"+err);
            alert(err);
        }
        
        if(pai.className !== "Raiz"){
            this.getRaiz().posicionarFilhos();
            pai.redesenhar();
            
            if(pai.className === "OUTronco" || pai.className === "OURamo"){
                menu.OU(pai);
            }
            if(pai.className === "Sujeito"){
                menu.sujeito(pai);
            }
        }
        else{
            filho.redesenhar();
            menu.setRaiz(filho);
            menu.E(filho);
        }
    },
    _adicionarSujeito: function(pai){
        var tipo = new Scirerama.Tipo("Category");
        var valor = new Scirerama.Rotulo("ANY");
        var filho = new Scirerama.Sujeito(tipo, valor);
        pai.adicionarFilho(filho);
        filho.desenhar();
        
        if(pai.className !== "Raiz"){
            this.getRaiz().posicionarFilhos();
            pai.redesenhar();
            
            if(pai.className === "OUTronco" || pai.className === "OURamo"){
                menu.OU(pai);
            }
            if(pai.className === "ETronco" || pai.className === "ERamo"){
                menu.E(pai);
            }
            if(pai.className === "Propriedade"){
                menu.Propriedade(pai);
            }
        }
        else{
            filho.redesenhar();
            menu.setRaiz(filho);
            menu.sujeito(filho);
        }
    },
    _adicionarPropriedade: function(pai){
        if(pai.className !== "Raiz"){
            var valor = new Scirerama.Valor("Propriedade");
            var rotulo = new Scirerama.Rotulo("ANY");
            var filho = new Scirerama.Propriedade(valor, rotulo);
            
            pai.adicionarFilho(filho);
            filho.desenhar();
            this.getRaiz().posicionarFilhos();
            pai.redesenhar();

            if(pai.className === "OURamo"){
                menu.OU(pai);
            }
            if(pai.className === "ERamo"){
                menu.E(pai);
            }
            if(pai.className === "Sujeito"){
                menu.sujeito(pai);
            }
        }
    },
    _remover:function(pai){
        if(pai === this.getRaiz()){
            menu.iniciar(pai.getMae());
            this.contexto = "Tronco";
        }
        else{
            var m = pai.getMae().className;
            var aux = m.split(/Ramo|Tronco/);
            if(aux[0] === "Sujeito"){ 
                aux[0] = aux[0].toLowerCase();
            }
            menu[aux[0]](pai.getMae());
        }
        pai.deletar();
        this.getRaiz().posicionarFilhos();
    },
    _alterarObjectSujeito: function(elemento){
        var tipo = new Scirerama.Tipo("Category");
        var rotulo = new Scirerama.Rotulo("ANY");
        var sujeito = new Scirerama.Sujeito(tipo, rotulo);
        
        elemento.setObjectSujeito(sujeito);
        this.getRaiz().posicionarFilhos();
        elemento.desenhar();
        menu.propriedade(elemento);
    },
    _alterarObjectRotulo: function(elemento, texto){
        elemento.setObjectRotulo(texto);
        this.getRaiz().posicionarFilhos();
        elemento.redesenhar();
    },
    _alterarPropriedade: function(elemento, texto){
        elemento.setValor(texto);
        this.getRaiz().posicionarFilhos();
        elemento.redesenhar();
    },
    _alterarRotulo: function(elemento, texto){
        elemento.setRotulo(texto);
        this.getRaiz().posicionarFilhos();
        elemento.redesenhar();
    },
    _alterarSujeito: function(elemento, texto){
        elemento.setTipo(texto);
        this.getRaiz().posicionarFilhos();
        elemento.redesenhar();
    },
    iniciar: function(elemento){
        this._inicio = elemento;
        
        //Limpar menu:
        $("#menu").empty();
        
        //Cabeçalho:
        $("#menu").append("<h3>Iniciar Diagrama</h3>");
        
        //Adicionar novos elementos do diagrama:
        $("#menu").append("<h5>Adicionar elementos:</h5>");
         
         $("#menu").append("<img id='botaoAdicionarSujeito' src='imagens/folder.png'/>");
         $("#menu").append("<img id='botaoAdicionarOU' src='imagens/or.png'/>");
         $("#menu").append("<img id='botaoAdicionarE' src='imagens/and.png'/>");
         
         //Ajusta tamanho das imagens:
         $("#menu img").height("50");
         $("#menu img").width("50");
         $("#menu img").css("margin","10px");
         
        //Configurando botão Adicionar OU:
        $("#botaoAdicionarOU").click(function(){
            menu._adicionarOU(elemento);
        });
        
        //Configurando botão Adicionar E:
        $("#botaoAdicionarE").click(function(){
            menu._adicionarE(elemento);
        });
        
        //Configurando botão Adicionar Sujeito:
        $("#botaoAdicionarSujeito").click(function(){
            menu._adicionarSujeito(elemento);
        });
        
},
    E: function(elemento){
        //Limpar menu:
        $("#menu").empty();
        
        //Cabeçalho:
        $("#menu").append("<h3>Elemento E</h3>");
        
        //Adicionar novos elementos do diagrama:
        $("#menu").append("<h5>Adicionar elementos:</h5>");
        
        if(elemento.className === "ETronco"){
            $("#menu").append("<img id='botaoAdicionarSujeito' src='imagens/folder.png'/>");
            this.contexto = "Tronco";
        }
        
        if(elemento.className === "ERamo"){
            $("#menu").append("<img id='botaoAdicionarPropriedade' src='imagens/propriedade.png'/>");
            this.contexto = "Ramo";
        }
        
        $("#menu").append("<img id='botaoAdicionarOU' src='imagens/or.png'/>");
        
        //Remover elemento E:
        $("#menu").append("<img id='botaoRemover' src='imagens/lixeira.png'/>");
        
         //Ajusta tamanho das imagens:
         $("#menu img").height("50");
         $("#menu img").width("50");
         $("#menu img").css("margin","10px");
         
        //Configurando botão Adicionar OU:
        $("#botaoAdicionarOU").click(function(){
            menu._adicionarOU(elemento);
        });
        
        //Configurando botão Adicionar Sujeito:
        if(elemento.className === "ETronco"){
            $("#botaoAdicionarSujeito").click(function(){
                menu._adicionarSujeito(elemento);
            });
        }
        
        //Configurando botão Adicionar Propriedade:
        if(elemento.className === "ERamo"){
            $("#botaoAdicionarPropriedade").click(function(){
                menu._adicionarPropriedade(elemento);
            });
        }
        
//        Configurando botão remover:
        $("#botaoRemover").click(function(){
            menu._remover(elemento);
        });
    },
    OU: function(elemento){
        //Limpar menu:
        $("#menu").empty();
        
        //Cabeçalho:
        $("#menu").append("<h3>Elemento OU</h3>");
        
        //Adicionar novos elementos do diagrama:
        $("#menu").append("<h5>Adicionar elementos:</h5>");
        
        if(elemento.className === "OUTronco"){
            $("#menu").append("<img id='botaoAdicionarSujeito' src='imagens/folder.png'/>");
            this.contexto = "Tronco";
        }
        
        if(elemento.className === "OURamo"){
            $("#menu").append("<img id='botaoAdicionarPropriedade' src='imagens/propriedade.png'/>");
            this.contexto = "Ramo";
        }
        
        $("#menu").append("<img id='botaoAdicionarE' src='imagens/And.png'/>");
        
        //Remover elemento OU:
        $("#menu").append("<img id='botaoRemover' src='imagens/lixeira.png'/>");
        
         //Ajusta tamanho das imagens:
         $("#menu img").height("50");
         $("#menu img").width("50");
         $("#menu img").css("margin","10px");
         
        //Configurando botão Adicionar Sujeito:
        if(elemento.className === "OUTronco"){
            $("#botaoAdicionarSujeito").click(function(){
                menu._adicionarSujeito(elemento);
            });
        }
        
        //Configurando botão Adicionar Propriedade:
        if(elemento.className === "OURamo"){
            $("#botaoAdicionarPropriedade").click(function(){
                menu._adicionarPropriedade(elemento);
            });
        }
        
         //Configurando botão Adicionar E:
        $("#botaoAdicionarE").click(function(){
            menu._adicionarE(elemento);
        });
        
        //Configurando botão remover:
        $("#botaoRemover").click(function(){
            menu._remover(elemento);
        });
        
    },
    sujeito: function(elemento){
        //Limpar menu:
        $("#menu").empty();
        
        //Cabeçalho:
        $("#menu").append("<h3>Elemento Sujeito</h3>");
        
        //Editar rótulo do elemento sujeito:
        $("#menu").append("<h5>Editar rótulo:</h5>");
        $("#menu").append("<input type='text' id='editarRotulo' value='' autofocus/>  ");
        $("#menu").append("<img src='imagens/ok.png'/>");
        
        //Editar tipo do elemento sujeito:
        $("#menu").append("<h5>Editar tipo:</h5>");
        $("#menu").append("<img id='botaoAlterarParaCategory' src='imagens/folder.png'/>");
        $("#menu").append("<img id='botaoAlterarParaHelp' src='imagens/help.png'/>");
        $("#menu").append("<img id='botaoAlterarParaPages' src='imagens/pages.png'/>");
        $("#menu").append("<img id='botaoAlterarParaUser' src='imagens/user.png'/>");
        
        //Adicionar novos elementos no diagrama:
        $("#menu").append("<h5>Adicionar elementos:</h5>");
        $("#menu").append("<img id='botaoAdicionarE' src='imagens/and.png'/>");
        $("#menu").append("<img id='botaoAdicionarOU' src='imagens/or.png'/>");
        $("#menu").append("<img id='botaoAdicionarPropriedade' src='imagens/propriedade.png'/>");
        
        $("#menu").append("<br><br>");
        
        //Remover elemento sujeito
        $("#menu").append("<img id='botaoRemover' src='imagens/lixeira.png'/>");
        
        //Ajusta tamanho das imagens:
         $("#menu img").height("50");
         $("#menu img").width("50");
         $("#menu img").css("margin","10px");
         
        //Configurando botão Alterar Para Category:
        $("#botaoAlterarParaCategory").click(function(){
            menu._alterarSujeito(elemento,"Category");
        });
        
        //Configurando botão Alterar Para Help:
        $("#botaoAlterarParaHelp").click(function(){
            menu._alterarSujeito(elemento,"Help");
        });
        
        //Configurando botão Alterar Para Pages:
        $("#botaoAlterarParaPages").click(function(){
            menu._alterarSujeito(elemento,"Page");
        });
        
        //Configurando botão Alterar Para User:
        $("#botaoAlterarParaUser").click(function(){
            menu._alterarSujeito(elemento,"User");
        });
        
        //Configurando rótulo:
        $("#editarRotulo").change(function(){
            var texto = document.getElementById("editarRotulo").value;
            menu._alterarRotulo(elemento, texto);
        });
        
        //Alterar contexto:
        this.contexto = "Ramo";
        
        //Configurando botão Adicionar Propriedade:
        $("#botaoAdicionarPropriedade").click(function(){
            menu._adicionarPropriedade(elemento);
        });
        
        //Configurando botão Adicionar E:
        $("#botaoAdicionarE").click(function(){
            menu._adicionarE(elemento);
        });
        
        //Configurando botão Adicionar OU:
        $("#botaoAdicionarOU").click(function(){
            menu._adicionarOU(elemento);
        });
        
        //Configurando botão remover:
        $("#botaoRemover").click(function(){
            menu._remover(elemento);
        });
    },
    propriedade: function(elemento){
        //Limpar menu:
        $("#menu").empty();
        
        //Cabeçalho:
        $("#menu").append("<h3>Elemento Sujeito</h3>");
        
        //Editar propriedade:
        $("#menu").append("<h5>Editar Propriedade:</h5>");
        $("#menu").append("<input type='text' id='editarPropriedade' value='' autofocus/>  ");
        $("#menu").append("<img src='imagens/ok.png'/>");
        
        //Editar tipo
        $("#menu").append("<h5>Editar Valor:</h5>");
        $("#menu").append("<input type='radio' id='alterarParaValor' name='editarValor' value='op1'/>");
        $("#menu").append("<label><input type='text' id='textoValor' value=''/></label>");
        
        $("#menu").append("<br>");
        
        $("#menu").append("<input type='radio' id='alterarParaSujeito' name='editarValor' value='op2'/>");
        $("#menu").append("<label><<img id='imagemSujeito' src='imagens/folder.png'/></label>");

        $("#menu").append("<br><br>");
        
        //Remover elemento sujeito
        $("#menu").append("<img id='botaoRemover' src='imagens/lixeira.png'/>");
        
        //Ajusta tamanho das imagens:
         $("#menu img").height("50");
         $("#menu img").width("50");
         $("#menu img").css("margin","10px");
         
        //Configurando propriedade:
        $("#editarPropriedade").change(function(){
           var propriedade = document.getElementById("editarPropriedade").value;
           menu._alterarPropriedade(elemento, propriedade);
        });
        
         //Configurando botão radio alterar para Valor:
        $("#textoValor").focus(function(){
            document.getElementById("alterarParaValor").checked = true;
        });
        
        //Configurando botão radio alterar para Valor:
        $("#textoValor").change(function(){
            var texto = document.getElementById("textoValor").value;
            if(texto.length > 0){
                menu._alterarObjectRotulo(elemento, texto);
            }
        });
        
        //Configurando botão radio alterar para Sujeito:
        $("#alterarParaSujeito").change(function(){
            menu._alterarObjectSujeito(elemento);
        });
        
        //Configurando botão radio alterar para Sujeito:
        $("#imagemSujeito").click(function(){
            document.getElementById("alterarParaSujeito").checked = true;
            menu._alterarObjectSujeito(elemento);
        });
        
        //Configurando botão remover:
        $("#botaoRemover").click(function(){
            menu._remover(elemento);
        });
    }   
};

var pesquisar = function(){
     var filtro = $("#filtro").val();
     filtro = '|?' + filtro.replace(/,/g,"|?");
     var consultaSMW = menu.getRaiz().interpretar();
     consultaSMW = consultaSMW + filtro;
     console.log(consultaSMW);
     enviarConsulta(consultaSMW);
};
var converteTipo = function(tipo){
    
};

var apresentarConsulta = function(data){
      $("#tabela").children().remove();
      console.log(data);
      var tabela = "";//"<table id='tabela' border=1 style='margin:auto;color:black;background:white;'>";
      if(data.query !== null){
          var resp;
          var tipo;
          var tmp;
          var titulo;
          
          tabela += "<thead><tr><th></th>";
          for(titulo in data.query.printrequests){
            if(data.query.printrequests.hasOwnProperty(titulo)){
                if(data.query.printrequests[titulo].label !== ''){
                tabela += "<th>" + data.query.printrequests[titulo].label + "</th>";
                console.log(data.query.printrequests[titulo]);
                }
            }
          }
          tabela += "</thead></tr><tbody>";
          
          for(resp in data.query.results){
              if(data.query.results.hasOwnProperty(resp)){
                  tabela += "<tr><td><a href='" 
                          + data.query.results[resp].fullurl + "'>" + 
                          data.query.results[resp].fulltext + "</a></td>";
                  
                  var filtro;
                  for(filtro in data.query.results[resp].printouts){
                      var lista;
                      
                      if(data.query.results[resp].printouts.hasOwnProperty(filtro)){
                          for(var i = 0; i < data.query.printrequests.length; i++){
                              if(data.query.printrequests[i].label === filtro){
                                  tipo = data.query.printrequests[i].typeid;
                                  titulo = data.query.printrequests[i].label;
                              }
                          }
                          
                          tabela += "<td>";
                          tmp = "";
                          
                          if(tipo === "_num"){
                              lista = data.query.results[resp].printouts[filtro];
                              if(lista){
                                  for(var i = 0; i < lista.length; i++){
                                      tmp += lista[i];
                                  } 
                              }
                          }
                          else if(tipo === "_dat"){
//                              var date = new Date(data.query.results[resp].printouts[filtro][0]);
//                              tmp = date;
                          }
                          else if(tipo === "_str"){
                              
                          }
                          else if(tipo === "_wpg"){
                              lista = data.query.results[resp].printouts[filtro];
                              if(lista){
                                  for(var i = 0; i < lista.length; i++){
                                    tmp = "<a href='"+lista[i].fullurl+"'>";
                                    tmp += lista[i].fulltext;
                                    tmp += "</a>";
                                  }
                              }
                          }
                          tabela += tmp + "</td>";
                      }
                  }   
                  tabela += "</tr></tbody>";//"</tabela>";
//                  $("#resposta").append("</tr></table>");
              }
          }
//          $("#resposta").append(tabela);
          $("#tabela").append(tabela);
          //$("#tabela").dataTable();
      }
      else{
          $("#resposta").append("<p>Consulta inválida.</p>");
      }
};

var enviarConsulta = function(consultaSMW){
    var scriptTag = document.createElement('SCRIPT');
//    http://sandbox.semantic-mediawiki.org/api.php?action=ask&query=[[category:%2B]]&format=json
    scriptTag.src = "http://sandbox.semantic-mediawiki.org/api.php?action=ask&query="+consultaSMW+"&format=json&callback=apresentarConsulta";
    document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
};


