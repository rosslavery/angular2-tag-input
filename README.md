# angular2-tag-input
Tag input component for Angular 2

## Demo & Examples
[View Plunker](http://plnkr.co/edit/uVGOm8yA0zA0OKhgWpvq?p=preview)

## Quick Start
```
npm install angular2-tag-input --save
```

```
// In one of your application NgModules
import {RlTagInputModule} from 'angular2-tag-input';

@NgModule({
  imports: [
    RlTagInputModule
  ]
})
export class YourModule {}

// In one of your component templates
<rl-tag-input [(ngModel)]="tags" placeholder="Testing placeholder"></rl-tag-input>
```

## API
### Inputs
- `ngModel` : `string[]` - **Required** Property to store the resulting tag list in.
- `addOnBlur` : `boolean` - **Default**: `true` - Whether to attempt to add a tag when the input loses focus.
- `addOnComma` : `boolean` - **Default**: `true` - Whether to attempt to add a tag when the user presses comma.
- `addOnEnter` : `boolean` - **Default**: `true` - Whether to attempt to add a tag when the user presses enter.
- `addOnPaste` : `boolean` - **Default**: `true` - Whether to attempt to add a tags when the user pastes their clipboard contents.
- `addOnSpace` : `boolean` - **Default**: `true` - Whether to attempt to add a tags when the user presses space.
- `allowedTagsPattern` : `RegExp` - **Default**: `/.+/` - RegExp that must match for a tag to be added.
- `placeholder` : `string` - **Default**: ``'Add a tag'`` - Placeholder for the `<input>` tag.
