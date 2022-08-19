// TODO : iterate through and append ingredients; if null, ignore

document.querySelector("button").addEventListener("click", getDrink);
document.querySelector("input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getDrink();
  }
});

function getDrink() {
  const drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#drinkList").innerHTML = "";

      // Cleaning up ingredients and measurements
      data.drinks.forEach(function (singleDrink) {
        const drinkEntries = Object.entries(singleDrink),
          // This part build arrays out of the two sets of keys
          [ingredientsArray, measuresArray] = [
            "strIngredient",
            "strMeasure",
          ].map((keyName) =>
            Object.assign(
              [],
              ...drinkEntries
                .filter(([key, value]) => key.startsWith(keyName))
                .map(([key, value]) => ({
                  [parseInt(key.slice(keyName.length))]: value,
                })),
            ),
          ),
          // This part filters empty values based on the ingredients
          { finalIngredients, finalMeasures } = ingredientsArray.reduce(
            (results, value, index) => {
              if (
                (value && value.trim()) ||
                (measuresArray[index] && measuresArray[index].trim())
              ) {
                results.finalIngredients.push(value);
                results.finalMeasures.push(measuresArray[index]);
              }

              return results;
            },
            {
              finalIngredients: [],
              finalMeasures: [],
            },
          ),
          // Optional: zip both arrays
          ingredientsWithMeasures = finalIngredients.map((value, index) => [
            finalMeasures[index],
            value,
          ]);

        // Output

        const ingredientList =
          "Ingredients:\n" +
          ingredientsWithMeasures
            .map(
              ([measure, ingredient]) =>
                `${(measure || "").trim()} ${(ingredient || "").trim()}`,
            )
            .join("\n");

        //END Cleaning up ingredients and measurements

        const hr = document.createElement("hr");
        const drinkName = document.createElement("h2");
        const img = document.createElement("img");
        const ingredientElement = document.createElement("h3");
        const instructions = document.createElement("h3");

        drinkName.innerText = singleDrink.strDrink;
        img.src = singleDrink.strDrinkThumb;
        ingredientElement.innerText = ingredientList;
        instructions.innerText = singleDrink.strInstructions;

        const div = document.createElement("div");
        div.classList.add("individualDrink");

        div.appendChild(hr);
        div.appendChild(drinkName);
        div.appendChild(img);
        div.appendChild(ingredientElement);
        div.appendChild(instructions);

        document.querySelector("#drinkList").appendChild(div);
      });
    });
}
