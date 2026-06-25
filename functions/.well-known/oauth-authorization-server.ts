const createAuthorizationServerMetadata = (origin: string) => ({
  issuer: origin,
  authorization_endpoint: `${origin}/auth.md`,
  token_endpoint: `${origin}/auth.md`,
  jwks_uri: `${origin}/.well-known/jwks.json`,
  grant_types_supported: ['urn:ietf:params:oauth:grant-type:token-exchange'],
  response_types_supported: ['none'],
  scopes_supported: [],
  agent_auth: {
    skill: 'auth.md',
    register_uri: `${origin}/auth.md`,
    identity_types_supported: ['anonymous'],
    anonymous: {
      credential_types_supported: ['none'],
      claim_uri: `${origin}/auth.md`,
    },
  },
});

export const onRequestGet = ({ request }: { request: Request }) => {
  const { origin } = new URL(request.url);

  return Response.json(createAuthorizationServerMetadata(origin));
};
