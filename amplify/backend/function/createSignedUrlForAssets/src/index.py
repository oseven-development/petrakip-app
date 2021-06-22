import boto3


def handler(event, context):
    try:
        client = boto3.client("s3")
        body = event["arguments"]

        client.head_object(Bucket=body["bucket"], Key=body["key"])

        url = client.generate_presigned_url(
            ClientMethod="get_object", Params={"Bucket": body["bucket"], "Key": body["key"]}, ExpiresIn=300
        )
        return url
    except Exception as e:
        raise e