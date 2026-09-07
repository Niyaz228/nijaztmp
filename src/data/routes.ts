import { allCategories, categoryHref } from './catalog';
export const routes = [
  '/',
  '/catalog/',
  ...allCategories.map((c) => categoryHref(c.slug)),
  '/services/',
  '/services/ukladka-trotuarnoj-plitki/',
  '/photos/',
  '/about/',
  '/contacts/',
];
