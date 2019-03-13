import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageNav from '../components/pageNav';
import Actions from '../components/actions';
import Legend from '../components/legend';

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
      return 'mb-4';
    case 'centered':
      return 'd-flex flex-column text-center align-p-center mt-4 centered';
    default:
      return 'mt-4';
    }
  };

  return (
    <Layout menu={pageContext.siteNav}>
      <SEO title={frontmatter.title || frontmatter.hiddenTitle} lang={frontmatter.lang || 'it'} />

      <div className={getLayoutClasses(frontmatter)}>
        {frontmatter.title && <h1>{frontmatter.title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {frontmatter.link_consulta_obiettivi && <p>
          <a className="primary-color" href={frontmatter.link_consulta_obiettivi}>consulta obiettivi piano triennale 2019-2021</a>
        </p>}
      </div>

      {frontmatter.actions && Legend()}
      {frontmatter.actions && Actions(frontmatter)}

      {(done[0] || todo[0]) &&
        <div className="my-4">
          {done[0] && (
            <>
              <h2>Cosa è stato fatto</h2>
              <div className="d-flex flex-wrap">
                {done}
              </div>
              {frontmatter.link_approfondisci &&
                <div className="d-flex flex-wrap">
                  <p className="mt-4 ml-auto text-right">
                    <a className="primary-color" href={frontmatter.link_approfondisci}>Approfondisci nel piano triennale 2019-2021</a>
                  </p>
                </div>}
            </>
          )}

          {todo[0] && (
            <div className="my-5">
              <h2>Cosa rimane da fare</h2>
              <div className="d-flex flex-wrap">
                {todo}
              </div>
              {frontmatter.link_visualizza_azioni &&
                <div className="d-flex flex-wrap">
                  <p className="mt-4 ml-auto text-right">
                    <a className="primary-color" href={frontmatter.link_visualizza_azioni}>Visualizza azioni nel piano triennale 2019-2021</a>
                  </p>
                </div>}
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
          path: frontmatter.link_prev !== null ? frontmatter.link_prev : pageNav.prev.path,
          label: frontmatter.link_prev_label || pageNav.prev.name
        }}
        down={{
          path: frontmatter.link_linee_azione !== null ? frontmatter.link_linee_azione : pageNav.firstChild.path,
          label: frontmatter.link_linee_azione ? 'Confronto per linee d\'azione' : pageNav.firstChild.name,
        }}
        /* up={{
          path: pageNav.parent.path,
          label: pageNav.parent.name,
        }} */
        right={{
          path: frontmatter.link_next !== null ? frontmatter.link_next : pageNav.next.path,
          label: frontmatter.link_next_label || pageNav.next.name
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
        hiddenTitle
        layout
        link_visualizza_azioni
        link_approfondisci
        link_next
        link_next_label
        link_prev
        link_prev_label
        link_linee_azione
        actions {
          label
          title
          subtitle
          delayed
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
