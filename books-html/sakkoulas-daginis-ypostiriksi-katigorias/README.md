# Conversion to HTML

##  Book Structure
- Chapters and multiple levels of sections
- __Corner Case__: Chapter 5 has weird nesting it directly uses the `secDepth-03` styling but has no parents, this is problematic for automation (unless it gets nested in empty sections), renamed/treated it like `secDepth-01` schematron or validation warning
- __Corner Case__: Chapter 4 from `4.3` onwards book is missing `secDepth-02` but 03, 04 present, had to renumber them:  `secDepth-03` →  `secDepth-02`, `secDepth-04` →  `secDepth-03`

## Conversion Pendings
- [-] review additional meta that we may require such as UUIDs, ids for all block elements
- [-] discuss,review update in attributes according to ARIA roles [see](https://www.accessiblepublishing.ca/epub-semantic-aria-roles/)
- [-] discuss automation opportunities with @ivan, @hannes
- [✓]add to template doc
- [✓]add meta
- [✓]nest subsections from ch03 onwards



## Questions 

- do i need data-restrict attributes anymore?
- should I update roles with new aria roles,also add classes e.g after the chapter level all sections should perhaps change from @role to @class as @role attribute should be reserver for accessibility





## Conversion Notes        
- Has Font Style "Book Italic" instead of italic, must be replaced with italics, in order to do that you have to specifically search for `Fira Sans + Book Italic`


- had "STYLE FOR KEFALIDES" which has been removed
- instead of `section` export tag heading should all be `h1[@class=secDepth-0X`
- we shouldn't really care what the id values are although if automated it would be nice if they were semantiv

## Conversion Log

- Delete unecessary styles
- create character style `_italics` with export tag `i`
- replace all instances of `Fira Sans + Book Italic` with character style `_italics`
- InDesing kept crashing, so I exported to IDML and then saved as a new file, then repeated the process from the beginning
- repeated previous steps
- tried to delete all instances of paragraph style `STYLE FOR KEFALIDES` including the content, but InDesign crashed again
- restart macbook
- created character style `_superscript` with export tag `sup`
- replace alls instances of superscripts with character style `_superscript`
- edited all export tags, moved to new naming subsection scheme
- test export to HTML
- re-export without CSS and overrides
- Move to oXygen XML
- wrap chapter sections
- wrap all sections and subsections
- wrap section headings in `h1`
- use oXygen xpath functions to wrap all text content with section elements in an h1 (secDept-01 … secDept-04)
- remove container div `<div id="_idContainer000">`
- remove @class="delete"
- transfer indesign html to `book-xhtml` template (or copy body to an older book and change meta)
- change role of note container
- convert all note divs to aside elements
- rename `class="_idFootnote"` to `role="footnote"` 
- class="chapter" → role="chapter"
- add IDs to all fragment elements
- remove ` class="Basic-Paragraph"`
- remove  `_idGenColorInherit`
- add uuids to all block level body children


## Automation

- wrap chapters in sections (remove close tag and move before the opening of a new chapter section)
