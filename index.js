document.addEventListener("DOMContentLoaded", (event) => {
    //   console.log("DOM fully loaded and parsed");
  
    GetCategories();
  
  });
  
  function GetCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((resp) => resp.json())
      .then((item) => {
        item.categories.forEach((obj) => {
          let categoriesMenu = document.getElementById("typesmeals");
          let liCategories = document.createElement("li");
          let imageCategories = document.createElement("img");
  
          liCategories.innerText = obj.strCategory;
          imageCategories.src = obj.strCategoryThumb;
  
          //console.log(data.strCategory)
  
          categoriesMenu.appendChild(liCategories);
          categoriesMenu.appendChild(imageCategories);
        });
      });
  }
  
  let searchBtnForm = document.getElementById("searchForm");
  
  searchBtnForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let searchItem = document.getElementById("searchItem").value;
    const result = capitalizeFirstLetter(searchItem);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + result)
      .then((resp) => resp.json())
      .then((data) => {
       // hideLoading()
        if (data.meals == null) {
          alert("No data found");
        } else {
          data.meals.forEach((item) => {
            setToHtml(item, true);
          });
        }
      });
  });
  
  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }
  
  
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Big mac")
  .then((resp) => resp.json())
    .then((data) => {
      data.meals.forEach((item) => {
        setToHtml(item,false);
      });
    });
  
  function setToHtml(item, reset) {
    const meals = document.getElementById("meals");
    const liMeals = document.createElement("li");
    const imageMeals = document.createElement("img");
    const instructions = document.createElement("p");
    const areaUsed = document.createElement("p");
  
    if (reset == true) {
      meals.innerHTML = "";
    }
  
    liMeals.innerText = item.strMeal;
    areaUsed.innerText = item.strArea;
    imageMeals.src = item.strMealThumb;
    instructions.innerText = item.strInstructions;
    // areaUsed.innerText = item.strArea
    imageMeals.width = 450;
    imageMeals.height = 450;
    // console.log(data.strMeal)
  
    meals.appendChild(liMeals);
    meals.appendChild(areaUsed);
    meals.appendChild(imageMeals);
    meals.appendChild(instructions);
    //meals.appendChild(areaUsed)
  }