function calcSchedulePage () {
  return 'calc(100vh - 48px - 48px - 48px - 24px - 32px - 16px - 21.44px)'
}

function calcFullscreen () {
  /*
  * 48px - header
  * 24px - footer
  * 32px - margins
  */
  return 'calc(100vh - 48px - 24px - 32px)'
}

export { calcSchedulePage, calcFullscreen }
