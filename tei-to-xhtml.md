### TEI to XHTML conversion

- add exlude attribute to all `note` elements they should not appear by default
- maybe add exclude attribute on all reg element


maybe @type should remain data-type and not be converted to data-role

#### attributes
- [x] url="" → src=""
- [x] xml:id="" → id=""
- [x] type="" → data-type=""
- [x] subdata-type → data-subdata-type
- [x] n="" → data-n=""
- [x] exclude="" → data-exclude=""
- [x] facs="" → data-facs=""
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
- [ ] target → data-target
- [x] source → data-source
- [ ] sex → data-sex
- [ ] age → data-age
- [ ] sort → data-sort
- [ ] erase all `<NO_NAMESPACE>`
- [ ] xml:base ?? REVIEW


---


#### elements
before you perform any element change make sure you add it as an atrribute using XML refactoring `Add/Change atrribute`

- [x] head → h1
- [x] milestone → `<p data-was="milestone">`
- [ ] note → `<div data-was="note">` ATTENTION could be either a span or a div we must include in TEI XML e.g. a subtype inline| block to distinquish them
- [ ] view → `<span data-was="view">`
- [x] date → `<span data-was="date">`
- [x] time → `<span data-was="time">`
- [x] emph → `<em data-was="emph">`
- [x] anchor → `<p data-was="anchor">`
- [x] said  → `<span data-was="said">` (see: [[#Said]])
	- [x] distinct `<span data-was="distinct"`
		- [x] choice → `<span data-was="choice">`
			- [x] orig → `<span data-was="orig">`
			- [x] reg → `<span data-was="reg">`
- [x] seg → `<span data-was="seg"`
- [x] rs → `<span data-was="rs"`
- [x] pb → `<span data-was="pb"> 
- [x] figure → figure  (see: [[#Figures]])
	- [x] graphic → `<img data-was="graphic">`
	- [x] figDesc > `<figcaption data-was="figDesc">`
- [ ] l → ???
- [ ] measure → `<span data-was="measure"?>`

_BACKMATTER_
- [ ] back → `<div data-was="back">`
- [ ] list → `<ul> data-was="list">`
	- [ ] item → `<li data-was="item"`

Person list
- [ ] listPerson → `<ul data-was="listPerson">`
	- [ ] person 
		- [ ] persName
			- [ ] rolename
			- [ ] forename
			- [ ] surname
		- [ ] birth
		- [ ] death
		- [ ] nationality
		- [ ] occupation
		- [ ] residence
			- [ ] placeName
		- [ ] trait
			- [ ] label
			- [ ] desc
		- [ ] name


Relationships
- [  ] listRelation
	- [  ] relation



Places

Objects Lists

Interpretation





#### Post pass
some data-n attributes will be used to create aria labels for instance
- within //span[@data-was="pagebreak"] there is a an  `@data-n` attribute whos value should be used to create an `aria-label` of the same value




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


Τα στοιχεία που επιλέγουμε να καταγράψουμε για έναν τίτλο περιεχομένου είναι τα εξής:


-   Τίτλος 
-   Υπότιτλος
-   Συγγραφέας
-   Αριθμός έκδοσης
-   Αριθμός τεύχους (για περιοδικά)
-   Αριθμός σελίδων 
-   Εκδότης
-   Έτος έκδοσης
-   ISBN (για βιβλία)
-   Πνευματικά Δικαιώματα
-   Πληροφορίες για την πηγή του περιεχομένου
-   Γλώσσα
-   Περιγραφή (σύντομη περιγραφή)
-   Θεματικές ετικέτες (προσδιορίζουν την θεματολογία του πόρου)
    
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