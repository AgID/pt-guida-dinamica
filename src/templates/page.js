import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Page = ({
  data, pageContext
}) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const pageNav = pageNavigation(JSON.parse(pageContext.pageNav));

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {pageNav}
    </Layout>
  );
};

const pageNavigation = pageNav => {
  return [
    pageNav.nextPath && <Link key="next" to={pageNav.nextPath}>Pagina successiva</Link>,
    pageNav.prevPath && <Link key="prev" to={pageNav.prevPath}>Pagina precedente</Link>,
    pageNav.parentPath && <Link key="parent" to={pageNav.parentPath}>Pagina madre</Link>,
    pageNav.firstChildPath && <Link key="child" to={pageNav.firstChildPath}>Pagina figlia</Link>
  ];
};

export const pageQuery = graphql`
  query($filenameRegex: String!) {
    markdownRemark(fileAbsolutePath: { regex: $filenameRegex }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Page;
