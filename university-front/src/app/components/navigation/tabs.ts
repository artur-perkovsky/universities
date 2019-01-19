import {Pair} from "../../utils/pair";

export class Tabs {

  private static tabs: Pair [] = [
    Pair.create('Universities', '/universities'),
    Pair.create('Cities', '/cities'),
    Pair.create('Countries', '/countries')
  ];

  public static get(): Pair [] {
    return this.tabs;
  }
}
