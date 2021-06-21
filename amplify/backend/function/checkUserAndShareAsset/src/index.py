import json
import boto3
import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# You can access the following resource attributes as environment variables from your Lambda function
#         AUTH_PETRAKIPAUTH_USERPOOLID
#         ENV
#         REGION

session = boto3.session.Session(region_name="eu-central-1")
client = session.client("cognito-idp")

UserPoolId = os.environ["AUTH_PETRAKIPAUTH_USERPOOLID"]


def createUser(email_address):
    # Returntype
    # {
    #     "User": {
    #         "Username": "user3@maxhaensel.de",
    #         "Attributes": [
    #             {"Name": "sub", "Value": "081fd72d-2478-40de-9022-540e2cd6f90f"},
    #             {"Name": "email_verified", "Value": "true"},
    #             {"Name": "email", "Value": "user3@maxhaensel.de"},
    #         ],
    #         "UserCreateDate": datetime.datetime(2021, 6, 16, 20, 49, 27, 131000, tzinfo=tzlocal()),
    #         "UserLastModifiedDate": datetime.datetime(2021, 6, 16, 20, 49, 27, 131000, tzinfo=tzlocal()),
    #         "Enabled": True,
    #         "UserStatus": "FORCE_CHANGE_PASSWORD",
    #     },
    #     "ResponseMetadata": {
    #         "RequestId": "310b4d9a-fefa-439a-88af-18770497d6e5",
    #         "HTTPStatusCode": 200,
    #         "HTTPHeaders": {
    #             "date": "Wed, 16 Jun 2021 18:49:27 GMT",
    #             "content-type": "application/x-amz-json-1.1",
    #             "content-length": "334",
    #             "connection": "keep-alive",
    #             "x-amzn-requestid": "310b4d9a-fefa-439a-88af-18770497d6e5",
    #         },
    #         "RetryAttempts": 0,
    #     },
    # }
    try:
        # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#CognitoIdentityProvider.Client.admin_create_user
        response = client.admin_create_user(
            UserPoolId=UserPoolId,
            Username=email_address,
            TemporaryPassword="password",
            UserAttributes=[
                {"Name": "email", "Value": email_address},
                {"Name": "email_verified", "Value": "true"},
            ],
            MessageAction="SUPPRESS",
        )

    except Exception as error:
        logger.error(error)
        raise Exception(f"unable to create User with email {email_address}")

    try:
        return {"username": response["User"]["Username"], "alreadyExist": False}
    except Exception as error:
        logger.error(error)
        raise error


def gather_user(email_address):
    try:
        # Returntype
        # {
        #     "Username": "user3@maxhaensel.de",
        #     "UserAttributes": [
        #         {"Name": "sub", "Value": "081fd72d-2478-40de-9022-540e2cd6f90f"},
        #         {"Name": "email_verified", "Value": "true"},
        #         {"Name": "email", "Value": "user3@maxhaensel.de"},
        #     ],
        #     "UserCreateDate": datetime.datetime(2021, 6, 16, 20, 49, 27, 131000, tzinfo=tzlocal()),
        #     "UserLastModifiedDate": datetime.datetime(2021, 6, 16, 20, 49, 27, 131000, tzinfo=tzlocal()),
        #     "Enabled": True,
        #     "UserStatus": "FORCE_CHANGE_PASSWORD",
        #     "ResponseMetadata": {
        #         "RequestId": "e3dd98a4-b3d4-430a-843a-e3c3daff34ce",
        #         "HTTPStatusCode": 200,
        #         "HTTPHeaders": {
        #             "date": "Wed, 16 Jun 2021 19:05:41 GMT",
        #             "content-type": "application/x-amz-json-1.1",
        #             "content-length": "329",
        #             "connection": "keep-alive",
        #             "x-amzn-requestid": "e3dd98a4-b3d4-430a-843a-e3c3daff34ce",
        #         },
        #         "RetryAttempts": 0,
        #     },
        # }
        response = client.admin_get_user(UserPoolId=UserPoolId, Username=email_address)
        return {"username": response["Username"], "alreadyExist": True}

    except client.exceptions.UserNotFoundException as error:
        logger.info(f"create new user with email: {email_address}")
        return createUser(email_address)
    except Exception as error:
        logger.error(error)


def error_event(code, body):
    return {
        "statusCode": code,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps(body),
    }


def handler(event, context):
    try:
        username = event["arguments"]["username"]
    except Exception as error:
        logger.error(error)
        raise Exception(f"unable to extract username")

    # https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
    # Check if is it a regular mail!
    try:
        pass
    except Exception as error:
        logger.error(error)
        raise Exception(f"username {username} is not a regular email")

    response = gather_user(username)

    return response