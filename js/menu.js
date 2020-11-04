let botaoMenu = document.querySelector(".icone a");
botaoMenu.addEventListener("click", function(event){
    event.preventDefault();

    let menu = document.querySelector(".menu");
    menu.classList.toggle("responsivo");
});z