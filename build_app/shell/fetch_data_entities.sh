# bin/bash

rm main.zip
rm -rf amp-entities-main
wget https://github.com/Auden-Musulin-Papers/amp-entities/archive/refs/heads/main.zip
unzip main
mkdir ./data/indices
mv amp-entities-main/out/*.xml ./data/indices
mv amp-entities-main/out/*.geojson ./data/indices
mv amp-entities-main/json_dumps/person_person.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/person_org.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/merged_relationships.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/persons.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/places.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/organizations.json ./html/js/json/analytics
mv amp-entities-main/json_dumps/events.json ./html/js/json/analytics
rm -rf amp-entities-main
rm main.zip
