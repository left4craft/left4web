#!/bin/sh
gpg --quiet --batch --yes --decrypt --passphrase=$(cat .passphrase) --output .env .env.gpg
