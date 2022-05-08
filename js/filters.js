const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');
const gallery = document.querySelector('#gallery');
const search = document.querySelector('#search');
const searchBar = document.getElementById('search-bar');
const ingredientsSearchBar = document.getElementById('ingredients-search');
const applianceSearchBar = document.getElementById('appliance-search');
const ustensilsSearchBar = document.getElementById('ustensils-search');
const tags = document.getElementById('tags');
let ingredientsArray = [];
let applianceArray = [];
let ustensilsArray = [];
let tagIngredientsArray = [];
let tagApplianceArray = [];
let tagUstensilsArray = [];
let reducedRecipesArray = [];
let reducedTagRecipesArray = [];
let selectedIngredientsArray = [];
let selectedApplianceArray = [];
let selectedUstensilsArray = [];

// fonctions d'ajout des options dans le menu select ingrédients
function addOptionsIngredients(recipesArray) {
  function ingredientsArrayInit() {
    ingredientsArray = [];
    ingredientsArray = recipesArray.map((recipe) => recipe.ingredients).flat();
    ingredientsArray = ingredientsArray.map((ingredient) => ingredient.ingredient);
    ingredientsArray = [...new Set(ingredientsArray)].sort(function (a, b) {
      return a.localeCompare(b);
    });
  }
  ingredientsArrayInit();
  ingredientsList.innerHTML = '';
  function addOption(ingredient) {
    ingredientsList.insertAdjacentHTML('beforeend',
      `<li class="ingredient-li">${ingredient}</li>`);
  }
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
  appliancesList.innerHTML = '';
  function addOption(appliance) {
    appliancesList.insertAdjacentHTML('beforeend',
      `<li class="appliance-li">${appliance}</li>`);
  }
  applianceArray.forEach((appliance) => addOption(appliance));
}

// de même pour le tableau des ustensiles (plusieurs par recette)
function addOptionsUstensils(recipesArray) {
  function ustensilsArrayInit() {
    ustensilsArray = recipesArray.map((recipe) => recipe.ustensils).flat();
    ustensilsArray = [...new Set(ustensilsArray)].sort(function (a, b) {
      return a.localeCompare(b);
    });
  }
  ustensilsArrayInit();
  ustensilsList.innerHTML = '';

  function addOption(ustensil) {
    ustensilsList.insertAdjacentHTML('beforeend',
      `<li class="ustensil-li">${ustensil}</li>`);
  }
  ustensilsArray.forEach((ustensil) => addOption(ustensil));
}


// ALGO1         
// fonction qui va établir le tableau des recettes 
function findRecipesContaining(string, recipesArray) {
  var exp = new RegExp("" + string + "", "gi");
  console.log("expression", exp);
  reducedIngredientsRecipesArray = recipesArray.filter((item) => item.ingredients.some((ingredient) => exp.test(ingredient.ingredient)));
  reducedNameRecipesArray = recipesArray.filter((item) => exp.test(item.name));
  reducedDescriptionRecipesArray = recipesArray.filter((item) => exp.test(item.description));
  reducedRecipesArray = reducedIngredientsRecipesArray.concat(reducedNameRecipesArray); 
  reducedRecipesArray = reducedRecipesArray.concat(reducedDescriptionRecipesArray);
  reducedRecipesArray = [...new Set(reducedRecipesArray)];
 }



// fonction écoute de l'input dans la barre de recherche
function searchBarFunction() {
  searchBar.addEventListener('input', (e) => {
    ingredientsSearchBar.value = ''; // vide "rechercher un ingrédient", recherche textuelle des ingrédients
    document.querySelectorAll('.tag').forEach((tag) => { tag.remove(); }); // efface les tags lorsque l'on retourne sur une recherche par texte
    selectedIngredientsArray = [];
    selectedApplianceArray = [];
    selectedUstensilsArray = [];
    const value = e.target.value;
    if (value.trim().length >= 3) {
      search.setAttribute('data-error1-visible', 'false');
      findRecipesContaining(value, recipesArray);
      if (reducedRecipesArray == 0) { search.setAttribute('data-error2-visible', 'true'); console.log('Aucune recette ne correspond'); } else {
        search.setAttribute('data-error2-visible', 'false');
        gallery.innerHTML = '';
        galleryBuilder(reducedRecipesArray);
        addOptionsIngredients(reducedRecipesArray);
        addOptionsAppliance(reducedRecipesArray);
        addOptionsUstensils(reducedRecipesArray);
        createIngredientsTag();
        createApplianceTag();
        createUstensilsTag();
      }
    } else {
      gallery.innerHTML = '';
      galleryBuilder(recipesArray);
      addOptionsIngredients(recipesArray);
      addOptionsAppliance(recipesArray);
      addOptionsUstensils(recipesArray);
      createIngredientsTag();
      createApplianceTag();
      createUstensilsTag();
      search.setAttribute('data-error1-visible', 'true');
      search.setAttribute('data-error2-visible', 'false');
    }
  });
}


