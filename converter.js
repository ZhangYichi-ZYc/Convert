function convert() {
  const inputValue = document.getElementById("inputValue").value.trim();
  const inputBase = parseInt(document.getElementById("inputBase").value, 10);
  const outputBase = parseInt(document.getElementById("outputBase").value, 10);

  if (!inputValue || isNaN(inputBase) || isNaN(outputBase)) {
    alert("请确保所有字段都填写正确，并且使用有效的进制数（2-36）！");
    return;
  }

  try {
    const result = convertBase(inputValue, inputBase, outputBase);
    document.getElementById("output").textContent = `转换结果: ${result}`;
  } catch (error) {
    alert(error.message);
  }
}

function convertBase(value, fromBase, toBase) {
  const parts = value.split(".");
  let integerPart = parseInt(parts[0], fromBase);
  if (isNaN(integerPart)) {
    throw new Error("无效的整数部分");
  }

  let result = integerPart.toString(toBase).toUpperCase();

  if (parts.length > 1) {
    let decimalPart = parts[1];
    let fraction = 0.0;
    let power = 1;
    for (let i = 0; i < decimalPart.length; i++) {
      const num = parseInt(decimalPart[i], fromBase);
      if (isNaN(num)) {
        throw new Error("无效的小数部分");
      }
      fraction += num / Math.pow(fromBase, power++);
    }

    let decimalResult = "";
    for (let i = 0; i < 10; ++i) {
      fraction *= toBase;
      let digit = Math.floor(fraction);
      decimalResult += digit.toString(toBase).toUpperCase();
      fraction -= digit;
      if (fraction === 0) break;
    }

    if (decimalResult) {
      result += "." + decimalResult;
    }
  }

  return result;
}
