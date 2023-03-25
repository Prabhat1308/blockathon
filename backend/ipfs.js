const Moralis = require("moralis").default;
const { EvmApi } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: "C9Nk7zMAjQkPKRTTI52SwYlB0KEDH9GpomKtSjcR0zEJHRi7UV2MpfksV1oC2k13",
  });

  const abi = [
    {
      path: "./example",
      content: "cHNidP8BAHECAAAAAeJQY2VLRtutKgQYFUajEKpjFfl0Uyrm6x23OumDpe/4AQAAAAD/////AkxREgEAAAAAFgAUv6pTgbKHN60CZ+RQn5yOuH6c2WiA8PoCAAAAABYAFJDbOFU0E6zFF/M+g/AKDyqI2iUaAAAAAAABAOsCAAAAAAEBbxqXgEf9DlzcqqNM610s5pL1X258ra6+KJ22etb7HAcBAAAAAAAAAAACACT0AAAAAAAiACC7U1W0iJGhQ6o7CexDh5k36V6v3256xpA9/xmB2BybTFZdDQQAAAAAFgAUKp2ThzhswyM2QHlyvmMB6tQB7V0CSDBFAiEA4Md8RIZYqFdUPsgDyomlzMJL9bJ6Ho23JGTihXtEelgCIAeNXRLyt88SOuuWFVn3IodCE4U5D6DojIHesRmikF28ASEDHYFzMEAxfmfq98eSSnZtUwb1w7mAtHG65y8qiRFNnIkAAAAAAQEfVl0NBAAAAAAWABQqnZOHOGzDIzZAeXK+YwHq1AHtXQEDBAEAAAAAAAA="},
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

  console.log(response.toJSON()[0]);
};

runApp();
