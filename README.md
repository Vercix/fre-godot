<h1 align="center">Fre Godot</h1>

## About
<br>

This is a fork of<a href="https://github.com/yisar/fre"> Fre</a>, a small concurrent ui library, adapted for the Godot engine with<a href="https://github.com/GodotExplorer/ECMAScript"> javascript bindings</a>.

## Use

The godot control:

```js
import { render } from "fre-godot";
import App from './path/to/App'

export default class GodotFreApp extends godot.Control {

	constructor() {
		super();	
	}
	
	// Called when the node enters the scene tree for the first time.
	_ready() {
		render(<App />, this);
	}
	
}
```
The component

```js
//App.jsx
import { render, useState } from 'fre-godot'

function App() {
  const [count, setCount] = useState(0)
  return 
  (
    <>
      <label text={`${count}`} />
      <button on_pressed_={() => setCount(count + 1)} text={`+`} />
    </>
  )
}
```

<br>

## Godot Signals

<br>

Godot signals are the equivalent of dom event listeners.
They use snake case naming convention. 

<br>

Use the following:

```js
<button on_pressed={someFunction} />
```

Instead of:

```js
<button onPressed={someFunction} />
```