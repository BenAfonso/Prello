import React from 'react'
import Team from '../components/Team/Team'
import PageLayout from '../layouts/page'

export default (props) => (
  <PageLayout>
    <Team
      _id={props.match.params.id}
      tab={props.match.params.tab}
    />
  </PageLayout>
)
