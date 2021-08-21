const testAuth = async (z, bundle) => {
  const options = {
    url: 'https://api.hashnode.com',
    method: 'POST',
    headers: {
      Authorization: bundle.authData.pat,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query TestConnection($username: String!) { user(username: $username) { _id username name publication { _id title } }}',
      variables: {
        username: bundle.authData.username,
      },
    }),
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  type: 'custom',
  test: testAuth,
  fields: [
    {
      computed: false,
      key: 'pat',
      required: true,
      label: 'Personal Access Token',
      type: 'password',
      helpText:
        'Enter your Hashnode Personal Access Token, found at https://hashnode.com/settings/developer',
    },
    {
      computed: false,
      key: 'username',
      required: true,
      label: 'Your Hashnode username',
      type: 'string',
      helpText:
        'Enter your Hashnode username',
    },
  ],
  customConfig: {},
  connectionLabel: '{{data__user__username}} - {{data__user__publication__title}} ({{data__user__publication___id}})',
};
