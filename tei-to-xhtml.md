---
Tags: edk encoding serialisation rx projects/doing convert conversions
---


### TEI to XHTML conversion

> [!IMPORTANT] sync this file 
> ```bash
rsync -vgloptruc ~/_projects/akb/conversion-tei-to-xhtml.md ~/_projects/rx-content/tei-to-xhtml.md


## PENDINGS
- [ ] read subtype="block" to all backmatter notes

The following is a list of transformations required to convert a semantically encoded TEI XML Book to XHTML5

A mapping is available in GSheets here: https://docs.google.com/spreadsheets/d/1pnjGpiDAw6QF7uTsizyIkB9gTOo6rEDrcxz_Qr7aFEI/edit#gid=0


- add exclude attribute to all `note` elements they should not appear by default
- maybe add exclude attribute on all reg element


==maybe @type should remain data-type and not be converted to data-role==
==ADD A DATA ROLE CHAPTER IF IT DOES NOT EXIST==
#### attributes
- [x] url="" → src=""
- [x] xml:id="" → id=""
- [x] type="" → data-type=""
- [x] xml:lang → lang
- [ ] subdata-type → data-subdata-type
- [x] n="" → data-n=""
- [x] exclude="" → data-exclude=""
- [x] facs="" → data-facs=""
- [x] ed → data-ed
- [x] dur → data-dur
- [x] when → data-when
- [x] when-custom → data-when-custom
- [x] corresp → data-corresp
- [x] rend → data-rend
- [x] who → data-who
- [x] ref → data-ref
- [x] ana → data-ana
- [x] aloud → data-aloud
- [x] unit → data-unit
- [x] quantity → data-quantity
- [x] resp → data-resp
- [x] rendition → data-rendition
- [x] next → data-next
- [x] from → data-from
- [x] to → data-to
- [x] full → data-full
- [x] ?anchored → data-anchored
- [x] target → data-target
- [x] source → data-source
- [x] sex → data-sex
- [x] age → data-age
- [x] sort → data-sort
- [x] notAfter-custom → data-notAfter-custom
- [x] notBefore-custom → data-notBefore-custom
- [x] name → data-name
- [x] mutual → data-mutual
- [x] active → data-active
- [x] passive → data-passive
- [x] copyOf → data-copyOf
- [x] xml:base ?? REVIEW\
- [ ] key → data-key


---


#### elements
before you perform any element change make sure you add it as an atrribute using XML refactoring `Add/Change atrribute`

- [ ] head → h1
- [ ] hi → span data-was="hi"
- [ ] milestone → `<p data-was="milestone">`
- [ ] note[@sutype="blocknote"] → `<div data-was="blocknote data-subtype="blocknote">`
- [ ] note →ATTENTION could be either a span or a div we must include in TEI XML e.g. a `subtype inline| block` to distinquish them, in the backmatter all `note` elements should be of block subtype (also add in schematron)
	- [ ] note → `<span data-was="note">` 
	- [ ] note[@subtype="block"] → div data-was="note" data-subtype="block"
