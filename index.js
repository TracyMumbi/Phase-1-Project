fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(resp => resp.json())
.then (data =>  {

    data.forEach(obj => {
        let categoriesMenu = document.getElementById("typesmeals")
        let liCategories = document.createElement("li")
        let imageCategories = document.createElement("img")

        liCategories.innerText = obj.strCategory
        imageCategories.src = obj.strCategoryThumb
        console.log(data.strCategory)

        categoriesMenu.appendChild(liCategories)
        categoriesMenu.appendChild(imageCategories)

    })
    // console.log(data)
})


fetch("http://localhost:3000/meals")
.then (resp => resp.json())
.then (data => {

    data.forEach(item => {
        // console.log(item)
        const meals = document.getElementById("meals")
        const liMeals = document.createElement("li")
        const imageMeals = document.createElement("img")
        const instructions = document.createElement("p")
        const areaUsed = document.createElement("p")
    
    
    
        liMeals.innerText = item.strMeal
        areaUsed.innerText = item.strArea
        imageMeals.src = item.strMealThumb
        instructions.innerText = item.strInstructions
        // areaUsed.innerText = item.strArea
        imageMeals.width = 450;
        imageMeals.height = 450;
        // console.log(data.strMeal)
    
        meals.appendChild(liMeals)
        meals.appendChild(areaUsed)
        meals.appendChild(imageMeals)
        meals.appendChild(instructions)
        //meals.appendChild(areaUsed)
    });


})