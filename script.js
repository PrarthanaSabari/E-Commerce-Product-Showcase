document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const productGrid = document.querySelector('.product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortBySelect = document.getElementById('sort-by');
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.querySelector('.search-container');
    
    // Wishlist Selectors
    const wishlistNavIcon = document.getElementById('wishlist-nav-icon');
    const wishlistCount = document.getElementById('wishlist-count');
    const filterContainer = document.getElementById('filter-container');
    const heroSection = document.querySelector('.hero');
    const wishlistViewHeader = document.getElementById('wishlist-view-header');
    const backToShopBtn = document.getElementById('back-to-shop-btn');
    const emptyWishlistMessage = document.getElementById('empty-wishlist-message');
    
    // Cart Selectors
    const cartNavIcon = document.getElementById('cart-nav-icon');
    const cartPanel = document.getElementById('cart-panel');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Modal Selectors
    const modalOverlay = document.getElementById('productModal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnailsContainer = document.getElementById('modal-thumbnails');
    const modalLikeBtn = document.getElementById('modal-like-btn');
    const addToCartBtn = modalOverlay.querySelector('.add-to-cart-btn');

    // --- Data Management ---
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Cart Logic ---
    const addToCart = (productName) => {
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const productCard = document.querySelector(`.product-card[data-name="${productName}"]`);
            const product = {
                name: productName,
                price: productCard.dataset.price,
                image: productCard.querySelector('img').src,
                quantity: 1
            };
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        alert(`Added "${productName}" to your cart!`);
    };
    
    const removeFromCart = (productName) => {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    const updateQuantity = (productName, change) => {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productName);
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }
    };

    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
            return sum + (price * item.quantity);
        }, 0);
        return total.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
    };

    const renderCart = () => {
        cartItemsList.innerHTML = ''; 
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p id="empty-cart-message">Your cart is empty.</p>`;
            placeOrderBtn.disabled = true;
        } else {
            placeOrderBtn.disabled = false;
            cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-name="${item.name}">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-name="${item.name}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                         <p class="cart-item-price">${item.price}</p>
                         <button class="cart-item-remove-btn" data-name="${item.name}">
                            <svg><use href="#icon-trash"></use></svg>
                         </button>
                    </div>
                `;
                cartItemsList.appendChild(cartItemEl);
            });
        }
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartTotalAmount.textContent = calculateTotal();
    };

    const toggleCartPanel = () => {
        cartPanel.classList.toggle('active');
    };

    // --- Wishlist Logic ---
    const updateWishlistUI = () => {
        wishlistCount.textContent = wishlist.length;
        productCards.forEach(card => {
            const likeBtn = card.querySelector('.like-btn');
            likeBtn.classList.toggle('liked', wishlist.includes(card.dataset.name));
        });
        const modalLikeBtn = document.getElementById('modal-like-btn');
        if(modalOverlay.classList.contains('active')){
             modalLikeBtn.classList.toggle('liked', wishlist.includes(modalTitle.textContent));
        }
    };

    const toggleWishlistItem = (productName) => {
        const index = wishlist.indexOf(productName);
        if (index > -1) wishlist.splice(index, 1);
        else wishlist.push(productName);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
    };

    // --- Product Display Logic (Filtering & Sorting) ---
    const filterAndSortProducts = () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        productCards.forEach(card => {
            const isInCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
            card.classList.toggle('hide', !isInCategory);
        });
        
        const sortBy = sortBySelect.value;
        const cardsToSort = Array.from(productGrid.querySelectorAll('.product-card:not(.hide)'));
        cardsToSort.sort((a, b) => {
            if (sortBy === 'price-asc') return parseFloat(a.dataset.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.dataset.price.replace(/[^0-9.-]+/g,""));
            if (sortBy === 'price-desc') return parseFloat(b.dataset.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.dataset.price.replace(/[^0-9.-]+/g,""));
            if (sortBy === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name);
            return 0;
        }).forEach(card => productGrid.appendChild(card));
    };
    
    const showWishlistView = () => {
        heroSection.classList.add('hidden');
        filterContainer.classList.add('hidden');
        wishlistViewHeader.classList.remove('hidden');
        const hasLikedItems = wishlist.length > 0;
        emptyWishlistMessage.classList.toggle('hidden', !hasLikedItems);
        productCards.forEach(card => card.classList.toggle('hide', !wishlist.includes(card.dataset.name)));
    };
    
    const showShopView = () => {
        heroSection.classList.remove('hidden');
        filterContainer.classList.remove('hidden');
        wishlistViewHeader.classList.add('hidden');
        emptyWishlistMessage.classList.add('hidden');
        filterAndSortProducts();
    };
    
    // --- Event Listeners ---
    filterButtons.forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        filterAndSortProducts();
    }));

    sortBySelect.addEventListener('change', filterAndSortProducts);
    
    wishlistNavIcon.addEventListener('click', showWishlistView);
    backToShopBtn.addEventListener('click', showShopView);

    cartNavIcon.addEventListener('click', toggleCartPanel);
    cartCloseBtn.addEventListener('click', toggleCartPanel);
    
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        const name = target.dataset.name;
        if (target.classList.contains('cart-item-remove-btn')) removeFromCart(name);
        if (target.classList.contains('plus')) updateQuantity(name, 1);
        if (target.classList.contains('minus')) updateQuantity(name, -1);
    });

    placeOrderBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your order! Your items are on their way.');
            cart = []; 
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            toggleCartPanel();
        }
    });

    // Modal Listeners
    modalOverlay.querySelector('.modal-close').addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('active'); });
    addToCartBtn.addEventListener('click', () => {
        addToCart(modalTitle.textContent);
        modalOverlay.classList.remove('active');
    });
    modalLikeBtn.addEventListener('click', () => {
        toggleWishlistItem(modalTitle.textContent);
    });

    // Product Card Listener (for opening modal & liking)
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                toggleWishlistItem(card.dataset.name);
                if (!wishlistViewHeader.classList.contains('hidden')) showWishlistView();
                return;
            }

            // Open modal only if clicking on the main part of the card, not the overlay buttons
            if (!e.target.closest('button')) {
                 modalTitle.textContent = card.dataset.name;
                 modalPrice.textContent = card.dataset.price;
                 modalDescription.textContent = card.dataset.description;
                 const images = card.dataset.images.split(',');
                 modalMainImage.src = images[0];
                 updateWishlistUI();

                 modalThumbnailsContainer.innerHTML = '';
                 images.forEach((imgSrc, index) => {
                     const thumb = document.createElement('img');
                     thumb.src = imgSrc;
                     thumb.classList.toggle('active', index === 0);
                     thumb.addEventListener('click', () => {
                         modalMainImage.src = imgSrc;
                         modalThumbnailsContainer.querySelector('.active').classList.remove('active');
                         thumb.classList.add('active');
                     });
                     modalThumbnailsContainer.appendChild(thumb);
                 });
                 modalOverlay.classList.add('active');
            }
        });
    });

    // --- Initial Load ---
    updateWishlistUI();
    renderCart();
    filterAndSortProducts();
});