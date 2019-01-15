import {Pair} from "../utils/pair";

export class Tabs {

  private static tabs: Pair [] = [
    Pair.create('Universities', '/universities'),
    Pair.create('countries', '/countries'),
    Pair.create('Cities', '/cities'),
    Pair.create('Rating', '/rating')
  ];

  public static get(): Pair [] {
    return this.tabs;
  }
}
