## Migrate likes again before deploying new code!

1. Fix search so that you paginate to page 1 when a search is implemented else the user is stranded on an empty page with no content if a search is initiated on a page beyond the the search results.

2. Fix the styles across pages.

3. refactor the code. make it less redundant, more readable.

4. move away from api routes and toward server functions.

Add search and pagination to posts

continue working on create / edit post.

let's add short uuid to these posts metadata for reference.

Short UUID
Length: Around 22 characters.
Advantages: Short UUID is a more compact representation of a UUID. It provides a good balance between uniqueness and brevity.
Example: G7wVOBQXZea1LT6DFH0A0A

```
npm install short-uuid
```

```
import ShortUniqueId from 'short-uuid';
const shortUuid = ShortUniqueId.generate(); // Generates a shorter UUID
```

ALERT - small issue if file with identical names are created the correct file may not be opened.

change from api to server actions.

make sure things are consistent. remove the blog and use post instead.

continue to work on contacts. clean up code, style, create an article.

make sure all pages conform to the styling for the new template.
