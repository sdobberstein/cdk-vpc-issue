# CDK VPC Issue Demo Repo

## Before Running
Make sure you populate values related to your AWS Account into `bin/cdk-vpc-issue.ts`.  I was using two "Private" subnets within the VPC when I ran into the issue.

## Issue
If you have a stack where you need to look up an existing VPC (using `VPC.fromLookup`) and add a VPC Interface Endpoint to it, it will fail if the `cdk.context.json` file does not exist or does not contain information about that VPC already.  The error that you will see after running any CDK command is:

```
Cannot create a VPC Endpoint with no subnets
Subprocess exited with error 1
```
## Workaround
In order to get around this issue you can comment out the VPC Interface Endpoint code from your stack.  Then run a CDK command (ex. `cdk ls`) which will cause it to generate or update the `cdk.context.json` file.  Then you can uncomment out the VPC Interface Endpoint and then it should work.
