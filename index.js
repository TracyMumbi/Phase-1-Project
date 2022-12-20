// waits for the page to load so as to display
document.addEventListener("DOMContentLoaded", (event) => {
    //   console.log("DOM fully loaded and parsed");
  
    GetCategories();
  
  });
  
  function GetCategories() {
    //fetches all the categories from the api and displays the image and the name
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((resp) => resp.json())
      .then((item) => {
        item.categories.forEach((obj) => {
          let categoriesMenu = document.getElementById("typesmeals");
          let liCategories = document.createElement("li");
          let imageCategories = document.createElement("img");
          let mealDiv = document.createElement("div")
  
          //assign the value to the variable stated above
          liCategories.innerText = obj.strCategory;
          imageCategories.src = obj.strCategoryThumb;
  
          //console.log(data.strCategory)
          //appending it to the mealDiv so that it can be its container
          mealDiv.appendChild(imageCategories);
          mealDiv.appendChild(liCategories);

          categoriesMenu.appendChild(mealDiv)
        });
      });
  }
  //
  let searchBtnForm = document.getElementById("searchForm");
  
  searchBtnForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let searchItem = document.getElementById("searchItem").value;
    const result = capitalizeFirstLetter(searchItem);
    //fetching all meals from the api so that when searched it can display what is searched
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + result)
      .then((resp) => resp.json())
      .then((data) => {
       //when the searched item is not found it displays "No data found"
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
  
  //used the local api to fetch the data so that i can POST additional data to my site
 // fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Big mac")
 fetch("http://localhost:3000/meals")
  .then((resp) => resp.json())
    .then((data) => {
      //data.meals.forEach((item) => {
      data.forEach((item) => {
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
// code for posting the recipe that will be added
let newRecipe = document.getElementById("character-form");
let newInputs = document.querySelectorAll("#character-form div");
let nameInput = newInputs[0].childNodes[3];
let imageUrl = newInputs[1].childNodes[3];
console.log(nameInput.value)

newRecipe.addEventListener("submit", (e) => {
    e.preventDefault();
    //used the local api
    fetch(`http://localhost:3000/meals`, {
        method: "POST",
        body: JSON.stringify({
            "id": Math.round(Math.random() * 2.5),
            "strMeal": `${nameInput.value}`,
            "strMealThumb": `${imageUrl.value}`,
            "strArea": "",
            "strInstructions": "Have fun cooking",
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
})



