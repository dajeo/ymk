function calcSchedulePage () {
  return 'calc(100vh - 48px - 48px - 48px - 24px - 16px - 16px - 21.44px)'
}

function calcFullscreen () {
  /*
  * 48px - header
  * 24px - footer
  * 16px - margins
  */
  return 'calc(100vh - 88px)'
}

export { calcSchedulePage, calcFullscreen }
