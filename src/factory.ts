// @ts-nocheck

const tagMap = {
   'control': godot.Control,
   'label': godot.Label,

   //containers
   'vbox': godot.VBoxContainer,
   'hbox': godot.HBoxContainer,
   'panel': godot.Panel,
   'panelcontainer': godot.PanelContainer,
   'margincontainer': godot.MarginContainer,
   'tabcontainer': godot.TabContainer,
   'gridcontainer': godot.GridContainer,

   //widgets
   'button': godot.Button,
   'linkbutton': godot.LinkButton,
   'textedit': godot.TextEdit,
   'lineedit': godot.LineEdit,
   'progressbar': godot.ProgressBar,
   'spinbox': godot.SpinBox,
   'hslider': godot.HSlider,
   'vslider': godot.VSlider,

   //seperators
   'hseperator': godot.HSeparator,
   'vseperator': godot.VSeparator,
}


function factory(tag, anchor = null) {
   //create a new godot node
   const newDom = new tagMap[tag]()
   
   //we handle styling
   if (anchor) {
      newDom.set_anchors_preset(anchor)
   }

   return newDom;
}

export default factory