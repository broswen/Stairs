## Testing AWS Step Functions

### Using serverless-step-functions plugin

### Mock service/workflow

Mocks automated data collection and reporting.

1. Automated trigger by CloudWatch (TODO)
1. Lambda verifies date and email are allowed
1. Lambda "downloads" data and generates report, uploads to S3 bucket
1. SES sends email with file as body
1. SES sends email with file as attachement (TODO)
