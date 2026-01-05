// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const cardsGrid = document.querySelector('.cards-grid');
const ratesTableBody = document.getElementById('ratesTableBody');
const testimonialsContainer = document.querySelector('.testimonials-container');
const tradeForm = document.getElementById('tradeForm');
const cardTypeSelect = document.getElementById('cardType');
const cardAmountInput = document.getElementById('cardAmount');
const calculatedValue = document.getElementById('calculatedValue');
const currentRate = document.getElementById('currentRate');
const tradeModal = document.getElementById('tradeModal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modalBody');

// Gift Cards Data
const giftCards = [
    { id: 1, name: 'Amazon', icon: 'fab fa-amazon', color: '#FF9900', rate: 850 },
    { id: 2, name: 'Apple', icon: 'fab fa-apple', color: '#A3AAAE', rate: 830 },
    { id: 3, name: 'Google Play', icon: 'fab fa-google-play', color: '#00C853', rate: 820 },
    { id: 4, name: 'Steam', icon: 'fab fa-steam', color: '#1A237E', rate: 840 },
    { id: 5, name: 'Visa', icon: 'fab fa-cc-visa', color: '#1A1F71', rate: 810 },
    { id: 6, name: 'iTunes', icon: 'fas fa-music', color: '#FB5BC5', rate: 825 }
];

// Rates Data
const rates = [
    { card: 'Amazon Gift Card', buyRate: '₦850/$', sellRate: '₦820/$', status: 'Available' },
    { card: 'Apple Gift Card', buyRate: '₦830/$', sellRate: '₦800/$', status: 'Available' },
    { card: 'Google Play Card', buyRate: '₦820/$', sellRate: '₦790/$', status: 'Available' },
    { card: 'Steam Wallet Code', buyRate: '₦840/$', sellRate: '₦810/$', status: 'Limited' },
    { card: 'Visa Prepaid Card', buyRate: '₦810/$', sellRate: '₦780/$', status: 'Available' },
    { card: 'iTunes Gift Card', buyRate: '₦825/$', sellRate: '₦795/$', status: 'Available' },
    { card: 'Sephora Gift Card', buyRate: '₦800/$', sellRate: '₦770/$', status: 'Limited' },
    { card: 'Nordstrom Card', buyRate: '₦790/$', sellRate: '₦760/$', status: 'Available' }
];

// Testimonials Data
const testimonials = [
    { 
        content: "NaijaCardTrade is the real deal! I sold my $100 Amazon card and got paid in less than 10 minutes. Highly recommended!", 
        author: "Chinedu O.", 
        location: "Lagos"
    },
    { 
        content: "As a frequent trader, I've tried many platforms but this one has the best rates and fastest payment. The customer service is exceptional.", 
        author: "Amina S.", 
        location: "Abuja"
    },
    { 
        content: "I was skeptical at first but decided to try with a $25 card. The process was smooth and payment came instantly. Will definitely trade again!", 
        author: "Emeka P.", 
        location: "Port Harcourt"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Populate gift cards
    populateGiftCards();
    
    // Populate rates table
    populateRatesTable();
    
    // Populate testimonials
    populateTestimonials();
    
    // Initialize trade form
    initTradeForm();
    
    // Initialize modal
    initModal();
    
    // Update calculated value when inputs change
    cardTypeSelect.addEventListener('change', updateCalculatedValue);
    cardAmountInput.addEventListener('input', updateCalculatedValue);
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
});

// Mobile Menu Toggle
function initMobileMenu() {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Populate Gift Cards
function populateGiftCards() {
    cardsGrid.innerHTML = '';
    
    giftCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.setAttribute('data-card', card.name.toLowerCase());
        cardElement.innerHTML = `
            <i class="${card.icon}" style="color: ${card.color};"></i>
            <h3>${card.name}</h3>
            <div class="rate">₦${card.rate}/$</div>
            <p>Best Rate</p>
        `;
        
        // Add click event to select card in form
        cardElement.addEventListener('click', function() {
            cardTypeSelect.value = card.name.toLowerCase();
            updateCalculatedValue();
            cardTypeSelect.focus();
            
            // Add visual feedback
            document.querySelectorAll('.card-item').forEach(item => {
                item.style.borderColor = 'transparent';
            });
            cardElement.style.borderColor = 'var(--primary)';
        });
        
        cardsGrid.appendChild(cardElement);
    });
}

// Populate Rates Table
function populateRatesTable() {
    ratesTableBody.innerHTML = '';
    
    rates.forEach(rate => {
        const row = document.createElement('tr');
        
        // Determine status class
        const statusClass = rate.status === 'Available' ? 'status-available' : 'status-limited';
        
        row.innerHTML = `
            <td>${rate.card}</td>
            <td><strong>${rate.buyRate}</strong></td>
            <td><strong>${rate.sellRate}</strong></td>
            <td><span class="status-badge ${statusClass}">${rate.status}</span></td>
            <td><button class="btn btn-primary btn-sm trade-btn" data-card="${rate.card.split(' ')[0].toLowerCase()}">Trade Now</button></td>
        `;
        
        ratesTableBody.appendChild(row);
    });
    
    // Add event listeners to trade buttons in table
    document.querySelectorAll('.trade-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cardType = this.getAttribute('data-card');
            cardTypeSelect.value = cardType;
            updateCalculatedValue();
            
            // Scroll to trade form
            document.getElementById('trade').scrollIntoView({ behavior: 'smooth' });
            
            // Highlight the selected card
            document.querySelectorAll('.card-item').forEach(item => {
                item.style.borderColor = 'transparent';
                if (item.getAttribute('data-card') === cardType) {
                    item.style.borderColor = 'var(--primary)';
                }
            });
        });
    });
}

