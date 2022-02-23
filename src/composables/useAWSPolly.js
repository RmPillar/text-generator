import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";

export const useAWSPolly = async (text) => {
  const client = new Polly({
    region: "eu-west-2",
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: "eu-west-2" }),
      identityPoolId: "eu-west-2:ad967119-8b03-4bfe-bc72-00cfe6896ac2", // IDENTITY_POOL_ID
    }),
  });

  const speechParams = {
    OutputFormat: "mp3", // For example, 'mp3'
    SampleRate: "24000",
    Text: text, // The 'speakText' function supplies this value
    VoiceId: "Amy", // For example, "Matthew"
  };

  const url = await getSynthesizeSpeechUrl({
    client,
    params: speechParams,
  });

  return { url };
};
