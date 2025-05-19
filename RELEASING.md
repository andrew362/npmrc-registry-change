# Release Process

This document outlines the process for releasing a new version of NPM Registry Manager.

## Version Numbering

NPM Registry Manager follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for adding functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Release Steps

1. Update version numbers in:
   - `package.json`
   - `src-tauri/tauri.conf.json`

2. Create and push a git tag:
   ```pwsh
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

3. The GitHub Action workflow will automatically:
   - Build the application
   - Create installers 
   - Upload artifacts to the GitHub release
   - Generate release notes based on commits

## Manual Release (if needed)

If you need to create a release manually:

1. Build the application:
   ```pwsh
   npm run tauri build
   ```

2. Locate the built artifacts:
   - Installer: `src-tauri/target/release/bundle/nsis/NPM Registry Manager_x.x.x_x64-setup.exe`
   - Executable: `src-tauri/target/release/npmrc-registry-change.exe`

3. Create a GitHub release and upload these artifacts.

## Testing a Release

1. Download the installer from the GitHub release
2. Install and verify the application works correctly
3. Test registry switching and other key features
