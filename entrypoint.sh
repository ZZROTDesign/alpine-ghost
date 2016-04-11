#!/bin/sh

#Set ENV variables
set -e

#Copy over $GHOST_SOURCE files to different directory
baseDir="$GHOST_SOURCE/content"
for dir in "$baseDir"/*/ "$baseDir"/themes/*/; do
	targetDir="$GHOST_CONTENT/${dir#$baseDir/}"
	mkdir -p "$targetDir"
	if [ -z "$(ls -A "$targetDir")" ]; then
		tar -c --one-file-system -C "$dir" . | tar xC "$targetDir"
	fi
done

#Move into the Ghost directory
cd /usr/src/app

#Start Ghost
npm start
