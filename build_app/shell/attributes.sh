# bin/bash

echo "add attributes"
add-attributes -g "./data/amp/editions/*/*.xml" -b "https://aad.acdh.oeaw.ac.at"
add-attributes -g "./data/aad/editions/*.xml" -b "https://aad.acdh.oeaw.ac.at"