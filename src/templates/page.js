import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Card = ({ card }) => (
  <div className="card-wrapper col-lg-4 col-xl-4 col-sm-12 col-12">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{card.node.title}</h5>
        <p className="card-text">{card.node.text}</p>
      </div>
    </div>
  </div>
);

const Page = ({
  data, pageContext
}) => {
  const { page, cards } = data;
  const { frontmatter, html } = page;
  const pageNav = pageNavigation(JSON.parse(pageContext.pageNav));

  const done = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('fatto') !== -1)
    .map(card => <Card card={card} />);

  const todo = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('da-fare') !== -1)
    .map(card => <Card card={card} />);

  return (
    <Layout menu={pageContext.siteNav}>
      <SEO title={frontmatter.title} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {done[0] && (
        <>
          <h2>Cosa è stato fatto</h2>
          <div className="d-flex flex-wrap">
            {done}
          </div>
        </>
      )}

      {todo[0] && (
        <>
          <h2>Cosa rimane da fare</h2>
          <div className="d-flex flex-wrap">
            {todo}
          </div>
        </>
      )}

      {pageNav}
    </Layout >
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
  query($filenameRegex: String!, $slug: String!) {
    page: markdownRemark(fileAbsolutePath: { regex: $filenameRegex }) {
      html
      frontmatter {
        title
      }
    }
    cards: allCardsYaml(filter: { tags: { in: [ $slug ] }}) {
      edges {
        node {
          title
          text
          tags
        }
      }
    }
  }
`;

export default Page;
