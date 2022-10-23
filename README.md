Async Race an SPA to manage the collection of the cars, operate its engines, and show races statistics.

Basic structure:
Two views on the site: "Garage" and "Winners".
  1. "Garage" view:
- User is able to create, update, delete a car, and see the list of the cars. Car has two attributes: "name" and "color". For "delete"-operation is to be deleted from "garage" table as well as from "winners".
- User is able to select any color from an RGB-Palete like here and see the picture of the car colored with the color selected and car's name.
- Near the car at track there are buttons to update its attributes or delete it.
- App has a button to create random cars (100 cars per click). Name is assembled from two random parts from database, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color is also generated randomly.
- Buttons A and B near the car at track simulate start / stop the car engine.
- When user clicks to the engine start button (A) -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation will stop.
- By click to the engine stop button (B) -> UI is waiting for answer for stopping engine -> car returned to it's initial place.

RACE:
- 'Race' button starts race. After user clicks this button all the cars on the current page start driving.
- 'Reset' button resets race. After user clicks this button all the cars return to it's initial places.
-  After some car finishes first user should see the message contains car's name that shows which one has won.

"Winners" view:
- Contains "Winners view" table (10 winners per one page).
- If the same car wins more than once the number of wins is incremented while best time is saved only if it's better than the stored one.
- Cars sorting by wins number and by best time (ASC, DESC) is implemented.
