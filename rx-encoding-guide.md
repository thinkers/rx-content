## Explore Section (Objects, Person, Places, Glossary, Themes)


### Objects

There are two places where  objects are encoded
1. within the body of the book using an id reference to the "list of persons"
2. after the end of the "body" of the book where a list of persons is provided which contains much more info such as name, surname, sex, age etc


#### Object Example 01: simple object

TEI XML
```xml
<rs type="obRef" subtype="flora" ref="#ob_tomato_vines">tomato vines</rs>
```

XHTML

```xml
<span data-type="obRef" data-subdata-type="flora" data-ref="#ob_tomato_vines" data-was="rs">tomato vines</span>
```

NOTE: we will change `data-subdata-type` to `data-subtype` in the future to be less verbose


#### Object Example 02: object with relationship

this uses multiple values in the @ref attribute the first one is the id of the object and the second value is the id of the person this relates to in the example below it refers to an object with an id of "#ob_toms_jacket" with relates to the person "#c_tom""

TEI XML
```xml
<rs type="obRef" ref="#ob_toms_jacket #c_tom">jacket</rs>
```

HTML
```html
<span data-type="obRef" data-ref="#ob_toms_jacket #c_tom" data-was="rs">jacket</span>
```


###  Persons

There are two places where people/characters are encoded
1. within the body of the book using an id reference to the "list of persons"
2. after the end of the "body" of the book where a list of persons is provided which contains much more info such as name, surname, sex, age etc

with the text:
TEI XML
`<rs type="persRef" ref="#c_jim">Jim</rs>`
XHTML
`<span data-type="persRef" data-ref="#c_jim" data-was="rs">Jim</span>`

#### Person: example 01 (most complex)
The first entry of the person list is that of Samuel Langhorne (Mark Twain)
this is just a case study for now of what is possible all other entries are simplified so these are the ones we should focus on

#### Person: example 02 (minumum set of info)

The minimal set of info recorder is the following
- sex
- forename
- surname
- description
- link to image/graphic (OPTIONAL)


TEI Format
```xml
<person xml:id="c_becky" sex="f" age="c">  
                        <persName>  
                            <forename full="abb">Becky</forename>  
                            <surname>Thatcher</surname>  
                        </persName>  
                        <note>Becky is Tom’s main love interest in the book, a very sentimental and moody girl.</note>  
                        <figure>  
                            <graphic url="media/characters/becky.jpg" />  
                        </figure>  
                    </person>
```

HTML Format

```html
<li id="c_becky" data-sex="f" data-age="c" data-was="person">  
                        <div data-was="persName">  
                            <p data-full="abb" data-was="forename">Becky</p>  
                            <p data-was="surname">Thatcher</p>  
                        </div>  
                        <div data-was="note" data-subtype="block">Becky is Tom’s main love interest in the book, a very sentimental and moody girl.</div>  
                        <figure>  
                            <img src="media/characters/becky.jpg" data-was="graphic" />  
                        </figure>  
                    </li>
```

#### Person: example 03
also includes some nicknames, and sorting instructions

TEI XML

```xml
<person xml:id="c_tom" sex="m" age="c">  
                        <persName sort="1">  
                            <forename type="first">Thomas</forename>  
                            <forename full="abb">Tom</forename>  
                            <surname>Sawyer</surname>  
                        </persName>  
                        <persName type="pseudo" sort="2">the Black Avenger of the Spanish Main</persName>  
                        <note>Tom is the protagonist of the book, a young mischievous boy with a heart of gold and always up to new adventures.</note>  
                        <figure>  
                            <graphic url="media/characters/tom.jpg" />  
                        </figure>  
                    </person>
```

XHTML

```html
<li id="c_tom" data-sex="m" data-age="c" data-was="person">  
                        <div data-sort="1" data-was="persName">  
                            <p data-type="first" data-was="forename">Thomas</p>  
                            <p data-full="abb" data-was="forename">Tom</p>  
                            <p data-was="surname">Sawyer</p>  
                        </div>  
                        <div data-type="pseudo" data-sort="2" data-was="persName">the Black Avenger of the Spanish Main</div>  
                        <div data-was="note" data-subtype="block">Tom is the protagonist of the book, a young mischievous boy with a heart of gold and always up to new adventures.</div>  
                        <figure>  
                            <img src="media/characters/tom.jpg" data-was="graphic" />  
                        </figure>  
                    </li>
```


### Places

this works similar to the way objects work there is a list of places at the end of the book

TEI XML
```xml
<rs type="placeRef" ref="#pl_garden">garden</rs>
```

XTHML

```xhtml
<span data-type="placeRef" data-ref="#pl_garden" data-was="rs">garden</span>
```


### Glossary 
Inline within the text we have encoded some glossary terms within the `choice element`  the choice elements contains

at the end of the book there is a list of all the different types of glossaries


Examples of Inline encoding follow

- the `orig` element which is the orginal text used in the book
- the `reg` elements which contains our own interpretation of that specific word or phrase

```xml
<distinct type="l_huck">  
                                <choice>  
                                    <orig xml:base="http://el.urbandictionary.com/define.php?term=Dern">dern</orig>  
                                    <reg>damn</reg>  
                                </choice>  
                            </distinct>
```

XHTML 

```xhtml
<span data-type="l_huck" data-was="distinct">  
                                <span data-was="choice">  
                                    <span xml:base="http://el.urbandictionary.com/define.php?term=Dern" data-was="orig">dern</span>  
                                    <span data-was="reg">damn</span>  
                                </span>  
                            </span>
```


Lists of types of Glossaries

