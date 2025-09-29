# E-Commerce-Product-Showcase
E-Commerce-Product-Showcase

Welcome to ShopNest Collections, a fully responsive, front-end e-commerce template built with vanilla HTML, CSS, and JavaScript. This project serves as a clean, modern, and interactive storefront designed to showcase a variety of artisanal products. It's a lightweight and dependency-free solution perfect for small businesses, portfolios, or as a capstone project.

 Live Demo
 https://prarthanasabari.github.io/E-Commerce-Product-Showcase/

Key Features
Fully Responsive Design: A mobile-first approach ensures a seamless experience on desktops, tablets, and smartphones.

Dynamic Product Grid:
Category Filtering: Instantly filter products by categories like Ceramics, Textiles, Jewelry, and Home Goods.
Advanced Sorting: Sort the displayed items by Price (Low to High, High to Low) or Name (A-Z).
Live Search: A real-time search bar to find products by name.
Interactive Product Cards:
Hover Effect: Product name and price appear on a stylish overlay when hovering.
Details Modal: Click a product to open a detailed pop-up view with a carousel of images, a full description, and purchase options.

Persistent Wishlist:
"Like" products by clicking the heart icon.
Liked items are saved to a dedicated Wishlist page.
Uses browser localStorage to remember the user's wishlist even after closing the tab.

Functional Shopping Cart:
Add to Cart: Add products from the main page or the details modal.
Quantity Management: Increase or decrease the quantity of each item directly in the cart.
Real-time Total: The total amount is automatically recalculated with every change.
Remove Items: Easily remove items from the cart.
Persistent State: The cart's contents are also saved in localStorage, so users won't lose their selections.

Technologies Used
HTML5: For the semantic structure and content of the website.
CSS3: For all styling, layout, responsiveness, and animations.
CSS Variables: For easy theme management and consistency in colors and fonts.
Flexbox & Grid: For creating robust and responsive layouts.
JavaScript (ES6+): For all dynamic functionality, DOM manipulation, and state management without any external libraries.
Local Storage API: To persist user data (cart and wishlist) on the client-side.

Project Structure
The project is intentionally kept simple and easy to navigate:
├── index.html      # The main HTML file containing all page structure.
├── style.css       # All CSS styles for layout, theme, and responsiveness.
├── script.js       # All JavaScript for interactivity and application logic.
└── README.md       # This file.

Screenshots:
<img width="1824" height="834" alt="image" src="https://github.com/user-attachments/assets/6a360cab-6bb3-44da-93d5-1c68df40cbd1" />
<img width="1962" height="887" alt="image" src="https://github.com/user-attachments/assets/0e0822e0-1e0c-49ac-b61c-9f30550d9f6f" />
<img width="1878" height="860" alt="image" src="https://github.com/user-attachments/assets/5f49c3a9-eb71-4d81-a390-e67fbca373d0" />

Code Overview
index.html:
Contains the semantic structure for all major components: header, hero, filters, product grid, modal, and cart.
Product information (name, price, images, description, category) is stored in data-* attributes on each product card for easy access and manipulation by JavaScript.

style.css:
Organized into logical sections for global styles, header, product grid, modal, cart, etc.
Uses @media queries to handle responsive adjustments for tablet and mobile screen sizes, ensuring a great look on any device.

script.js:
All logic is contained within a DOMContentLoaded event listener to ensure the script runs after the page is fully loaded.
State Management: The wishlist and cart arrays are the "single source of truth." They are loaded from localStorage on startup and saved back to it after any modification.
Dynamic Rendering: Functions like renderCart() and filterAndSortProducts() are responsible for dynamically updating the DOM based on the current state, ensuring the UI always reflects the underlying data.
