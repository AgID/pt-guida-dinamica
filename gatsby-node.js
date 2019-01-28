const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  try {
    const pages = yaml.safeLoad(fs.readFileSync(path.resolve(`src/data/pages.yml`), 'utf8'));
    Object.keys(pages).map((page, pageIndex, pagesArray) => {
      createMarkdownPages(createPage, pages[pageIndex], getPageNav(
        null,
        null,
        pages[pageIndex],
        (pageIndex - 1) in pagesArray ? pages[pageIndex - 1] : null,
        (pageIndex + 1) in pagesArray ? pages[pageIndex + 1] : null,
        pages[pageIndex].subtree ? pages[pageIndex].subtree[0] : null
      ), pages);
    });
  } catch (error) {
    console.error(error);
  }
};

const createMarkdownPages = (createPage, page, pageNav, siteNav) => {
  const pageTemplate = path.resolve(`src/templates/page.js`);
  const pagePath = getPagePath(pageNav.parent.path, page.slug);
  const filename = page.slug || 'home';

  siteNav = siteNav[0].slug !== '' ? siteNav : siteNav[0].subtree;

  createPage({
    path: pagePath,
    component: pageTemplate,
    context: {
      filenameRegex: `/${filename}.md$/`,
      pageNav: JSON.stringify(pageNav),
      slug: page.slug,
      siteNav: siteNav
    }
  });

  page.subtree && page.subtree.map((subPage, subPageIndex) => {
    createMarkdownPages(createPage, subPage, getPageNav(
      pagePath,
      page,
      subPage,
      (subPageIndex - 1) in page.subtree ? page.subtree[subPageIndex - 1] : null,
      (subPageIndex + 1) in page.subtree ? page.subtree[subPageIndex + 1] : null,
      subPage.subtree ? subPage.subtree[0] : null
    ), siteNav);
  });
};

/**
 * Given a page and a group of related pages
 * returns an object with corresponding absolute paths
 * and name to be consumed in a page navigation component.
 * @param {string} parentPagePath Absolute path of the parent page.
 * @param {Object} parentPage Parent page object.
 * @param {Object} currentPage Current page object
 * @param {Object} prevPage Previous page object.
 * @param {Object} nextPage Next page object.
 * @param {Object} firstChildPage First child page object.
 * @returns {Object} Pages paths and names
 */
const getPageNav = (parentPagePath, parentPage, currentPage, prevPage, nextPage, firstChildPage) => {
  return {
    parent: {
      name: parentPage && parentPage.name,
      path: parentPage && parentPagePath
    },
    prev: {
      name: prevPage && prevPage.name,
      path: prevPage && getPagePath(parentPagePath, prevPage.slug)
    },
    next: {
      name: nextPage && nextPage.name,
      path: nextPage && getPagePath(parentPagePath, nextPage.slug)
    },
    firstChild: {
      name: firstChildPage && firstChildPage.name,
      path: firstChildPage && getPagePath(parentPagePath, [currentPage.slug, firstChildPage.slug].join('/'))
    }
  };
};

const trimTrailingSlash = url => (url || '').replace(/\/$/, '');

const getPagePath = (parentPagePath, pageSlug) => [trimTrailingSlash(parentPagePath), pageSlug].join('/');
