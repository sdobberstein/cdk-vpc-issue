#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkVpcIssueStack } from '../lib/cdk-vpc-issue-stack';

const app = new cdk.App();
new CdkVpcIssueStack(app, 'CdkVpcIssueStack', {
  env: {
    account: '',
    region: '',
  },
  subnetIds: [''],
  vpcId: '',
});
