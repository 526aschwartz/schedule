// Get references to HTML elements
const display = document.getElementById("json-display"); // where class info will be shown
const dropdown = document.getElementsByClassName("dropdown-content")[0]; // the dropdown menu
const links = dropdown.getElementsByTagName("a"); // all <a> links inside the dropdown
const friendNameDisplay = document.getElementById("friend-name"); // where selected friend's name appears

// Function to display all classes for the selected friend
const showClasses = (data) => {
  display.innerHTML = ""; // clear previous data

  // Sort classes alphabetically by period
  data.sort((a, b) => a.period.localeCompare(b.period));

  // Loop through each class in the data and display it
  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    display.insertAdjacentHTML("beforeend", `
      <div class="card">
        <h3>${c.period}</h3>
        <p><strong>${c.className}</strong></p>
        <p>${c.teacher}</p>
        <p>Room: ${c.roomNumber}</p>
        <p>${c.subjectArea}</p>
      </div>
    `);
  }
};

// Function that loads a friend's schedule when their name is clicked
const loadFriend = async (link) => {
  // Remove "selected" class from all links to clear previous highlight
  for (let i = 0; i < links.length; i++) links[i].classList.remove("selected");

  // Add "selected" class to the clicked link
  link.classList.add("selected");

  // Get the JSON file path from the data-file attribute
  const file = link.getAttribute("data-file");

  // Get the friend's name from the link text and display it on the screen
  const friendName = link.textContent.trim();
  friendNameDisplay.textContent = `Schedule for ${friendName}`;

  try {
    // Fetch the JSON data for the selected friend
    const response = await fetch(file);
    const data = await response.json();

    // Display the schedule data
    showClasses(data);
  } catch (err) {
    // Show an error message if the JSON file can’t be loaded
    display.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
    console.error(err);
  }
};

// Add event listeners to all dropdown links
// When a link is clicked, it loads that friend’s schedule
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => loadFriend(links[i]));
}

// Automatically load the first friend’s schedule when the page first loads
window.onload = () => {
  if (links.length > 0) loadFriend(links[0]);
};
