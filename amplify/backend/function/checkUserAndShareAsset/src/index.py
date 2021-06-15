import json
import boto3
# You can access the following resource attributes as environment variables from your Lambda function
#         AUTH_PETRAKIPAUTH_USERPOOLID
#         ENV
#         REGION
def handler(event, context):
    print("received event:")
    print(event)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps("Hello from your new Amplify Python lambda!"),
    }
