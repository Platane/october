#!/bin/sh

set -e

# export APP_BASENAME="/staging/"
#
# ( cd ../packages/apps/client && rm -rf .build && yarn build )
# ( cd ../packages/apps/lambda-page-renderer && rm -rf .build && yarn build )
# ( cd ../packages/apps/lambda-static-asset-server && rm -rf .build && yarn build )
#
# cp ../packages/apps/lambda-page-renderer/.build/bundle.zip lambda-page-renderer-bundle.zip
# cp ../packages/apps/lambda-widget-renderer/.build/bundle.zip lambda-widget-renderer-bundle.zip
# cp ../packages/apps/lambda-static-asset-server/.build/bundle.zip lambda-static-asset-server-bundle.zip
#

yarn build

aws cloudformation package \
  --template-file script/template.yml \
  --s3-bucket dunelm-template-adsiasdiias123 \
  --output-template-file .build/packaged-template.yml \
&& \
aws cloudformation deploy \
  --template-file .build/packaged-template.yml \
  --stack-name safe-blobstore-aws-dynamodb \
  --tags app=safe-blobstore-aws-dynamodb \
  --capabilities CAPABILITY_IAM
