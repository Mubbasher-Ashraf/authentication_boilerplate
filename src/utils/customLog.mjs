import chalk from "chalk";

export const customSuccess = chalk.bold.bgGreen;
// export const
export const customError = chalk.underline.bold.bgRed;
export const customWarning = chalk.underline.bold.bgYellow;

/**
 * Supported colors
 * 
  black
  red
  green
  yellow
  blue
  magenta
  cyan
  white
  blackBright (alias: gray, grey)
  redBright
  greenBright
  yellowBright
  blueBright
  magentaBright
  cyanBright
  whiteBright
 */

/**
 * Supported Bakcground colors
 * 
  bgBlack
  bgRed
  bgGreen
  bgYellow
  bgBlue
  bgMagenta
  bgCyan
  bgWhite
  bgBlackBright (alias: bgGray, bgGrey)
  bgRedBright
  bgGreenBright
  bgYellowBright
  bgBlueBright
  bgMagentaBright
  bgCyanBright
  bgWhiteBright
  */

/**
 * Supported Modifiers
 * 
  bold - Make the text bold.
  reset - Reset the current style.
  dim - Make the text have lower opacity.
  italic - Make the text italic. (Not widely supported)
  underline - Put a horizontal line below the text. (Not widely supported)
  overline - Put a horizontal line above the text. (Not widely supported)
  inverse- Invert background and foreground colors.
  hidden - Print the text but make it invisible.
  strikethrough - Puts a horizontal line through the center of the text. (Not widely supported)
  visible- Print the text only when Chalk has a color level above zero. Can be useful for things that are purely cosmetic.
*/
