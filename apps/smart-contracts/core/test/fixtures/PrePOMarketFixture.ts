import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { CreateMarketResult } from './PrePOMarketFactoryFixture'
import { PrePOMarket } from '../../typechain/PrePOMarket'

export async function prePOMarketFixture(
  governance: string,
  collateral: string,
  longToken: string,
  shortToken: string,
  floorLongPayout: BigNumber,
  ceilingLongPayout: BigNumber,
  floorValuation: BigNumber,
  ceilingValuation: BigNumber,
  mintingFee: number,
  redemptionFee: number,
  expiryTime: number,
  publicMinting: boolean
): Promise<PrePOMarket> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prePOMarket: any = await ethers.getContractFactory('PrePOMarket')
  return (await prePOMarket.deploy(
    governance,
    collateral,
    longToken,
    shortToken,
    floorLongPayout,
    ceilingLongPayout,
    floorValuation,
    ceilingValuation,
    mintingFee,
    redemptionFee,
    expiryTime,
    publicMinting
  )) as PrePOMarket
}

export async function prePOMarketAttachFixture(
  market: string | CreateMarketResult
): Promise<PrePOMarket> {
  const marketAddress: string = typeof market !== 'string' ? market.market : market

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prePOMarket: any = await ethers.getContractFactory('PrePOMarket')
  return prePOMarket.attach(marketAddress) as PrePOMarket
}
