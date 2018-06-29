import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faFacebookF,
  faFacebookMessenger,
  faGooglePlusG,
  faLinkedinIn,
  faPinterestP,
  faRedditAlien,
  faStumbleupon,
  faTelegramPlane,
  faTumblr,
  faTwitter,
  faVk,
  faWhatsapp,
  faXing
} from '@fortawesome/free-brands-svg-icons';

import {
  faCheck,
  faCommentAlt,
  faEllipsisH,
  faEnvelope,
  faExclamation,
  faLink,
  faMinus,
  faMoneyBillAlt,
  faPrint
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
  faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faStumbleupon, faXing, faCommentAlt,
  faEnvelope, faCheck, faPrint, faExclamation, faLink, faEllipsisH, faMinus, faMoneyBillAlt
];

library.add(...icons);
