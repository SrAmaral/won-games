import React from 'react'
import Profile from 'templates/Profile'

import ordersMock from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

export default function Orders({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export function getServerSideProps() {
  return {
    props: {
      items: ordersMock
    }
  }
}
