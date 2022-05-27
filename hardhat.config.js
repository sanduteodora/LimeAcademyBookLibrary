require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
{process.env.PRIVATE_KEY}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async () => {
        const deployBookLibraryContract = require("./scripts/deploy");
        await deployBookLibraryContract();
    });

    subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
      await hre.run('print', { message: "Done!" })
    });

    task("deploy-mainnet", "Deploys contract on a provided network")
    .addParam("privateKey", "Please provide the private key")
    .setAction(async ({privateKey}) => {
        const deployBookLibraryContract= require("./scripts/deploy-with-param");
        await deployBookLibraryContract(privateKey);
    });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/b5590a37401642a2b0a983d10099622c",
      accounts: ['f917d27670c8eb67120b641ed01bd4c1df7b98a7f06fb3e422734d00e43ef36a']
    }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY"
  }
};
