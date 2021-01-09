export default function is_element_in_viewport(element, parametr = {}) {
    parametr = Object.assign({bad_property: {}, viewport: window, full_element: true}, parametr)
    let rect = element.getBoundingClientRect();
    let context = parametr.viewport?.getBoundingClientRect?.() || {left: 0, top: 0, width: window.innerWidth, height: window.innerHeight};

    let hasProp = false;
    for (let prop in parametr.bad_property) {
      if (window.getComputedStyle(element,null).getPropertyValue(prop) == parametr.bad_property[prop]) {
        hasProp = true;
        break
      }
    }
    return (
        !hasProp &&
        rect.left - context.left >= 0 &&
        rect.top - context.top >= 0 &&
        (parametr.full_element ?
          rect.left >= 0 && rect.top >= 0 &&
          rect.left + rect.width <= (context.width + context.left) &&
          rect.top + rect.height <= (context.height + context.top)
          :
          rect.left <= rect.width &&
          rect.top <= rect.height &&
          rect.left <= (context.width + context.left) &&
          rect.top <= (context.height + context.top)
        )
    );
}
