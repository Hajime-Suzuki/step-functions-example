import StepFunctions from 'aws-sdk/clients/stepfunctions'

export const stepFunctions = new StepFunctions({
  region: process.env.region || 'eu-central-1',
})
