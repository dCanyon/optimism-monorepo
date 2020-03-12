import '../setup'

/* External Imports */
import { getLogger, hexStrToNumber } from '@eth-optimism/core-utils'
import { Contract, ethers } from 'ethers'
import { createMockProvider, deployContract, getWallets } from 'ethereum-waffle'

/* Contract Imports */
import * as ExecutionManager from '../../build/contracts/ExecutionManager.json'

/* Internal Imports */
import { GAS_LIMIT, CHAIN_ID, OPCODE_WHITELIST_MASK } from '../../src/app'
import { DEFAULT_ETHNODE_GAS_LIMIT } from '../helpers'

export const abi = new ethers.utils.AbiCoder()

const log = getLogger('execution-manager-recover-eoa-address', true)

/*********
 * TESTS *
 *********/

describe('Execution Manager -- Recover EOA Address', () => {
  const provider = createMockProvider({ gasLimit: DEFAULT_ETHNODE_GAS_LIMIT })
  const [wallet] = getWallets(provider)
  // Useful constant
  const ONE_FILLED_BYTES_32 = '0x' + '11'.repeat(32)
  // Create pointers to our execution manager & simple copier contract
  let executionManager: Contract

  beforeEach(async () => {
    // Deploy ExecutionManager the normal way
    executionManager = await deployContract(
      wallet,
      ExecutionManager,
      [OPCODE_WHITELIST_MASK, '0x' + '00'.repeat(20), GAS_LIMIT, 0, true],
      { gasLimit: DEFAULT_ETHNODE_GAS_LIMIT }
    )
  })

  describe('getTimestamp', async () => {
    it('returns the timestamp', async () => {
      let timestamp = await executionManager.getTimestamp()
      timestamp.toNumber().should.equal(0)
    })
  })
})
