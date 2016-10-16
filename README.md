# angular2-tag-input
Tag input component for Angular 2

## Demo & Examples
[View Demo](http://www.webpackbin.com/EkDO0p3Ab)

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
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `addOnBlur` | `boolean` | true | Whether to attempt to add a tag when the input loses focus. |
| `addOnComma` | `boolean` | true | Whether to attempt to add a tag when the user presses comma. |
| `addOnEnter` | `boolean` | true | Whether to attempt to add a tag when the user presses enter. |
| `addOnPaste` | `boolean` | true | Whether to attempt to add a tags when the user pastes their clipboard contents. |
| `addOnSpace` | `boolean` | true | Whether to attempt to add a tags when the user presses space. |
| `allowDuplicates` | `boolean` | `false` | Allow duplicate tags. |
| `allowedTagsPattern` | `RegExp` | `/.+/` | RegExp that must match for a tag to be added. |
| `autocomplete` | `boolean` | `false` | Toggle autocomplete mode on/off |
| `autocompleteItems` | `string[]` | `[]` | List of suggestions for autocomplete menu |
| `autocompleteMustMatch` | `boolean` | `true` | Whether a tag must be present in the suggestions list to be valid |
| `autocompleteSelectFirstItem` | `boolean` | `true` | Pre-highlight the first item in the suggestions list |
| `placeholder` | `string` | `'Add a tag'` | Placeholder for the `<input>` tag. |


### Outputs
| Name | Type Emitted | Description |
| --- | --- | --- |
| `addTag` | `string` | Emits the added tag string |
| `removeTag` | `string` | Emits the removed tag string |
