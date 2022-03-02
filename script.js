const characterAmountRange = document.getElementById("characterAmountRange")
const characterAmountNumber = document.getElementById("characterAmountNumber")
const form = document.getElementById("passwordGeneratorForm")
const includeUppercaseElement = document.getElementById("includeUppercase")
const includeNumbersElement = document.getElementById("includeNumbers")
const includeSymbolsElement = document.getElementById("includeSymbols")
const passwordDisplay = document.getElementById("passwordDisplay")
const copyPasswordButton = document.getElementById("copyPasswordButton")

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = [
  ...arrayFromLowToHigh(33, 47),
  ...arrayFromLowToHigh(58, 64),
  ...arrayFromLowToHigh(91, 96),
  ...arrayFromLowToHigh(123, 126),
]

characterAmountNumber.addEventListener("input", syncCharacterAmount)
characterAmountRange.addEventListener("input", syncCharacterAmount)

copyPasswordButton.addEventListener("click", copyPassword)

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = [...charCodes, ...UPPERCASE_CHAR_CODES]
  if (includeNumbers) charCodes = [...charCodes, ...NUMBER_CHAR_CODES]
  if (includeSymbols) charCodes = [...charCodes, ...SYMBOL_CHAR_CODES]
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join("")
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}

function copyPassword() {
  copyText = document.getElementById("passwordDisplay")
  console.log(copyText.innerText)
  navigator.clipboard.writeText(copyText.innerText)
}
