<?xml version="1.0" encoding="UTF-8"?>
<schema xmlns="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
            <!--
                    <pattern id="sex">
        <p>all sex values must match a a value (if placeRef must much a place etc)</p>
        <rule context="*:person">
            <assert test="*:person/@sex = document(attrs_and_vals.xml)//attr[@name='sex']/value">
                all @sex values must be : 'M' 'F' or 'O'
            </assert>
        </rule>
    </pattern>-->
    <pattern id="test_sex_exist">
        <p>all persons must have a @sex attribute</p>
        <rule context="//*:person">
            <assert test="@sex">all persons must have sex attributes suggested values 'M'</assert>
        </rule>
    </pattern>
    <pattern id="test_sex_value">
        <p>all sex values must match a a value</p>
        <rule context="//*:person/@sex">
            <assert test=". = document('attrs_and_vals.xml')//*:value">
                the sex attribute can only have one the following three values: 'M' 'F' 'O'
            </assert>
        </rule>
    </pattern>
    <pattern>
        <rule context="note">
            <report test="note">nested issue note</report>
        </rule>
    </pattern>
    
</schema>
