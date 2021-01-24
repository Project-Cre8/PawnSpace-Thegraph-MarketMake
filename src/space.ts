import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import { Approval, MintOrder, BurnOrder, Offer, Payback, Withdraw } from '../generated/templates/PawnSpace/PawnSpace';
import { Space, Order } from '../generated/schema';

let ZERO_BI = BigInt.fromI32(0);

export function handleApproval(event: Approval): void {}
export function handleMintOrder(event: MintOrder): void {
  let spaceAddress = event.address.toHexString();

  // create order
  let id = spaceAddress.concat('-').concat(event.params.orderId.toHexString());
  let order = new Order(id);
  order.owner = event.params.sender.toHexString();
  order.tokenIds = event.params.tokenIds;
  order.requestAmount = event.params.requestAmount;
  order.interest = event.params.interest;
  order.period = event.params.period;
  order.additionalCollateral = event.params.additionalCollateral;
  order.offeror = '';
  order.createdAt = event.params.createdAt;
  order.offeredAt = ZERO_BI;
  order.paidBackAt = ZERO_BI;
  order.withdrewAt = ZERO_BI;
  order.space = spaceAddress;
  order.save();

  // update space
  let space = Space.load(spaceAddress);
  let ordersTemp = space.orders;
  ordersTemp.push(id);
  space.orders = ordersTemp;
  space.save();
}
export function handleBurnOrder(event: BurnOrder): void {}
export function handleOffer(event: Offer): void {}
export function handlePayback(event: Payback): void {}
export function handleWithdraw(event: Withdraw): void {}
