# PD2 Dev tools README

This extension gives some snippets for PD2 modders

## Features

Auto complete for the beardlib `main.xml` file and the SuperBLT `mod.txt` file

## Known Issues

None, I guess(?)

## Release Notes
None

### 1.0.8
Based on the previous fix, now `PostHook` `PreHook` an `old_` hooks will have `self` as fist argument, if the function has `:` and wont have it if it has a `.` 

### 1.0.7
Fixed bug in the `old_` hooks generation where it was always creating functions with the `:` even if the original function had a `.`

### 1.0.5
Added the ability to generate `PostHooks`, `PreHooks` and `old_` hooks from any function, via right click or via vscode command line

### 1.0.4
Added `wbased_on_` for the `main.xml` file, this gives snippets for all the weapons id for the `based_on="*"` prop in the `<weapon>` tag 

### 1.0.3
Added `hook_` for the `mod.txt` file, note: You need to set the language mode to .JSON first

### 1.0.2
Added Addfile snippets eg: `unit`, `texture`, etc etc
Renamed `hooks_` snippets to `hook_` and added default value pre-selected this should help you if you want to change the name of the file

### 1.0.0

Initial release of PD2 Dev tools

Hooks auto complete for the beardlib `main.xml` file
