import {
  Bell,
  Card,
  Card2,
  Documents,
  InfoCircle,
  LockPassword,
  Phone,
  QuestionCircle,
  Translation2,
  UserCircle,
} from '@solar-icons/react-native/Linear';

export const menuItems = [
  {
    section: 'Account Setting',
    main: true,
    list: [
      {
        title: 'Personal Information',
        Icon: UserCircle,
        link: 'PersonalInfo',
      },
      {
        title: 'Contact & Verification',
        Icon: Card2,
        link: 'ContactInfo',
      },
    ],
  },
  {
    section: 'Payment',
    main: true,
    list: [
      {
        title: 'Manage Cards & Banks',
        Icon: Card,
        link: 'CardsBanks',
      },
    ],
  },
  {
    section: 'Setting & Security',
    main: true,
    list: [
      {
        title: 'Security & Privacy',
        Icon: LockPassword,
        link: 'Security',
      },
      {
        title: 'Notification Preference',
        Icon: Bell,
        link: 'Notification',
      },
    ],
  },
  {
    section: 'Other',
    main: true,
    list: [
      {
        title: 'Language',
        Icon: Translation2,
        link: 'Language',
      },
    ],
  },
  {
    section: 'Help & Support',
    main: false,
    list: [
      {
        title: 'FAQ',
        Icon: QuestionCircle,
        link: 'FAQ',
      },
      {
        title: 'Contact Us',
        Icon: Phone,
        link: 'ContactUs',
      },
      {
        title: 'Help Center',
        Icon: InfoCircle,
        link: 'HelpCenter',
      },
      {
        title: 'Term Condition & Privacy Policy',
        Icon: Documents,
        link: 'Legacy',
      },
    ],
  },
];
