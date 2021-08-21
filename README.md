# Zapier integration: Create Hashnode story

[Hashnode](https://hashnode.com/) is the easiest way to start a developer blog on your personal domain.

This project represents a [Zapier](https://zapier.com/) integration which can take user input and publish
it as a story, on the Hashnode platform.

The following input fields are required:

- title: The story's title
- contentMarkdown: Story content in [Markdown](https://www.markdownguide.org/) syntax

And the following are optional:

- coverImageURL: a URL representing the story's main image
- slug: custom story URL slug
- canonicalURL: canonical URL to the original article
- publicationId: if specified, publish into the specified publication
- hideFromHashnodeFeed: do not display this story in the user's Hashnode feed

## Developer manual

### Install the integration

```shell
git clone git@github.com:MihaiBojin/zapier-integration-create-hashnode-story.git
cd zapier-integration-create-hashnode-story
npm install
```

### Define credentials

Create a file `.env`

```text
HASHNODE_PAT=<obtain from https://hashnode.com/settings/developer>
HASHNODE_TEST_PUBLICATION_ID=<see below>
ZAPIER_DEPLOY_KEY=<obtain from https://developer.zapier.com/partner-settings/deploy-keys>
```

To obtain your publication id:

- Go to <https://hashnode.com/>
- Click on your profile
- Select "Blog Dashboard"
- The publication's id will be in the URL, e.g.: `https://hashnode.com/YOUR-PUBLICATIONS-ID/dashboard`'

### Run tests

```shell
zapier test
```

### Publish to Zapier

```shell
zapier push
```

The extension is now ready to use in your Zapier account.

## DISCLAIMER

**I am not personaly or professionally affiliated with [Hashnode](https://hashnode.com) or [Zapier](https://zapier.com).

This work represents hobby code I use to cross-post articles from my [personal site](https://MihaiBojin.com) onto the Hashnode platform.

**The software is provided "as is", without warranty of any kind!**

## LICENSE

This code is licensed under the MIT License.  Read the [notice](./LICENSE) for additional details.
