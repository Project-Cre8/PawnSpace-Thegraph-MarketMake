import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import {
  Approval,
  MintOrder,
  BurnOrder,
  MintOffer,
  Payback,
  Withdraw,
} from '../generated/templates/PawnSpace/PawnSpace';

export function handleApproval(event: Approval): void {}
export function handleMintOrder(event: MintOrder): void {}
export function handleBurnOrder(event: BurnOrder): void {}
export function handleMintOffer(event: MintOffer): void {}
export function handlePayback(event: Payback): void {}
export function handleWithdraw(event: Withdraw): void {}
