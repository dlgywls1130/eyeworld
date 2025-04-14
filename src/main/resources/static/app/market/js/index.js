document.addEventListener('DOMContentLoaded', function() {
    // All product data - in a real application, this would come from a database or API
    const products = [
        { id: 1, title: 'Adicolor Classics Joggers', category: 'dress', price: 63.85, image: 'product1.jpg' },
        { id: 2, title: 'Nike Sportswear Futura Luxe', category: 'bag', price: 130.00, image: 'product2.jpg' },
        { id: 3, title: 'Geometric Print Scarf', category: 'scarf', price: 53.00, image: 'product3.jpg', sale: true },
        { id: 4, title: 'Yellow Reserved Hoodie', category: 'dress', price: 155.00, originalPrice: 364.00, image: 'product4.jpg' },
        { id: 5, title: 'Basic Dress Green', category: 'dress', price: 236.00, image: 'product5.jpg', hot: true },
        { id: 6, title: 'Nike Air Zoom Pegasus', category: 'shoe', price: 198.00, originalPrice: 220.00, image: 'product6.jpg', sale: true },
        { id: 7, title: 'Nike Repel Miler', category: 'dress', price: 120.50, image: 'product7.jpg' },
        { id: 8, title: 'Nike Sportswear Futura Luxe', category: 'glasses', price: 160.00, image: 'product8.jpg' },
        { id: 9, title: 'Nike Sportswear Futura Luxe', category: 'glasses', price: 160.00, image: 'product9.jpg' },
        { id: 10, title: 'Nike Sportswear Futura Luxe', category: 'glasses', price: 160.00, image: 'product10.jpg' }
    ];

    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const productGrid = document.querySelector('.product-grid');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const tabNavLinks = document.querySelectorAll('.tab-nav li a');

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        // Clear search results
        searchResults.innerHTML = '';
        
        if (searchTerm.length > 0) {
            // Filter products based on search term
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
            
            // Display search results
            if (filteredProducts.length > 0) {
                searchResults.classList.add('active');
                
                filteredProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('search-item');
                    resultItem.textContent = product.title;
                    
                    // When clicking on a search result
                    resultItem.addEventListener('click', function() {
                        searchInput.value = product.title;
                        searchResults.classList.remove('active');
                        
                        // Filter grid to show only this product
                        filterProductGrid([product.id]);
                    });
                    
                    searchResults.appendChild(resultItem);
                });
            } else {
                const noResults = document.createElement('div');
                noResults.classList.add('search-item');
                noResults.textContent = 'No results found';
                searchResults.appendChild(noResults);
                searchResults.classList.add('active');
            }
        } else {
            // Hide search results if search term is empty
            searchResults.classList.remove('active');
            
            // Reset the product grid to show all products
            resetProductGrid();
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Category filtering functionality
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterProductsByCategory();
            
            // Log for debugging
            console.log('Filtering by category:', this.value, 'Checked:', this.checked);
        });
    });

    // Tab navigation functionality
    tabNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-nav li').forEach(li => {
                li.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.parentElement.classList.add('active');
            
            // Here you would typically load different content based on the tab
            // For this example, we'll just reset the product grid
            resetProductGrid();
        });
    });

    // Function to filter product grid by selected categories
    function filterProductsByCategory() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        console.log('Selected categories:', selectedCategories);
        
        // If no categories selected, show all products
        if (selectedCategories.length === 0) {
            resetProductGrid();
            return;
        }
        
        // Hide all products
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only products in selected categories
        selectedCategories.forEach(category => {
            const categoryCards = document.querySelectorAll(`.product-card[data-category="${category}"]`);
            console.log(`Found ${categoryCards.length} products in category: ${category}`);
            
            categoryCards.forEach(card => {
                card.style.display = 'block';
            });
        });
    }

    // Function to filter product grid to show only specific product IDs
    function filterProductGrid(productIds) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            // In our simplified example, we'll use the index + 1 as the product ID
            // In a real application, you would have data attributes for product IDs
            const productId = index + 1;
            
            if (productIds.includes(productId)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to reset product grid to show all products
    function resetProductGrid() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    }

    // Function to create a product card (for dynamic product creation)
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.setAttribute('data-category', product.category);
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image');
        
        const img = document.createElement('img');
        img.src = `/static/app/market/images/${product.image}`;
        img.alt = product.title;
        imageContainer.appendChild(img);
        
        // Add badge if product is on sale or hot
        if (product.sale || product.hot) {
            const badge = document.createElement('div');
            badge.classList.add('product-badge');
            if (product.hot) badge.classList.add('hot');
            badge.textContent = product.hot ? 'HOT' : 'SALE';
            imageContainer.appendChild(badge);
        }
        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('product-info');
        
        const title = document.createElement('h3');
        title.classList.add('product-title');
        title.textContent = product.title;
        
        const meta = document.createElement('div');
        meta.classList.add('product-meta');
        
        const category = document.createElement('span');
        category.classList.add('product-category');
        category.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        
        const price = document.createElement('span');
        price.classList.add('product-price');
        
        if (product.originalPrice) {
            const originalPrice = document.createElement('span');
            originalPrice.classList.add('original-price');
            originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
            
            const salePrice = document.createElement('span');
            salePrice.classList.add('sale-price');
            salePrice.textContent = `$${product.price.toFixed(2)}`;
            
            price.appendChild(originalPrice);
            price.appendChild(salePrice);
        } else {
            price.textContent = `$${product.price.toFixed(2)}`;
        }
        
        meta.appendChild(category);
        meta.appendChild(price);
        
        infoContainer.appendChild(title);
        infoContainer.appendChild(meta);
        
        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
        
        return card;
    }

    // Function to dynamically load products (for pagination or infinite scroll)
    function loadProducts(productsToLoad) {
        productsToLoad.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    // Initialize - set up the first tab as active
    document.querySelector('.tab-nav li').classList.add('active');
});