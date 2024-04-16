const categories = [
    "Beef", "Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous", 
    "Pasta", "Pork", "Seafood","Starter", "Vegan", "Vegetarian"
];

async function getRandomDish() {
    try {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${randomCategory}`;

        const response = await fetch(url);
        const data = await response.json();

        const meals = data.meals;
        if (meals && meals.length > 0) {
            const randomMeal = meals[Math.floor(Math.random() * meals.length)];
            displayRandomMeal(randomMeal);
            console.log(randomMeal);
        } else {
            console.log('No dishes found for this category.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRandomMeal(randomMeal) {
    const randomFoodDiv = document.getElementById('randomFood');
    if (randomMeal) {
        const image = document.createElement('img');
        image.src = randomMeal.strMealThumb;
        image.alt = randomMeal.strMeal;

        const name = document.createElement('h3');
        name.textContent = randomMeal.strMeal;

        randomFoodDiv.innerHTML = '';

        randomFoodDiv.appendChild(image);
        randomFoodDiv.appendChild(name);
    } else {
        randomFoodDiv.innerHTML = 'No dishes found for this category.';
    }
}

window.onload = function() {
    getRandomDish();
};

async function handleSearch() {
    const searchInput = document.getElementById('foodInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.meals) {
            console.log(data.meals);
            displaySearchResults(data.meals);
        } else {
            const searchResultsDiv = document.getElementById('searchResults');
            searchResultsDiv.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displaySearchResults(dishes) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = ''; 

    dishes.forEach(dish => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const image = document.createElement('img');
        image.src = dish.strMealThumb;
        image.alt = dish.strMeal;

        const name = document.createElement('h3');
        name.textContent = dish.strMeal;

        resultItem.appendChild(image);
        resultItem.appendChild(name);

        searchResultsDiv.appendChild(resultItem);
    });
}
