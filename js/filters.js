const ingredientsList = document.getElementById("ingredients-list");
const appliancesList = document.getElementById("appliances-list");
const ustensilsList = document.getElementById("ustensils-list");
const gallery = document.querySelector("#gallery");
const searchBar = document.getElementById("search-bar");
const ingredientsSearchBar = document.getElementById("ingredients-search")
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
var reducedTagRecipesArray = [];
var reducedIngredientsTagRecipesArray = [];
var reducedApplianceTagRecipesArray = [];
var reducedUstensilsTagRecipesArray = [];
var selectedIngredientsArray = [];
var selectedApplianceArray = [];
var selectedUstensilsArray = [];



// fonctions d'ajout des options dans le menu select ingrédients 
function addOptionsIngredients(recipesArray) {
  function ingredientsArrayInit() {
  ingredientsArray = [];  
  ingredientsArray =  recipesArray.map(recipe => recipe.ingredients).flat(); 
  ingredientsArray = ingredientsArray.map(ingredient =>ingredient.ingredient); 
  ingredientsArray = [...new Set(ingredientsArray)].sort(); 
    };
  ingredientsArrayInit();
  ingredientsList.innerHTML = ""; 
    function addOption(ingredient) {
    ingredientsList.insertAdjacentHTML("beforeend", 
    `<li class="ingredient-li">${ingredient}</li>`)};
  ingredientsArray.forEach((ingredient) => addOption(ingredient));
}

// de même pour le tableau des appareils, une seule boucle car un seul appareil par recette
function addOptionsAppliance(recipesArray) {
  function applianceArrayInit() {
    applianceArray = [];
    recipesArray.forEach((recipe) => applianceArray.push(recipe.appliance));
    applianceArray = [...new Set(applianceArray)].sort();
  }
  applianceArrayInit();
  appliancesList.innerHTML = "";
  function addOption(appliance) {appliancesList.insertAdjacentHTML("beforeend", 
  `<li class="appliance-li">${appliance}</li>`)}
  applianceArray.forEach((appliance) => addOption(appliance));
}

// de même pour le tableau des ustensils (plusieurs par recette)
function addOptionsUstensils(recipesArray) {
  function ustensilsArrayInit() {
    ustensilsArray = recipesArray.map(recipe => recipe.ustensils).flat(); 
    ustensilsArray = [...new Set(ustensilsArray)].sort();
  }
  ustensilsArrayInit();
  ustensilsList.innerHTML = "";

  function addOption(ustensil) {
    ustensilsList.insertAdjacentHTML("beforeend",
      `<li class="ustensil-li">${ustensil}</li>`)
  }
  ustensilsArray.forEach((ustensil) => addOption(ustensil));
}

