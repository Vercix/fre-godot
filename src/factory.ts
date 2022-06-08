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
   'scrollcontainer': godot.ScrollContainer,

   //buttons
   'button': godot.Button,
   'optionbutton': godot.OptionButton,
   'menubutton': godot.MenuButton,
   'linkbutton': godot.LinkButton,

   //widgets
   'textedit': godot.TextEdit,
   'lineedit': godot.LineEdit,
   'progressbar': godot.ProgressBar,
   'spinbox': godot.SpinBox,
   'hslider': godot.HSlider,
   'vslider': godot.VSlider,
   'colorpicker': godot.ColorPicker,

   //seperators
   'hseperator': godot.HSeparator,
   'vseperator': godot.VSeparator,
}


function factory(tag, anchor = null, size = null) {
   //create a new godot node

   if(tag instanceof godot.Control){
      throw new Error('its a control class')
   }
   
   const newDom = new tagMap[tag]()


   
   //we handle styling
   if (anchor) {
      newDom.set_anchors_preset(anchor)
   }
   if (size) {
      if(typeof size.width === 'number') {
         newDom.set_h_size_flags(size.width)
      }
      if(typeof size.height === 'number') {
         newDom.set_v_size_flags(size.height)
      }
   }

   return newDom;
}

export default factory