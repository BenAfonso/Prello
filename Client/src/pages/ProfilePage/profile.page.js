import React from 'react'
import PageLayout from '../../layouts/page'
import Profile from '../../components/Profile/Profile'
export default (props) => (
  <PageLayout>
    <Profile
      _id={props.match.params.id}
    />
  </PageLayout>
)
