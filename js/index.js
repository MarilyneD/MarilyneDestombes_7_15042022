// fonction qui crée une vignette en parcourant la recette et les ingrédients en les simplifiant

function articleBuilder(recipe) {
  let content = document.querySelector("#gallery");
  content.insertAdjacentHTML(
    "beforeend",
    `<article>
    <img class="thumbnail" src= "assets/recipes-images/${recipe.id}.jpg" alt="" tabindex="0">
      
    <div class="cardtext">
      <h2 class="cardtext-recipe-name" >${recipe.name}</h2>
      <span class="cardtext-cooking-time">
      <img class="cardtext-cooking-time-icon" src= "assets/images/time-icon.svg" alt="" tabindex="0">
      <span class="cardtext-cooking-time-number">${recipe.time} min</span>
      </span>
      <div class = "cardtext-ingredients">
      <ul id="cardtext-ingredients-list-${recipe.id}" class="cardtext-ingredients-list"></ul>
      </div>
      <div class = "cardtext-description">${recipe.description}
    </div>
    
  </article>`
  );
  let ingredientsList = content.querySelector(
    "#cardtext-ingredients-list-" + recipe.id
  );

  // sous fonction qui ajoute la liste des ingredients selon divers cas de figure;

  function recipeIngredientsQuantitySimplifyAndInsert(ingredient) {
    if (ingredient.quantity) {
      if (ingredient.unit) {
        switch (ingredient.unit) {
          case "grammes":
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} g</li>`
            );
            break;
          case "cuillères à soupe":
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} cuillères</li>`
            );
            break;
            case "cuillère à soupe":
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} cuillère</li>`
            );
            break;
            case "cuillère à café":
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} cuillère</li>`
            );
            break;
          case "cuillères à café":
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} cuillères</li>`
            );
            break;
          default:
            ingredientsList.insertAdjacentHTML(
              "beforeend",
              `<li>${ingredient.ingredient} : ${ingredient.quantity} ${ingredient.unit}</li>`
            );
        }
      } else {
        ingredientsList.insertAdjacentHTML(
          "beforeend",
          `<li>${ingredient.ingredient} : ${ingredient.quantity}</li>`
        );
      }
    } else {
      ingredientsList.insertAdjacentHTML(
        "beforeend",
        `<li>${ingredient.ingredient}</li>`
      );
    }
  }

  recipe.ingredients.forEach((ingredient) =>
    recipeIngredientsQuantitySimplifyAndInsert(ingredient)
  );
}

//fin de la fonction qui crée une vignette de recette

// fonction qui boucle sur chacune des recettes du tableau /fichier fourni et crée toute la gallerie des vignettes
function galleryBuilder(recipesArray) {
  recipesArray.forEach((recipe) => articleBuilder(recipe));
}

// FONCTION PRINCIPALE INIT QUI LANCE LES TACHES A EFFECTUER pour fabriquer la page

async function init() {
  //displayRecipes(recipesArray);

  galleryBuilder(recipesArray);
}

// lancement !!!!
init();
