require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');

const appTester = zapier.createAppTester(App);

describe('Calling "create_story"', () => {
  zapier.tools.env.inject();

  it('should create a story successfully', async () => {
    const bundle = {
      authData: {
        pat: process.env.HASHNODE_PAT,
      },

      inputData: {
        title: 'Test story',
        contentMarkdown: '# Story content',
        coverImageURL: 'https://unsplash.com/photos/Bfrk9RCOhRE/download?force=true&w=640',
        slug: 'story-title',
        canonicalURL: 'https://hashnode.com',
        publicationId: process.env.HASHNODE_TEST_PUBLICATION_ID,
        hideFromHashnodeFeed: true,
      },
    };

    const result = await appTester(
      App.creates.create_story.operation.perform,
      bundle,
    );

    result.should.not.be.an.Array();
    result.should.be.an.Object();
    result.should.have.property('data').which.is.an.Object();
    result.data.should.have.property('createPublicationStory').which.is.an.Object();
    result.data.createPublicationStory.should.have.property('success').equal(true);
    result.data.createPublicationStory.should.have.property('code').equal(200);
  });
});