- [ ] view → `<span data-was="view">`
- [ ] date → `<span data-was="date">`
- [ ] time → `<span data-was="time">`
- [ ] emph → `<em data-was="emph">`
- [ ] anchor → `<span data-was="anchor">`
- [ ] said  → `<span data-was="said">` (see: [[#Said]])
	- [ ] distinct `<span data-was="distinct"`
		- [ ] choice → `<span data-was="choice">`
			- [ ] orig → `<span data-was="orig">`
			- [ ] reg → `<span data-was="reg">`
- [ ] seg → `<span data-was="seg"`
- [ ] rs → `<span data-was="rs"`
- [ ] pb → `<span data-was="pb"> 
- [ ] figure → figure  (see: [[#Figures]])
	- [ ] graphic → `<img data-was="graphic">`
	- [ ] figDesc > `<figcaption data-was="figDesc">`
- [ ] quote → `<span data-was="quote"`
- [ ] lg → `<div data-was="lg">`
- [ ] l → `<p data-was="l">`
- [ ] measure → `<span data-was="measure"?>`
- [ ] address → div data-was="address"
- [ ] street → p data-was="street"
- [ ] geo → span data-was="geo"
- [ ] lb → br
- [ ] foreign [@xml:lang] → span[@lang]
- [ ] blockquote → quote


_RIGHTS_
- [ ] availability → div data-was="availability"
- [ ] license → → p was="availability"
- [ ] bibl → div was="bibl"


_BACKMATTER_

ATT: backmater has to be moved within html body after conversion to html
- [ ] back → `<div data-was="back">`
- [ ] list → `<ul> data-was="list">`
	- [ ] item → `<li data-was="item"`

 LIST: PERSONS
- [ ] listPerson → `<ul data-was="listPerson">`
	- [ ] person → `<li data-was="person">`
		- [ ] persName → div data-was="persName"
			- [ ] rolename → p data-was="rolename"
			- [ ] forename → p data-was="forename"
			- [ ] surname → p data-was="surname"
			- [ ] genName →p data-was="genName"
		- [ ] birth → div data-was="birth"
		- [ ] death → div data-was="death"
		- [ ] country → p data-was="country"
		- [ ] faith → p data-was="faith"
		- [ ] nationality
		- [ ] occupation → p data-was="occupation"
		- [ ] state → div data-was="state"
		- [ ] residence → div data-was="residence"
		- [ ] settlement → p data-was="settlement"

LIST: PLACES
- [ ] listPlace → ul data-was="listPlace"
	- [ ] place → li data-was="place"
		- [ ] placeName → div data-was="placeName" (also appears inside `residence` element)
		- [ ] location p pdata-was="location"
		- [ ] trait → div data-was="trait"
		- [ ] label → p data-was="label"
		- [ ] desc →  p data-was="desc"
		- [ ] name → p  data-was="name"


LIST: OBJECTS
- [ ] name → p data-was="name"

LIST: RELATIONSHIPS

- listRelation → ul data-was="listRelation" data-type="relationships"
	- relation → li data-was="relation"

LIST : INTERPRETATION
- [ ] Interpretation
- interpGrp → ul data-was="interpGrp"
- interp → li data-was="interp"

==missing place list==

#### Post pass
some data-n attributes will be used to create aria labels for instance
- within //span[@data-was="pagebreak"] there is a an  `@data-n` attribute whose value should be used to create an `aria-label` of the same value




### Examples

##### Chapters `//div[@type="chapter"]`

```xml
 <div xml:id="c1" n="I" type="chapter">  
        <head> <pb n="17" facs="media/pages/p17.jpg"/>Chapter I</head>  
        <figure xml:id="ill_page_017" exclude="true">  
            <graphic url="media/illustrations/ill_page_017.jpg"/>  
            <head>Tom at home.</head>  
            <figDesc>Tom standing outside his house</figDesc>  
        </figure>  
        <milestone n="Tom gets caught!" xml:id="ch1sc1" unit="scene" corresp="#pl_house #pl_garden"/>  
        <note type="mDate" n="d1">  
            <date when="1845-05-09">Friday</date><!-- Possible alternative date: Rasmussen p496 probably Friday June 14 -->  
            <time>morning</time>  
        </note>  
        <note type="mSummary">Aunt Polly is looking for Tom when she finds him she discovers he was secretly eating jam, she tries to punish him but Tom escapes.</note>  
        <anchor xml:id="ch1sc1an1" n="Aunt Polly looks for Tom" corresp="#pl_house #pl_garden"/>  
        <note type="anDate" n="d1"> <date when="1845-05-09">Friday</date> <time>morning</time> </note>  
        <p xml:id="ts-D2D82D97-1156-484F-86AC-F3A050A773EC"> <said who="#c_polly" aloud="true">“TOM!”</said> </p>
        </div>
```



##### Said

```xml
<p xml:id="ts-6D093F8B-64CD-4EDB-83A4-A369DADB6B1C">
    <said who="#c_polly">“
        <distinct type="l_ae">
            <choice>
                <orig>What’s gone</orig>
                <reg>What happened</reg>
            </choice>
        </distinct> with that boy, I wonder? You TOM!”
    </said>
</p>
<!-- gets converted to -->
<p id="ts-6D093F8B-64CD-4EDB-83A4-A369DADB6B1C">
    <span data-was="said" data-who="#c_polly">“
        <span data-was="distinct" data-type="l_ae">
            <span data-was="choice">
                <span data-was="orig">What’s gone</span>
                <span data-was="reg">What happened</span>
            </span>
        </span> with that boy, I wonder? You TOM!”
    </span>
</p>
```



#### Figures

```xml
<figure xml:id="ill_page_028" rend="nav" corresp="#c_jim" exlude="false">
    <graphic url="media/illustrations/ill_page_028.jpg" rend="full" />
    <graphic url="media/illustrations/ill_page_c_028.jpg" rend="crop" />
    <head>Tendin’ to business.</head>
    <figDesc>Jim running to fetch water from the town pump</figDesc>
</figure>

<!-- becomes -->

<figure id="ill_page_028" data-rend="nav" data-corresp="#c_jim" data-exlude="false">
    <img src="media/illustrations/ill_page_028.jpg" data-rend="full" />
    <img src="media/illustrations/ill_page_c_028.jpg" data-rend="crop" />
    <h1>Tendin’ to business.</h1>
    <figcaption>Jim running to fetch water from the town pump</figcaption>
</figure>
```



convert to
section[@type="chapter"]
Chapter title
Paragraphs
Milestones
Images
Blockquotes
Notes


for the prototype version let's not have to worry about the head metadata much (we can add them manually for each book) and we also have the main fields already created as custom fields in woo commerce products


as a general rule since we want to retain the information of the initial encoding and we can do that following these guidelines

- all tag elements except `p` and `div` tags get converted to the corresponding "conversion tag" see data mapping spreadsheet
- all their attributes (except xml:id) get converter to a custom `data-*` attribute and retain their attribute value

--- 

__ΕΔΚ Books__
Σχετικά με τα

για το πρώτο iteration ας μείνουμε στα βασικά στοιχεία που ηταν και αυτά που αναφέραμε στο παραδοτέο 4.1. σε συνδυασμο με αυτά που έχουμε στο υφιστάμενο site του Σάκκουλα

https://docs.google.com/document/d/1cKNAoSPmRQyZBFzORuJZ-ZJyJV-wL3dZ60O-A5J_bHs/edit


__ΕΔΚ NLP__

__2022-04-26__
- 10:30 Scrum
- ids for book paragraphs and headings for all books add ids to books and talk with πολυτεχνείο do not strip those ids when running nlp
- Book Data fields
- 14:00 ΕΔΚ Call
- send final letter batch to Olly for testing
- Dashboard (Quartz inspired + Google Material)
- [How to Make Sidebar Menus Easier to Navigate - YouTube](https://www.youtube.com/watch?v=rB1iiiWBwXw)