// Define global variables for food and activity data
let foods = [];
let activities = [];

// Function to fetch and load food data from JSON
async function loadFoods() {
  try {
    const response = await fetch("./data/foods.json");
    const data = await response.json();
    foods = data;
  } catch (error) {
    console.error("Error loading foods:", error);
  }
}

// Function to fetch and load activity data from JSON
async function loadActivities() {
  try {
    const response = await fetch("./data/activities.json");
    const data = await response.json();
    activities = data.activities; // Assign activities array from JSON
  } catch (error) {
    console.error("Error loading activities:", error);
  }
}

// Initialize the application after data is loaded
async function initializeApp() {
  try {
    await loadFoods();
    await loadActivities();
    // Both foods and activities are loaded, now call calculateCalories
    calculateCalories();
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

// Call initializeApp to start loading data and initializing the application
initializeApp();

// Function to calculate calories burned based on activity
function calculateCaloriesBurned(activity, duration, weight) {
  // Find activity in activities array
  const selectedActivity = activities.find(
    (item) => item.name.toLowerCase() === activity.toLowerCase()
  );
  if (!selectedActivity) {
    console.error(`Activity '${activity}' not found.`);
    return 0;
  }

  const caloriesPerMinute = selectedActivity.caloriesPerMinute;
  return caloriesPerMinute * duration;
}

// Function to calculate BMR using Revised Harris-Benedict Equation (1984 revision)
function calculateBMR(weight, height) {
  return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * 25; // Example calculation
}

// Function to calculate calories based on selected food and activity
function calculateCalories() {
  // Check if foods and activities are loaded
  if (foods.length === 0 || activities.length === 0) {
    console.error("Foods or activities not loaded.");
    return;
  }

  // Retrieve inputs
  const selectedFoodName = document.getElementById("foodInput").value.trim();
  const selectedActivity = document
    .getElementById("activityInput")
    .value.trim();
  const duration = parseInt(document.getElementById("duration").value) || 0;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;

  // Validate inputs
  if (weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height values.");
    return;
  }

  // Calculate BMR using Revised Harris-Benedict Equation
  const bmr = calculateBMR(weight, height);

  // Find selected food's calories
  const food = foods.find(
    (item) => item.name.toLowerCase() === selectedFoodName.toLowerCase()
  );
  const foodCalories = food ? food.calories : 0;

  // Calculate calories burned from activity
  const caloriesBurned = calculateCaloriesBurned(
    selectedActivity,
    duration,
    weight
  );

  // Calculate net calories
  const netCalories = foodCalories - caloriesBurned;

  // Display result in HTML
  const resultElement = document.getElementById("caloriesResult");
  if (resultElement) {
    resultElement.innerHTML = `
      <p><strong>Calories Consumed from ${selectedFoodName}: </strong>${foodCalories} kcal</p>
      <p><strong>Calories Burned from ${selectedActivity} (${duration} minutes): </strong>${caloriesBurned} kcal</p>
      <p><strong>Net Calories: </strong>${netCalories} kcal</p>
      <p><strong>BMR (Basal Metabolic Rate): </strong>${bmr.toFixed(
        2
      )} kcal/day</p>
    `;
  } else {
    console.error("caloriesResult element not found.");
  }
}
