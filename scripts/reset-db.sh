#!/bin/bash

echo "Resetting database..."
cat scripts/createTestData.script | mongosh mongodb+srv://hack4impactcm:6VhUxvUZlSc2z7d3@compassionministries.hkxvhf1.mongodb.net/ >/dev/null
echo "Done."