// Populate Testimonials
function populateTestimonials() {
    testimonialsContainer.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        
        // Get initials for avatar
        const initials = testimonial.author.split(' ').map(name => name[0]).join('');
        
        testimonialElement.innerHTML = `
            <div class="testimonial-content">
                ${testimonial.content}
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.location}</p>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialElement);
    });
}

// Initialize Trade Form
function initTradeForm() {
    tradeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardType = cardTypeSelect.value;
        const cardAmount = cardAmountInput.value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        
        if (!cardType || !cardAmount || !paymentMethod) {
            alert('Please fill in all fields');
            return;
        }
        
        // Calculate payout
        const selectedCard = giftCards.find(card => card.name.toLowerCase() === cardType);
        const payout = selectedCard ? selectedCard.rate * cardAmount : 0;
        
        // Show modal with trade details
        showTradeModal(cardType, cardAmount, payout, paymentMethod);
    });
}

// Update Calculated Value
function updateCalculatedValue() {
    const cardType = cardTypeSelect.value;
    const cardAmount = parseFloat(cardAmountInput.value) || 0;
    
    if (cardType && cardAmount > 0) {
        const selectedCard = giftCards.find(card => card.name.toLowerCase() === cardType);
        
        if (selectedCard) {
            const payout = selectedCard.rate * cardAmount;
            calculatedValue.textContent = `₦${payout.toLocaleString('en-NG')}`;
            currentRate.textContent = `₦${selectedCard.rate}/$1`;
        }
    } else {
        calculatedValue.textContent = '₦0.00';
        currentRate.textContent = '₦0/$1';
    }
}

// Initialize Modal
function initModal() {
    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        tradeModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === tradeModal) {
            tradeModal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && tradeModal.style.display === 'flex') {
            tradeModal.style.display = 'none';
        }
    });
}

// Show Trade Modal
function showTradeModal(cardType, amount, payout, paymentMethod) {
    const cardName = cardType.charAt(0).toUpperCase() + cardType.slice(1);
    const formattedPayout = payout.toLocaleString('en-NG');
    
    modalBody.innerHTML = `
        <div class="trade-summary">
            <div class="summary-item">
                <span>Card Type:</span>
                <strong>${cardName} Gift Card</strong>
            </div>
            <div class="summary-item">
                <span>Card Amount:</span>
                <strong>$${amount}</strong>
            </div>
            <div class="summary-item">
                <span>Payout:</span>
                <strong class="payout">₦${formattedPayout}</strong>
            </div>
            <div class="summary-item">
                <span>Payment Method:</span>
                <strong>${paymentMethod === 'bank' ? 'Bank Transfer' : 
                          paymentMethod === 'airtime' ? 'Airtime' : 'Bitcoin'}</strong>
            </div>
            
            <div class="next-steps">
                <h4>Next Steps:</h4>
                <ol>
                    <li>Take clear pictures of your gift card (front and back)</li>
                    <li>Contact our support via WhatsApp with the card details</li>
                    <li>Wait for verification (usually 2-5 minutes)</li>
                    <li>Receive your payment to your selected method</li>
                </ol>
                
                <div class="contact-info">
                    <p><i class="fab fa-whatsapp"></i> WhatsApp: <strong>+234 801 234 5678</strong></p>
                    <p><i class="fas fa-envelope"></i> Email: <strong>support@naijacardtrade.com</strong></p>
                </div>
            </div>
            
            <button class="btn btn-primary btn-block" id="closeModalBtn">Got It!</button>
        </div>
    `;
    
    tradeModal.style.display = 'flex';
    
    // Add event listener to the close button in modal
    document.getElementById('closeModalBtn').addEventListener('click', function() {
        tradeModal.style.display = 'none';
        tradeForm.reset();
        updateCalculatedValue();
        
        // Reset card selection highlights
        document.querySelectorAll('.card-item').forEach(item => {
            item.style.borderColor = 'transparent';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simulate live rate updates (demo purposes)
setInterval(() => {
    // Randomly update one rate to simulate market changes
    const randomIndex = Math.floor(Math.random() * giftCards.length);
    const change = Math.random() > 0.5 ? 5 : -5;
    
    // Update the data
    giftCards[randomIndex].rate += change;
    
    // Update the display if this card is selected
    if (cardTypeSelect.value === giftCards[randomIndex].name.toLowerCase()) {
        updateCalculatedValue();
        
        // Update the card item display
        const cardItems = document.querySelectorAll('.card-item');
        cardItems[randomIndex].querySelector('.rate').textContent = 
            `₦${giftCards[randomIndex].rate}/$`;
    }
}, 15000); // Update every 15 seconds