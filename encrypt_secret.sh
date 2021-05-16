#!/bin/sh

gpg --quiet --batch --yes --symmetric --cipher-algo AES256 --passphrase=$(cat .passphrase) .env
