// ============================================
// PAYMENTS & CHECKOUT SCRIPT
// Paystack Integration Ready
// ============================================

const PAYMENT_CONFIG = {
    paystackPublicKey: 'your-paystack-public-key',
    currency: 'NGN',
    environment: 'development',
};

// ============================================
// PAYMENT INITIALIZATION
// ============================================

function initializePayments() {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    document.head.appendChild(script);
}

// ============================================
// PAYSTACK PAYMENT HANDLER
// ============================================

function initiatePaystackPayment(email, amount, metadata = {}) {
    const paystack = window.PaystackPop || null;
    
    if (!paystack) {
        console.error('Paystack library not loaded');
        return;
    }

    const handler = paystack.setup({
        key: PAYMENT_CONFIG.paystackPublicKey,
        email: email,
        amount: Math.round(amount * 100),
        currency: PAYMENT_CONFIG.currency,
        ref: generateReference(),
        metadata: {
            custom_fields: [
                {
                    display_name: 'Order Items',
                    variable_name: 'items',
                    value: JSON.stringify(metadata.items || []),
                },
            ],
            ...metadata,
        },
        onClose: function () {
            alert('Payment window closed.');
        },
        callback: function (response) {
            handlePaymentSuccess(response);
        },
    });

    handler.openIframe();
}

// ============================================
// PAYMENT UTILITIES
// ============================================

function generateReference() {
    return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function handlePaymentSuccess(response) {
    console.log('Payment successful:', response);
    alert(`Payment successful! Reference: ${response.reference}`);
}

function handlePaymentError(error) {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
}

// ============================================
// CHECKOUT FORM
// ============================================

function processCheckout(event) {
    event.preventDefault();

    const email = document.getElementById('customer-email')?.value;
    const firstName = document.getElementById('customer-first-name')?.value;
    const lastName = document.getElementById('customer-last-name')?.value;

    if (!email || !firstName || !lastName) {
        alert('Please fill in all required fields');
        return;
    }

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);

    initiatePaystackPayment(email, total, {
        firstName: firstName,
        lastName: lastName,
        items: state.cart,
    });
}

// ============================================
// ORDER PROCESSING
// ============================================

function verifyPayment(reference) {
    return fetch(`/api/verify-payment/${reference}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                processOrder(data.order);
            } else {
                handlePaymentError(data.error);
            }
        })
        .catch(error => console.error('Verification error:', error));
}

function processOrder(orderData) {
    console.log('Processing order:', orderData);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePayments);
} else {
    initializePayments();
}