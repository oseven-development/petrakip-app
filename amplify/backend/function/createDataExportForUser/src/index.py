import json
import io
import os
import zipfile
from datetime import datetime
import boto3


s3_client = boto3.client("s3")

BUCKET_NAME = os.environ.get(
    "STORAGE_PETRAKIPBUCKET4ASSETSINMOMENTSANDREFLECTIONS_BUCKETNAME",
    "petrakip-assets-moments-and-reflections172849-philipp",
)


def handler(event, context):
    user_prefix = event["arguments"]["userKey"]
    s3_file_name = f'{datetime.now().strftime("%Y%m%d_%H%M%S")}_archive.zip'
    zip_buffer = io.BytesIO()
    s3_files = []
    kwargs = {"Bucket": BUCKET_NAME, "Prefix": user_prefix}
    while True:
        resp = s3_client.list_objects_v2(**kwargs)
        for obj in resp["Contents"]:
            s3_files.append(obj["Key"])

        try:
            kwargs["ContinuationToken"] = resp["NextContinuationToken"]
        except KeyError:
            break

    with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zipper:
        for file in s3_files:
            if "exports" not in file:
                _, file_name = os.path.split(file)
                infile_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=file)
                infile_content = infile_object["Body"].read()
                zipper.writestr(file_name, infile_content)

    s3_upload_key = f"exports/{s3_file_name}"
    s3_client.put_object(Bucket=BUCKET_NAME, Key=f"{user_prefix}/{s3_upload_key}", Body=zip_buffer.getvalue())

    return s3_upload_key
