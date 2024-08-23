# bin/bash

# Delete data and create data directories
rm -rf ./data && mkdir ./data

################
# fetch AAD data
################
wget https://github.com/auden-in-austria-digital/aad-data/archive/refs/heads/main.zip
unzip main
mv aad-data-main/data/xml ./data/aad
rm -rf aad-data-main
rm main.zip
rm -rf ./data/aad/tmp

################
# fetch AMP data
################
wget https://github.com/auden-musulin-papers/amp-data/archive/refs/heads/main.zip
unzip main
mv amp-data-main/data ./data/amp
rm -rf amp-data-main
rm main.zip
rm -rf ./data/amp/tmp