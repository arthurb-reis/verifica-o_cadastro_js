//Site: https://arthurb-reis.github.io/verifica-o_cadastro_js/ 

//OBS: Analisando os requisitos, é possível perceber que algumas senhas não se encaixam nem em fracas, nem em médias
    //nem em fortes. Assim, eu considerei que essas, mesmo que não se encaixem, seriam consideradas fracas, por default.

//criando os objetos dos elementos de texto do formulário

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var senhaResult = document.querySelector("#inputResult");
var meter = document.querySelector("#passStrengthMeter");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}
);

email.addEventListener('focusout', validarEmail);

function validarEmail(e) {
    const regExEmail = /.+@.+\.(br|net|org|com)/;

    if(e.target.value.trim().match(regExEmail) == null){
        emailHelp.textContent = 'Email inválido';
        emailHelp.style.color = "red";
    } else {
        console.log("Email válido!")
        emailHelp.textContent = '';
    }
}

senha.addEventListener('focusout', validarSenha);

function validarSenha(e) {
    console.log(ano.value);
    if(((e.target.value.search(/[@#%&!+]/) !== -1) || (e.target.value.search(/[A-Z]/) !== -1) || (e.target.value.search(/[0-9]/) !== -1)) &&
        (e.target.value.length >= 6 && e.target.value.length <= 20) && (ano.value === '' || (!e.target.value.includes(ano.value))) && (nome.value === '' || (!e.target.value.includes(nome.value)))){
        if(e.target.value.length > 12 && e.target.value.match(/[@#%&!+]/g).length > 1 && e.target.value.match(/[A-Z]/g).length > 1 && e.target.value.match(/[0-9]/g).length > 1){
            senhaHelp.textContent = 'Senha forte';
            meter.value = "30";
        } else if(e.target.value.length > 8 && e.target.value.search(/[@#%&!+]/) !== -1 && e.target.value.search(/[A-Z]/) !== -1 && e.target.value.search(/[0-9]/) !== -1){
            senhaHelp.textContent = 'Senha moderada';
            meter.value = "20";
        } else if(e.target.value.length < 8 && e.target.value.search(/[@#%&!+]/) !== -1 && e.target.value.search(/[0-9]/) !== -1){
            senhaHelp.textContent = 'Senha fraca';
            meter.value = "10";
        }
        else {
            senhaHelp.textContent = 'Senha fraca';
            meter.value = "10";
        }
    }
    else{
        senhaHelp.textContent = 'Senha inválida';
        senhaHelp.style.color = "red";
    }
}
