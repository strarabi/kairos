# kairos
![kairos-words_50](https://user-images.githubusercontent.com/68395942/219906445-b8603692-29ff-484b-8380-1bba074e0f00.png)

By Laurie Luo, Kai Nakamura, Salam Rahal-Arabi, Madeline Shao

Kairos is a Google Chrome extension and web application that makes it easy to visualize all your homework due dates in one place. It collects due dates across many different sources via chrome extension that scrapes local HTML and parses out courses, assignments, deadlines, and more using a natural language processing model. It then sends this data to a Convex-based web application where users can edit the results and remove items as they are completed. The app also supports exporting to various calendar apps such as Google Calendar and iCloud Calendar using the iCalendar (ics) specification. 

To use kairos, navigate to a web page containing homework information such as your Canvas home page, open the extension, and click "Scrape Page". Kairos will then automatically populate and navigate to the web application representation of your calendar.

# Technical Details 
Kairos was built using the OpenAI Davinci Model for natural language processing. We carefully engineered a prompt to ensure the data would be properly parsed and returned in the correct format. After the relevant data is parsed out of the web page, it is sent via XMLHTTPRequest to a data store in Convex where it can be retrieved for rendering the web application, which was written in React.
