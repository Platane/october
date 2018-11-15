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

export SHA=${CIRCLE_SHA1:-'locall'}
export STACKNAME="safe-blobstore-aws-dynamodb-$SHA"
export DOMAIN="october.yellow-sail-lab.de"
export BRANCH_SLUG=`echo ${CIRCLE_BRANCH:-'local'} | sed 's/[^a-zA-Z0-9]/-/g'`
export CERTIFICATE_ARN="arn:aws:acm:eu-west-1:741455069825:certificate/618f8d6b-3b5c-4b21-8a53-ee8ba7fa24c7"

( cd ./packages/blobstore-aws-dynamodb ; yarn build )

# prepare .build folder
mkdir -p .build

# package app + deploy
aws cloudformation package \
  --template-file ./infrastructure/template.yml \
  --s3-bucket dunelm-template-adsiasdiias123 \
  --output-template-file .build/packaged-template.yml \

aws cloudformation deploy \
  --parameter-overrides Domain=$DOMAIN CertificateArn=$CERTIFICATE_ARN Sha=$SHA BranchSlug=$BRANCH_SLUG \
  --template-file .build/packaged-template.yml \
  --stack-name $STACKNAME \
  --tags app=safe-blobstore-aws-dynamodb sha=$SHA branchSlug=$BRANCH_SLUG \
  --capabilities CAPABILITY_IAM


# grab some params
# export APP_URL=`aws cloudformation describe-stacks --stack-name $STACKNAME \
#   --query 'Stacks[0].Outputs[?OutputKey==\`appUrl\`].OutputValue'`
export APP_URL=`aws cloudformation describe-stacks --stack-name $STACKNAME \
  --query 'Stacks[0].Outputs[?OutputKey==\`appUrl\`].OutputValue' --output text`

export BUCKET_NAME=`aws cloudformation describe-stacks --stack-name $STACKNAME \
  --query 'Stacks[0].Outputs[?OutputKey==\`bucketName\`].OutputValue' --output text`

export S3_URL=`aws cloudformation describe-stacks --stack-name $STACKNAME \
  --query 'Stacks[0].Outputs[?OutputKey==\`s3Url\`].OutputValue' --output text`

echo $APP_URL $BUCKET_NAME

# export APP_BASENAME="/$BUCKET_NAME/"
# export APP_BASENAME="/"
export APP_ORIGIN=$S3_URL
export BLOBSTORE_ENDPOINT=$APP_URL

( cd ./packages/app ; yarn build )

aws s3 mv --no-progress --recursive --acl "public-read" ./packages/app/.build/ s3://$BUCKET_NAME

