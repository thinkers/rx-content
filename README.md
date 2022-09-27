## rx-content
book, magazines, poetry and other content type samples in various markup formats (TEI, HTML, other)


### magazines
this folder contains  samples of the two law magazines our partner publisher "P.N.
Sakkoulas" published on a montly basis. The sample HTML files are a
result of an HTML export from Adobe's InDesign DTP Software.  


### books

This is the format we have used for technical books using
HTML5 tags (this is a different format than that of the magazines).

This format focuses on structural semantics (e.g part, chapter, section,
subsection) and currently contains no inline semantics

The sample file is mostly self explanatory 

it consists of the:
- head element cointaining all the book meta
- body which contains the content of the book
- there is abundant use of the `@role` attibute where we specify what
    type of content is used e.g `role="chapter | section | subsection"`


### books/books-thinking/tom-sawyer
This is our prototype book which contains inline semantics using the TEI
XML guidelines

- `tom.book.xml` is the main book content
- `*.sch` files are schematron files: schematron a is useful and practical XML technology which in our context is used to do things like enforce XML quality assurance/control or impose business rules on their XML (this can of course be applied in the XHTM5 examples, this are just some test files created while trying to test schematrons capabilities)
- `*.css` files, these are used to style the content in oXygen XML
    Editor's author view, not really created for the browser,
- media folder: contains book media


