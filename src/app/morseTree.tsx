export class MorseTreeNode {
  dot: MorseTreeNode | null
  dash: MorseTreeNode | null
  value: string | null

  constructor(value: string, left = null, right = null) {
    this.dot = left
    this.dash = right
    this.value = value
  }
}

export type MorseEnglishPair = [string, string]

export class MorseTree {
  root: MorseTreeNode

  constructor() {
    const root = new MorseTreeNode("");
    this.root = root;

    root.dot = new MorseTreeNode("E");
    root.dash = new MorseTreeNode("T");

    root.dot.dot = new MorseTreeNode("I");
    root.dot.dash = new MorseTreeNode("A");
    root.dash.dot = new MorseTreeNode("N");
    root.dash.dash = new MorseTreeNode("M");

    root.dot.dot.dot = new MorseTreeNode("S");
    root.dot.dot.dash = new MorseTreeNode("U");
    root.dot.dash.dot = new MorseTreeNode("R");
    root.dot.dash.dash = new MorseTreeNode("W");

    root.dash.dot.dot = new MorseTreeNode("D");
    root.dash.dot.dash = new MorseTreeNode("K");
    root.dash.dash.dot = new MorseTreeNode("G");
    root.dash.dash.dash = new MorseTreeNode("O");

    root.dot.dot.dot.dot = new MorseTreeNode("H");
    root.dot.dot.dot.dash = new MorseTreeNode("V");
    root.dot.dot.dash.dot = new MorseTreeNode("F");
    root.dot.dot.dash.dash = new MorseTreeNode("");
    root.dot.dash.dot.dot = new MorseTreeNode("L");
    root.dot.dash.dot.dash = new MorseTreeNode("");
    root.dot.dash.dash.dot = new MorseTreeNode("P");
    root.dot.dash.dash.dash = new MorseTreeNode("J");

    root.dash.dot.dot.dot = new MorseTreeNode("B");
    root.dash.dot.dot.dash = new MorseTreeNode("X");
    root.dash.dot.dash.dot = new MorseTreeNode("C");
    root.dash.dot.dash.dash = new MorseTreeNode("Y");
    root.dash.dash.dot.dot = new MorseTreeNode("Z");
    root.dash.dash.dot.dash = new MorseTreeNode("Q");
    root.dash.dash.dash.dot = new MorseTreeNode("");
    root.dash.dash.dash.dash = new MorseTreeNode("");

    root.dot.dot.dot.dot.dot = new MorseTreeNode("5");
    root.dot.dot.dot.dot.dash = new MorseTreeNode("4");
    root.dot.dot.dot.dash.dot = new MorseTreeNode("");
    root.dot.dot.dot.dash.dash = new MorseTreeNode("3");
    root.dot.dot.dash.dot.dot = new MorseTreeNode("");
    root.dot.dot.dash.dot.dash = new MorseTreeNode("");
    root.dot.dot.dash.dash.dot = new MorseTreeNode("");
    root.dot.dot.dash.dash.dash = new MorseTreeNode("2");

    root.dot.dash.dot.dot.dot = new MorseTreeNode("");
    root.dot.dash.dot.dot.dash = new MorseTreeNode("");
    root.dot.dash.dot.dash.dot = new MorseTreeNode("+");
    root.dot.dash.dot.dash.dash = new MorseTreeNode("");
    root.dot.dash.dash.dot.dot = new MorseTreeNode("");
    root.dot.dash.dash.dot.dash = new MorseTreeNode("");
    root.dot.dash.dash.dash.dot = new MorseTreeNode("");
    root.dot.dash.dash.dash.dash = new MorseTreeNode("1");

    root.dash.dot.dot.dot.dot = new MorseTreeNode("6");
    root.dash.dot.dot.dot.dash = new MorseTreeNode("=");
    root.dash.dot.dot.dash.dot = new MorseTreeNode("/");
    root.dash.dot.dot.dash.dash = new MorseTreeNode("");
    root.dash.dot.dash.dot.dot = new MorseTreeNode("");
    root.dash.dot.dash.dot.dash = new MorseTreeNode("");
    root.dash.dot.dash.dash.dot = new MorseTreeNode("(");
    root.dash.dot.dash.dash.dash = new MorseTreeNode("");
    root.dash.dash.dot.dot.dot = new MorseTreeNode("7");
    root.dash.dash.dot.dot.dash = new MorseTreeNode("");
    root.dash.dash.dot.dash.dot = new MorseTreeNode("");
    root.dash.dash.dot.dash.dash = new MorseTreeNode("");
    root.dash.dash.dash.dot.dot = new MorseTreeNode("8");
    root.dash.dash.dash.dot.dash = new MorseTreeNode("");
    root.dash.dash.dash.dash.dot = new MorseTreeNode("9");
    root.dash.dash.dash.dash.dash = new MorseTreeNode("0");

    root.dot.dash.dot.dash.dot.dash = new MorseTreeNode(".");
    root.dot.dot.dash.dash.dot.dot = new MorseTreeNode(",");
    root.dot.dot.dash.dash.dot.dot = new MorseTreeNode("?");
    root.dash.dot.dash.dot.dash.dot = new MorseTreeNode(";");
    root.dash.dash.dash.dot.dot.dot = new MorseTreeNode(":");
    root.dot.dash.dot.dot.dash.dot = new MorseTreeNode('"');
    root.dot.dash.dash.dash.dash.dot = new MorseTreeNode("'");
    root.dot.dash.dash.dash.dash.dot = new MorseTreeNode("-");
    root.dash.dot.dash.dash.dot.dash = new MorseTreeNode(")");
  }

