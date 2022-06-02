import { DYNAMIC_CONTRACT_ADDRESS } from '@prepo-io/stores'
import { ButtonProps } from 'antd'
import { makeAutoObservable } from 'mobx'
import { MiniGame } from './games'
import { MinigameHookStore } from '../../../stores/entities/MinigameHook.entity'
import { MinigameProRataStore } from '../../../stores/entities/MinigameProRata.entity'
import { RootStore } from '../../../stores/RootStore'
import { LOADING } from '../../../utils/common-utils'
import { RewardTokenStore } from '../../../stores/entities/RewardToken.entity'
import { formatContractAddress } from '../../../stores/utils/common-utils'
import { transformRawEther } from '../../../utils/number-utils'

export class MinigameStore {
  loading = false
  details: MiniGame
  hook: MinigameHookStore
  proRata: MinigameProRataStore
  rewardToken: RewardTokenStore
  constructor(public root: RootStore, details: MiniGame) {
    this.details = details
    this.proRata = new MinigameProRataStore(root, details.proRataAddress, details.title)
    this.hook = new MinigameHookStore(root, details.hookAddress, this.proRata)
    this.rewardToken = new RewardTokenStore(root, this.proRata)
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(loading: boolean): void {
    this.loading = loading
  }

  async doAction(): Promise<void> {
    if (!this.loading) {
      this.setLoading(true)
      await this.proRata.action()
      this.setLoading(false)
    }
  }

  async claimReward(): Promise<void> {
    if (!this.loading) {
      this.setLoading(true)
      await this.proRata.claim()
      this.setLoading(false)
    }
  }

  callToAction(): Promise<void> {
    if (this.prevPeriodPayout > 0) {
      return this.claimReward()
    }
    return this.doAction()
  }

  get buttonProps(): ButtonProps {
    const { currActionCount, userActionLimitPerPeriod } = this.proRata
    if (
      userActionLimitPerPeriod === undefined ||
      this.eligible === undefined ||
      this.limitReached === undefined ||
      this.prevPeriodPayout === undefined ||
      this.curPeriodPayout === undefined ||
      this.rewardTokenBalance === undefined ||
      this.rewardTokenSymbol === undefined
    )
      return LOADING

    if (this.rewardTokenBalance < this.prevPeriodPayout)
      return { disabled: true, children: `Out of ${this.rewardTokenSymbol}! Check back later!` }
    if (this.prevPeriodPayout > 0)
      return {
        children: `Claim ${this.prevPeriodPayout.toFixed(4)} ${this.rewardTokenSymbol}`,
        disabled: this.loading,
        loading: this.loading,
      }
    if (!this.eligible) return { disabled: true, children: 'Ineligible for this task!' }
    if (this.curPeriodPayout === 0) return { disabled: true, children: 'No payout available yet!' }
    if (this.limitReached) return { disabled: true, children: 'Earn limit reached!' }
    let children = this.details.buttonText
    if (userActionLimitPerPeriod > 0)
      children = `${children} (${currActionCount}/${userActionLimitPerPeriod})`
    return { children, disabled: this.loading, loading: this.loading }
  }

  get claimableRewardAmount(): number | undefined {
    const { currActionCount } = this.proRata
    if (currActionCount === undefined || this.curPeriodPayout === undefined) return undefined
    return currActionCount * this.curPeriodPayout
  }

  get curPeriodPayout(): number | undefined {
    const { rewardAmountPerPeriod, totalCurrActionCount } = this.proRata
    if (rewardAmountPerPeriod === undefined || totalCurrActionCount === undefined) return undefined
    return +(rewardAmountPerPeriod / (totalCurrActionCount || 1)).toFixed(4)
  }

  get eligible(): boolean | undefined {
    const {
      minAcquireCount,
      minCompeteCount,
      minEnterpriseCount,
      minMergeCount,
      minReviveCount,
      mustBeRebranded,
      mustBeRenamed,
    } = this.hook
    const { signerHookStats } = this.root.signerStore

    if (
      minAcquireCount === undefined ||
      minCompeteCount === undefined ||
      minEnterpriseCount === undefined ||
      minMergeCount === undefined ||
      minReviveCount === undefined ||
      mustBeRebranded === undefined ||
      mustBeRenamed === undefined ||
      signerHookStats === undefined
    )
      return undefined

    const { acquisitions, competes, enterpriseCount, mergers, rebranded, renamed, revives } =
      signerHookStats

    return (
      acquisitions >= minAcquireCount &&
      competes >= minCompeteCount &&
      enterpriseCount >= minEnterpriseCount &&
      mergers >= minMergeCount &&
      revives >= minReviveCount &&
      rebranded >= mustBeRebranded &&
      renamed >= mustBeRenamed
    )
  }

  get hasClaim(): boolean | undefined {
    if (this.prevPeriodPayout === undefined) return undefined
    return this.prevPeriodPayout > 0
  }

  get limitReached(): boolean | undefined {
    const { userActionLimitPerPeriod, currActionCount } = this.proRata
    if (userActionLimitPerPeriod === undefined || currActionCount === undefined) return undefined
    return userActionLimitPerPeriod > 0 && currActionCount >= userActionLimitPerPeriod
  }

  get prevPeriodPayout(): number | undefined {
    const { prevActionCount, rewardAmountPerPeriod, totalPrevActionCount } = this.proRata
    if (prevActionCount === undefined || totalPrevActionCount === undefined) return undefined
    return +((rewardAmountPerPeriod / totalPrevActionCount) * prevActionCount).toFixed(4)
  }

  get rewardTokenSymbol(): string | undefined {
    return formatContractAddress(this.rewardToken.symbol())
  }

  get rewardTokenBalance(): number | undefined {
    if (this.proRata.address === undefined || this.proRata.address === DYNAMIC_CONTRACT_ADDRESS)
      return undefined
    return transformRawEther(this.rewardToken.balanceOf(this.proRata.address))
  }
}