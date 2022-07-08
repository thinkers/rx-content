---
Tags: edk serialisation projects/doing conversion
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

#### attributes
- [ ] url="" → src=""
- [ ] xml:id="" → id=""
- [ ] type="" → data-type=""
- [ ] xml:lang → lang
- [ ] subdata-type → data-subdata-type
- [ ] n="" → data-n=""
- [ ] exclude="" → data-exclude=""
- [ ] facs="" → data-facs=""
- [ ] ed → data-ed
- [ ] dur → data-dur
- [ ] when → data-when
- [ ] when-custom → data-when-custom
- [ ] corresp → data-corresp
- [ ] rend → data-rend
- [ ] who → data-who
- [ ] ref → data-ref
- [ ] ana → data-ana
- [ ] aloud → data-aloud
- [ ] unit → data-unit
- [ ] quantity → data-quantity
- [ ] resp → data-resp
- [ ] rendition → data-rendition
- [ ] next → data-next
- [ ] from → data-from
- [ ] to → data-to
- [ ] full → data-full
- [ ] ?anchored → data-anchored
- [ ] target → data-target
- [ ] source → data-source
- [ ] sex → data-sex
- [ ] age → data-age
- [ ] sort → data-sort
- [ ] notAfter-custom → data-notAfter-custom
- [ ] notBefore-custom → data-notBefore-custom
- [ ] name → data-name
- [ ] mutual → data-mutual
- [ ] active → data-active
- [ ] passive → data-passive
- [ ] copyOf → data-copyOf
- [ ] xml:base ?? REVIEW


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
- [ ] geo → p data-was="geo"
- [ ] lb → br
- [ ] foreign [@xml:lang] → span[@lang]
- [ ] blockquote → quote

_BACKMATTER_

ATT: backmater has to be moved within html body after conversion to html
- [ ] back → `<div data-was="back">`
- [ ] list → `<ul> data-was="list">`
	- [ ] item → `<li data-was="item"`

 LISTS
- [x] listPerson → `<ul data-was="listPerson">`
	- [x] person → `<li data-was="person">`
		- [x] persName → div data-was="persName"
			- [x] rolename → p data-was="rolename"
			- [x] forename → p data-was="forename"
			- [x] surname → p data-was="surname"
			- [x] genName →p data-was="genName"
		- [x] birth → p data-was="birth"
		- [x] death → p data-was="death"
		- [x] faith → p data-was="faith"
		- [x] nationality
		- [x] occupation → p data-was="occupation"
		- [ ] state → div data-was="state"
		- [x] residence → div data-was="residence"
		- [x] listPlace → ul data-was="listPlace"
		- [x] place → li data-was="place"
			- [x] placeName → p data-was="placeName" (also appears inside `residence` element)
		- [ ] location data-was="location"
		- [ ] trait → div data-was="trait"
		- [ ] label → p data-was="label"
		- [x] desc →  p data-was="desc"
		- [x] name → p  data-was="name"


List Relationships
- [x] listRelation → ul data-was="listRelation" data-type="relationships"
	- [x] relation → li data-was="relation"

Interpretation
- [x] interpGrp → ul data-was="interpGrp"
- [x] interp → li data-was="interp"

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