  toArray() {
    const output: MorseEnglishPair[] = []
    const traverse = (node: MorseTreeNode | null, code: string) => {
      if (!node) return
      if (node.value && node.value !== "") {
        output.push([node.value, code])
      }
      traverse(node.dot, code + ".")
      traverse(node.dash, code + "-")
    }
    traverse(this.root, "")
    return output
  }

  toSortedArray() {
    const array = this.toArray();

    array.sort(function (a, b) {
      // Letter -> Number -> Punctuation

      function startsWithPunctuation(str: string) {
        return /^[^\p{L}\p{N}]/u.test(str);
      }
      function startsWithNumber(str: string) {
        return /\d+/g.test(str)
      }

      const aStartsPunctuation = startsWithPunctuation(a[0]);
      const bStartsPunctuation = startsWithPunctuation(b[0]);
      const aStartsNumber = startsWithNumber(a[0])
      const bStartsNumber = startsWithNumber(b[0])

      if (aStartsPunctuation && bStartsPunctuation) {
        return a[0].localeCompare(b[0]);
      }
      if (aStartsPunctuation) {
        return 1;
      }
      if (bStartsPunctuation) {
        return -1;
      }

      if (aStartsNumber && !bStartsNumber) {
        return 1;
      }
      if (!aStartsNumber && bStartsNumber) {
        return -1;
      }
      return a[0].localeCompare(b[0]);
    })
    return array
  }

  translate(morse: string) {
    const output: string[] = []
    let curr_node: MorseTreeNode | null = this.root;
    let isBadInput: boolean = false

    morse.split(" ").forEach((morseWord) => {
      morseWord.split("").forEach((symbol) => {
        if (symbol == ".") {
          if (curr_node != null) {
            curr_node = curr_node.dot;
          }
        }
        else if (symbol == "-" || symbol == "_") {
          if (curr_node != null) {
            curr_node = curr_node.dash;
          }
        }
        else if (symbol == "/") {
          output.push(" ")
        }
        else if (/\s/.test(symbol)) {
          output.push(symbol)
        }
        else {
          isBadInput = true
        }
      })
      if (curr_node?.value) {
        output.push(curr_node.value);
      }
      curr_node = this.root;
    })
    if (isBadInput) { return "Error: unrecognized symbol" }
    const result = output.join("")
    return result.toLocaleLowerCase();
  }
}


