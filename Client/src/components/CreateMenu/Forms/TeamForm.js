export default `
<div className='newBoardForm'>
<ul>
  <li>
    <form onSubmit={this.addBoard}>
      <input type='text' placeholder='Add a board...' ref={(t) => { this.title = t }} />
    </form>
  </li>
  <li className='boardFormSeparator'></li>
  <li className='boardFormItem'>
    <p className='bordFormItemTitle'>Team</p>
    <p className='bordFormItemBody'>Team are useful to share and work together in a easier way.</p>
  </li>
  <li className='boardFormSeparator'></li>
  <li>
    <p>Team are useful to share and work together in a easier way.</p>
  </li>
  <li className='boardFormSeparator'></li>
  <li>
  <div className='newBoardFormButtons'>
      <div>
        <Button
          bgColor={'#5AAC44'}
          gradient
          bold
          shadow
          onClick={this.addBoard}>
          Add
        </Button>
      </div>
      <div>
        <Button
          bgColor={'#444'}
          gradient
          shadow
          onClick={this.undisplayNewBoardForm}>
          Cancel
        </Button>
      </div>
    </div>
  </li>
</ul>
</div>

`