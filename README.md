# Taffy
Taffy is a responsive viewport addon for Storybook. This addon was heavily inspired by [Ish](https://github.com/bradfrost/ish.), the delightful resizer built into [Pattern Lab](https://patternlab.io/), Brad Frost's atomic design visualizer and static site generator.

Although there are other Storybook resizers out there, Taffy brings some great new features to the party, including:

* Dynamic resizing via a draggable handle on the right side of the viewport
* Precise resizing by value entry, in either pixels or ems
* One-click small, medium and large breakpoint buttons that resize the viewport to a randomized width within each range. 
* Full-screen view.
* Support for resizing withing the Storybook Docs tab

## Installation
Install the following npm module in your project:

```
npm i --save-dev @degjs/storybook-addon-taffy
```

Then, register the addon in the `addons` array in `.storybook/main.js`:

```
module.exports = {
    ...
    addons: [
        '@degjs/storybook-addon-taffy/register'
    ]
};
```

Finally, import `withTaffy` and add the decorator within `.storybook/preview.js`, like this:

```
import { addDecorator } from '@storybook/react';
import { withTaffy } from '@degjs/storybook-addon-taffy';

addDecorator(withTaffy);
```

That's it! Restart your Storybook build, and you should see Taffy controls in the toolbar, as well as a resize handle on the right side of your story previews.