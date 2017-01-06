# Changelog

## 1.2.0
- Made library Ahead-of-Time (AoT) ready, closes [#15](https://github.com/rosslavery/angular2-tag-input/issues/15)
- Added missing rxjs imports, closes [#13](https://github.com/rosslavery/angular2-tag-input/issues/13)

## 1.1.0
- Added autocomplete feature
- Greatly-improved styling to adhere to Material spec
- Added numerous new inputs/outputs (see API docs)

## 1.0.0
### Breaking Changes
- Removed delimiterCode @Input. While some flexibility is lost, code is more reliable with a limited number of split patterns
- Updated dependencies to match latest RC6
- Exporting an NgModule instead of a component, so installation instructions have changed
- Namespaced selector to be `rl-tag-input` to protect against conflicts

### Other Changes
- New @Input() addOnComma
- New @Input() pasteSplitPattern - defaults to comma
- Fixed input not being emptied out on paste


## 0.1.5
- First version published