TEI XML
```xml
<div xml:id="language">  
                <list type="distinct">  
                    <item xml:id="l_ae">  
                        <name>American English</name>  
                        <desc>  
                            Common words of 1860 that are now obsolete or not common. Use mostly on narrative parts.  
                        </desc>  
                    </item>  
                    <item xml:id="l_sae">  
                        <name>Southern American English</name>  
                        <desc>  
                            Spoken in Missouri (among other regions). Notable speaker(s): Tom, Aunt Polly. Use for “eye dialect” cases and Mark Twain’s language choices too.  
                        </desc>  
                    </item>  
                    <item xml:id="l_aave">  
                        <name>African American Vernacular English</name>  
                        <desc>  
                            Spoken by the African American characters. Notable speaker(s): Jim.  
                        </desc>  
                    </item>  
                    <item xml:id="l_huck">  
                        <name>Huck’s Idiolect</name>  
                        <desc>  
                            Huck’s unique vocabulary. Southern American English from another region.  
                        </desc>  
                    </item>  
                </list>  
            </div>
```

XHTML


```xhtml
<div id="language">  
                <ul data-type="distinct" data-was="list">  
                    <li id="l_ae" data-was="item">  
                        <p data-was="name">American English</p>  
                        <p data-was="desc">  
                            Common words of 1860 that are now obsolete or not common. Use mostly on narrative parts.  
                        </p>  
                    </li>  
                    <li id="l_sae" data-was="item">  
                        <p data-was="name">Southern American English</p>  
                        <p data-was="desc">  
                            Spoken in Missouri (among other regions). Notable speaker(s): Tom, Aunt Polly. Use for “eye dialect” cases and Mark Twain’s language choices too.  
                        </p>  
                    </li>  
                    <li id="l_aave" data-was="item">  
                        <p data-was="name">African American Vernacular English</p>  
                        <p data-was="desc">  
                            Spoken by the African American characters. Notable speaker(s): Jim.  
                        </p>  
                    </li>  
                    <li id="l_huck" data-was="item">  
                        <p data-was="name">Huck’s Idiolect</p>  
                        <p data-was="desc">  
                            Huck’s unique vocabulary. Southern American English from another region.  
                        </p>  
                    </li>  
                </ul>  
            </div>
```


### Themes

withing the text

TEI XML

```xml
<seg xml:id="th_326" type="#myth"> “Why, that, you know, is to — well, they always do that.” </seg>
```

XTHML
```xhtml
<span id="th_326" data-type="#myth" data-was="seg"> “Why, that, you know, is to — well, they always do that.” </span>
```


list at the end of the book


TEI XML

```xml
<div type="editorial" xml:id="editorial">
                <desc>
                    these themes will help us better understand life in the 19th century South better, such themes include Comparing these themew with todays standards reveals interesting developments and radical changes in all aspects of what we now take for granted. These are some selected excerpts for within the book that have been categorized, and wilml be helpful for the reader to make such comparisons. Work and Home Life, Slavery, Religion, Education, Leisure Activities, Medicine, Industrial Revolution/Technology,Superstitions
                </desc>
                <interpGrp>
                    
                    <interp xml:id="gender">Gender relations</interp>
                    <interp xml:id="community">Social organization of life and social relations i.e school, church, education, punishment, mourning, social bonds, family, trade,</interp>
                    <interp xml:id="childhood">being a child and growing up in the South e.g games, fighting, fallin in love,</interp>
                    <interp xml:id="myth">Popular and cultural myths</interp>
                    <interp xml:id="race">Themes of racial and ethnic identity</interp>
                    <interp xml:id="superstition">religious and cultural superstitions</interp>
                    <interp xml:id="ethics">personal and social moral issues</interp>
                    <interp xml:id="technique">Particular techniques and activities of special interest e.g whitewashing, cures and treatments, starting a fire</interp>
                    <interp xml:id="idiom">Phrases</interp>
                    <interp xml:id="mark_twain">commentary of the author</interp>
                    <interp xml:id="transportation" />
                    <!-- Trianta -->
                    <interp xml:id="int_technology" />
                    <interp xml:id="int_business" />
                    <interp xml:id="int_clue" />
                </interpGrp>
            </div>

```


HTML


```xhtml
<div data-type="editorial" id="editorial">
                <p data-was="desc">
                    these themes will help us better understand life in the 19th century South better, such themes include Comparing these themew with todays standards reveals interesting developments and radical changes in all aspects of what we now take for granted. These are some selected excerpts for within the book that have been categorized, and will be helpful for the reader to make such comparisons. Work and Home Life, Slavery, Religion, Education, Leisure Activities, Medicine, Industrial Revolution/Technology,Superstitions
                </p>
                <ul data-was="interpGrp">
                    
                    <li id="gender" data-was="interp">Gender relations</li>
                    <li id="community" data-was="interp">Social organization of life and social relations i.e school, church, education, punishment, mourning, social bonds, family, trade,</li>
                    <li id="childhood" data-was="interp">being a child and growing up in the South e.g games, fighting, fallin in love,</li>
                    <li id="myth" data-was="interp">Popular and cultural myths</li>
                    <li id="race" data-was="interp">Themes of racial and ethnic identity</li>
                    <li id="superstition" data-was="interp">religious and cultural superstitions</li>
                    <li id="ethics" data-was="interp">personal and social moral issues</li>
                    <li id="technique" data-was="interp">Particular techniques and activities of special interest e.g whitewashing, cures and treatments, starting a fire</li>
                    <li id="idiom" data-was="interp">Phrases</li>
                    <li id="mark_twain" data-was="interp">commentary of the author</li>
                    <li id="transportation" data-was="interp" />
                    <!-- Trianta -->
                    <li id="int_technology" data-was="interp" />
                    <li id="int_business" data-was="interp" />
                    <li id="int_clue" data-was="interp" />
                </ul>
            </div>


```