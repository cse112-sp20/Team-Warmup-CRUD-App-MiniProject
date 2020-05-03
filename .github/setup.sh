#!/bin/bash

echo "Setting up git hooks for code style formatting"
ln -s .github/hooks/pre-commit
mv pre-commit .git/hooks/
ln -s .github/hooks/post-commit
mv post-commit .git/hooks/
