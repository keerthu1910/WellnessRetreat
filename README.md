# WellnessRetreat

It is a responsive web page for a fictional wellness retreat. The page displays a list of available retreats, allowing users to filter them by date and type.

# Dependencies
- axios
- @tanstack/react-query
- moment
- sass
  
# Instructions
* Create a react project using vite. (Command: yarn create vite)
* Initialize the react project with javascript configuration
* Install the above mentioned dependencies
* Inorderto use the react-query, we need to include the following config to the main.jsx file
    * import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
    * const client = new QueryClient();
    - Wrap the App component with the queryclientprovider as follows,
     ![screenshot]![Screenshot (229)](https://github.com/user-attachments/assets/6e1f7231-5630-4a8b-b679-c094414f7e1e)
* For styling, SASS is used. Save the css style files with .scss extension.
* Moment library is used to format the date in (MMMM-DD-YYYY) format.

# To Run the Project
command : yarn run dev

