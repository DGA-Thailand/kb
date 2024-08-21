# DGA Resource Center

This repository contains the documentation website code and Markdown source files for kb.dga.or.th.

We build this website using Astro and its official documentation framework, [![Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build).

## Getting Started

### Prerequisites:

* Node.js and npm (or yarn) installed on your system. You can check your versions by running node -v and npm -v (or yarn -v) in your terminal.

### Running the Development Server:

1. Clone this repository or download the project files.
2. Open a terminal in the project directory.
3. Install dependencies:
    * Using npm: npm install
    * Using yarn: yarn install
4. Start the development server:
    * Using npm: npm run dev
    * Using yarn: yarn dev This will start the development server at http://localhost:4321/.   

### Building for Production:

Build the project for production:
* Using npm: npm run build
* Using yarn: yarn build This will create an optimized production build in the dist folder.

### Content Structure

This project uses the following folder structure:

```
.
├── README.md (You are here!)
├── astro.config.mjs  (Astro configuration file)
├── node_modules  (Dependency folder)
├── package.json  (Project dependencies and scripts)
├── public  (Static assets like favicons)
└── src  (Project source code)
    ├── assets  
    │   ├── images/  (Folder for images)
    │   └── files/   (Folder for files)
    ├── content  (Contains documentation content)
    │   └── docs  (Markdown files for documentation pages)
    │       ├── service  (Subfolder for each service)
    │       ├── index.mdx  (Homepage content)
    └── tsconfig.json  (TypeScript configuration file)
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Static assets, like favicons, can be placed in the `public/` directory.

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Contributing

Contents within kb.dga.or.th, and thus in this repo, are maintained by DGA staffs. If you have enquiries please contact contact@dga.or.th

### License

This project is licensed under the MIT License. See the LICENSE file for details.