// fonction qui écoute le click sur les ingrédients du menu select
function createIngredientsTag() {
  document.querySelectorAll('.ingredient-li').forEach((ingredientElement) => {
    ingredientElement.addEventListener('click', () => {
      console.log("click sur l'ingrédient :", ingredientElement.textContent);
      if (search.getAttribute('data-error1-visible') === 'true' || search.getAttribute('data-error2-visible') === 'true') { searchBar.value = '' }
      search.setAttribute('data-error1-visible', 'false');
      search.setAttribute('data-error2-visible', 'false');
      if (!(selectedIngredientsArray.includes(ingredientElement.textContent))) {
        console.log('selectedIngredientsArray avant ajout', selectedIngredientsArray);
        selectedIngredientsArray.push(ingredientElement.textContent);
        console.log('selectedIngredientsArray', selectedIngredientsArray);
        tags.insertAdjacentHTML('beforeend', `<div class="ingredient-tag tag">${ingredientElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
        tagRecipes();
        gallery.innerHTML = '';
        galleryBuilder(reducedTagRecipesArray);
        addOptionsIngredients(reducedTagRecipesArray);
        addOptionsAppliance(reducedTagRecipesArray);
        addOptionsUstensils(reducedTagRecipesArray);
        createIngredientsTag();
        createApplianceTag();
        createUstensilsTag();
        closeTag();
      } else { console.log("l'ingrédient a déjà été sélectionné"); }
    });
  });
}

// fonction qui écoute le click sur l'appareil' du menu select
function createApplianceTag() {
  document.querySelectorAll('.appliance-li').forEach((applianceElement) => {
    applianceElement.addEventListener('click', () => {
      console.log("click sur l'appareil :", applianceElement.textContent);
      if (search.getAttribute('data-error1-visible') === 'true' || search.getAttribute('data-error2-visible') === 'true') { searchBar.value = '' }
      search.setAttribute('data-error1-visible', 'false');
      search.setAttribute('data-error2-visible', 'false');
      if (!(selectedApplianceArray.includes(applianceElement.textContent))) {
        selectedApplianceArray.push(applianceElement.textContent);
        console.log('selectedApplianceArray', selectedApplianceArray);
        tags.insertAdjacentHTML('beforeend', `<div class="appliance-tag tag">${applianceElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
        tagRecipes();
        gallery.innerHTML = '';
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

// fonction qui écoute le click sur les ustensils du menu select
function createUstensilsTag() {
  document.querySelectorAll('.ustensil-li').forEach((ustensilElement) => {
    ustensilElement.addEventListener('click', () => {
      console.log("click sur l'ustensile :", ustensilElement.textContent);
      if (search.getAttribute('data-error1-visible') === 'true' || search.getAttribute('data-error2-visible') === 'true') { searchBar.value = '' }
      search.setAttribute('data-error1-visible', 'false');
      search.setAttribute('data-error2-visible', 'false');

      if (!(selectedUstensilsArray.includes(ustensilElement.textContent))) {
        search.setAttribute('data-error1-visible', 'false');
        search.setAttribute('data-error2-visible', 'false');
        selectedUstensilsArray.push(ustensilElement.textContent);
        console.log('selectedUstensilsArray', selectedUstensilsArray);
        tags.insertAdjacentHTML('beforeend', `<div class="ustensil-tag tag">${ustensilElement.textContent}<img class="close-icon" src="assets/images/close-icon.svg" alt="croix fermer du tag" /></div>`);
        tagRecipes();
        gallery.innerHTML = '';
        galleryBuilder(reducedTagRecipesArray);
        addOptionsIngredients(reducedTagRecipesArray);
        addOptionsAppliance(reducedTagRecipesArray);
        addOptionsUstensils(reducedTagRecipesArray);
        createIngredientsTag();
        createApplianceTag();
        createUstensilsTag();
        closeTag();
      } else { console.log("l'appareil a déjà été sélectionné"); }
    });
  });
}

// fonction qui écoute le click/close quand je ferme le TAG
function closeTag() {
  document.querySelectorAll('.tag').forEach((tag) => {
    function reInitAll() {
      tagRecipes();
      gallery.innerHTML = '';
      galleryBuilder(reducedTagRecipesArray);
      addOptionsIngredients(reducedTagRecipesArray);
      addOptionsAppliance(reducedTagRecipesArray);
      addOptionsUstensils(reducedTagRecipesArray);
      createIngredientsTag();
      createApplianceTag();
      createUstensilsTag();
      closeTag();
    }

    tag.addEventListener('click', () => {
      switch (tag.classList[0]) {
        case 'ingredient-tag':
          selectedIngredientsArray = selectedIngredientsArray.filter((item) => item !== tag.textContent);
          console.log('selectedIngredientsArray après suppression', selectedIngredientsArray);
          tag.remove();
          reInitAll();
          break;
        case 'appliance-tag':
          console.log('selectedApplianceArray avant le click', selectedApplianceArray);
          selectedApplianceArray = selectedApplianceArray.filter((item) => item !== tag.textContent);
          console.log('selectedApplianceArray après suppression', selectedApplianceArray);
          tag.remove();
          reInitAll();
          break;
        case 'ustensil-tag':
          selectedUstensilsArray = selectedUstensilsArray.filter((item) => item !== tag.textContent);
          console.log('après suppression', selectedUstensilsArray);
          tag.remove();
          reInitAll();
          break;
        default:
          console.log('Sorry');
      }
    });
  });
}

// fonction qui va reconstruire une liste de recettes selon les TAGS choisis
function tagRecipes() {
  if (reducedRecipesArray.length === 0) { reducedRecipesArray = [].concat(recipesArray); }
  reducedTagRecipesArray = [].concat(reducedRecipesArray);
  selectedIngredientsArray.forEach((selectedIngredient) => reducedTagRecipesArray = reducedTagRecipesArray.filter((item) => item.ingredients.some(
    (ingredient) => ingredient.ingredient == selectedIngredient,
  )));

  selectedApplianceArray.forEach((selectedAppliance) =>
    reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
      item.appliance == selectedAppliance));

  selectedUstensilsArray.forEach((selectedUstensil) =>
    reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
      item.ustensils.some(
        (ustensil) => ustensil == selectedUstensil)));
  console.log('reducedTagRecipesArray APRES TAGS', reducedTagRecipesArray);
}

function ingredientsSearchBarFunction() {

  
  ingredientsSearchBar.addEventListener('input', function (e) {
    let ingredExp = new RegExp('' + e.target.value + '', 'gi');
    if (reducedTagRecipesArray.length == 0) { reducedTagRecipesArray = [].concat(recipesArray) }
    tagIngredientsArray = reducedTagRecipesArray.map(recipe => recipe.ingredients).flat();
    tagIngredientsArray = tagIngredientsArray.map(ingredient => ingredient.ingredient);
    tagIngredientsArray = [...new Set(tagIngredientsArray)].sort(function (a, b) {
      return a.localeCompare(b);
    });
    console.log("tagIngredientsArray",tagIngredientsArray);
    ingredientsList.innerHTML = '';
    tagIngredientsArray.forEach((ingredientElement) => {

      if (ingredExp.test(ingredientElement)) {
        console.log(ingredientElement,ingredExp.test(ingredientElement));
        ingredientsList.insertAdjacentHTML('beforeend',
          `<li class="ingredient-li">${ingredientElement}</li>`);
      }
    }
    );
    createIngredientsTag();
  }

  );
}

function applianceSearchBarFunction() {
  applianceSearchBar.addEventListener('input', function (e) {
    let applianceExp = new RegExp('' + e.target.value + '', 'gi');
    if (reducedTagRecipesArray.length == 0) { reducedTagRecipesArray = [].concat(recipesArray) }//on commence directement par cette recherche et pas de Tag sélectionnée
    tagApplianceArray = reducedTagRecipesArray.map(recipe => recipe.appliance).flat();
    tagApplianceArray = [...new Set(tagApplianceArray)].sort(function (a, b) {
      return a.localeCompare(b);
    });
    appliancesList.innerHTML = '';
    tagApplianceArray.forEach((applianceElement) => {

      if (applianceExp.test(applianceElement)) {
        console.log('Regex Test', applianceExp.test(applianceElement));
        appliancesList.insertAdjacentHTML('beforeend',
          `<li class="appliance-li">${applianceElement}</li>`);
      }
    }
    )
    createApplianceTag();
  }

  )
}

function ustensilsSearchBarFunction() {
  ustensilsSearchBar.addEventListener('input', function (e) {
    const ustenExp = new RegExp('' + e.target.value + '', 'gi');
    console.log('expression', ustenExp);
    if (reducedTagRecipesArray.length == 0) { reducedTagRecipesArray = [].concat(recipesArray) }//on commence directement par cette recherche et pas de Tag sélectionnée
    tagUstensilsArray = reducedTagRecipesArray.map(recipe => recipe.ustensils).flat();
    tagUstensilsArray = [...new Set(tagUstensilsArray)].sort(function (a, b) {
      return a.localeCompare(b);
    });
    ustensilsList.innerHTML = '';
    tagUstensilsArray.forEach((ustensilElement) => {

      if (ustenExp.test(ustensilElement)) {
        ustensilsList.insertAdjacentHTML('beforeend',
          `<li class="ustensil-li">${ustensilElement}</li>`);
      }
    }

    );
    createUstensilsTag();
  }

  )
}

function filtersInit() {
  addOptionsIngredients(recipesArray);
  addOptionsAppliance(recipesArray);
  addOptionsUstensils(recipesArray);
  createIngredientsTag();
  createApplianceTag();
  createUstensilsTag();
  searchBarFunction();
  ingredientsSearchBarFunction();
  applianceSearchBarFunction();
  ustensilsSearchBarFunction();
}

filtersInit();