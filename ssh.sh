#!/bin/bash
CURRENT="$(pwd)"
EC2_URL="$(node $CURRENT/index.js $*)"
if [ $? -ne 0 ]
    then
        echo "$EC2_URL"
        exit 1
fi

if [ $1 == "--help" ]
    then
        echo "$EC2_URL"
        exit 0
fi

$EC2_URL