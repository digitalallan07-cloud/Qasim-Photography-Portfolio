# Qasim Saidi - Photography Portfolio

A high-end, cinematic portfolio website inspired by luxury fashion editorials and creative studio reels.

## 🎨 Features

- **Premium Design**: Minimal, bold, editorial aesthetic with dark/light contrast sections
- **Smooth Animations**: Scroll-based reveals, parallax effects, and subtle motion
- **Responsive**: Desktop-first design that adapts beautifully to mobile
- **Performance Optimized**: Vanilla JavaScript, modern CSS, no frameworks
- **SEO Ready**: Semantic HTML with proper meta tags and alt text

## 📁 File Structure

```
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Interactive animations and scroll effects
└── README.md       # This file
```

## 🖼️ Replacing Placeholder Images

The portfolio currently uses placeholder images from Unsplash. To add your actual portfolio images:

### Option 1: Use Sirv CDN (Recommended)

1. **Check Sirv Account Settings**:
   - Log in to your Sirv account at https://my.sirv.com
   - Go to Settings → Security
   - Enable "Allow direct access" or configure CORS settings
   - Ensure images are in a public folder

2. **Get Proper Image URLs**:
   - Navigate to your images in Sirv
   - Right-click and copy the direct link
   - URLs should look like: `https://qasimsaidi.sirv.com/portfolio/image.jpg`

3. **Update HTML**:
   - Replace placeholder URLs in `index.html` with your Sirv URLs
   - Images are located in three sections:
     - Featured Work (lines 47-81): 3 large hero images
     - Portfolio Grid (lines 91-149): 6 grid images
     - About Section (line 164): 1 portrait image

### Option 2: Local Images

1. Create an `images` folder in the project root
2. Add your images to the folder
3. Update image src attributes: `src="images/your-image.jpg"`

### Option 3: Alternative CDN

Use Cloudinary, Imgix, or upload directly to your GitHub repo:
```html
<img src="https://raw.githubusercontent.com/username/repo/main/images/photo.jpg" alt="Description">
```

## 🚀 Deployment

### GitHub Pages
1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select your branch and save
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repo for automatic deployments

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect and deploy

## ✏️ Customization

### Update Content
Edit `index.html` to change:
- Hero name and tagline (lines 23-28)
- Statement/quote (line 40)
- About section bio (lines 157-161)
- Services, Industries, Results (lines 168-196)
- Contact info (lines 204-206)

### Change Colors
Edit CSS variables in `style.css` (lines 15-20):
```css
--color-dark: #0a0a0a;
--color-light: #ffffff;
--color-gray: #6b6b6b;
--color-accent: #f5f5f5;
```

### Adjust Fonts
Update font families in CSS variables (lines 21-22):
```css
--font-heading: 'Playfair Display', 'Georgia', serif;
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
```

## 🔧 Technical Details

- **No frameworks required** - Pure HTML, CSS, JavaScript
- **Modern CSS**: CSS Grid, Flexbox, Custom Properties, clamp()
- **Animations**: Intersection Observer API for scroll reveals
- **Accessibility**: Semantic HTML, proper ARIA labels, reduced motion support
- **Performance**: Lazy loading, GPU-accelerated animations

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact

**Qasim Saidi**
E-commerce & Editorial Photographer

- Email: qasim.saidi5@gmail.com
- WhatsApp: +971 52 388 3643

---

## 🐛 Troubleshooting

### Images Not Loading from Sirv

If Sirv images show as broken:

1. **Check Sirv Security Settings**:
   - Ensure public access is enabled
   - Add allowed domains if using hotlink protection

2. **Verify URL Format**:
   - URLs should not have spaces or special characters
   - Use URL encoding for spaces: `%20`
   - Or rename files/folders to remove spaces

3. **Test Image URL**:
   - Open the image URL directly in your browser
   - If it doesn't load, the Sirv configuration needs updating

4. **Temporary Solution**:
   - Use placeholder images (current setup)
   - Or upload images directly to GitHub repo

### Animations Not Working

- Check browser console for JavaScript errors
- Ensure `script.js` is loading properly
- Test in different browsers

### Responsive Issues

- Clear browser cache
- Test in browser developer tools responsive mode
- Check viewport meta tag is present

---

**Built with ❤️ for fashion and lifestyle photography**
