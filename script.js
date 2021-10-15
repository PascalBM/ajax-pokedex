let pokeId = document.getElementById("pokeId");
let image = document.getElementById("image");
let name = document.getElementById("name");
let pokemoves = document.getElementById("pokemoves");
let evo1 = document.getElementById("evo-1");
let evo2 = document.getElementById("evo-2");
let evo3 = document.getElementById("evo-3");

let getData = (input) => {
    //took the api with the fetch
    input = input.toString().toLowerCase()
    document.getElementById("evo-1").src = ""
    document.getElementById("evo-2").src = ""
    document.getElementById("evo-3").src = ""
    evo1.style.visibility = "hidden"
    evo2.style.visibility = "hidden"
    evo3.style.visibility = "hidden"
    /*const nextBtn = document.getElementById("nextBtn");
    const previousBtn = document.getElementById("previousBtn")*/


        fetch('https://pokeapi.co/api/v2/pokemon/'+ input)
            .then(result => result.json())
            .then(data => {
                pokeId.textContent = "ID-number:" + " " + data.id;
                name.textContent = data.name;
                console.log(data);
                image.src = data.sprites["front_default"];
                image.style.visibility = "visible"
                pokemoves.innerHTML="";
                console.log(data.moves.length)
                if(data.moves.length <= 4) {
                    for (let i = 0; i < data.moves.length; i++) {
                        pokemoves.innerHTML += "<li>" + data.moves[i].move.name + "</li>";
                    }
                } else {
                    for (let i = 0; i < 4; i++) {
                        pokemoves.innerHTML += "<li>" + data.moves[i].move.name + "</li>";
                    }
                }

                /*nextBtn.addEventListener("click", () => input+1);
                previousBtn.addEventListener("click", () => input-1);*/
                fetch('https://pokeapi.co/api/v2/pokemon-species/'+ input)
                    .then(result => result.json())
                    .then(data => {
                    console.log(data.evolution_chain.url)
                        fetch(data.evolution_chain.url)
                            .then(result => result.json())
                            .then(data => {
                                console.log(data)
                                let name1 = [data.chain.species.name]
                                if(data.chain.evolves_to.length < 1 == false) {
                                    /*if (data.chain.evolves.to.length > 1) {

                                    }*/
                                    name1.push(data.chain.evolves_to[0].species.name)
                                    if (data.chain.evolves_to[0].evolves_to.length < 1 == false) {
                                        name1.push(data.chain.evolves_to[0].evolves_to[0].species.name)
                                    }
                                }
                                console.log(name1)
                                name1.forEach((poke,idx) => {
                                    console.log(poke);
                                    console.log(idx);
                                    fetch('https://pokeapi.co/api/v2/pokemon/'+ poke)
                                        .then(result => result.json())
                                        .then(data => {
                                            console.log(data.name);

                                            if (data.sprites["front_default"] !== undefined) {
                                                document.getElementById("evo-" + (idx + 1)).src =  data.sprites["front_default"];
                                                document.getElementById("evo-" + (idx + 1)).style.visibility =  "visible";
                                            } else {
                                                document.getElementById("evo-" + (idx + 1)).src  = ""
                                                document.getElementById("evo-" + (idx + 1)).style.visibility  = "hidden"
                                            }

                                        })
                                })
                            })
                    })
            })
}

document.getElementById("searchBtn").addEventListener("click", () => {
    let input = document.getElementById("input").value;
    getData(input)
})
getData(25)