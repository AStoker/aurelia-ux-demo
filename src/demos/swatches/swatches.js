import { swatches } from '@aurelia-ux/core/colors/swatches';


export class SwatchesCustomElement {

  constructor() {
    window.swatches = swatches;
    this.swatches = convertSwatchObjectToArray(swatches);
  }

}

function convertSwatchObjectToArray(obj) {
  let result = [];
  let entries = Object.entries(obj);
  for (let entry of entries) {
    let name = entry[0];
    let val = entry[1];
    let hasChildren = false;
    let style = {};
    if (val instanceof Object) {
      //convert children
      hasChildren = true;
      val = convertSwatchObjectToArray(entry[1]);
    }
    if (!hasChildren) { //We're a swatch
      style['background-color'] = val;
    }
    result.push({
      name: name,
      value: val,
      hasChildren: hasChildren,
      style: style
    });
  }
  return result;
}
