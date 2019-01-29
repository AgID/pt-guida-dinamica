import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageNav from '../components/pageNav';

import {
  Col,
  Row
} from 'reactstrap';

const Card = ({ card }) => (
  <div className="card-wrapper col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
    <div className="card">
      <div className="card-body pl-0">
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
  const pageNav = JSON.parse(pageContext.pageNav);

  const done = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('fatto') !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

  const todo = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('da-fare') !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

  const intro = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('intro') !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

  const howItWorks = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('come-funziona') !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

  const advantages = (cards ? cards.edges : [])
    .filter(card => card.node.tags.indexOf('vantaggi') !== -1)
    .map(card => <Card key={card.node.title.split(' ').join('-')} card={card} />);

  return (
    <Layout menu={pageContext.siteNav}>
      <SEO title={frontmatter.title} />

      <Row>
        <Col xs="12" lg="8" md="8" sm="12" xl="6" className="my-4">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Col>
      </Row>

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

      <div className="my-5 d-flex flex-wrap">
        {intro[0] && intro}
        {howItWorks[0] && howItWorks}
        {advantages[0] && advantages}
      </div>

      <PageNav
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
      />
    </Layout >
  );
};

export const pageQuery = graphql`
  query($filenameRegex: String!, $tag: String) {
        page: markdownRemark(fileAbsolutePath: {regex: $filenameRegex }) {
        html
      frontmatter {
        title
      }
      }
    cards: allCardsYaml(filter: {tags: { in: [ $tag ] }}) {
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
