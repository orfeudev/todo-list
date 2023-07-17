//propriedade do navegador que representa a página.
window.addEventListener("DOMContentLoaded", function (){
    var list = [] //vazia pois todo dado recebido vai ser armazenado aqui
    var inputField = document.getElementById("input1")
    var submitButton = document.getElementById("input2")
    var atvList = document.getElementById("lista-atividades")

    function create(item) {
        list.push({value: item})
        localStorage.setItem("list",JSON.stringify(list))
        render()
    }
    submitButton.addEventListener("click", function(){
        create(inputField.value)
    })
    function del(item){
        var index = list.indexOf(item)
        if(index>-1){
            list.splice(index, 1)
            localStorage.setItem("list", JSON.stringify(list))
            render()
        }
    }
    function render(){
        atvList.innerHTML=''
        list.forEach(function(item) {
            var itemDiv = document.createElement("div")
            var textDiv = document.createElement("span")
            var buttonDiv = document.createElement("button")

            itemDiv.className = "atividade"
            textDiv.textContent = item.value
            buttonDiv.className = "botaoAtividade"
            buttonDiv.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            buttonDiv.addEventListener("click", function(){
                del(item)
            }) 
            
            itemDiv.appendChild(textDiv)
            itemDiv.appendChild(buttonDiv)
            atvList.appendChild(itemDiv)
        })
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
