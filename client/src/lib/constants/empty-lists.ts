import {
  Bell,
  BillList,
  Card,
  History,
  History2,
  Magnifier,
  TicketSale,
  Wallet,
} from '@solar-icons/react-native/Linear';

export const emptyLists = {
  activity_all: {
    title: 'No transactions found',
    text: 'You haven’t made any transactions yet.',
    Icon: History,
  },
  promo: {
    title: 'No active promos',
    text: 'New offers will appear here soon.',
    Icon: TicketSale,
  },
  bill: {
    title: 'No bills available',
    text: 'Add a bill or top up to get started.',
    Icon: BillList,
  },
  card: {
    title: 'No card linked',
    text: 'Link a card to make payments faster and easier.',
    Icon: Card,
  },
  notification: {
    title: 'No notifications You’re all caught up.',
    Icon: Bell,
  },
  activity_search: {
    title: 'No results found',
    text: 'Try adjusting your search or filters.',
    Icon: Magnifier,
  },
  activity_bill: {
    title: 'No bill payments yet',
    text: 'Your pulsa and data transactions will appear here.',
    Icon: BillList,
  },
  activity_refund: {
    title: 'No refunds yet',
    text: 'Any refunds you receive will appear here.',
    Icon: Wallet,
  },
  placeholder: {
    Icon: History2,
    title: 'Loading...',
  },
};
