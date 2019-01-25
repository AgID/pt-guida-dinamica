const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  try {
    const pages = yaml.safeLoad(fs.readFileSync(path.resolve(`src/data/pages.yml`), 'utf8'));
    Object.keys(pages).map((page, pageIndex, pagesArray) => {
      createMarkdownPages(createPage, pages[pageIndex], getPageNav(
        pages[pageIndex].slug,
        null,
        (pageIndex - 1) in pagesArray ? pages[pageIndex - 1].slug : null,
        (pageIndex + 1) in pagesArray ? pages[pageIndex + 1].slug : null,
        pages[pageIndex].subtree ? pages[pageIndex].subtree[0].slug : null
      ));
    });
  } catch (error) {
    console.error(error);
  }
};

const createMarkdownPages = (createPage, page, pageNav) => {
  const pageTemplate = path.resolve(`src/templates/page.js`);
  const pagePath = [trimTrailingSlash(pageNav.parentPath), page.slug].join('/');

  createPage({
    path: pagePath,
    component: pageTemplate,
    context: {
      filenameRegex: `/${page.name}.md$/`,
      pageNav: JSON.stringify(pageNav),
      slug: page.slug
    }
  });

  page.subtree && page.subtree.map((subPage, subPageIndex) => {
    createMarkdownPages(createPage, subPage, getPageNav(
      [trimTrailingSlash(pagePath), subPage.slug].join('/'),
      pagePath,
      (subPageIndex - 1) in page.subtree ? page.subtree[subPageIndex - 1].slug : null,
      (subPageIndex + 1) in page.subtree ? page.subtree[subPageIndex + 1].slug : null,
      subPage.subtree ? subPage.subtree[0].slug : null
    ));
  });
};

/**
 * Given a page and its parent paths and a group of related page slugs
 * returns an object with corresponding absolute paths to be consumed
 * in a page navigation component.
 * @param {string} currentPagePath - Absolute path of the current page.
 * @param {string} parentPagePath - Absolute path of the parent page.
 * @param {string} prevPage - Slug of the previous page.
 * @param {string} nextPage - Slug of the next page.
 * @param {string} firstChildPage - Slug of the first child page.
 * @returns {number}
 */
const getPageNav = (currentPagePath, parentPagePath, prevPage, nextPage, firstChildPage) => {
  return {
    parentPath: parentPagePath,
    prevPath: (prevPage !== null) && [trimTrailingSlash(parentPagePath), prevPage].join('/'),
    nextPath: (nextPage !== null) && [trimTrailingSlash(parentPagePath), nextPage].join('/'),
    firstChildPath: firstChildPage && [currentPagePath, firstChildPage].join('/')
  };
};

const trimTrailingSlash = url => (url || '').replace(/\/$/, '');
