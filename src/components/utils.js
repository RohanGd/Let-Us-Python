export function convertEncoding(sourceString, targetString) {
  if (sourceString.length !== targetString.length) {
    throw new Error("Strings must have the same length.");
  }

  let convertedString = "";
  for (let i = 0; i < sourceString.length; i++) {
    if (sourceString[i] !== targetString[i]) {
      // Swap characters to match the encoding
      convertedString += targetString[i];
    } else {
      convertedString += sourceString[i];
    }
  }

  return convertedString;
}

export function compareStringEncoding(str1, str2) {
  if (str1.length !== str2.length) {
    return false; // Different lengths, encoding cannot be the same
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1.charCodeAt(i) !== str2.charCodeAt(i)) {
      return false; // Different character codes, encoding is different
    }
  }

  return true; // All character codes are the same, encoding is the same
} 
