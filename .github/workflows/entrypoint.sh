#!/bin/sh

if [ -z "${FIREBASE_TOKEN}" ]; then
    echo "FIREBASE_TOKEN is missing"
    exit 1
fi

if [ -z "${FIREBASE_PROJECT}" ]; then
    echo "FIREBASE_PROJECT is missing"
    exit 1
fi

if [ "${GITHUB_REF}" != "refs/heads/deploy_static_content" ]; then
    echo "Branch: ${GITHUB_REF}"
    echo "Aborting deploy_static_content branch deployment"
    exit 1
fi

firebase deploy \
    -m "${GITHUB_SHA}" \
    --project ${FIREBASE_PROJECT} \
    --only hosting
