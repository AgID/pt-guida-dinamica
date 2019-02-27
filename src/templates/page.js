import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageNav from '../components/pageNav';
import Actions from '../components/actions';

const ReactMarkdown = require('react-markdown');

const Card = ({ card }) => (
  <div className="card-wrapper col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
    <div className="card">
      <div className="card-body pl-0">
        <h5 className="card-title">{card.node.link
          ? <a href={card.node.link}>{card.node.title}</a> : card.node.title}</h5>
        <div className="card-text"><ReactMarkdown source={card.node.text}></ReactMarkdown></div>
      </div>
    </div>
  </div>
);

const toCards = (cards, tag) =>
  (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf(tag) !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

const Page = ({
  data, pageContext
}) => {
  const { page, cards } = data;
  if (!page) {
    console.error('cannot create page', data);
    return '';
  }
  const { frontmatter, html } = page;
  const pageNav = JSON.parse(pageContext.pageNav);

  const done = toCards(cards, 'fatto');
  const todo = toCards(cards, 'da-fare');
  const intro = toCards(cards, 'intro');
  const howItWorks = toCards(cards, 'come-funziona');
  const advantages = toCards(cards, 'vantaggi');

  const getLayoutClasses = frontmatter => {
    switch (frontmatter.layout) {
    case 'home':
      return 'd-flex flex-wrap mb-4';
    case 'centered':
      return 'd-flex flex-column text-center align-p-center mt-4';
    default:
      return 'mt-4';
    }
  };

  return (
    <Layout menu={pageContext.siteNav}>
      <SEO title={frontmatter.title} />

      <div className={getLayoutClasses(frontmatter)}>
        {frontmatter.title && <h1>{frontmatter.title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {console.log(frontmatter)}

      {frontmatter.actions && Actions(frontmatter)}

      {(done[0] || todo[0]) &&
        <div className="my-4">
          {done[0] && (
            <>
              <h2>Cosa è stato fatto</h2>
              <div className="d-flex flex-wrap">
                {done}
              </div>
            </>
          )}

          {todo[0] && (
            <div className="my-5">
              <h2>Cosa rimane da fare</h2>
              <div className="d-flex flex-wrap">
                {todo}
              </div>
            </div>
          )}
        </div>
      }

      {(intro[0] || howItWorks[0] || advantages[0]) &&
        <div className="my-5 d-flex flex-wrap">
          {intro[0] && intro}
          {howItWorks[0] && howItWorks}
          {advantages[0] && advantages}
        </div>}

      {pageNav && <PageNav
        left={{
          path: pageNav.prev.path,
          label: pageNav.prev.name
        }}
        down={{
          path: pageNav.firstChild.path,
          label: pageNav.firstChild.name,
        }}
        up={{
          path: pageNav.parent.path,
          label: pageNav.parent.name,
        }}
        right={{
          path: pageNav.next.path,
          label: pageNav.next.name
        }}
      />}
    </Layout>
  );
};

export const pageQuery = graphql`
  query($filenameRegex: String!, $tag: String) {
    page: markdownRemark(fileAbsolutePath: {regex: $filenameRegex }) {
      html
      frontmatter {
        title
        layout
        actions {
          label
          title
          subtitle
          status
          new {
            label
            title
            icon
          }
        }
      }
    }
    cards: allCardsYaml(filter: {tags: { in: [ $tag ] }}) {
      edges {
        node {
          title
          link
          text
          tags
        }
      }
    }
  }
`;

export default Page;
