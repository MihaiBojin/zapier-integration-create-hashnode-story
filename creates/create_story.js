const perform = async (z, bundle) => {
  const {
    title,
    slug,
    contentMarkdown,
    coverImageURL,
    canonicalURL,
    publicationId,
    hideFromHashnodeFeed,
  } = bundle.inputData;

  const input = {
    title,
    slug,
    contentMarkdown,
    coverImageURL,
    tags: [],
  };

  if (canonicalURL) {
    input.isRepublished = {
      originalArticleURL: canonicalURL,
    };
  }

  let body;
  if (publicationId) {
    body = JSON.stringify({
      query:
        'mutation createPublicationStory($input: CreateStoryInput!, $publicationId: String!, $hideFromHashnodeFeed: Boolean!) {createPublicationStory(input: $input, publicationId: $publicationId, hideFromHashnodeFeed: $hideFromHashnodeFeed) {code success message}}',
      variables: { input, publicationId, hideFromHashnodeFeed },
    });
  } else {
    body = JSON.stringify({
      query:
        'mutation createStory($input: CreateStoryInput!) {createStory(input: $input) {code success message}}',
      variables: { input },
    });
  }

  // // remove all non-alphanumeric characters and convert to lowercase
  // const makeTagSlug = (tag) => {
  //   return tag.replace(/[^\w]+/g, '').toLowerCase();
  // }
  // Tags are not currently supported due to Hashnode's API
  // if (bundle.inputData.tags) {
  //   input.tags = [];
  //   bundle.inputData.tags.forEach((tag, index) => {
  //     input.tags.push({
  //       slug: makeTagSlug(tag),
  //       name: tag
  //     });
  //   });
  // }

  const options = {
    url: 'https://api.hashnode.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.pat,
    },
    body,
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform,
    inputFields: [
      {
        key: 'title',
        label: 'Title',
        type: 'string',
        helpText: 'Enter a title for your story',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'contentMarkdown',
        label: 'Content',
        type: 'text',
        helpText: 'Tell your story (in markdown syntax)',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'coverImageURL',
        label: 'Cover Image',
        type: 'string',
        helpText: 'Add a cover image for your story',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'slug',
        label: 'Slug',
        type: 'string',
        helpText: "Customize your story's URL slug",
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'canonicalURL',
        label: 'Are you republishing?',
        type: 'string',
        helpText:
          'Change the canonical URL of this article to the original article',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'publicationId',
        label: 'Publication ID',
        // TODO: Retrieve the user's publication id
        // query GetUser($user: String!) {
        //   user(username:$user) {
        //     publication {
        //       _id
        //     }
        //   }
        // }
        type: 'string',
        helpText:
          'Publish this article in a publication.  To get the id, go to [Hashnode.com](https://hashnode.com/) click on your profile, and select "Blog Dashboard".  The publication\'s id will be in the URL, e.g.: `https://hashnode.com/YOUR-PUBLICATIONS-ID/dashboard`',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'hideFromHashnodeFeed',
        label: 'Hide from feed',
        type: 'boolean',
        default: 'false',
        helpText: 'If publishing in a publication, hide from the main feed?',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      data: {
        createStory: {
          code: 200,
          success: true,
          message: 'story created successfully',
        },
      },
    },
    outputFields: [
      {
        key: 'data__createStory__success',
        label: 'Successful',
        type: 'boolean',
      },
      {
        key: 'data__createStory__code',
        label: 'Response Code',
        type: 'integer',
      },
      { key: 'data__createStory__message', label: 'Response Message' },
    ],
  },
  key: 'create_story',
  noun: 'Story',
  display: {
    label: 'Create Story',
    description: 'Creates a Story',
    hidden: false,
    important: true,
  },
};
