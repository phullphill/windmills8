# International Racing

This project is built with `React` and `Redux` framework with `Webpack` as building tool.

## Project Structure

### States

- Base states
    - __meetingList__: List of meetings fetched from RacingService (  getMeetings).
    - __eventList__: List of events fetched from RacingService (getSchedule).
    - __currentEventId__: ListView selected event id.
    - __progressingEventIdSet__: A set of ids that has states of 'B', 'C',   'E', 'H', 'J', 'O' (utils.isProgressing()).

- Streaming events
    - __streamingEventIdSet__: A set of ids that is streaming now (event is   progressing and bet on).
    - __streamingFullscreenEventId__: Fullscreen event Id.

- Error handler
    - __errMessage__: String of message that is shown on `InfoPopup` component.
    - __error__: Error object (http request error from server etc).

### Actions

- __baseActionCreators__
    - getSchedule: trigger getScheduleSaga
    - getMeetings: trigger getMeetingsSaga
    - getEvents: trigger getEventsSaga
    - getEventSelections: trigger getEventSelectionsSaga
    - setCurrentEvent: sets currentEvent in state
    - handleRaceEvent: trigger handleRaceEventSaga

- __betEventsActionCreators__
    - getBetEventList: trigger getBetEventListSaga
    - createUserBet: trigger createUserBetSaga

- __streamActionCreators__
    - setStreamingFullscreenEventId: sets streamingFullscreenEventId in state

- __errorHandlerActionCreators__
    - clearError: sets errMessage and error to default, which removes InfoPopup component

### comopnents

The hireachy of the app is shown in `InternationalRacingStructureDiagram.png` file under `docs` folder.

### containers

Container act as a top level component that connects redux store and other components. It is also responsible for initializing app (fetch data from server and setup websocket connection on componentDidMount)

### hocs

Higher Order Components - a function that takes a component and returns a new component with more functionality (similar to mixins).

- __updateOnInterval__: calls `forceUpdate` on interval. Take a parameter duration in miliseconds.

Use it like

```javascript
import updateOnInterval from 'hocs/updateOnInterval';


function SomeComponent(props) {
    return <div>{ props }</div>;
}

export default updateOnInterval(1000)(SomeComponent);
```

### reducers

Reducers acts on actions dispatched from components or sagas. Updates existing state depending on actions type and payload, then returns new states, which causes app to re-render.

### sagas

Sagas handle all the async aspect of the app.

- __getMeetingsSaga__: gets today's meetings from RacingService

- __getSheduleSaga__: gets today's schedule (events) from RacingService

- __getEventsSaga__: gets events by meetingCode from RacingService

- __getEventSelectionsSaga__: gets event (with selections and result) from RacingService

- __getBetEventListSaga__: gets user bet events from StreamingService

- __createUserBetSaga__: creates user bet on StreamingService

- __handleRaceEventSaga__: handle websocket events from RacingService

### services

There are two services that the app depends on. RacingService and StreamingService all the function return promises.

- RacingService: it is provided by external package `sis-frontendlib-racingservice`. It provides HTTP call to backend RacingService and websocket connection to RacingService.

- StreamingService: handles all the HTTP requests to StreamingService.


## Tests

use `npm run test` to run tests.

use `npm run test:jenkins` to produce coverage report. Open `coverage/lcov-report/index.html` to view the resport.

- __actions/reducers__: Standared mocha/chai testing.

- __componennts__: Use shallow rendering from `enzyme` library. In order to use it with css-modules, `.babelrc` file needed to be modified to use `babel-plugin-webpack-loaders` and `babel-plugin-webpack-alias`.

- __sagas__: Sagas return generator function. Compare the generator's next().value to effects from redux-saga which returns plain objects.

## Webpack Setup

The project contains five different `webpack.config` file.

- __base__: common properties used for development and production

- __development__: produces js files with source map

- __devserver__: used for webpack-dev-server (npm run serve:dev)

- __production__: minified and uglified js, minified css files

- __test__: used for test environments (npm run test)

## npm scripts

- `npm run lint` runs eslint against project

- `npm run test` runs tests

- `build:dev` builds source-mapped bundle js file

- `build:min` builds minified and uglified bundle files

- `serve:dev` runs webpack-dev-server on [http://localhost:3000](http://localhost:3000)

- `tar:artifacts` compresses dist folder to `artifacts.tar.gz` file

## Possible Future Improvements

- The project is not __finished__ as it needs to connect to real bet funciton. When user clicks on `BET` button, a popup window shows up that points to betting site's betting page. Once the bet is made, the app shows the bet streams on StreamTimeline component.

- Styling, use different css files for different compoanies/themes. It can be done replacing `import './style.scss'` to `require('${theme}.scss')` from each component.

- At the moment, the only container components(aware of the global state) is top level `InternationalRacingApp`. This has caused a long prop passing down chain for components that are deep under. To resolve this, some components may become container components (eg. RacingApp component can be wrapped by react-redux `connect` function, which gets props directly from redux store rather than parent component).

- Move StreamingService out as an independant package similar to RacingService.

- More component tests.
