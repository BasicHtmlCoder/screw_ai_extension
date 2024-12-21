### Screw AI

_THIS IS A FUN PROJECT, AT THE END USER INSTALLS AND ACCEPTS TERMS_
  
- Because AI kinda sucks, not in itself but how it is being pushed to end users...
This is a browser extension to scan text in current page, if it talks about AI, we physically jump on it to screw the page.

- THIS IS A WORK IN PROGRESS ! YOU CAN CONTRIBUTE BY MAKING THIS EXTENSION A BETTER TOOL TO SCREW AI.

- To run an extension on Chrome, follow the following: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

- Contribution:
    - Head to /src and run `npm i` then `npm run build` each time you change source.
    - Refresh the extension in `chrome://extensions/`
    - currently I think of the following ideas:
        - Run the script directly without user intervention
        - Make a configuration page with *I accept conditions* checkbox *unchecked* by default and with levels of actions:
            - unchecked (default / first time)
            - checked (applied on all pages without exception)
            - checked (with exceptions / user add current page or site to except list)
        - Run LDA script on a separate worker not to block the current page when analyzing
        - Enhance AI blabla detection in text
        - Add restrictions not only based on text, but technology used like if "tensorflow.js" is used, screw the page.
        

- Sample code taken from:
[section]: https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#executing-arbitrary-strings
