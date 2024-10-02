# MDXBlog

Added update , iadfashhhhhhjjjjjjhhh

[**MDXBlog** (mdxblog.io)](https://mdxblog.io) is a platform built with the latest web technologies, offering a unique blogging experience. MDXBlog is a simple template for creating blogs using MDX (Markdown + JSX) and Next.js 14. Unlike traditional blogging solutions that rely on a database to store content, content management in MDXBlog is handled by easily editable Markdown (MDX) files in a folder on your local machine! It's a good solution for those who appreciate the ease of Markdown and the power of React components.

Our project is fully accessible on **[GitHub](https://github.com/owolfdev/mdx-blog)**.

## Table of Contents

- [Getting Started](#getting-started)

  - [Installation](#installation)
  - [How to Use MDXBlog](#how-to-use-mdxblog)
  - [Detailed Instructions](#detailed-instructions)

- [Markdown and MDX Guide](#markdown-mdx)

  - [Markdown Syntax](#markdown-syntax)
  - [MDX Syntax](#mdx-syntax)

- [Custom MDX Components](#custom-code-components)

  - [\<YouTube />](#youtube)
  - [\<Image />](#image)
  - [code](#code)

- [Notes](#notes)

  - [Scheduled Publishing](#scheduled-publishing)

---

## <div id='getting-started'>Getting Started</div>

<div id="installation" className="w-full">
  **Installation:**
</div>

- Clone the [**repo**](https://github.com/owolfdev/mdx-blog-basic)
- Run 'npm install'
- Run 'npm run dev'
- Create a .env.local file. See the .env.example file at the root of the project for the required environment variables.
- Open 'http://localhost:3000' in your browser
- Create a remote repo on GitHub
- Push your local repo to GitHub
- Deploy on Vercel

Check out an article on the blog for a more detailed guide on [how to install MDXBlog and deploy on Vercel](https://www.mdxblog.io/blog/how-to-install-mdx-blog-and-deploy-on-vercel).

## <div id='how-to-use-mdxblog'>How to Use MDXBlog:</div>

### <div id='detailed-instructions'>Instructions:</div>

**Create a post**

- Use the '+' icon in the nav bar, in development mode only, to create a new post - or simply create a new MDX file in the 'data/posts' directory, manually.
- Edit posts in the browser or manually using VS Code (recommended), or any other text editor.

You'll find a directory called content/blogs where you can create your blog posts. Follow the template and you will be fine.

---

## <div id='markdown-mdx'>Markdown and MDX Guide</div>

### <div id='markdown-syntax'>Markdown Syntax</div>

- **Headings**: Use `#` for headings. More `#` symbols mean smaller headings.

  ```markdown
  # H1 Heading

  ## H2 Heading

  ### H3 Heading
  ```

- **Paragraphs**: Simply write text to create a paragraph.

  ```markdown
  This is a paragraph of text.
  ```

- **Bold and Italic Text**: Use `**` or `__` for bold and `*` or `_` for italic.

  ```markdown
  This is **bold** text and this is _italic_ text.
  ```

- **Lists**:

  - **Unordered List**: Use `-`, `*`, or `+` for bullet points.
    ```markdown
    - Item 1
    - Item 2
    ```
  - **Ordered List**: Use numbers followed by a period.
    ```markdown
    1. First item
    2. Second item
    ```

- **Links**: Use `[text](url)` for hyperlinks.

  ```markdown
  [OpenAI](https://openai.com)
  ```

- **Images**: Use `![alt text](image url)` to embed images.

  ```markdown
  ![A cat](https://example.com/cat.jpg)
  ```

- **Code Blocks**: Use triple backticks for code blocks.

  ```markdown

  ```

  ```javascript
  console.log("Hello, world!");
  ```

### <div id='mdx-syntax'>MDX Syntax</div>

- **Embedding Components**: Directly embed React components or custom components within your content.

  ```jsx
  import MyButton from "./MyButton";

  <MyButton>Click Me!</MyButton>;
  ```

- **Combining Markdown and Components**: Use markdown for content structure and components for interactivity.

  ```jsx
  ## A Section with a Button

  Here’s a paragraph of text before the button.

  <MyButton>Click Me!</MyButton>

  Here’s another paragraph after the button.
  ```

## <div id='custom-code-components'>Custom MDX Components</div>

MDXBlog provides custom components to enhance your content with interactive elements and visual appeal. These components are imported in the configuration, so they can be used in MDXBlog without an explicit import statement in the MDX document. Here are some of the custom components available:

---

### <div id='youtube'>`<YouTube />`: Seamlessly embed YouTube videos within your content</div>

To embed a YouTube video, use the `<YouTube />` component. Provide the `id` of the YouTube video you want to embed:

\<YouTube id="aqz-KE-bpKQ" />

- **id**: The unique identifier for the YouTube video. This can be found in the video URL after `v=`. For example, in `https://www.youtube.com/watch?v=aqz-KE-bpKQ`, the `id` is `aqz-KE-bpKQ`.

<YouTube id="aqz-KE-bpKQ" />

The YouTube component is a custom MDX component that allows you to embed YouTube videos directly into your content. Simply provide the video ID, and the component will handle the rest.

---

### <div id='image'>`<Image />`: Integrate images elegantly, enhancing the visual appeal of your posts</div>

To add an image to your content, use the `<Image />` component. You can also add a caption to describe the image:

\<Image
src="/images/posts/how-to-use-images/grass-tree-sky.jpg"
caption="trees, grass, and sky"
\/>

- **src**: The path to your image file. This should be relative to the root of your project or the `public` folder if using Next.js.
- **caption** _(optional)_: A short description or caption for the image.

<Image
  src="/images/posts/how-to-use-images/grass-tree-sky.jpg"
  caption="trees, grass, and sky"
/>

---

### <div id='code'>Code: Include and showcase code snippets with clarity and style</div>

### Inline Code

Inline code can be added using single backticks (`):

\`const message = "Hello, World!";\`

Like this:

`const message = "Hello, World!";`

### Code Blocks

To display a block of code, use the standard Markdown syntax with triple backticks (```) followed by the language identifier:

\```javascript  
console.log("Hello World")  
\```

- **language identifier** _(optional)_: Specify the programming language for syntax highlighting. In the example above, `javascript` is used. Replace it with the appropriate language if different.

Here is a simple example of a function that doubles the numbers in an array:

```javascript
function doubleNumbers(numbers) {
  return numbers.map((number) => number * 2);
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const doubled = doubleNumbers(numbers);

console.log(doubled); // Output: [2, 4, 6, 8, 10]
```

Code blocks allow copy-pasting and easy readability, making it simple for readers to understand and use the code snippets you provide.

---

## <div id='notes'>Notes</div>

## <div id='scheduled-publishing'>Scheduled Publishing</div>

**MDXBlog** allows you to schedule posts for future publication. This feature is particularly useful when you want to prepare content in advance and have it automatically published at a specific date and time.

When you create or edit a post you will see a 'Date' field. You can set the date and time for when you want the post to go live. Once you save the post, MDXBlog will automatically publish it at the scheduled date.

Note that there is also a "date modified" property. Each time you edit the post, the date modified will be updated. This is useful for tracking changes to your content. Date modified will be displayed at the top of post, next to the category indicator - unless the published date is later than the modified date - wherin it will display the publishe date. If you want the published date to match the modified date, you can manually set the published date to the same as the modified date. Remember to note that future dated posts will always be unlisted (not visible on your blog roll) until the scheduled publishe date. This is true even if you change the created date to a later date than the current time subsequent to a previous publication.

---

## <div id='development-insights'>More About MDXBlog</div>

**MDXBlog** represents a blend of technological innovation and user-centric design, providing a platform that's not only a pleasure to use but also powerful in its capabilities. Whether you're a developer, a content creator, or someone passionate about blogging, MDXBlog offers you the tools to share your stories and ideas with the world effortlessly.

Find relevant articles on the blog:

- [Installation Guide](https://www.mdxblog.io/blog/how-to-install-mdx-blog-and-deploy-on-vercel)
- [A User Guide](https://www.mdxblog.io/blog/how-to-use-mdx-blog)
