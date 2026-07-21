const cards = document.querySelector(".cards")
const URL = "https://api.potterdb.com/v1/spells"
const total = document.querySelector('.total')
const search = document.querySelector("#search") 


async function showSpells(){
    let spells = await getSpells()
    let count = 0
    spells.forEach(spell => {
        let name = spell['attributes']['name']
        let category = spell['attributes']['category']
        let image = spell['attributes']['image']
        let newCard = document.createElement('div')
        newCard.classList.add('card')
        cards.appendChild(newCard)
        let img = document.createElement("img")
        img.setAttribute('src',image)
        newCard.appendChild(img)
        let nameEle = document.createElement('p')
        nameEle.classList.add('name')
        nameEle.innerHTML = name
        newCard.appendChild(nameEle)
        let cat = document.createElement('p')
        cat.classList.add('category')
        cat.innerHTML = category
        newCard.append(cat)
        count++

    });
    total.innerHTML = `${count} Results`
}

showSpells()


async function getSpells(){
    try{
        let response = await fetch(URL)
        let data  = await response.json()
        return data.data

    }catch{
        return "NO SPELL FOUND"
    }
}

search.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        cards.innerHTML = ""
        let count = 0
        total.innerHTML = `${count} Results`

        let searchedKEY = search.value.toLowerCase();

        try {
            let response = await fetch(
                `https://api.potterdb.com/v1/spells?filter[name_cont]=${searchedKEY}`
            );

            let data = await response.json();
            console.log(data);


            data.data.forEach(spell => {
                let name = spell['attributes']['name']
                let category = spell['attributes']['category']
                let image = spell['attributes']['image']
                let newCard = document.createElement('div')
                newCard.classList.add('card')
                cards.appendChild(newCard)
                let img = document.createElement("img")
                img.setAttribute('src',image)
                newCard.appendChild(img)
                let nameEle = document.createElement('p')
                nameEle.classList.add('name')
                nameEle.innerHTML = name
                newCard.appendChild(nameEle)
                let cat = document.createElement('p')
                cat.classList.add('category')
                cat.innerHTML = category
                newCard.append(cat)
                count++
            });
            total.innerHTML = `${count} Results`

        } catch (err) {
            console.log(err);
        }
    }
});