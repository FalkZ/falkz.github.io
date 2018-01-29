# falkAPI

## Workflow

### text
1. **fetch** -> load content from source
2. **chop** -> chop up loaded string
3. **construct** -> construct object from chopped string
3. **tag** -> add HTML-tags to object
4. **construct** -> construct array out of tagged object
5. **map** -> add items to list or table

### object
1. **fetch** -> load object from source
3. **construct** -> construct object from source object
3. **tag** -> add HTML-tags to object
4. **construct** -> construct array out of tagged object
5. **map** -> add items to list or table



## fetcher

```javascript
fetcher('https://page.com' [,json]).then(response =>
  console.log(response)
)
```
options |
--- | ---
url | can be a single url of the raw content or an array, witch results as an output array
json | optional formats otpot to json istead of text.


## chopper

```javascript
const {output, extract} = chopper(input, string,
  {[ merge: true, noSpace: true, noNewLine: true,
    extract: true, removeTag: true, noZero: true ]})
```

options |
--- | ---
input | input string or array of strings
string | variable that chops up the string
merge | merges the splited string at the end of the process, otherwise output as array
noSpace | doesn't add space at end of split-string
noNewLine | doesn't add newline at begin of split-string
extract | extracts line of split-string
removeTag | removes line of split-string from output
noZero | removes first element of splited input
