//propriedade do navegador que representa a página.
window.addEventListener("DOMContentLoaded", function (){
    var list = [] //cria uma matriz(lista de itens ordenados)
    var inputField = document.getElementById("input1") //campo para inserção de terxto do usuário
    var submitButton = document.getElementById("input2")// botão para enviar o valor digitado no inputField
    var atvList = document.getElementById("lista-atividades")//exibição das atividades

    //
    function create(item) {
        list.push({value: item})
        localStorage.setItem("list",JSON.stringify(list))
        render()
    }
    submitButton.addEventListener("click", function(){
        create(inputField.value)
    })

    function update(item, newValue) {
        var index = list.indexOf(item);
        if (index > -1) {
            list[index].value = newValue;
            localStorage.setItem("list", JSON.stringify(list));
            render();
        }
    }
    function del(item){
        var index = list.indexOf(item)
        if(index>-1){
            list.splice(index, 1)
            localStorage.setItem("list", JSON.stringify(list))
            render()
        }
    }

    function render() {
        atvList.innerHTML = '';
        list.forEach(function (item) {
            var itemDiv = document.createElement("div");
            var textDiv = document.createElement("span");
            var buttonDiv = document.createElement("button");
            var editButton = document.createElement("button");

            itemDiv.className = "atividade";
            textDiv.textContent = item.value;
            buttonDiv.className = "botaoAtividade";
            buttonDiv.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            buttonDiv.addEventListener("click", function () {
                del(item);
            });

            // editBUtton
          
            editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editButton.className = "editButton"; 
            editButton.addEventListener("click", function () {
                var newValue = prompt("Digite o novo valor:", item.value);
                if (newValue !== null) {
                    update(item, newValue);
                }
            });

            itemDiv.appendChild(textDiv);
            itemDiv.appendChild(editButton); // editButton
            itemDiv.appendChild(buttonDiv);
            atvList.appendChild(itemDiv);
        });
    }
    function load(){
        var storedList = localStorage.getItem("list")
        if(storedList){
            list= JSON.parse(storedList)
        }
    }
    load()
    render()
    
})
