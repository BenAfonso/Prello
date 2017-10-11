import React from 'react'
import Board from '../components/Board/Board'
import PageLayout from '../layouts/page'

export default (props) => (
  <PageLayout>
    <Board 
      _id={props.match.params.id}
    />
  </PageLayout>
)