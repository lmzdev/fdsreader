import './app.css'
import App from './App.svelte'
import '@picocss/pico'

const app = new App({
  target: document.getElementById('app'),
})

export default app
