#!/bin/sh

curl -XPOST http://hastebin.com/documents -d $LARGE_SECRET_PASSPHRASE

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE"  --output .env .env.gpg
