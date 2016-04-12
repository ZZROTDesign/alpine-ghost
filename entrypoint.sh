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

if [ ! -e "$GHOST_CONTENT/config.js" ]; then
		cp "$GHOST_SOURCE/config.js" "$GHOST_CONTENT/config.js"
fi

ln -sf "$GHOST_CONTENT/config.js" "$GHOST_SOURCE/config.js"

#Move into the Ghost directory
cd /usr/src/app

#Start Ghost
npm start
