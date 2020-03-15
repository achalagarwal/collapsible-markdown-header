# collapsible-markdown-headers README

## Brief Introduction

As a power user, I use VSCode extensively for creating markdowns to help with my current research and other day to day tasks. Thus I have created an extension for VSCode named "collapsible-markdown-headers".

## Why an extension?

Extensions are the easier way to carry out tasks that require extracting text or running a conditional! If there is a simpler way, I am not aware of it, so do let me know :)

## Features

This extension provides two command that makes a header section collapsible! 

can 


Command flow is as follows:

### Vanilla Command
text selected? create collapsible with the text as summary.
otherwise extract text from line above and use as summary
insert the required snippet for converting the section to a collapsible one.

### + Detect
Vanilla + detect the section

read lines from cursor to top, find the first header (line that starts with a #)
then read lines from cursor to bottm, find where the collapsible should close, i.e. before a lower (higher?) section level.

## TODO

1. Make it general for any section but for now I prefer to use it with headers and subheaders.
2. Ignore sections that are already collapsed 

## Requirements

No requirements/dependencies.

## Extension Settings


This extension contributes the following settings:

* `extension.collapse_header`:	Collapse Markdown Header
* `extension.collapse_header_detect_endpoint`: Collapse Markdown Header with Auto Detection

## Known Issues

None that I am aware of.

## Release Notes

For local use, without any future plans of integration in the market.

**Enjoy!**
