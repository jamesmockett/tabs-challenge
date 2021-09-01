# Tabs Challenge

## Usage

```
npm install
npm start
```

The site will be accessible at http://127.0.0.1:8080

_Note:_ Before starting the server you will need to add a valid API key to `/js/config.js`.

## API key

I was unable to use the provided API key as accessing the API from the browser was blocked by the CORS policy. (I also had the same issue using the key in the Guardian API Explorer.) This could probably be fixed by proxying the request, but that's outside the scope of this challenge.

I registered for my own API key and that didn't have the same issue. The format of my personal key is different to the supplied one so I'm not sure if it's related to different versions of the API?

As I've been using my personal API key I've removed it from the committed code so a valid API key needs to be added to the config file at `/js/config.js` before starting the server.

## Considerations

### Accessibility

Appropriate ARIA roles have been added to the tab list, tabs and tab panels. `aria-selected` is used to indicate the currently selected tab. `aria-controls` is used to indicate which panel a tab controls. (This may be unnecessary though as it doesn't have wide support and is seemingly ignored by most screenreaders.) Each tab panel includes `aria-labelledby` to link it back to the associated tab and give it an accessible name. Panels include a `tabindex="-1"` attribute so that they can be focussed with JS when a tab is selected. `aria-busy` is applied to panels whilst waiting for content to be loaded.

Tabs are fully keyboard accessible and the default browser focus outlines have been left in place. One area where I've deviated from the WAI-ARIA Authoring Practices is by not including navigation between tabs with the arrow keys. This was partly due to lack of time, but there's also research to suggest that this behaviour is confusing to screenreader users and can interfere with their use of arrow keys to navigate content. For a production ready component this is something that would benefit from further research and testing.

One thing I haven't done is testing the contrast of the colours being used. (I lifted these from The Guardian website, but I'm not necessarily using them in the same combinations.)

### Browser support / no JavaScript

I've considered these as two sides of the same coin. For simplicity, and to avoid having to set up a build process, I'm using JavaScript modules natively with `type="module"` on the `<script>` tag. This acts as a form of 'cutting the mustard' in that we can infer that browsers that support modules natively will also support modern APIs and features like `fetch` without needing polyfills.

Browsers that don't support JS modules will see the non-JS version. Without any kind of server-side rendering it's difficult to provide a meaningful experience without JS so I've opted to link the tabs to the relevant sections on The Guardian website and show an 'Unable to load content.' message.

If it was possible to server-side render tab content then perhaps we could stack the panels and make them all visible by default with the tabs linking to the relevant panel. (Acting as a table of content.)

I'm using custom properties to define colours and spacing values, but this excludes older browsers such as IE11. In production I might provide a fallback value, or use something like Sass or CSS-in-JS instead depending upon the level of browser support required. (Although custom properties can do things that can't be replicated by static variables.)

For production JS it's likely that I would transpile the JS with Babel and use a bundler to ensure the widest browser support, and polyfill features like `fetch` as needed.

### Test coverage

Due to lack of time I didn't get far with adding test coverage. I also backed myself into a bit of a corner by using JS modules which depends upon using Node's experimental module support to get things working in Jest. Ideally I would have added some tests for the tab code itself.

### Reusability

I've broken down the UI into separate tab and article list components, along with some core styles. I'm using BEM to aid maintainability and reuse.

Similarly the JS has been broken down into separate modules for dealing with the content API and the tabs UI. The content API module is _very_ barebones, but could potentially be reused elsewhere. One outstanding issue with the tabs code is that it assumes there is only a single instance of the component on a page. In its current incarnation it would not support multiple instances.
