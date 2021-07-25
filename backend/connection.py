import boto3

AWS_ACCESS_KEY = "AKIAVJ6H6FLETK45PV56"
AWS_SECRET_KEY = "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"
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
