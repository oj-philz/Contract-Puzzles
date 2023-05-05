const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [signer, signer1] = await ethers.getSigners();

    return { game, signer, signer1 };
  }
  it('should be a winner', async function () {
    const { game, signer, signer1 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signer).write(signer1.address);

    await game.connect(signer1).win(signer.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
