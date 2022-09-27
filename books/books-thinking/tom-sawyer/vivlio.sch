<?xml version="1.0" encoding="UTF-8"?>
<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
	<ns prefix="tei" uri="http://www.tei-c.org/ns/1.0"/>
	<ns prefix="html" uri="http://www.w3.org/1999/xhtml"/>
	<ns prefix="file" uri="http://expath.org/ns/file"/>
	
	<let name="baseURI" value="base-uri()"/>
	<let name="dirURI" value="replace($baseURI, '/[^/]*$', '')"/>
	
	<let name="doc" value="document('combined.xml')"/>
	<let name="sexValues" value="('m', 'f', 'o')"/>
	<let name="glossIDs" value="$doc//tei:div[@xml:id='language']//tei:item[@xml:id]/@xml:id"/>

	<pattern>
		<title>check that image paths actually exist</title>
		<rule context="//*/@url">
			<assert test="file:exists( concat($dirURI, '/', .) )">
				file does not exist
			</assert>
		</rule>
	</pattern>

	<!-- MILESTONE -->

	<pattern>
		<p>all milestones (scenes) have @unit</p>
		<rule context="//tei:milestone">
			<assert test="@unit">
				please add missing `unit` attribute to `milestone` element
			</assert>
		</rule>
	</pattern>
	<pattern>
		<p>Test to see if scenes unit attribute has a value of scene</p>
		<rule context="//tei:milestone">
			<assert test="@unit='scene'">
				'unit' attribute value should be 'scene'
			</assert>
		</rule>
	</pattern>

	<!--RS -->

	<pattern>
		<p>all @ref values start with `#` and are accompanied by @type</p>
		<rule context="//tei:rs">
			<assert test=".[@ref]">
				all rs elements must have a @ref attribute
			</assert>
		</rule>
	</pattern>

	<pattern>
		<rule context="//tei:rs[@ref]">
			<assert test=".[every $w in tokenize(@ref, '\s') satisfies starts-with($w, '#') ]">
				@ref attribute values must start with '#'
			</assert>
		</rule>
	</pattern>
	<pattern>
		<rule context="//*[@ref]">
			<assert test=".[@type]">
				@ref must be accompanied by @type and optionally @subtype
			</assert>
		</rule>
	</pattern>

	<!--persons element: attribute: sex -->
	<pattern id="test_sex_exist">
		<p>all persons must have a @sex attribute</p>
		<rule context="//*:person">
			<assert test="@sex">all persons must have sex attributes suggested values 'm'</assert>
		</rule>
	</pattern>
	<!--persons element: attribute: sex: values -->
	<pattern id="test_sex_value">
		<p>all sex values must match a a value</p>
		<rule context="//*:person/@sex">
			<assert test=". = $sexValues">
				the sex attribute can only have one the following three values: 'M' 'F' 'O'
			</assert>
		</rule>
	</pattern>
	<!--persons references -->
	<pattern>
		<rule context="//tei:rs[@type='persRef' and @ref]">
			<assert test=".[every $r in tokenize(@ref, '\s') satisfies (starts-with($r, '#c_')
				and $r = document('combined.xml')//tei:listPerson/tei:person/concat('#', @xml:id))]">
				ref attribute value must match an xml:id to a person from the list of persons
			</assert>
		</rule>
	</pattern>

	<!--objects -->
	<pattern>
		<p>all @ref values must match an xml:id document in the list of objects</p>
		<rule context="//tei:rs[@type='obRef' and @ref]">
			<assert test=".[some $r in tokenize(@ref, '\s') satisfies (starts-with($r, '#ob_')
				and $r = document('combined.xml')//tei:list[@type='objects']//tei:item/concat('#', @xml:id))]">
				ref attribute value must match an xml:id to an item from the list of objects
			</assert>
		</rule>
	</pattern>
    <!-- PLACES -->
	<!-- places references -->
	<pattern>
		<p>all @ref values must match an xml:id document in the list of places</p>
		<rule context="//tei:rs[@type='placeRef' and @ref]">
			<assert test=".[some $r in tokenize(@ref, '\s') satisfies (starts-with($r, '#pl_')
				and $r = document('combined.xml')//tei:listPlace/tei:place/concat('#', @xml:id))]">
				ref attribute value must match an xml:id to an item from the list of places and the ID must have a `pl_` prefix and start with a `#`
			</assert>
		</rule>
	</pattern>
	<!-- DICTIONARY -->
	<!--distinct element: attribute: type: values -->
	<pattern id="test_distinct_type_value">
		<p>all type values must match a a value</p>
		<rule context="//*:distinct/@type">
			<assert test=". = $glossIDs">
				the type attribute can only have one the following three values: 'l_ae' 'l_sae' '
			</assert>
		</rule>
	</pattern>
	
	<!-- SAID -->
	<pattern>
		<p>Test to see if `said` elements have a `who` attribute</p>
		<rule context="//tei:said">
			<assert test="@who">
				missing `who` attribute in `said` element
			</assert>
			<assert test=".[every $w in tokenize(@who, '\s') satisfies $w = document('combined.xml')//tei:listPerson/tei:person/concat('#', @xml:id)]">
				all who values must match an xml:id document in the list of persons
			</assert>
		</rule>
	</pattern>
	
	<!-- ANCHORS -->
	<!-- anchors: id -->
	<pattern>
		<p>Test to see if `anchor` elements have an `xml:id` attribute</p>
		<rule context="//tei:anchor">
			<assert test="@xml:id">
				missing `xml:id` attribute in `anchor` element
			</assert>
		</rule>
	</pattern>
	<!-- WORDS -->
	
	
	
	
	<!-- TODO all who attribute values must have a xml:id documented in a master file -->
	<!-- corresp values -->
	<pattern>
		<p>check that all @who values match an xml:id document in the list of persons</p>
	</pattern>

</schema>

<!-- NOTE: Namespacing -->
<!--
	TEI test with this will work with any prefix if you want to be more
	specific you must declare a namespace and a prefix the asterisk is will be
	namespace agnostic. Otherwise after declaring the namespace at the top of the
	schematron file you will have to prefix elements with tei:
-->

<!-- OLD WAY OF TESTING attribut values with ids in master.xml works only for single values -->
<!--
	<pattern>
		<p>all @ref values must match and xml:id document in the list of persons, objects, places (if placeRef must much a place etc)</p>
		<rule context="//*[@type='persRef' and @ref]">

			<assert test=".[substring(@ref, 2) = document('master.xml')//tei:listPerson/tei:person/@xml:id]">
				all ref values must match an xml:id document in the list of persons, objects, places (if placeRef must much a place etc)
			</assert>
		</rule>
	</pattern>
-->

