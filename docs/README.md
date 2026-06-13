# Soulful Media World - Documentation

## Project Overview

Soulful Media World is a modular digital ecosystem for structured content, digital products, and creator-driven marketplaces. The platform combines automation, payments, and scalable architecture into one unified system.

## Directory Structure

```
Soulful-media-world.com/
├── index.html                 # Landing page
├── marketplace.html           # Product listing page
├── product.html              # Single product page
├── signal.html               # Single signal page
├── about.html                # About page
├── src/
│   ├── pages/               # Page components
│   ├── components/          # Reusable components
│   ├── styles/              # CSS stylesheets
│   │   ├── main.css        # Main stylesheet
│   │   ├── marketplace.css # Marketplace styles
│   │   └── product.css     # Product page styles
│   └── scripts/             # JavaScript files
│       ├── app.js          # Main app logic
│       ├── marketplace.js  # Marketplace logic
│       ├── products.js     # Product page logic
│       └── payments.js     # Payment integration
├── public/
│   ├── assets/              # Images, logos, icons
│   └── downloads/           # Downloadable files
├── data/
│   ├── products.json       # Product data
│   ├── signals.json        # Signal data
│   └── creators.json       # Creator profiles
└── docs/                    # Documentation
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS (no framework)
- **Data**: JSON files
- **Payments**: Paystack integration (ready)
- **Architecture**: Modular, scalable

## Features

### Core Features
1. **Product Marketplace** - Browse and purchase digital products
2. **Market Signals** - Real-time insights and analysis
3. **Creator Profiles** - Creator information and products
4. **Shopping Cart** - Add/remove products
5. **Responsive Design** - Mobile-friendly interface

### Planned Features
1. **Paystack Payments** - Secure payment processing
2. **User Authentication** - Sign up and login
3. **Product Downloads** - Digital product delivery
4. **Creator Dashboard** - Manage products and sales
5. **Analytics** - Sales and performance tracking

## Getting Started

### Setup

1. Clone the repository
2. No build process required - pure HTML/CSS/JS
3. Serve files locally or deploy to hosting

### Local Development

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Access the site at `http://localhost:8000`

## API Integration Points

### Paystack Integration

Update the payment configuration in `src/scripts/payments.js`:

```javascript
const PAYMENT_CONFIG = {
    paystackPublicKey: 'your-paystack-public-key',
    currency: 'NGN',
    environment: 'production',
};
```

### Backend Endpoints (To be implemented)

- `POST /api/verify-payment/:reference` - Verify payment
- `POST /api/create-order` - Create order
- `GET /api/products` - Fetch products
- `GET /api/signals` - Fetch signals
- `GET /api/creators/:id` - Fetch creator details

## Styling Guide

### Color Scheme
- Primary: `#8b5cf6` (Purple)
- Secondary: `#ec4899` (Pink)
- Accent: `#06b6d4` (Cyan)
- Dark Background: `#0f172a`
- Light Background: `#f8fafc`

### Typography
- Font Family: System fonts (Apple/Google)
- H1: 2.5rem
- H2: 2rem
- Body: 1rem (16px)

## Component Documentation

### Navbar
- Location: Rendered by `renderNavbar()` in `app.js`
- Features: Logo, navigation menu, cart count

### Product Card
- Function: `createProductCard(product)`
- Displays: Image, title, description, price, rating

### Signal Card
- Function: `createSignalCard(signal)`
- Displays: Title, timestamp, content preview, read more link

## Data Structure

### Product Object
```json
{
  "id": 1,
  "title": "Product Title",
  "description": "Product description",
  "category": "courses",
  "price": 49.99,
  "rating": 4.8,
  "image": "/public/assets/product-1.jpg",
  "creatorId": 1,
  "includes": ["Feature 1", "Feature 2"],
  "created": "2026-01-15"
}
```

### Signal Object
```json
{
  "id": 1,
  "title": "Signal Title",
  "content": "Signal content",
  "category": "market-analysis",
  "level": "intermediate",
  "timestamp": "2026-06-13",
  "creatorId": 1
}
```

### Creator Object
```json
{
  "id": 1,
  "name": "Creator Name",
  "bio": "Creator bio",
  "avatar": "/public/assets/creator-1.jpg",
  "email": "email@example.com",
  "website": "https://website.com",
  "twitter": "https://twitter.com/handle",
  "productsCount": 5,
  "totalStudents": 2500
}
```

## Deployment

The site can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting provider

No backend required for initial deployment.

## Next Steps

1. [ ] Add product images and assets
2. [ ] Implement Paystack payment integration
3. [ ] Build backend API
4. [ ] Set up user authentication
5. [ ] Add product download functionality
6. [ ] Create admin dashboard
7. [ ] Set up email notifications
8. [ ] Deploy to production

## Contributing

To contribute:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT License - See LICENSE file for details

## Support

For support, contact: support@soulfulmediaworld.com