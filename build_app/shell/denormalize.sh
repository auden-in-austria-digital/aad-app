# bin/bash

denormalize-indices -f "./data/amp/editions/*/*.xml" -i "./data/indices/*.xml" -m ".//tei:rs[@ref]/@ref|//tei:quote[@source]/@source" -x ".//tei:titleStmt/tei:title[@level='a']/text()"
denormalize-indices -f "./data/aad/editions/*.xml" -i "./data/indices/*.xml" -m ".//tei:rs[@ref]/@ref|//tei:quote[@source]/@source" -x ".//tei:titleStmt/tei:title[@level='a']/text()"