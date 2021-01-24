import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import { SpaceCreated } from '../generated/PawnFactory/PawnFactory';
import { Factory, Space } from '../generated/schema';
import { PawnSpace as PawnSpaceTemplate } from '../generated/templates';
import { PawnSpace } from '../generated/templates/PawnSpace/PawnSpace';

export function handleSpaceCreated(event: SpaceCreated): void {
  //   create space
  let space = new Space(event.params.space.toHexString());
  space.nftAddress = event.params.token.toHexString();
  space.orders = [];
  space.save();

  //   load factory (create if first exchange)
  let factory = Factory.load(event.address.toHex());
  if (factory === null) {
    factory = new Factory(event.address.toHex());
    factory.spaceCount = 0;
    factory.spaces = [];
  }
  factory.spaceCount = factory.spaceCount + 1;
  factory.spaces.push(space.id);
  factory.save();

  // create the tracked contract based on the template
  PawnSpaceTemplate.create(event.params.space);
}
