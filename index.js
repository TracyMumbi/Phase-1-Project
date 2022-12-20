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
          let mealDiv = document.createElement("div")
  
          liCategories.innerText = obj.strCategory;
          imageCategories.src = obj.strCategoryThumb;
  
          //console.log(data.strCategory)
  
          mealDiv.appendChild(imageCategories);
          mealDiv.appendChild(liCategories);

          categoriesMenu.appendChild(mealDiv)
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
    // imageMeals.style.width = "100%";
    // imageMeals.height = 750;
    imageMeals.style.objectFit = "cover";
    // console.log(data.strMeal)
  
    meals.appendChild(liMeals);
    meals.appendChild(areaUsed);
    meals.appendChild(imageMeals);
    meals.appendChild(instructions);
    //meals.appendChild(areaUsed)
  }

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  // let submitBtn = document.getElementsByClassName("btn btn-primary")

  // submitBtn.addEventListener("click",() => {
    
  // })



