/**
 * Products Page JavaScript
 * Handles product interactions, search functionality, and UI elements
 */

// DOM Elements
const loder = document.querySelector(".loder");
const mobileNav = document.querySelector("#navbarsExample04");
const navheader = document.querySelector(".navbar-toggler");
const productCards = document.getElementsByClassName("products_card_l");
const buyModal = document.querySelector(".modal-buy");
const productContainer = buyModal.querySelector(".product");
const productImgContainer = productContainer.querySelector("img");
const productDescriptionContainer = productContainer.querySelector(".productBuyDescription");

// Search Elements
const searchBtn = document.querySelector("#search-button");
const searchModal = document.querySelector("#searchModal");
const searchBox = document.querySelector(".searchBox");
const searchInput = searchBox.querySelector("#searchInput");
const suggBox = searchBox.querySelector(".suggestionBox");

// Loading State Management
let time = 1000;
let setTime;

/**
 * Stops the loading animation after specified time
 * @param {number} newTime - Time in milliseconds to wait before stopping
 */
function stopLoading(newTime) {
    setTimeout(() => {
        time = setTime ?? 1000;
        loder.style = "display:none;";
        setTime = null;
    }, time);
}

/**
 * Starts the loading animation
 * @param {number} newTime - Time in milliseconds to show loading
 */
function startLoading(newTime) {
    loder.style = "display:flex";
    setTime = newTime;
    stopLoading(setTime);
}

// Initialise loading state
stopLoading();

/**
	* Handles product card click events
	* @param {Event} e - Click event object
	*/
const buttonPressed = (e) => {
	// Get product image and description
	let productImg = e.target.src === e.target.ownerDocument.activeElement.childNodes[1].childNodes[5].src
		? e.target.src
		: undefined;
	let productDescription = e.target.ownerDocument.activeElement.childNodes[3].innerHTML;

	// Show loading and modal
	startLoading(200);
	buyModal.classList.add("active-modal");

	// Set product image
	if (productImg) {
		productImgContainer.setAttribute("src", `${[productImg]}`);
	} else {
		productImgContainer.setAttribute(
			"src",
			`${e.target.ownerDocument.activeElement.children[0].childNodes[5].src}`
		);
	}

	// Set product description and form
	productDescriptionContainer.innerHTML = `
		<div class="flex-center-column">
			<div>
				${productDescription}
				<lable>
					Quantity 
					<select>
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</select>
				</lable> 
				<lable className="address">
					<input type="text" placeholder="Deliver to.." name="address">
				</lable>
			</div>
			<button id="buy">Buy</button>
		</div>`;
};

// Add click event listeners to product cards
for (let button of productCards) {
	button.addEventListener("click", buttonPressed);
}

/**
	* Closes the buy modal
	*/
function cancelModal() {
	buyModal.classList.remove("active-modal");
}

// Mobile Navigation Toggle
let navCount = 2;
navheader.addEventListener("click", () => {
	if (navCount % 2 == 0) {
		mobileNav.style = "display:block;";
	} else {
		mobileNav.style = "display:none;";
	}
	navCount++;
});

// Search Functionality
let seachClickCounter = 2;

/**
	* Toggles search box visibility
	*/
searchBtn.onclick = () => {
	searchInput.setAttribute("placeholder", `Recent: ${getData("recentSearch")}`);
	if (seachClickCounter % 2 == 0) {
		searchBox.classList.add("searchBox-active");
	} else {
		searchBox.classList.remove("searchBox-active");
	}
	seachClickCounter++;
};

/**
	* Handles search input changes
	* @param {Event} e - Input event object
	*/
searchInput.onkeyup = (e) => {
	let searchKey = e.target.value;

	if (searchKey.length) {
		// Filter suggestions based on input
		let arr = suggestions.filter((data) => {
			let lowerSearchKey = searchKey.toLocaleLowerCase();
			let loweCaseData = data.toLocaleLowerCase();
			return loweCaseData.startsWith(lowerSearchKey);
		});

		// Format suggestions as list items
		arr = arr.map((toConvertData) => `<li>${toConvertData}</li>`);

		// Display suggestions
		showSuggestions(arr);
		suggBox.classList.add("suggestionBox-active");

		// Add click handlers to suggestions
		let allDynamicList = suggBox.querySelectorAll("li");
		for (let i = 0; i < allDynamicList.length; i++) {
			allDynamicList[i].setAttribute("onclick", "select(this)");
		}
	} else {
		suggBox.classList.remove("suggestionBox-active");
	}
};

/**
	* Handles suggestion selection
	* @param {HTMLElement} ele - Selected suggestion element
	*/
function select(ele) {
	let selection = ele.textContent;
	saveData(selection);

	// Handle navigation based on selection
	switch (selection) {
		case "Leather Bag - Product":
		case "Leather Bagpack - Product":
		case "Leather Cap - Product":
		case "Leather Purse - Product":
		case "Products Page":
		case "Cap - Product":
		case "Bagpack - Product":
		case "Purse - Product":
			window.location.href = "./html/products.html";
			break;
		case "About Page":
		case "Contributors":
			window.location.href = "#about";
			break;
		case "Testimonials":
		case "Customer Review":
			window.location.href = "";
			break;
		case "Contact Us":
		case "How to contact for issue":
		case "How to report an issue":
			window.location.href = "#ContactUs";
			break;
	}

	suggBox.classList.remove("suggestionBox-active");
}

/**
	* Displays suggestions in the suggestion box
	* @param {Array} arr - Array of suggestion elements
	*/
function showSuggestions(arr) {
	let arrData;
	if (!arr.length) {
		let inputValue = searchInput.value;
		arrData = "<li>" + inputValue + " - not found 🙁</li>";
	} else {
		arrData = arr.join("");
	}
	suggBox.innerHTML = arrData;
}

/**
	* Saves search data to localStorage
	* @param {string} data - Data to save
	*/
function saveData(data) {
	localStorage.setItem("recentSearch", `${data}`);
}

/**
	* Retrieves search data from localStorage
	* @returns {string} Saved search data
	*/
function getData() {
	return localStorage.getItem("recentSearch");
}
