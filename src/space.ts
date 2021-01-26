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
  order.burned = false;
  order.space = spaceAddress;
  order.save();

  // update space
  let space = Space.load(spaceAddress);
  let ordersTemp = space.orders;
  ordersTemp.push(id);
  space.orders = ordersTemp;
  space.save();
}
export function handleBurnOrder(event: BurnOrder): void {
  // load order
  let id = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.orderId.toHexString());
  let order = Order.load(id);

  // update order
  order.burned = true;
  order.save();
}
export function handleOffer(event: Offer): void {
  // load order
  let id = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.orderId.toHexString());
  let order = Order.load(id);

  // update order
  order.offeredAt = event.params.offeredAt;
  order.save();
}
export function handlePayback(event: Payback): void {
  // load order
  let id = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.orderId.toHexString());
  let order = Order.load(id);

  // update order
  order.paidBackAt = event.params.paidBackAt;
  order.save();
}
export function handleWithdraw(event: Withdraw): void {
  // load order
  let id = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.orderId.toHexString());
  let order = Order.load(id);

  // update order
  order.withdrewAt = event.params.withdrewAt;
  order.save();
}
