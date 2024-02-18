#!/bin/bash

source package.env

cd dist
zip -Dr ../lambda.zip index.js
cd ..

FNENV="$(aws lambda get-function-configuration --function-name $LAMBDA_FUNCTION_NAME 2>&1)"

if [[ $FNENV == *"ResourceNotFoundException"* ]]; then
  aws lambda create-function --function-name $LAMBDA_FUNCTION_NAME \
    --runtime nodejs20.x --handler index.handler \
    --role $LAMBDA_ROLE \
    --zip-file fileb://lambda.zip
else
  aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME \
    --zip-file fileb://lambda.zip
fi
