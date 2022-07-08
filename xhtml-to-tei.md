---
Tags: edk projects/doing conversion xml tei
---

> [!IMPORTANT] sync this file 
> ```bash
rsync -vglobtruc ~/_projects/akb/conversion-xthml-to-tei.md ~/_projects/rx-content/xhtml-to-tei.md


### namespace

- [ ] delete `xmlns:epub="http://www.idpf.org/2007/ops"`


### attributtes

- [ ] id → xml:id
- [ ] epub:type → rename to data-epub-type then delete is by refactoring
- [ ] class → type
- [ ] href → source
- [ ] data-role → type
- [ ] lang → xml:lang

### elements
- [ ] section → div
- [ ] h1 → head @type="h1"
- [ ] h6 → head @type="h6"
- [ ] ⚠️ a → ref (must review a [@href] → ref `@target` 
- [ ] header → eliminate this element by refactoring it (unwrap)
- [ ] b → hi[@rend="bold"]
- [ ] span → both hi and rs
- [ ] rs → span
- [ ] head → h1
- [ ] ref → data-ref
- [ ] type → data-type
- [ ] br → lb
- [ ] class → ????
- [ ] ol → list @type="ol"
- [ ] hgroup → unwrap this with refactoring
- [ ] quote → blockquote
- [ ] p @type must become p@rend
- [ ] em → hi rend="em"
- [ ] footer → p[@rend=footer] ⚠️ if within quotes be careful if these are real footers normally they are just signatures
- [ ] abbr → abbr
- [ ] i → hi[@rend="italics"]
- [ ] strong → hi rend="strong"
- [ ] cite → p rend="cite"