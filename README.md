<img src="https://webfruits.io/assets/wf-small-toolbox-logo.svg" alt="wf core logo" height="50px">

# webfruits/toolbox &nbsp; [![Language TypeScript](https://img.shields.io/badge/language-TypeScript-green.svg)](https://www.typescriptlang.org) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![GitHub package.json version](https://img.shields.io/github/package-json/v/webfruits/toolbox.svg?color=green&label=master&logo=github) [![npm version](https://img.shields.io/npm/v/@webfruits/toolbox.svg?color=green)](https://www.npmjs.com/package/@webfruits/toolbox) 

... depends on [webfruits/core](https://github.com/webfruits/core), a library to create highly customized, fast and interactive user interfaces using the real DOM and not a virtual one. It is super slim, modular and has no dependencies. All declarations and coding can be done with TypeScript. There is no need to learn any proprietary template language.

## What is inside this toolbox
You'll find generic components, controllers and many utility classes, which will grow over time.  
Below you'll find some examples. For further details please have a look at the [source code](src).  

### Components
#### GridLayout
.. creates a simple grid of columns. Column gap und number of columns can be set anytime.  
```typescript
import {GridLayout} from "./components/layout/GridLayout";
import {UIComponent} from "@webfruits/core";

let gridLayout = new GridLayout();

gridLayout.numColumns = 2;
gridLayout.gapWidth = 20;

gridLayout.addChild(new UIComponent("grid-item-1"));
gridLayout.addChild(new UIComponent("grid-item-2"));
```
#### SVGComponent
... parses a svg string to a `SVGElement` which then can be modified in any way. 
```typescript
import {RequestUtils} from "./utils/RequestUtils";
import {SVGComponent} from "./components/svg/SVGComponent";

RequestUtils.getURL("assets/logo.svg", (svg: string) => {
     let svgComponent = new SVGComponent(svg);
     let logoBackground: SVGElement = svgComponent.getElementByID("background");
    logoBackground.style.backgroundColor = "red"
});
```
### Controller
#### SwipeController
... dispatches `Signals` when swipe gestures were recognized on an `HTMLElement`.
```typescript
import {SwipeController} from "./controller/input/SwipeController";

let swipeController = new SwipeController(htmlElement);
swipeController.onRightSwipeSignal.add(() => console.log("onSwipedToTheRight"));
swipeController.onLeftSwipeSignal.add(() => console.log("onSwipedToTheLeft"));
```
#### WheelController
... dispatches `Signals` when scroll or vertical swipe gestures were regonized on an `HTMLElement` 
```typescript
import {WheelController} from "./controller/input/WheelController";

let wheelController = new WheelController(htmlElement);
wheelController.onUpSignal.add(() => console.log("onScrolledUp or onSwipedUp"));
wheelController.onDownSignal.add(() => console.log("onScrolledDown or onSwipedDown"));
```

## more webfruits

- **[webfruits/core](https://github.com/webfruits/core)**  
a TypeScript library for building user interfaces using the real DOM.

- **[webfruits/best-practice](https://github.com/webfruits/best-practice)**  
our recommondation of how to structure an application using webfruits.

- **[webfruits/webpack-starterkit](https://github.com/webfruits/webpack-starterkit)**  
is a basic webpack setup and skeleton for an webfruits application.


## Licence
webfruits/toolbox is [MIT licensed](./LICENSE).
