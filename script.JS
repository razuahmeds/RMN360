
        // Product data
        const products = [
            {
                id: 1,
                name: "Premium Cotton Shirt",
                category: "shirts",
                price: 49.99,
                stock: 15,
                image: "https://www.londoncotton.in/cdn/shop/files/Silver_a7de9c84-6cc6-4942-82ec-0da21c8192a2_1500x.jpg?v=1750052868",
                description: "High-quality cotton shirt perfect for formal occasions"
            },
            {
                id: 2,
                name: "Casual T-Shirt",
                category: "shirts",
                price: 24.99,
                stock: 8,
                image: "https://shopnashopbd.com/wp-content/uploads/2024/09/china-polo-shirt-combo-46.jpg",
                description: "Comfortable casual t-shirt for everyday wear"
            },
            {
                id: 3,
                name: "Designer Jeans",
                category: "pants",
                price: 79.99,
                stock: 12,
                image: "https://3.imimg.com/data3/UQ/SD/MY-13039354/designer-jeans-500x500.jpg",
                description: "Stylish designer jeans with perfect fit"
            },
            {
                id: 4,
                name: "Formal Trousers",
                category: "pants",
                price: 59.99,
                stock: 0,
                image: "https://kaapus.com/cdn/shop/files/4R9A1394.jpg?v=1742218502",
                description: "Professional formal trousers for office wear"
            },
            {
                id: 5,
                name: "Silk Saree",
                category: "sarees",
                price: 149.99,
                stock: 6,
                image: "https://www.hatkay.com/cdn/shop/articles/Different-Types-of-Saree-Draping-for-a-Striking-Look.jpg?v=1669976386",
                description: "Beautiful silk saree with intricate designs"
            },
            {
                id: 6,
                name: "Cotton Saree",
                category: "sarees",
                price: 89.99,
                stock: 20,
                image: "https://images.meesho.com/images/products/311596902/bjpgx_512.webp",
                description: "Comfortable cotton saree for daily wear"
            },
            {
                id: 7,
                name: "Bridal Lehenga",
                category: "lehengas",
                price: 299.99,
                stock: 3,
                image: "https://dazzles.in/wp-content/uploads/2022/10/8-Different-Ways-to-Amp-Up-Your-Pink-Bridal-Lehenga-1010x1024.jpg",
                description: "Stunning three-piece bridal lehenga with heavy embroidery"
            },
            {
                id: 8,
                name: "Party Lehenga",
                category: "lehengas",
                price: 199.99,
                stock: 7,
                image: "https://sethnik.com/wp-content/uploads/2023/01/Indian-Bridal-Wedding-Designer-lehenga-choli-8.jpeg",
                description: "Elegant three-piece lehenga perfect for parties"
            },
            {
                id: 9,
                name: "Polo Shirt",
                category: "shirts",
                price: 39.99,
                stock: 18,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEsE9l45bogt80GPhQx_0jrst6bk8iKHEk6A&s",
                description: "Classic polo shirt for smart casual look"
            },
            {
                id: 10,
                name: "Chinos",
                category: "pants",
                price: 54.99,
                stock: 14,
                image: "https://emreco.com/cdn/shop/files/070713_navy_1_1_800x.jpg?v=1739462537",
                description: "Versatile chino pants for casual and semi-formal wear"
            }
        ];

        let cart = [];
        let currentFilter = 'all';

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            updateCartCount();
        });

        // Display products
        function displayProducts(productsToShow) {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';

            productsToShow.forEach(product => {
                const stockClass = product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : '';
                const stockText = product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`;
                
                const productCard = `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="stock-badge ${stockClass}">${stockText}</div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">$${product.price}</div>
                            <p class="product-description">${product.description}</p>
                            <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                `;
                productGrid.innerHTML += productCard;
            });
        }

        // Filter products
        function filterProducts(category) {
            currentFilter = category;
            
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter and display products
            const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product && product.stock > 0) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    if (existingItem.quantity < product.stock) {
                        existingItem.quantity++;
                    } else {
                        alert('Cannot add more items. Stock limit reached.');
                        return;
                    }
                } else {
                    cart.push({...product, quantity: 1});
                }
                
                updateCartCount();
                updateCartDisplay();
                
                // Show success message
                showNotification('Item added to cart!');
            }
        }

        // Update cart count
        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Update cart display
        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }

            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = `
                    <div class="cart-item">
                        <div>
                            <h4>${item.name}</h4>
                            <p>$${item.price} x ${item.quantity}</p>
                        </div>
                        <div>
                            <button onclick="removeFromCart(${item.id})" style="background: #dc3545; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                `;
                cartItems.innerHTML += cartItem;
            });

            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }

        // Toggle cart modal
        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
            updateCartDisplay();
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nYour order will be processed and you will receive a confirmation email shortly.`);
            
            // Clear cart
            cart = [];
            updateCartCount();
            updateCartDisplay();
            toggleCart();
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }

        // Show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close cart when clicking outside
        window.addEventListener('click', function(e) {
            const cartModal = document.getElementById('cartModal');
            if (e.target === cartModal) {
                toggleCart();
            }
        });

        // Add CSS animation for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
   