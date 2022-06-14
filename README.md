<h1 align="center">Fre Godot</h1>

## About
<br>

This is a fork of<a href="https://github.com/yisar/fre"> Fre</a>, a small concurrent ui library, adapted for the Godot engine with<a href="https://github.com/GodotExplorer/ECMAScript"> javascript bindings</a>.

<br>

## Demo

You can find a demo project <a href="https://github.com/Vercix/godot-fre-demo-project"> here</a>.

<br>

## Status

In no particular order.

- [x] Proof of concept.
- [ ] Create roadmap.
- [ ] Implement jsx for nodes that maintain their own internal hierachy. i.e. Graphs, MenuButton, Tree, etc.
- [ ] Add some better form of styling. Looking at the <a href="https://github.com/kuma-gee/godot-css-theme"> godot-css-theme</a> for inspiration.
- [ ] Better integration between GDScript and JSX classes. Not sure how as this probably requires modification of the ECMAScript module or Godot it self. 
- [ ] (Re)implement concurrent rendering.
- [ ] Implement text nodes, maybe.
- [ ] Create proper api and integration for classes.

<br>


# Use

### Godot Class

You need to create a godot class and have it import the app. Then,when the node is ready you can render the app. Note: you should be able to use all classes derived from Node.

Example:

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
### Components

The component:

```js
//App.jsx
import { render, useState } from 'fre-godot'

function App() {
  const [count, setCount] = useState(0)
  return 
  (
    <hbox>
      <label text={`${count}`} />
      <button on_pressed_={() => setCount(count + 1)} text={`+`} />
    </hbox>
  )
}
```

### Classes

**Note: These are not stable yet.**  

You can also use classes.  
 
They need to inherit from a Control derived class. 
Fiber is set by Fre right after instantiation. You can access props through that member.

```js
//App.jsx
import { IFiber } from 'fre-godot'

export default class TestClass extends godot.Control {

    //fre
    fiber: IFiber = null;

    constructor() {
        super();
    }

    _enter_tree() {
    }

    _ready() {
    }

    _render() {
        return (
            <vbox>
                <label text="Test Class Comp" />
                {this.fiber.props.children}
            </vbox>
        )
    }

}
```

## Tag List

Most tags are not mapped to a different name. I did however map HBoxContainer and VBoxContainer to hbox and vbox respectivly.

### Current List:
<div align="center">
<br>

| Tag             | Godot Class     |
|-----------------|-----------------|
| control         | Control         |
| label           | Label           |
| panel           | Panel           |
| vbox            | VBoxContainer   |
| hbox            | HBoxContainer   |
| panelcontainer  | PanelContainer  |
| margincontainer | MarginContainer |
| tabcontainer    | TabContainer    |
| gridcontainer   | GridContainer   |
| scrollcontainer | ScrollContainer |
| centercontainer | CenterContainer |
| button          | Button          |
| optionbutton    | OptionButton    |
| menubutton      | MenuButton      |
| linkbutton      | LinkButton      |
| textedit        | TextEdit        |
| lineedit        | LineEdit        |
| progressbar     | ProgressBar     |
| spinbox         | SpinBox         |
| hslider         | HSlider         |
| vslider         | VSlider         |
| colorpicker     | ColorPicker     |
| hseperator      | HSeparator      |
| vseperator      | VSeparator      |
</div>


## Properties

You can set node properties through props.  
They use snake case naming convention.  
Like so:

```js
<label text={'text'} />
```

## Signals
<br>

Godot signals are the equivalent of dom event listeners.  
They use snake case naming convention.

Use the following:

```js
<button on_pressed={someFunction} />
```

Instead of:

```js
<button onPressed={someFunction} />
```

## Theme

There is a rudementry implementation of themes. 

**Note: StyleBox is not implemented.**

The following example will produce a Label node with red text:

```js
const theme = {
	Label:
	{
		color: {
			font_color: new godot.Color(1, 0, 0)
		}
	},
}

<label theme={theme} />
```