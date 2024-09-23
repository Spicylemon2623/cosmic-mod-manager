Base URL: `https://api.crmm.tech/api` <br />
NOTE:- `/cdn` urls are not under the base `/api`

### Value Types
* `AuthProvider` &ndash; github, gitlab, discord, google

### Endpoints
| Type   | Endpoint  |
|:-------|:----------|
| GET    | [`/search`](/packages/backend/src/routes/search.ts#L22) |
| GET    | [`/search/filters/sort-by`](/packages/backend/src/routes/search.ts#L23) |
| GET    | [`/search/filters/loaders`](/packages/backend/src/routes/search.ts#L24) |
| GET    | [`/search/filters/game-versions`](/packages/backend/src/routes/search.ts#L25) |
| GET    | [`/search/filters/categories`](/packages/backend/src/routes/search.ts#L26) |
| GET    | [`/search/filters/features`](/packages/backend/src/routes/search.ts#L27) |
| GET    | [`/search/filters/resolutions`](/packages/backend/src/routes/search.ts#L28) |
| GET    | [`/search/filters/performance-impact`](/packages/backend/src/routes/search.ts#L29) |
| GET    | [`/search/filters/license`](/packages/backend/src/routes/search.ts#L30) |
| GET    | [`/tag/categories`](/packages/backend/src/routes/tags.ts#L13) |
| GET    | [`/tag/game-versions`](/packages/backend/src/routes/tags.ts#L14) |
| GET    | [`/tag/loaders`](/packages/backend/src/routes/tags.ts#L15) |
| GET    | [`/tag/licenses`](/packages/backend/src/routes/tags.ts#L16) |
| GET    | [`/tag/licenses/featured`](/packages/backend/src/routes/tags.ts#L17) |
| GET    | [`/tag/licenses/{ID}`](/packages/backend/src/routes/tags.ts#L18) |
| GET    | [`/tag/project-types`](/packages/backend/src/routes/tags.ts#L19) |
| GET    | [`/project`](/packages/backend/src/routes/project/index.ts#L38) |
| GET    | [`/project/{ID\|slug}`](/packages/backend/src/routes/project/index.ts#L40) |
| GET    | [`/project/{ID\|slug}/dependencies`](/packages/backend/src/routes/project/index.ts#L41) |
| GET    | [`/project/{ID\|slug}/check`](/packages/backend/src/routes/project/index.ts#L42) |
| POST    | [`/project`](/packages/backend/src/routes/project/index.ts#L44) |
| PATCH    | [`/project/{ID\|slug}`](/packages/backend/src/routes/project/index.ts#L45) |
| PATCH    | [`/project/{ID\|slug}/description`](/packages/backend/src/routes/project/index.ts#L46) |
| PATCH    | [`/project/{ID\|slug}/tags`](/packages/backend/src/routes/project/index.ts#L47) |
| PATCH    | [`/project/{ID\|slug}/external-links`](/packages/backend/src/routes/project/index.ts#L48) |
| PATCH    | [`/project/{ID\|slug}/license`](/packages/backend/src/routes/project/index.ts#L49) |
| POST    | [`/project/{ID\|slug}/gallery`](/packages/backend/src/routes/project/index.ts#L51) |
| PATCH    | [`/project/{ID\|slug}/gallery/{ID}`](/packages/backend/src/routes/project/index.ts#L52) |
| DELETE    | [`/project/{ID\|slug}/gallery/{ID}`](/packages/backend/src/routes/project/index.ts#L53) |
| GET    | [`/project/{ID\|slug}/version`](/packages/backend/src/routes/project/version/index.ts#L18) |
| GET    | [`/project/{ID\|slug}/version/{ID\|slug}`](/packages/backend/src/routes/project/version/index.ts#L19) |
| POST    | [`/project/{ID\|slug}/version`](/packages/backend/src/routes/project/version/index.ts#L21) |
| PATCH    | [`/project/{ID\|slug}/version/{ID\|slug}`](/packages/backend/src/routes/project/version/index.ts#L22) |
| DELETE    | [`/project/{ID\|slug}/version/{ID\|slug}`](/packages/backend/src/routes/project/version/index.ts#L23) |
| POST    | [`/team/{ID}/invite`](/packages/backend/src/routes/team/index.ts#L17) |
| PATCH    | [`/team/{ID}/invite`](/packages/backend/src/routes/team/index.ts#L18) |
| POST    | [`/team/{ID}/leave`](/packages/backend/src/routes/team/index.ts#L19) |
| PATCH    | [`/team/{ID}/member/{ID}`](/packages/backend/src/routes/team/index.ts#L20) |
| DELETE    | [`/team/{ID}/member/{ID}`](/packages/backend/src/routes/team/index.ts#L21) |
| GET    | [`/user`](/packages/backend/src/routes/user.ts#L30) |
| GET    | [`/user/{ID\|username}`](/packages/backend/src/routes/user.ts#L31) |
| GET    | [`/user/{ID\|username}/projects`](/packages/backend/src/routes/user.ts#L32) |
| PATCH    | [`/user`](/packages/backend/src/routes/user.ts#L33) |
| DELETE    | [`/user`](/packages/backend/src/routes/user.ts#L34) |
| POST    | [`/delete-account`](/packages/backend/src/routes/user.ts#L35) |
| POST    | [`/confirmation-action`](/packages/backend/src/routes/user.ts#L37) |
| DELETE    | [`/confirmation-action`](/packages/backend/src/routes/user.ts#L38) |
| POST    | [`/password`](/packages/backend/src/routes/user.ts#L40) |
| PUT    | [`/password`](/packages/backend/src/routes/user.ts#L41) |
| DELETE    | [`/password`](/packages/backend/src/routes/user.ts#L42) |
| POST    | [`/change-password`](/packages/backend/src/routes/user.ts#L44) |
| PATCH    | [`/password`](/packages/backend/src/routes/user.ts#L45) |
| GET    | [`/auth/me`](/packages/backend/src/routes/auth.ts#L21) |
| GET    | [`/auth/signin/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L24) |
| GET    | [`/auth/signup/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L25) |
| GET    | [`/auth/link/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L26) |
| POST    | [`/auth/signin/credential`](/packages/backend/src/routes/auth.ts#L28) |
| POST    | [`/auth/signin/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L29) |
| POST    | [`/auth/signup/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L30) |
| POST    | [`/auth/link/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L31) |
| DELETE    | [`/auth/link/{AuthProvider}`](/packages/backend/src/routes/auth.ts#L32) |
| GET    | [`/auth/sessions`](/packages/backend/src/routes/auth.ts#L33) |
| GET    | [`/auth/auth-providers`](/packages/backend/src/routes/auth.ts#L34) |
| DELETE    | [`/auth/sessions`](/packages/backend/src/routes/auth.ts#L35) |
| DELETE    | [`/auth/sessions/{RevokeCode}`](/packages/backend/src/routes/auth.ts#L36) |
| GET    | [`/cdn/data/{projectID\|slug}/{FILE}`](/packages/backend/src/routes/cdn.ts#L11) |
| GET    | [`/cdn/data/{projectID\|slug}/gallery/{FILE}`](/packages/backend/src/routes/cdn.ts#L12) |
| GET    | [`/cdn/data/{projectID\|slug}/version/{versionID\|slug}/{FILE}`](/packages/backend/src/routes/cdn.ts#L13) |