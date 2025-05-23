"use strict";

/**
 * Sets the theme for the website
 * @param {string} themeName 
 */
function setTheme(themeName) {
	localStorage.setItem("theme", themeName);
	document.documentElement.className = themeName === "dark" ? "dark-mode" : "light-mode";
}

/**
 * Sets the user's preferred theme based on their system preferences or saved preference
 */
function setUserPreference() {
	const theme = localStorage.getItem("theme");
	if (theme) return setTheme(theme);

	const doesUserPreferDarkMode = window.matchMedia(["(prefers-color-scheme: dark)"]).matches;
	doesUserPreferDarkMode ? setTheme("dark") : setTheme("light");
}

/**
 * Toggles between dark and light themes
 */
function toggleTheme() {
	const currentTheme = localStorage.getItem("theme");
	const themeToSet = currentTheme === "dark" ? "light" : "dark";
	setTheme(themeToSet);
}

// Initialise theme when the page loads
window.addEventListener('load', function() {
	setUserPreference();

	const toggleThemeBtn = document.querySelector(".toggle-theme-btn");

	toggleThemeBtn && toggleThemeBtn.addEventListener("click", toggleTheme);
})
