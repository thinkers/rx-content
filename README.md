## rx-content
book, magazines, poetry and other content type samples in various markup formats (TEI, HTML, other)

While the markup used in each of the examples below the end goal is the
same that is for each type of content we would like to:

- extract the title, subtitle, author and any other meta. NOTE: while the
    list of meta we want is the same their markup is different in each
    example, we could normalise the HTML files to use the same but TEI
    XML uses different elements, this is something that will definitely
    come up in the near future, but I think it's just a matter of
    carefully mapping things
- generate a table of contents based on the headings used within each
    file
- target fragments of content that can be sold: in the case of books
    these would be chapters, in the case of magazines it would be
    articles

---

### /law-magazines-html
this folder contains  samples of the two law magazines our partner publisher "P.N.
Sakkoulas" published on a montly basis. The sample HTML files are a
result of an HTML export from Adobe's InDesign DTP Software.  

Each month the editors use our [magazine uploader](http://185.36.116.223/magazine-uploader/#/)) tool to upload and
store the content to the legacy bluedot database

the importer does the following things:

During the importing of each issue the editor has to:
- choose a file to upload
- choose the title of magazine (two title option in total)
- type the issue number
- after those steps a basic validation process is run to make sure the
    file is valid
- the file is then split into multiple article "fragments" 
- the editor has to go through each article and add the following
    information
  + composition (author, judge, lawyer etc), these are all sourced from
      person and role taxonomies of the DB
  + manually type the starting page of each article
  + manually assign a thematic code to each article from a dropdown list

After these steps are complete for each article then the content can be
published to the DB.

### /xhtml5-book
This is the format we have used in the past for technical books using
HTML5 tags (this is a different format than that of the magazines).

This format focuses on structural semantics (e.g part, chapter, section,
subsection) and currently contains no inline semantics

From this type of source file we call "xthml5 book" we are able to
generate (using our "generator tools") the following formats:
- microsites like this one: https://desmes.kritiki.gr/Algoritmoi
- ePub books
- cross platform apps (using ionic), although we have deprecated those


The sample file is mostly self explanatory (we will provideclarifications where needed)

it consists of the:
- head element cointaining all the book meta
- body which contains the content of the book
- there is abundant use of the `@role` attibute where we specify what
    type of content is used e.g `role="chapter | section | subsection"`
