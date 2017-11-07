export default `
  .notification {
    position: relative;
    padding: 10px 20px;
    background-color: white;
    border-radius: 4px;
    width: 100%;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.15);
    cursor: pointer;
  }

  .topBar {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: green;
    top: 0;
    left: 0;
    border-radius: 4px 4px 0 0; 
  }

  .info {
    background-color: #00BCD4;
  }

  .warning {
    background-color: #FFB300;
  }

  .success {
    background-color: #00E676;
  }

  .error {
    background-color: #F50057;
  }

  .title {
    font-weight: bold;
    color: #666;
    font-size: 15px;
    text-transform: capitalize;
  }

  .content {
    padding: 8px;
    font-size: 13px;
    color: #444;
    word-wrap: break-word;
  }
`
