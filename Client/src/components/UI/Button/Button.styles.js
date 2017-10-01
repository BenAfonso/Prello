export default `
.button { 
  box-sizing: border-box;
  display: inline-flex;
  margin: 0px;
  padding: 12px 12px 10px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 16px; 
  line-height: 1.2em;
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.shadow {
  padding: 12px 12px 8px;
}
.button.shadow:active, .active, .disabled {
  transform: translateY(4px);
  box-shadow: none !important;
}
.round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 8px;
  font-size: 24px;
}
.round.x-small {
  width: 28px;
  height: 28px;
  font-size: 12px;
}
.round.small {
  width: 34px;
  height: 34px;
  font-size: 18px;
}
.round.large {
  width: 48px;
  height: 48px;
  font-size: 30px;
  padding: 8px;
}
.round.x-large {
  width: 60px;
  height: 60px;
  font-size: 40px;
  padding: 10px;
}
.disabled {
  filter: grayscale();
}
`
