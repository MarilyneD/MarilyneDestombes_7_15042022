const selectIngredients = document.getElementById("sort-menu-ingredients");
const selectAppliance = document.getElementById("sort-menu-appliance");
const selectUstensils = document.getElementById("sort-menu-ustensils");
const gallery = document.querySelector("#gallery");
const searchBar = document.getElementById("search-bar");
const tags = document.getElementById("tags");
var ingredientsArray = [];
var applianceArray = [];
var ustensilsArray = [];
var allIngredientsArray = [];
var allApplianceArray = [];
var allUstensilsArray = [];
var choosenIngredientsArray = [];
var choosenApplianceArray = [];
var choosenUstensilsArray = [];
var reducedNameRecipesArray = [];
var reducedDescriptionRecipesArray = [];
var reducedIngredientsRecipesArray = [];
var reducedApplianceRecipesArray = [];
var reducedUstensilsRecipesArray = [];
var reducedRecipesArray = [];
var reducedTagIngredientsRecipesArray = [];
var selectedIngredientsArray = [];


// fonctions d'ajout des options dans le menu select ingrédients

function addOptionsIngredients(recipesArray) {
  function ingredientsArrayInit() {
    ingredientsArray = [];
    function pushIngredient(recipe) {
      recipe.ingredients.forEach((ingredient) =>
        ingredientsArray.push(ingredient.ingredient)
      );
    }
    recipesArray.forEach((recipe) => pushIngredient(recipe));
    ingredientsArray = [...new Set(ingredientsArray)];
    ingredientsArray.sort();
  };

  ingredientsArrayInit();
  selectIngredients.innerHTML = "<option>Ingredients</option>";

  function addOption(ingredient) {
    selectIngredients.options[selectIngredients.options.length] = new Option(
      ingredient,
      ingredient
    );
  }
  ingredientsArray.forEach((ingredient) => addOption(ingredient));
}

// de même pour le tableau des appareils, une seule boucle car un seul appareil par recette
function addOptionsAppliance(recipesArray) {
  function applianceArrayInit() {
    applianceArray = [];
    recipesArray.forEach((recipe) => applianceArray.push(recipe.appliance));
    applianceArray = [...new Set(applianceArray)];
    applianceArray.sort();
  }
  applianceArrayInit();
  selectAppliance.innerHTML = "<option>Appareils</option>";

  function addOption(appliance) {
    selectAppliance.options[selectAppliance.options.length] = new Option(
      appliance,
      appliance
    );
  }
  applianceArray.forEach((appliance) => addOption(appliance));
}

// de même pour le tableau des ustensils (plusieurs par recette)
function addOptionsUstensils(recipesArray) {
  function ustensilsArrayInit() {
    ustensilsArray = [];
    function pushUstensil(recipe) {

      recipe.ustensils.forEach((ustensil) =>
        ustensilsArray.push(ustensil)
      );
    }
    recipesArray.forEach((recipe) => pushUstensil(recipe));
    ustensilsArray = [...new Set(ustensilsArray)];
    ustensilsArray.sort();
  }

  ustensilsArrayInit();
  selectUstensils.innerHTML = "<option>Ustensiles</option>";

  function addOption(ustensil) {
    selectUstensils.options[selectUstensils.options.length] = new Option(
      ustensil,
      ustensil
    );
  }
  ustensilsArray.forEach((ustensil) => addOption(ustensil));
}


// fonction qui va établir le tableau des recettes contenant le mot 'string' dans l'une des trois sous-catégories :
// titre, ingredients et description

