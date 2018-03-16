#!/bin/bash
for i in 'first' 'second' 'third' 'fourth' 'fifth' 'sixth' 'seventh' 'eighth' 'ninth' 'tenth'
do
  mongoimport --db WeGotData --collection restaurants --type json --file ./JsonFiles/${i}MilEntries.json --jsonArray --numInsertionWorkers 2
done
