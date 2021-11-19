import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {InterfaceVpcEndpointAwsService, SubnetFilter, Vpc} from "@aws-cdk/aws-ec2";

export interface CdkVpcIssueStackProps extends StackProps {
  readonly subnetIds: string[];
  readonly vpcId: string;
}

export class CdkVpcIssueStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkVpcIssueStackProps) {
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
