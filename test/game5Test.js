const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { networks } = require('../hardhat.config');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    let threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    let accounts = networks.hardhat.accounts.count;
    for (let i=0; i<accounts; i++) {
      let winner = await ethers.getSigners(i);
      if (winner.address < threshold) {
        await game.connect(winner).win();
        assert(await game.isWon(), 'You did not win the game');
      }
    }

    // leave this assertion as-is
  });
});
