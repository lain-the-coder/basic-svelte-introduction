# create project
bun create vite my-app --template svelte
cd my-app
bun install
bun run dev -- --open

# update folder structure
strip src/ down to these 2 minimal files:
src/main.js
src/App.svelte

# set jsconfig.json to:
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "target": "ESNext",
    "module": "ESNext",
    "checkJs": false
  },
  "include": ["src/**/*"]
}
