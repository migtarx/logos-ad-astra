#!/bin/sh
set -e

if [ -z "$CLIENT_ID" ]; then
    echo "ERROR: CLIENT_ID not defined"
    exit 1
fi

if [ -z "$CLIENT_SECRET" ]; then
    echo "ERROR: CLIENT_SECRET not defined"
    exit 1
fi

if [ -z "$INFI_URI" ]; then
    echo "ERROR: INFI_URI not defined"
    exit 1
fi

if [ -z "$PROJECT_ID" ]; then
    echo "ERROR: PROJECT_ID not defined"
    exit 1
fi

if [ -z "$ENV" ]; then
    echo "ERROR: ENV not defined"
    exit 1
fi



exec "$@"