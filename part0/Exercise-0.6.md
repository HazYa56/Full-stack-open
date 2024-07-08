```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON file
    deactivate server
    Note right of browser: The server does not ask for a redirect and the browser stays on the same page
```
