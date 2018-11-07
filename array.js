const Memory = require("./memory");

const memory = new Memory();

// class Array {

//     constructor() {
//         this.length = 0;
//         this.ptr = memory.allocate(this.length);
//     }

//     _resize(size) {
//         const oldPtr = this.ptr;
//         this.ptr = memory.allocate(size);
//         if (this.ptr === null) {
//             throw new Error('Out of memory');
//         }
//         memory.copy(this.ptr, oldPtr, this.length);
//         memory.free(oldPtr);
//     }

//     push(value) {
//         this._resize(this.length + 1);
//         memory.set(this.ptr + this.length, value);
//         this.length++;
//     }
// }

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }

  removeLessThan5() {
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) < 5) {
        this.remove(i);
      }
    }
  }

  mergeArrays(arr1, arr2) {
    let newArr = arr1.concat(arr2);
  }

  products() {
    for (let i = 0; i < this.length; i++) {
      let product = 1;
      product = product * this.get(i);
      this.index = product;
    }
  }
}
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  //create an instance of the array class

  let arr = new Array();

  //add an item to the array

  arr.push(3);

  // current length is 1, capacity is 3

//   arr.push(5);
//   arr.push(15);

  // current length and capacity are both 3

//   arr.push(19);

  // need to resize, length + 1 is 4, times 3 is 12, capacity is now 12 and length is 4

//   arr.push(45);
//   arr.push(10);

  // current length is 6 and capacity is 12

  //   arr.pop();
  //   arr.pop();
  //   arr.pop();

  // current length is 3 and capacity is 12

  //   arr.remove(0);
  //   arr.remove(0);
  //   arr.remove(0);

  // current length is 0, capacity is still 12

  //   arr.push("tauhida");

  // the result of this is not a number

  // the resize function is for allocating enough memory for the length of the array

  //   arr.removeLessThan5();
//   arr.products();

  console.log(arr);
}

main();
