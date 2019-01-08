export class Pair {
  private _left;
  private _right;

  private constructor(left, right) {
    this._left = left;
    this._right = right;
  }

  public static create(left, right): Pair {
    return new Pair(left, right);
  }

  get left() {
    return this._left;
  }

  set left(value) {
    this._left = value;
  }

  get right() {
    return this._right;
  }
  set right(value) {
    this._right = value;
  }
}
