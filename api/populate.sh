#!/bin/bash


for i in {1..92}
do
	curl -X POST http://localhost:1337/games/populate\?page\=$i  
	echo ------------------ page $i -------------------
	echo ------------------ page $i -------------------
	echo ------------------ page $i -------------------
	echo ------------------ page $i -------------------
	echo ------------------ page $i -------------------
done