function findRecipesContaining(string, recipesArray) {
  // exp(ression) est la regexp que l'on crée à partir du string : la chaîne de caractère entrée au clavier
  var exp = new RegExp("" + string + "", "gi"); //gi = global (tous les caractères), insensible (à la casse, donc minuscule ou maj)
  console.log("expression", exp);

  //on filtre maintenant les ingrédients, les names/titres et les descriptions contenant le mot exp(ression)
  reducedIngredientsRecipesArray = recipesArray.filter((item) =>
    item.ingredients.some((ingredient) => exp.test(ingredient.ingredient)));
  reducedNameRecipesArray = recipesArray.filter((item) => exp.test(item.name));
  reducedDescriptionRecipesArray = recipesArray.filter((item) => exp.test(item.description));

  // maintenant on ne fait qu'un tableau avec les trois, concaténer = additionner deux tableaux
  reducedRecipesArray = reducedIngredientsRecipesArray.concat(reducedNameRecipesArray); // ingredients + name
  reducedRecipesArray = reducedRecipesArray.concat(reducedDescriptionRecipesArray); // lui-même + description
  reducedRecipesArray = [...new Set(reducedRecipesArray)]; // on retire les doublons



  // un peu de console.log pour voir ce qui se passe !!!
  console.log("Un ingrédient contient l'expression,  numéros des recettes :",
      reducedIngredientsRecipesArray.map(recipe => recipe.id)); //on extrait seulement les id
  console.log("Le titre contient l'expression,  numéros des recettes :",
        reducedNameRecipesArray.map(recipe => recipe.id));
  console.log("La description contient l'expression,  numéros des recettes :",
        reducedDescriptionRecipesArray.map(recipe => recipe.id));

  console.log("reducedIngredientsRecipesArray", reducedIngredientsRecipesArray);
  console.log("reducedNameRecipesArray", reducedNameRecipesArray);
  console.log("reducedDescriptionRecipesArray", reducedDescriptionRecipesArray);
  console.log("reducedRecipesArray", reducedRecipesArray);
}


// fonction écoute de l'input dans la barre de recherche
function searchBarFunction() {
  searchBar.addEventListener("input", function (e) {
    let value = e.target.value;
    if (value.trim().length >= 3) {
      findRecipesContaining(value, recipesArray);
      gallery.innerHTML = "";
      galleryBuilder(reducedRecipesArray);
      addOptionsIngredients(reducedRecipesArray);
      addOptionsAppliance(reducedRecipesArray);
      addOptionsUstensils(reducedRecipesArray);

    } else { console.log("entrer au moins trois caractères") }
  });
}

//fonction qui écoute le click sur les ingrédients!
function clickOnSelectIngredientsFunction() {
  selectIngredients.addEventListener("click", (event) => {
    console.log("selectIngredients.value", selectIngredients.value);
    console.log("selectIngredients.selected", selectIngredients.selectedIndex);

    if (!(selectedIngredientsArray.includes(selectIngredients.value)) & selectIngredients.selectedIndex > 0) {
      //if(reducedRecipesArray.length=0){console.log("TABLEAU VIDE");reducedRecipesArray = [].concat(recipesArray)}else{console.log("TABLEAU NOOON VIDE");};//au cas où on clique sur les ingrédient avant d'avoir tapé une recherche

      console.log("reducedRecipesArray.length", reducedRecipesArray.length);
      console.log("recipesArray", recipesArray);
      console.log("reducedRecipesArray", reducedRecipesArray);
      selectedIngredientsArray.push(selectIngredients.value);
      console.log("selectedIngredientsArray", selectedIngredientsArray);
      reducedTagIngredientsRecipesArray = reducedRecipesArray.filter((item) =>
        item.ingredients.some(
          (ingredient) => ingredient.ingredient == selectIngredients.value
        )
      );
      console.log("reducedTagIngredientsRecipesArray", reducedTagIngredientsRecipesArray);

      tags.insertAdjacentHTML("beforeend", `<div class="ingredient-tag"> ${selectIngredients.value}</div>`);
      gallery.innerHTML = "";
      galleryBuilder(reducedTagIngredientsRecipesArray);

    } else { console.log("l'ingrédient a déjà été sélectionné ou est le titre") };

  });
}


function init() {
  //premier lancement avec tous les ingredients (recipesArray est le tableau donné donc avec les 50 recettes)
  addOptionsIngredients(recipesArray);
  addOptionsAppliance(recipesArray);
  addOptionsUstensils(recipesArray);

  searchBarFunction();
  clickOnSelectIngredientsFunction();
}

init();