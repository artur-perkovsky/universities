import {Pair} from "../utils/pair";

export class Tabs {

  private static tabs: Pair [] = [
    Pair.create('Universities', '/universities'),
    Pair.create('Countries', '/countries'),
    Pair.create('Cities', '/cities')
  ];

  public static get(): Pair [] {
    return this.tabs;
  }
}
