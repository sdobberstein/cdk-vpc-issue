#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {InterfaceVpcEndpointAwsService, SubnetFilter, Vpc} from "@aws-cdk/aws-ec2";

const app = new cdk.App();

interface MyStackProps extends StackProps {
  readonly subnetIds: string[];
  readonly vpcId: string;
}

class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: MyStackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, 'Vpc', {
      vpcId: props.vpcId,
    });

    const secretsManagerEndpoint = vpc.addInterfaceEndpoint('SecretsManagerEndpoint', {
      service: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
      subnets: {
        subnetFilters: [SubnetFilter.byIds(props.subnetIds)],
      },
    });
    secretsManagerEndpoint.connections.allowDefaultPortFromAnyIpv4();
  }
}

new MyStack(app, 'MyStack', {
  env: {
    account: 'xxx',
    region: 'us-east-1',
  },
  subnetIds: [
    'xxx',
    'xxx'
  ],
  vpcId: 'xxx'
});
