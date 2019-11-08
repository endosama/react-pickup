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

The application has been implemented using React 16.

The server app that wraps the api call avoiding CORS errors is written in `Node` and `express`. This servers is consumed by the `ResourceService` file that map the api results to a collection of `Location` class type.

The styling of the application has been made with `SASS/BEM` syntax. Every component have his own indipendent SCSS file. There is a global `variables.scss` that should store the common variables for the css.

## User stories

### TEST1
#### AC1
Created the `SearchWidget` component.
Created a label item that contains the text `Pickup location`.
Created the styles for the component similar to rentalcars.com homepage.

#### AC2
Created the `Dropdown` component.
Created an input box item of type text with the placeholder `city, airport, station,
region and district...`

#### AC3
No implementation for this story. The focus state on an input box is applied by default from the browser. Tested in Chrome, Firefox, and IE11.

#### AC4
Added the htmlFor property to the label `Pickup location`.
Added the aria-label tag to the input box.
(Executed a screen reader on the application in Chrome and the label tag of the input box is read correctly.) 

### TEST2
#### AC1
Handled the onChange event of the input box. When a text with length less than 2 character is inserted, i set the pickup state to closed. Otherwise I set the state to opened.

#### AC2
When a text is 2+ characted long I trigger the call to load the locations from the api endpoint and show them inside a Dropdown component.

#### AC3
The call has a parameter `number_of_results_required` that limits the list of element retrieved from the list. I've set this parameter to 6 inside the `server.js` implementation.

#### AC4
When the call doesn't find any matching parameter, it returns an item with name `No results found` and the result contains a property numFound that is set to 0. Handled this edge case inside the server.js file, returning an empty array in this case and the formatted non-empty array in all the others.
Inside the dropdown function component I've created 2 components:
 - `DropdownItem`:  that wraps the internal list item component.
 - `LocationDropdownItem`: that takes a Location as parameter and renders the informations of that location
  
If the datasource is empty one non-clickable item in rendered with the message `No results found`.

#### AC5
Implemented with AC1


## Additional developments
I've implemented the features asked in the user stories inside the document.

Additional features:
 - click of one pickup element overrides the value inside the input box.
 - creater a `Loader` component with a basic loader animation (pure css)
 - the Location class exposes a few methods to retrieve the description of the location.

Additional implementations that could be integrated in future developments:
 - focus and keyboard navigation inside the item of the dropdown;
 - focus on the input box should clear the value (as seen on rentalcars.com)
 - using a `rxjs` observable with a debounce time to avoid to many api calls while writing.
