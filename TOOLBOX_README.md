# Invert colors online - Online English Tools

A collection of useful online tools built on top of the AstroPaper Astro blog template.

## Features

### 🎨 Image Color Inverter
- **Upload and Process**: Drag & drop or click to upload images (JPG, PNG, GIF, WebP)
- **Real-time Preview**: See original and inverted images side by side
- **Privacy Protected**: All processing happens locally in your browser
- **Download Results**: Save the inverted image to your device
- **Mobile Friendly**: Responsive design works on all devices

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd astro-paper

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the site
npm run build

# Preview the build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── FileUpload.astro      # Reusable file upload component
│   ├── ImageInverter.astro   # Image inversion tool component
│   └── ...                   # Other existing components
├── layouts/
│   ├── ToolLayout.astro      # Layout for tool pages
│   └── ...                   # Other existing layouts
├── pages/
│   ├── tools/
│   │   ├── index.astro       # Tools homepage
│   │   └── image-inverter.astro  # Image inverter tool page
│   └── ...                   # Other existing pages
└── config.ts                 # Site configuration
```

## How It Works

### Image Color Inversion
The image color inversion tool uses HTML5 Canvas API to process images entirely in the browser:

1. **File Upload**: Users can drag & drop or click to select image files
2. **Canvas Processing**: The image is drawn to a canvas element
3. **Pixel Manipulation**: Each pixel's RGB values are inverted using the formula: `newValue = 255 - originalValue`
4. **Result Display**: The processed image is shown alongside the original
5. **Download**: Users can download the result as a PNG file

### Privacy & Security
- **Client-side Processing**: All image processing happens in the browser
- **No Server Upload**: Images never leave the user's device
- **No Data Collection**: No user data or images are stored or transmitted

## Technical Implementation

### Key Technologies
- **Astro**: Static site generator with component-based architecture
- **TypeScript**: Type-safe JavaScript for better development experience
- **TailwindCSS**: Utility-first CSS framework for styling
- **HTML5 Canvas**: For client-side image processing

### Browser Compatibility
- Modern browsers with Canvas API support
- File API support for drag & drop functionality
- ES6+ JavaScript features

## Customization

### Adding New Tools
1. Create a new component in `src/components/`
2. Add a new page in `src/pages/tools/`
3. Update the tools index page to include the new tool
4. Follow the existing patterns for consistency

### Styling
The project uses TailwindCSS with a custom theme that supports both light and dark modes. Colors are defined using CSS custom properties in `src/styles/global.css`.

## Testing

A test page is available at `/test-image-inverter` to verify the image inversion functionality works correctly.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is based on AstroPaper and follows its licensing terms.

## Support

For issues or questions:
1. Check the existing documentation
2. Test with the `/test-image-inverter` page
3. Open an issue with detailed information about the problem

## Future Enhancements

Potential features to add:
- More image processing tools (resize, crop, filters)
- Text processing utilities
- Color palette generators
- QR code generators
- Unit converters
- And more!
