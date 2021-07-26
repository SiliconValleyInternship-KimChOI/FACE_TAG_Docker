import boto3

AWS_ACCESS_KEY = ""
AWS_SECRET_KEY = ""
REGION = "ap-northeast-2"
BUCKET_NAME = "gagagaga"
BUCKET_URL = ""


def s3_connection():
    s3 = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=REGION,
    )
    return s3
