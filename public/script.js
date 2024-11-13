// 
/**
 * E-Commerce Dashboard
 *
 * @version     1.0.0
 * @author      JohnDev19
 * @copyright   2024 JohnDev19
 * @license     MIT License
 *
 * Description:
 * This script contains the Vue.js functionality for the Advanced
 * E-Commerce Dashboard. It manages the application state, handles
 * user interactions, and communicates with the backend API for
 * dynamic content loading. The dashboard features product browsing,
 * a shopping cart, and user notifications.
 *
 * Features:
 * - Reactive data binding with Vue.js
 * - Product search and filtering
 * - Shopping cart management with stock control
 * - User notifications for cart actions
 * - Dropdown menu for user profile
 * - Smooth scrolling for anchor links
 * - Responsive sidebar toggle
 *
 * Technologies:
 * - Vue.js (2.x)
 *
 * Last updated: November 2024
 */
 new Vue( {
  el: '#app',
  data: {
    searchQuery: '',
    dropdownVisible: false,
    cartVisible: false,
    products: [{
      id: 1,
      name: 'Premium Wireless Headphones',
      description: 'High-quality noise-cancelling wireless headphones with premium sound',
      price: 299.99,
      rating: 4.5,
      stock: 15,
      image: 'img/product1.jpg'
    },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracker with heart rate monitoring and GPS',
        price: 199.99,
        rating: 4.8,
        stock: 23,
        image: 'img/product2.jpg'
      },
      {
        id: 3,
        name: 'Professional Camera Lens',
        description: '50mm f/1.8 prime lens for professional photography',
        price: 449.99,
        rating: 4.7,
        stock: 8,
        image: 'img/product3.jpg'
      },
      {
        id: 4,
        name: 'Ultra-slim Laptop',
        description: '13-inch lightweight laptop with all-day battery life',
        price: 1299.99,
        rating: 4.6,
        stock: 12,
        image: 'img/product4.jpg'
      },
      {
        id: 5,
        name: 'Smart Home Hub',
        description: 'Central control unit for all your smart home devices',
        price: 149.99,
        rating: 4.4,
        stock: 31,
        image: 'img/product5.jpg'
      },
      {
        id: 6,
        name: 'Wireless Gaming Mouse',
        description: 'High-precision wireless gaming mouse with RGB lighting',
        price: 79.99,
        rating: 4.9,
        stock: 45,
        image: 'img/product6.jpg'
      }],
    cart: [],
    notifications: []
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },
    cartItemCount() {
      return this.cart.length;
    }
  },
  methods: {
    addToCart(product) {
      if (product.stock > 0) {
        this.cart.push({
          ...product
        });
        product.stock--;
        this.showNotification('Product added to cart successfully!', 'success');
        this.cartVisible = true;
      } else {
        this.showNotification('Sorry, this product is out of stock.', 'error');
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        this.cart.splice(index, 1);
        const product = this.products.find(p => p.id === item.id);
        if (product) {
          product.stock++;
        }
        this.showNotification('Product removed from cart.', 'info');
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
      if (this.dropdownVisible) {
        this.cartVisible = false;
      }
    },
    toggleCart() {
      this.cartVisible = !this.cartVisible;
      if (this.cartVisible) {
        this.dropdownVisible = false;
      }
    },
    showNotification(message, type = 'info') {
      const notification = {
        id: Date.now(),
        message,
        type
      };
      this.notifications.push(notification);
      setTimeout(() => {
        const index = this.notifications.findIndex(n => n.id === notification.id);
        if (index > -1) {
          this.notifications.splice(index, 1);
        }
      },
        3000);
    },
    formatPrice(price) {
      return price.toLocaleString('en-US',
        {
          style: 'currency',
          currency: 'USD'
        });
    }
  },
  mounted() {
    document.addEventListener('click',
      (e) => {
        if (!e.target.closest('.user-profile')) {
          this.dropdownVisible = false;
        }
      });

    this.showNotification('Welcome to E-Commerce Pro!',
      'success');
  }
});

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const container = document.querySelector('.container');
  sidebar.classList.toggle('active');
  container.classList.toggle('active');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click',
    function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
});

// Sidebar handling
window.addEventListener('resize', () => {
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');
    sidebar.classList.remove('active');
    container.classList.remove('active');
  }
});