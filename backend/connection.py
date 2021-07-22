import boto3

AWS_ACCESS_KEY = "AKIAVJ6H6FLE5FNMZF4V"
AWS_SECRET_KEY = "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"
BUCKET_NAME = "gagagaga"

def s3_connection():
	s3 = boto3.client('s3',
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_SECRET_KEY)
	return s3