// TODO : iterate through and append ingredients; if null, ignore

document.querySelector('button').addEventListener('click', getDrink)

    function getDrink(){
      const drink = document.querySelector('input').value
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.drinks)
      document.querySelector("#drinkList").innerHTML = ""
      data.drinks.forEach(function(singleDrink) {
      const h2 = document.createElement('h2')
      h2.innerText = singleDrink.strDrink

      const img = document.createElement('img')
      img.src = singleDrink.strDrinkThumb

      const h3 = document.createElement('h3')
      h3.innerText = singleDrink.strInstructions

        const div = document.createElement('div')
        div.classList.add('individualDrink')

        div.appendChild(h2)
        div.appendChild(img)
        div.appendChild(h3)

        document.querySelector('#drinkList').appendChild(div)

      });
    })
    }
