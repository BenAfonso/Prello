export default `
  .progressBar {
    border-style: groove;
    padding-bottom: 3%;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .actualProgressBar {
    padding-bottom: 3%;
    position: 'absolute';
    border-style: groove;
    background-color: #0F0;
    zIndex: 2;
  }

  .checklistSpan:hover,
  .checklistTitle:hover {
    background-color: #cdd2d8;
    cursor: pointer;
  }

  .checklistTitle {
    padding-right: 3%;
    display: inline-block;
  }
`
