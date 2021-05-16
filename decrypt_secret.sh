#!/bin/sh

# --batch to prevent interactive command
# --yes to assume "yes" for questions
#gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
gpg --quiet --batch --yes --decrypt --passphrase=$(cat .passphrase) \
--output .env .env.gpg
