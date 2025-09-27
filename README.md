# 🌟 The Career Constellation

An interactive 3D portfolio website that maps your projects and skills as a beautiful star constellation. Built with React, Three.js, and Framer Motion.

## ✨ Features

- **Interactive Star Map**: Navigate through a 3D space using drag, zoom, and rotate controls
- **Project Stars**: Each project is represented as a colored star with unique properties
- **The North Star**: Special "About Me" section positioned as the brightest guiding star
- **Constellation Lines**: Visual connections between related projects based on shared technologies
- **Smooth Animations**: Buttery smooth transitions, hover effects, and loading animations
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with cutting-edge web technologies

## 🚀 Technologies Used

- **Frontend**: React 19, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Styling**: Modern CSS with custom properties and animations

## 🎨 Theme Concept

**"The Career Constellation"** transforms your portfolio into an explorable night sky:

- Projects are **stars** with different colors representing different technology stacks
- Skills form **constellations** that connect related projects
- Your bio becomes the **North Star** - the brightest and most important star
- The dark space background creates an immersive, cosmic experience

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Customization

### Adding Your Projects

Edit `/src/data/portfolioData.js` to add your own projects:

```javascript
{
  id: 1,
  name: "Your Project Name",
  description: "Brief description of your project...",
  technologies: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/yourusername/project",
  liveUrl: "https://your-project-demo.com",
  position: [x, y, z], // 3D coordinates
  color: "#ff6b6b", // Star color
  size: 0.8, // Star size
  constellation: "frontend" // Skill category
}
```

### Updating About Me

Modify the `aboutMe` object in the same file:

```javascript
export const aboutMe = {
  name: "Your Name",
  title: "Your Professional Title",
  description: "Your bio and passion statement...",
  location: "Your Location",
  email: "your.email@example.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
};
```

### Customizing Colors and Styling

- Star colors are defined per project in the data file
- Global styling can be modified in `/src/index.css`
- Component-specific styles are in their respective files

## 🎯 Navigation Guide

- **Drag**: Rotate and explore the constellation
- **Scroll/Pinch**: Zoom in and out
- **Click Stars**: View detailed project information
- **Hover**: See quick project previews
- **North Star Button**: Quick access to About Me section

## 📁 Project Structure

```
src/
├── components/
│   ├── StarMap.jsx          # Main container component
│   ├── ConstellationScene.jsx # 3D scene with stars and connections
│   ├── Star.jsx             # Individual star component
│   ├── ProjectModal.jsx     # Project detail modal
│   ├── AboutModal.jsx       # About me modal
│   ├── NavigationUI.jsx     # UI overlay and controls
│   └── LoadingScreen.jsx    # Loading animation
├── data/
│   └── portfolioData.js     # Project and personal data
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css               # Global styles
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables

No environment variables are required for the basic setup. All data is defined in the `portfolioData.js` file.

## 🎨 Customization Ideas

1. **Add More Star Types**: Create different star shapes for different project categories
2. **Particle Effects**: Add shooting stars or nebula effects
3. **Sound Design**: Add subtle space ambience or interaction sounds
4. **Mobile Gestures**: Enhanced touch controls for mobile devices
5. **Dynamic Data**: Connect to a CMS or API for dynamic project loading
6. **Performance**: Add level-of-detail (LOD) for better performance with many projects

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

WebGL support is required for 3D graphics.

## 🤝 Contributing

Feel free to fork this project and make it your own! If you have suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Inspiration

This portfolio was inspired by the beauty of astronomy and the idea that every project is a star in the constellation of your career journey. Each star represents growth, learning, and the pursuit of excellence in technology.

---

**Made with ❤️ and lots of ⭐ by [Your Name]**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
