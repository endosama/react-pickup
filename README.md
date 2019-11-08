# React Pickup
Run in `development` (not working in IE)
```
npm install
npm run start
```
or
```
yarn install
yarn start
```

Run in `build`
```
yarn install
yarn global add serve
yarn start
```

## Implementation
Implementation of a simple `React` application that allows an end-user to enter text inside an input box and search through a list of locations exposed by the following api endpoint:

```
https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&amp;solrRows={number_of_results_required}&amp;solrTerm={search_term}
```

The application has been implemented using `React` 16 and I've used mainly Function Components and Hooks. The base project has been generated with `create-react-app`.

The server app that wraps the api call avoiding CORS errors is written in `Node` and `express`. The proxy has been setup on port 3001 to make it work with the application development server.
This server is consumed by the `ResourceService` file that map the api results to a collection of `Location` class type.

The styling of the application has been made with `SASS/BEM` syntax. Every component have his own indipendent SCSS file. There is a global `variables.scss` that should store the common variables for the css.

## User stories

| TEST1 | Implementation|
| --- | ----|
| AC1 | Created the `SearchWidget` component. <br />Created a label item that contains the text `Pickup location`. <br />Created the styles for the component similar to rentalcars.com homepage.|
| AC2 | Created the `Dropdown` component. <br />Created an input box item of type text with the placeholder `city, airport, station, region and district...` |
| AC3 | No implementation for this story. The focus state on an input box is applied by default from the browser.<br /> Tested in Chrome, Firefox, and IE11. |
| AC4 | Added the htmlFor property to the label `Pickup location`. Added the aria-label tag to the input box. (Executed a screen reader on the application in Chrome and the label tag of the input box is read correctly.)|

<br/>
<br/>
<br/>

| TEST2 | Implementation |
| --- | ---|
| AC1 | Handled the onChange event of the input box. When a text with length less than 2 character is inserted,  the pickup content is collapsed. Otherwise it's expanded. |
| AC2 | When a text longer that 2 characters, I trigger the call to load the locations from the api endpoint and show them inside a Dropdown component. |
| AC3 | The call has a parameter `number_of_results_required` that limits the list of element retrieved from the list. I've set this parameter to 6 inside the `server.js` implementation. | 
| AC4 | When the call doesn't find any matching parameter, it returns an item with name `No results found` and the result contains a property numFound that is set to 0. Handled this edge case inside the server.js file, returning an empty array in this case and the formatted non-empty array in all the others. <br />The pickup items are `DropdownItem` components which wraps an inner component and handle the items click. If the item is a valid location, a `LocationDropdownItem` is rendered (takes a Location as parameter and shows some information). <br />If the datasource is empty one non-clickable item in rendered with the message `No results found`.|
| AC5 | Implemented with AC1 | 


## Additional developments

I've also implemented a few non-required features:
 - click of one pickup element overrides the value inside the input box. (in future implementations this feature could be implemented using `redux`)
 - creater a `Loader` component with a basic loader animation (pure css)
 - the Location class exposes a few methods to retrieve the description of the location.
 - imported the package `react-app-polyfill` with IE9 polyfill (Promise polyfill)


## Future implementations


Additional implementations that were not asked inside the document and that could be integrated in future developments:
 - focus and keyboard navigation inside the item of the dropdown;
 - focus on the input box should clear the value (as seen on rentalcars.com)
 - using a `rxjs` observable with a debounce time to avoid to many api calls while writing.
 - on click outside the pickup items, collapse the pickup
 - on scroll outside the pickup items container, collapse the pickup
 - add components unit testing with `jest`
 - add integration tests with `cypress`
