# Soulful Media World

A modular digital ecosystem for structured content, digital products, and creator-driven marketplaces.

## Overview

Soulful Media World combines automation, payments, and scalable architecture into one unified system for:
- Digital product marketplace
- Creator profiles and portfolios
- Market signals and insights
- Secure payment processing
- Community engagement

## Quick Start

### Requirements
- Modern web browser
- Local server (Python, Node, or PHP)
- Text editor

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/akpadiahashamballa-prog/Soulful-media-world.com.git
   cd Soulful-media-world.com
   ```

2. Start a local server
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js
   npx http-server -p 8000
   ```

3. Open http://localhost:8000 in your browser

## Project Structure

```
├── index.html              # Landing page
├── marketplace.html        # Product marketplace
├── product.html           # Product detail page
├── signal.html            # Signal detail page
├── about.html             # About page
├── src/
│   ├── styles/           # CSS stylesheets
│   ├── scripts/          # JavaScript files
│   ├── pages/            # Page components
│   └── components/       # Reusable components
├── public/
│   ├── assets/          # Images and logos
│   └── downloads/       # Product files
├── data/                # JSON data files
│   ├── products.json
│   ├── signals.json
│   └── creators.json
└── docs/               # Documentation
```

## Features

✅ Responsive design
✅ Product marketplace
✅ Search and filtering
✅ Creator profiles
✅ Market signals
✅ Shopping cart
🔄 Paystack integration (ready)
🔄 User authentication (planned)
🔄 Product downloads (planned)

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables
- **JavaScript** - Vanilla JS (no frameworks)
- **JSON** - Data storage
- **Paystack** - Payment integration

## Configuration

Update Paystack key in `src/scripts/payments.js`:

```javascript
const PAYMENT_CONFIG = {
    paystackPublicKey: 'your-key-here',
    currency: 'NGN',
    environment: 'production',
};
```

## Pages

- **index.html** - Homepage with featured products and signals
- **marketplace.html** - Product listing with search and filters
- **product.html** - Product details with creator info
- **signal.html** - Signal/insight detail page
- **about.html** - Information about the platform

## Customization

### Colors
Edit CSS variables in `src/styles/main.css`:

```css
:root {
    --primary-color: #8b5cf6;
    --secondary-color: #ec4899;
    --accent-color: #06b6d4;
}
```

### Data
Update JSON files in `data/` directory:
- `products.json` - Product listings
- `signals.json` - Market signals
- `creators.json` - Creator profiles

## Deployment

### Netlify
```bash
netlify deploy --prod --dir .
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch as source

## Documentation

See [docs/README.md](docs/README.md) for detailed documentation.

## License

MIT © 2026 Soulful Media World

## Support

For support or questions:
- Email: support@soulfulmediaworld.com
- GitHub: [Create an issue](https://github.com/akpadiahashamballa-prog/Soulful-media-world.com/issues)

---

Built with ❤️ for conscious creators and entrepreneurs.