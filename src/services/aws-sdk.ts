/**
 * AWS SDK service module.
 *
 * @module services/aws-sdk
 */

// Just include what we need from the AWS SDK
import _CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import _CognitoIdentity from 'aws-sdk/clients/cognitoidentity';
import _S3 from 'aws-sdk/clients/s3';

import AWS from 'aws-sdk/global';

export const CognitoIdentityServiceProvider = _CognitoIdentityServiceProvider;
export const CognitoIdentity = _CognitoIdentity;
export const S3 = _S3;

export default AWS;
