# NPM Registry Manager

A desktop application built with Tauri and React to easily switch between npm registries. This tool helps you manage multiple npm registry configurations in your `.npmrc` file with color-coding and easy switching.

## Features

- Switch between different npm registries with a single click
- Add custom registries with color-coding for easy identification
- View and manage all your configured registries
- Automatic detection of your current registry configuration
- Color-coded registry indicators for visual identification

## Installation

### Windows

1. Download the latest Windows installer (`NPM Registry Manager_x.x.x_x64-setup.exe`) from the releases page
2. Run the installer and follow the prompts
3. Launch NPM Registry Manager from your Start menu

## Usage

1. Launch the application
2. View your current registry configuration at the top
3. Select a different registry from the dropdown to switch
4. Add new custom registries with the form at the bottom
5. Each registry can be assigned a custom color for easy identification

## Project Structure

```
/src
  /components         # UI components
    CurrentRegistry.tsx  # Shows current registry status
    Footer.tsx           # App footer
    Header.tsx           # App header
    Layout.tsx           # Main layout wrapper
    RegistrySelector.tsx # Registry selection dropdown
    Toast.tsx            # Notification component
  /hooks              # Custom React hooks
    useNotification.ts   # Notification management hook
  /styles             # CSS styles
    toast.css           # Toast notification animations
    utils.css           # Utility CSS classes
  App.tsx             # Main application component

/src-tauri
  /src                # Rust backend code
  tauri.conf.json     # Tauri configuration
  Cargo.toml          # Rust dependencies

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://www.rust-lang.org/tools/install) (1.75 or later)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/setup) (`npm install -g @tauri-apps/cli`)

### Development Commands

```bash
# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build the application
npm run tauri build
```

### Building Releases

The application can be built for Windows platforms using:

```bash
npm run tauri build
```

This will generate an installer in the `src-tauri/target/release/bundle/nsis/` directory.
  main.tsx            # Application entry point

/src-tauri           # Rust backend code
  /src
    main.rs          # Tauri application backend
```

## Features

- View current npm registry configuration
- Switch between predefined registries
- Visual indicators for registry types (Global)
- Toast notifications for status updates
- Modern and responsive UI

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