// fonction qui va établir le tableau des recettes contenant le mot 'string' dans l'une des trois sous-catégories : titre, ingredients et description
function findRecipesContaining(string, recipesArray) {
  var exp = new RegExp("" + string + "", "gi");
  console.log("expression", exp);

  reducedIngredientsRecipesArray = recipesArray.filter((item) =>
    item.ingredients.some((ingredient) => exp.test(ingredient.ingredient)));
  reducedNameRecipesArray = recipesArray.filter((item) => exp.test(item.name));
  reducedDescriptionRecipesArray = recipesArray.filter((item) => exp.test(item.description));
  reducedRecipesArray = reducedIngredientsRecipesArray.concat(reducedNameRecipesArray); 
  reducedRecipesArray = reducedRecipesArray.concat(reducedDescriptionRecipesArray);
  reducedRecipesArray = [...new Set(reducedRecipesArray)];

  // un peu de console.log pour voir ce qui se passe !!!
  console.log("Un ingrédient contient l'expression,  numéros des recettes :",
      reducedIngredientsRecipesArray.map(recipe => recipe.id));
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
    ingredientsSearchBar.value = ""; //vide recherche textuelle des ingrédients
    document.querySelectorAll(".tag").forEach((tag) => {tag.remove()}); //efface les tags lorsque l'on retourne sur une recherche par texte
    let value = e.target.value;
    if (value.trim().length >= 3) {
      findRecipesContaining(value, recipesArray);
      if (reducedRecipesArray == 0 ){console.log("Aucune recette ne correspond")}
      else{gallery.innerHTML = "";
      galleryBuilder(reducedRecipesArray);
      addOptionsIngredients(reducedRecipesArray);
      addOptionsAppliance(reducedRecipesArray);
      addOptionsUstensils(reducedRecipesArray);
      createIngredientsTag();
      createApplianceTag();
      createUstensilsTag();}
    } else { console.log("entrer au moins trois caractères") }
  });
}

  //fonction qui écoute le click sur les ingrédients du menu select
  function createIngredientsTag() {

    document.querySelectorAll(".ingredient-li").forEach((ingredientElement) => {
  
      ingredientElement.addEventListener("click", () => {
        console.log("click sur l'ingrédient :", ingredientElement.textContent);
  
        if (!(selectedIngredientsArray.includes(ingredientElement.textContent))) {
          console.log("selectedIngredientsArray avant ajout", selectedIngredientsArray);
          selectedIngredientsArray.push(ingredientElement.textContent);
          console.log("selectedIngredientsArray", selectedIngredientsArray);
          tags.insertAdjacentHTML("beforeend", `<div class="ingredient-tag tag">${ingredientElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
          tagRecipes();
          gallery.innerHTML = "";
          galleryBuilder(reducedTagRecipesArray);
         addOptionsIngredients(reducedTagRecipesArray);
         addOptionsAppliance(reducedTagRecipesArray);
         addOptionsUstensils(reducedTagRecipesArray);
         createIngredientsTag(); 
         createApplianceTag();
         createUstensilsTag();
          closeTag();
        } else { console.log("l'ingrédient a déjà été sélectionné") }
      });
    });
    
  }
    
  //fonction qui écoute le click sur l'appareil' du menu select
  function createApplianceTag() {
 
    document.querySelectorAll(".appliance-li").forEach((applianceElement) => {
  
      applianceElement.addEventListener("click", () => {
        console.log("click sur l'appareil :", applianceElement.textContent);
  
        if (!(selectedApplianceArray.includes(applianceElement.textContent))) {
          selectedApplianceArray.push(applianceElement.textContent);
          console.log("selectedApplianceArray", selectedApplianceArray);
          tags.insertAdjacentHTML("beforeend", `<div class="appliance-tag tag">${applianceElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
          tagRecipes();
          gallery.innerHTML = "";
          galleryBuilder(reducedTagRecipesArray);
         addOptionsIngredients(reducedTagRecipesArray);
         addOptionsAppliance(reducedTagRecipesArray);
         addOptionsUstensils(reducedTagRecipesArray);
         createIngredientsTag(); 
         createApplianceTag();
         createUstensilsTag();
          closeTag();
           } else { console.log("l'appareil a déjà été sélectionné") }
      });
    });
  }
    
  //fonction qui écoute le click sur les ustensils du menu select
  function createUstensilsTag() {
 
    document.querySelectorAll(".ustensil-li").forEach((ustensilElement) => {
  
      ustensilElement.addEventListener("click", () => {
        console.log("click sur l'ustensile :", ustensilElement.textContent);
  
        if (!(selectedUstensilsArray.includes(ustensilElement.textContent))) {
  
          selectedUstensilsArray.push(ustensilElement.textContent);
          console.log("selectedUstensilsArray", selectedUstensilsArray);
          tags.insertAdjacentHTML("beforeend", `<div class="ustensil-tag tag">${ustensilElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
          tagRecipes();
          gallery.innerHTML = "";
          galleryBuilder(reducedTagRecipesArray);
         addOptionsIngredients(reducedTagRecipesArray);
         addOptionsAppliance(reducedTagRecipesArray);
         addOptionsUstensils(reducedTagRecipesArray);
         createIngredientsTag(); 
         createApplianceTag();
         createUstensilsTag();
          closeTag();
           } else { console.log("l'appareil a déjà été sélectionné") }
      });
    });
  }

 //fonction qui écoute le click/close quand je ferme le TAG
 function closeTag() {
  document.querySelectorAll(".tag").forEach((tag) => {
     function reInitAll(){
       tagRecipes();
       gallery.innerHTML = "";
       galleryBuilder(reducedTagRecipesArray);
       addOptionsIngredients(reducedTagRecipesArray);
       addOptionsAppliance(reducedTagRecipesArray);
       addOptionsUstensils(reducedTagRecipesArray);
       createIngredientsTag();
       createApplianceTag();
       createUstensilsTag();
       closeTag();
        };


   tag.addEventListener("click", () => {
    
     switch (tag.classList[0]) { 
  
       case 'ingredient-tag':
         selectedIngredientsArray = selectedIngredientsArray.filter(item => item !==  tag.textContent);
         console.log("selectedIngredientsArray après suppression",selectedIngredientsArray);
         tag.remove();
         reInitAll();
         break;
       case 'appliance-tag':
         console.log("selectedApplianceArray avant le click",selectedApplianceArray);
         selectedApplianceArray = selectedApplianceArray.filter(item => item !==  tag.textContent);
         console.log("selectedApplianceArray après suppression",selectedApplianceArray);
         tag.remove();
         reInitAll();
         break;
       case 'ustensil-tag':
         selectedUstensilsArray = selectedUstensilsArray.filter(item => item !==  tag.textContent);
         console.log("après suppression",selectedUstensilsArray);
         tag.remove();
         reInitAll();
         break;
       default:
         console.log(`Sorry`);
     }
     
   });
 });
}

  //fonction qui va reconstruire une liste de recettes selon les TAGS choisis
  function tagRecipes() {
      
    if (reducedRecipesArray.length == 0) { reducedRecipesArray = [].concat(recipesArray) };
    console.log("reducedRecipesArray avant TAGS", reducedRecipesArray);

  reducedTagRecipesArray = [].concat(reducedRecipesArray);
  console.log("reducedTagRecipesArray avant TAGS", reducedTagRecipesArray);
  selectedIngredientsArray.forEach((selectedIngredient) =>
    reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
      item.ingredients.some(
        (ingredient) => ingredient.ingredient == selectedIngredient)));

  selectedApplianceArray.forEach((selectedAppliance) =>
    reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
      item.appliance == selectedAppliance));

  selectedUstensilsArray.forEach((selectedUstensil) =>
    reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
      item.ustensils.some(
        (ustensil) => ustensil == selectedUstensil)));

  console.log("reducedTagRecipesArray APRES TAGS", reducedTagRecipesArray);

}

function ingredientsSearchBarFunction() {
  ingredientsSearchBar.addEventListener("input", function (e) {
    var ingredExp = new RegExp("" + e.target.value + "", "gi");
    console.log("expression", ingredExp);
    allIngredientsArray = recipesArray.map(recipe => recipe.ingredients).flat();
    allIngredientsArray = allIngredientsArray.map(ingredient => ingredient.ingredient);
    allIngredientsArray = [...new Set(allIngredientsArray)].sort();
    //document.querySelectorAll(".ingredient-li").forEach((element) => {element.remove()});
    ingredientsList.innerHTML = "";
    allIngredientsArray.forEach((ingredientElement) => {

      if (ingredExp.test(ingredientElement)) {
        console.log("Regex Test",ingredExp.test(ingredientElement));
        ingredientsList.insertAdjacentHTML("beforeend",
          `<li class="ingredient-li">${ingredientElement}</li>`)
      };
    }
    
    )
    createIngredientsTag();
  }
  
  )

}





function init() {
  //premier lancement avec tous les ingredients
  addOptionsIngredients(recipesArray);
  addOptionsAppliance(recipesArray);
  addOptionsUstensils(recipesArray);
  createIngredientsTag();
  createApplianceTag();
  createUstensilsTag();
  searchBarFunction();
  ingredientsSearchBarFunction();
}

init();